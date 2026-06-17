#!/usr/bin/env python3
"""Brandstone builder (based on KeystoneDoc).

Bundles the modular Markdown sections under ``sections/`` into a single,
self-contained ``brand.html`` for humans. Pure Python standard library:
no pip installs, no network. Run it with ``python3 build.py`` from inside
the brand directory (or pass ``--docs <path>``).

The build is a pure assembly step:
  * front-matter is parsed (a flat ``key: value`` subset),
  * Markdown bodies are rendered to static HTML here,
  * ``_tokens.json`` (DTCG design tokens) is rendered into swatch/preview
    panels and exported as ``tokens.css`` for reuse in other projects,
  * a machine-readable ``llms.txt`` index is generated for agents,
  * the design system (CSS), behaviour (JS) and the Mermaid library are
    inlined from ``_assets/`` so the output works fully offline.

Diagram rendering (Mermaid) happens in the browser from the inlined library;
everything else is plain HTML text, so the prose is readable without JS.
"""

import argparse
import datetime as _dt
import html
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))


# --------------------------------------------------------------------------
# Front-matter (flat key: value subset, comma-separated lists)
# --------------------------------------------------------------------------

LIST_KEYS = {"linked_paths"}


def parse_frontmatter(text):
    """Return (meta_dict, body). Front-matter is delimited by '---' lines."""
    meta = {}
    body = text
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            block = text[3:end].strip("\n")
            body = text[end + 4:]
            if body.startswith("\n"):
                body = body[1:]
            for line in block.split("\n"):
                line = line.rstrip()
                if not line.strip() or line.strip().startswith("#"):
                    continue
                if ":" not in line:
                    continue
                key, _, value = line.partition(":")
                key = key.strip()
                value = value.strip()
                if key in LIST_KEYS:
                    meta[key] = [v.strip() for v in value.split(",") if v.strip()]
                else:
                    meta[key] = value
    return meta, body


# --------------------------------------------------------------------------
# Markdown rendering (small, well-scoped subset)
# --------------------------------------------------------------------------

CALLOUT_ICONS = {
    "note": "ti-info-circle",
    "tip": "ti-bulb",
    "warning": "ti-alert-triangle",
    "caution": "ti-alert-octagon",
    "important": "ti-flag-3",
    "decision": "ti-git-branch",
}


def slugify(text):
    text = re.sub(r"<[^>]+>", "", text)
    text = text.strip().lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s-]+", "-", text)
    return text.strip("-") or "section"


def esc(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def inline(text):
    """Render inline Markdown (code, links, images, bold, italic)."""
    codes = []

    def stash(m):
        codes.append(m.group(1))
        return "\x00%d\x00" % (len(codes) - 1)

    text = re.sub(r"`([^`]+)`", stash, text)
    text = esc(text)
    text = re.sub(r"!\[([^\]]*)\]\(([^)\s]+)\)",
                  r'<img alt="\1" src="\2" loading="lazy"/>', text)
    text = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)",
                  lambda m: '<a href="%s">%s</a>' % (m.group(2), m.group(1)), text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"__([^_]+)__", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![\w*])\*([^*\n]+)\*(?![\w*])", r"<em>\1</em>", text)
    text = re.sub(r"(?<![\w_])_([^_\n]+)_(?![\w_])", r"<em>\1</em>", text)

    def unstash(m):
        return "<code>%s</code>" % esc(codes[int(m.group(1))])

    return re.sub(r"\x00(\d+)\x00", unstash, text)


def _split_row(row):
    row = row.strip()
    if row.startswith("|"):
        row = row[1:]
    if row.endswith("|"):
        row = row[:-1]
    return [c.strip() for c in row.split("|")]


def _render_table(rows):
    header = _split_row(rows[0])
    aligns = []
    for cell in _split_row(rows[1]):
        left = cell.startswith(":")
        right = cell.endswith(":")
        aligns.append("center" if left and right else "right" if right
                      else "left" if left else "")
    out = ['<div class="table-wrap"><table><thead><tr>']
    for i, h in enumerate(header):
        style = ' style="text-align:%s"' % aligns[i] if i < len(aligns) and aligns[i] else ""
        out.append("<th%s>%s</th>" % (style, inline(h)))
    out.append("</tr></thead><tbody>")
    for row in rows[2:]:
        if not row.strip():
            continue
        cells = _split_row(row)
        out.append("<tr>")
        for i, c in enumerate(cells):
            style = ' style="text-align:%s"' % aligns[i] if i < len(aligns) and aligns[i] else ""
            out.append("<td%s>%s</td>" % (style, inline(c)))
        out.append("</tr>")
    out.append("</tbody></table></div>")
    return "".join(out)


def _render_list(lines):
    items = []
    for ln in lines:
        m = re.match(r"^(\s*)([-*+]|\d+\.)\s+(.*)$", ln)
        if m:
            indent = len(m.group(1).replace("\t", "  "))
            ordered = m.group(2)[0].isdigit()
            items.append([indent, ordered, m.group(3)])
        elif items and ln.strip():
            items[-1][2] += " " + ln.strip()

    def build(idx, level):
        if idx >= len(items):
            return "", idx
        ordered = items[idx][1]
        tag = "ol" if ordered else "ul"
        out = ["<%s>" % tag]
        while idx < len(items):
            indent = items[idx][0]
            if indent < level:
                break
            if indent > level:
                child, idx = build(idx, indent)
                out[-1] = out[-1][:-5] + child + "</li>"
                continue
            out.append("<li>%s</li>" % inline(items[idx][2]))
            idx += 1
        out.append("</%s>" % tag)
        return "".join(out), idx

    base_indent = items[0][0] if items else 0
    html_out, _ = build(0, base_indent)
    return html_out


def _render_blockquote(buf):
    m = re.match(r"^\[!(\w+)\]\s*(.*)$", buf[0])
    if m:
        typ = m.group(1).lower()
        rest = [m.group(2)] + buf[1:]
        body = " ".join(x.strip() for x in rest if x.strip())
        icon = CALLOUT_ICONS.get(typ, "ti-info-circle")
        return ('<div class="callout callout-%s"><i class="ti %s callout-icon" '
                'aria-hidden="true"></i><div class="callout-body">'
                '<span class="callout-label">%s</span> %s</div></div>'
                % (typ, icon, typ.capitalize(), inline(body)))
    return "<blockquote>%s</blockquote>" % inline(
        " ".join(b.strip() for b in buf))


def _is_block_start(line):
    s = line.strip()
    return (s.startswith("#") or s.startswith("```") or s.startswith(">")
            or re.match(r"^([-*+]|\d+\.)\s+", s)
            or re.match(r"^(\*{3,}|-{3,}|_{3,})\s*$", s))


def _render_gallery(code):
    """``` gallery block: one item per line, "path | caption" (caption optional)."""
    items = []
    for ln in code.split("\n"):
        ln = ln.strip()
        if not ln or ln.startswith("#"):
            continue
        path, _, caption = ln.partition("|")
        path = path.strip()
        caption = caption.strip()
        items.append(
            '<figure class="gal-item"><img src="%s" alt="%s" loading="lazy"/>%s</figure>'
            % (esc(path), esc(caption or os.path.basename(path)),
               ('<figcaption>%s</figcaption>' % inline(caption)) if caption else ""))
    return '<div class="gallery">%s</div>' % "".join(items)


def _render_dodont(code):
    """``` dodont block: alternating "do: ..." / "dont: ..." lines.
    Optional image: "do: assets/x.png | caption"."""
    cards = []
    for ln in code.split("\n"):
        ln = ln.strip()
        if not ln:
            continue
        kind, _, rest = ln.partition(":")
        kind = kind.strip().lower()
        if kind not in ("do", "dont", "don't"):
            continue
        kind = "do" if kind == "do" else "dont"
        rest = rest.strip()
        img = ""
        if "|" in rest:
            first, _, caption = rest.partition("|")
            first = first.strip()
            if re.search(r"\.(png|jpe?g|webp|svg|gif)$", first, re.I):
                img = '<img src="%s" alt="" loading="lazy"/>' % esc(first)
                rest = caption.strip()
        icon = "ti-check" if kind == "do" else "ti-x"
        label = "Do" if kind == "do" else "Don't"
        cards.append(
            '<div class="dd-card dd-%s">%s<div class="dd-body">'
            '<span class="dd-label"><i class="ti %s" aria-hidden="true"></i> %s</span> %s'
            '</div></div>' % (kind, img, icon, label, inline(rest)))
    return '<div class="dodont">%s</div>' % "".join(cards)


def render_markdown(md, headings):
    """Render Markdown to HTML. Append (level, text, id) for h2/h3 to headings."""
    lines = md.replace("\r\n", "\n").split("\n")
    out = []
    i, n = 0, len(lines)
    while i < n:
        line = lines[i]
        stripped = line.strip()

        if stripped.startswith("```"):
            lang = stripped[3:].strip()
            i += 1
            buf = []
            while i < n and not lines[i].strip().startswith("```"):
                buf.append(lines[i])
                i += 1
            i += 1
            code = "\n".join(buf)
            if lang.lower() == "gallery":
                out.append(_render_gallery(code))
                continue
            if lang.lower() == "dodont":
                out.append(_render_dodont(code))
                continue
            if lang.lower() == "mermaid":
                out.append('<div class="diagram"><pre class="mermaid">%s</pre>'
                           '<button class="zoom-btn" type="button" '
                           'aria-label="Zoom diagram"><i class="ti ti-maximize"></i>'
                           '</button></div>' % esc(code))
            else:
                out.append('<div class="codeblock"><div class="codeblock-head">'
                           '<span class="codeblock-lang">%s</span>'
                           '<button class="copy-btn" type="button" aria-label="Copy">'
                           '<i class="ti ti-copy"></i></button></div>'
                           '<pre><code>%s</code></pre></div>'
                           % (esc(lang or "text"), esc(code)))
            continue

        if stripped == "":
            i += 1
            continue

        m = re.match(r"^(#{1,6})\s+(.*)$", line)
        if m:
            level = len(m.group(1))
            text = m.group(2).strip()
            hid = slugify(text)
            if level in (2, 3):
                headings.append((level, text, hid))
            out.append('<h%d id="%s">%s</h%d>' % (level, hid, inline(text), level))
            i += 1
            continue

        if re.match(r"^(\*{3,}|-{3,}|_{3,})\s*$", stripped):
            out.append("<hr/>")
            i += 1
            continue

        if stripped.startswith(">"):
            buf = []
            while i < n and lines[i].lstrip().startswith(">"):
                buf.append(re.sub(r"^\s*>\s?", "", lines[i]))
                i += 1
            out.append(_render_blockquote(buf))
            continue

        if ("|" in line and i + 1 < n and "-" in lines[i + 1]
                and re.match(r"^\s*\|?[\s:|-]+\|?\s*$", lines[i + 1])):
            tbuf = [line, lines[i + 1]]
            i += 2
            while i < n and "|" in lines[i] and lines[i].strip():
                tbuf.append(lines[i])
                i += 1
            out.append(_render_table(tbuf))
            continue

        if re.match(r"^\s*([-*+]|\d+\.)\s+", line):
            buf = []
            while i < n and (re.match(r"^\s*([-*+]|\d+\.)\s+", lines[i])
                             or (lines[i].startswith(" ") and lines[i].strip() and buf)):
                buf.append(lines[i])
                i += 1
            out.append(_render_list(buf))
            continue

        buf = [line]
        i += 1
        while i < n and lines[i].strip() and not _is_block_start(lines[i]):
            buf.append(lines[i])
            i += 1
        out.append("<p>%s</p>" % inline(" ".join(b.strip() for b in buf)))

    return "\n".join(out)


# --------------------------------------------------------------------------
# Git-based staleness detection
# --------------------------------------------------------------------------

def _git(args, cwd):
    try:
        res = subprocess.run(["git"] + args, cwd=cwd, capture_output=True,
                             text=True, timeout=15)
        if res.returncode == 0:
            return res.stdout.strip()
    except Exception:
        return None
    return None


def git_available(root):
    return _git(["rev-parse", "--is-inside-work-tree"], root) == "true"


def newest_commit_date(paths, root):
    newest = None
    for p in paths:
        iso = _git(["log", "-1", "--format=%cI", "--", p], root)
        if iso:
            try:
                d = _dt.datetime.fromisoformat(iso).date()
            except ValueError:
                continue
            if newest is None or d > newest:
                newest = d
    return newest


def compute_status(meta, root, has_git):
    """Return (effective_status, reason). 'review' if code is newer than doc."""
    declared = (meta.get("status") or "current").lower()
    if declared == "draft":
        return "draft", ""
    if not has_git:
        return declared, ""
    paths = meta.get("linked_paths") or []
    last = meta.get("last_updated")
    if not paths or not last:
        return declared, ""
    try:
        doc_date = _dt.date.fromisoformat(last.strip())
    except ValueError:
        return declared, ""
    newest = newest_commit_date(paths, root)
    if newest and newest > doc_date:
        return "review", "linked code changed on %s, after doc date %s" % (newest, last)
    return "current", ""


# --------------------------------------------------------------------------
# Design tokens (DTCG subset: nested groups, $value/$type/$description,
# aliases via "{path.to.token}")
# --------------------------------------------------------------------------

def load_tokens(docs_dir):
    """Return a flat list of tokens: {path, name, type, value, resolved, desc}."""
    path = os.path.join(docs_dir, "_tokens.json")
    if not os.path.exists(path):
        return []
    try:
        with open(path, "r", encoding="utf-8") as fh:
            tree = json.load(fh)
    except (ValueError, OSError):
        return []
    flat = []

    def walk(node, trail):
        if not isinstance(node, dict):
            return
        if "$value" in node:
            flat.append({
                "path": trail,
                "name": ".".join(trail),
                "type": node.get("$type", ""),
                "value": node["$value"],
                "desc": node.get("$description", ""),
            })
            return
        for key, val in node.items():
            if key.startswith("$"):
                continue
            walk(val, trail + [key])

    walk(tree, [])
    by_name = {t["name"]: t for t in flat}

    def resolve(value, depth=0):
        if (isinstance(value, str) and value.startswith("{")
                and value.endswith("}") and depth < 10):
            ref = by_name.get(value[1:-1])
            if ref:
                return resolve(ref["value"], depth + 1)
        return value

    for t in flat:
        t["resolved"] = resolve(t["value"])
        t["alias"] = isinstance(t["value"], str) and t["value"].startswith("{")
    return flat


def tokens_css(tokens):
    """Emit CSS custom properties for all scalar tokens."""
    lines = ["/* generated by Brandstone from _tokens.json - do not edit */",
             ":root {"]
    for t in tokens:
        if isinstance(t["resolved"], (str, int, float)):
            var = "--" + "-".join(re.sub(r"[^a-zA-Z0-9]+", "-", p) for p in t["path"])
            lines.append("  %s: %s;" % (var.lower(), t["resolved"]))
    lines.append("}")
    return "\n".join(lines) + "\n"


def _hex_rgb(value):
    """Parse #rgb/#rrggbb to (r, g, b) or None."""
    m = re.match(r"^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$", (value or "").strip())
    if not m:
        return None
    h = m.group(1)
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def _contrast(rgb1, rgb2):
    def lum(rgb):
        chans = []
        for c in rgb:
            c = c / 255.0
            chans.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
        return 0.2126 * chans[0] + 0.7152 * chans[1] + 0.0722 * chans[2]
    l1, l2 = lum(rgb1), lum(rgb2)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def _token_chip(t):
    """Render one token as a card; colors get swatches, fonts get previews."""
    name = esc(t["name"])
    raw = t["value"] if isinstance(t["value"], str) else json.dumps(t["value"], ensure_ascii=False)
    res = t["resolved"] if isinstance(t["resolved"], str) else json.dumps(t["resolved"], ensure_ascii=False)
    desc = ('<div class="tk-desc">%s</div>' % inline(t["desc"])) if t["desc"] else ""
    via = ('<span class="tk-alias mono" title="alias">%s</span>' % esc(raw)) if t["alias"] else ""
    if t["type"] == "color":
        rgb = _hex_rgb(res)
        badges = ""
        if rgb:
            cw = _contrast(rgb, (255, 255, 255))
            cb = _contrast(rgb, (0, 0, 0))
            text_on = "#fff" if cw >= cb else "#000"
            best = max(cw, cb)
            badges = ('<span class="tk-contrast" title="Kontrast zu %s">'
                      '%s %.1f:1</span>'
                      % ("Weiß" if cw >= cb else "Schwarz",
                         "AA" if best >= 4.5 else ("AA-Large" if best >= 3 else "&lt;AA"),
                         best))
            swatch_label = ('<span class="tk-swatch-label" style="color:%s">Aa</span>'
                            % text_on)
        else:
            swatch_label = ""
        return ('<div class="tk-card tk-copy" data-copy="%s" title="Klick kopiert %s">'
                '<span class="tk-swatch" style="background:%s">%s</span>'
                '<div class="tk-body"><span class="tk-name mono">%s</span>'
                '<span class="tk-value mono">%s</span>%s%s%s</div></div>'
                % (esc(res), esc(res), esc(res), swatch_label, name, esc(res),
                   badges, via, desc))
    if t["type"] == "fontFamily":
        return ('<div class="tk-card tk-card-font">'
                '<div class="tk-body"><span class="tk-name mono">%s</span>'
                '<span class="tk-value mono">%s</span>%s%s'
                '<div class="tk-specimen" style="font-family:%s">'
                '<div class="tk-spec-xl">Ag</div>'
                '<div class="tk-spec-line">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>'
                '<div class="tk-spec-line">abcdefghijklmnopqrstuvwxyz 0123456789</div>'
                '<div class="tk-spec-sample">Technisch präzise gestaltete Erlebnisse.</div>'
                '</div></div></div>'
                % (name, esc(res), via, desc, esc(res)))
    if t["type"] == "scale":
        try:
            pct = max(0, min(100, float(t["resolved"])))
        except (TypeError, ValueError):
            pct = 0
        return ('<div class="tk-card"><span class="tk-scale"><span class="tk-scale-fill" '
                'style="width:%d%%"></span></span><div class="tk-body">'
                '<span class="tk-name mono">%s</span><span class="tk-value mono">%s</span>%s%s</div></div>'
                % (int(pct), name, esc(res), via, desc))
    return ('<div class="tk-card"><div class="tk-body"><span class="tk-name mono">%s</span>'
            '<span class="tk-value mono">%s</span>%s%s</div></div>'
            % (name, esc(res), via, desc))


def tokens_panel(tokens):
    """Render all tokens grouped by their top-level group (core, components.x)."""
    if not tokens:
        return ('<div class="callout callout-note"><i class="ti ti-info-circle '
                'callout-icon" aria-hidden="true"></i><div class="callout-body">'
                '<span class="callout-label">Note</span> Keine <code>_tokens.json</code> '
                'gefunden oder Datei leer.</div></div>')
    groups = {}
    order = []
    for t in tokens:
        head = t["path"][0]
        key = head if head != "components" or len(t["path"]) < 2 \
            else "components &middot; " + t["path"][1]
        if key not in groups:
            groups[key] = []
            order.append(key)
        groups[key].append(t)
    out = []
    for key in order:
        out.append('<div class="panel"><div class="panel-head">'
                   '<i class="ti ti-palette" aria-hidden="true"></i> %s</div>'
                   '<div class="tk-grid">%s</div></div>'
                   % (key, "".join(_token_chip(t) for t in groups[key])))
    return "".join(out)


def brand_css(tokens, fallback_accent):
    """Self-demonstrating styling: well-known tokens style the page itself,
    and every scalar token is exposed as a CSS custom property."""
    by = {t["name"]: t["resolved"] for t in tokens
          if isinstance(t["resolved"], (str, int, float))}
    accent = by.get("core.semantic.color.primary", fallback_accent)
    lines = [":root{", "--accent:%s;" % accent]
    heading = by.get("core.semantic.font.heading")
    body = by.get("core.semantic.font.body")
    if heading:
        lines.append("--brand-font-heading:%s;" % heading)
    if body:
        lines.append("--brand-font-body:%s;" % body)
    for name, val in sorted(by.items()):
        var = "--" + re.sub(r"[^a-zA-Z0-9]+", "-", name).strip("-").lower()
        lines.append("%s:%s;" % (var, val))
    lines.append("}")
    return "".join(lines)


IMG_EXT = {"png", "jpg", "jpeg", "webp", "gif", "svg"}
VIDEO_EXT = {"mp4", "webm", "mov"}


def scan_assets(docs_dir):
    """Collect files under assets/ for the asset board."""
    base = os.path.join(docs_dir, "assets")
    found = []
    if not os.path.isdir(base):
        return found
    for root, dirs, files in os.walk(base):
        dirs[:] = sorted(d for d in dirs if not d.startswith("."))
        for f in sorted(files):
            if f.startswith("."):
                continue
            full = os.path.join(root, f)
            rel = os.path.relpath(full, docs_dir).replace(os.sep, "/")
            cat = os.path.relpath(root, base).split(os.sep)[0]
            if cat == ".":
                cat = "allgemein"
            ext = os.path.splitext(f)[1].lstrip(".").lower()
            try:
                kb = max(1, round(os.path.getsize(full) / 1024))
            except OSError:
                kb = 0
            found.append({"rel": rel, "name": f, "cat": cat, "ext": ext, "kb": kb})
    return found


def asset_board(assets):
    """Filterable card grid over everything in assets/."""
    if not assets:
        return ('<div class="callout callout-note"><i class="ti ti-info-circle '
                'callout-icon" aria-hidden="true"></i><div class="callout-body">'
                '<span class="callout-label">Note</span> Der <code>assets/</code>-Ordner '
                'ist noch leer. Logos, Templates und Bildmaterial dort ablegen und neu '
                'bauen - jede Datei wird hier automatisch zur Karte.</div></div>')
    cats = sorted(set(a["cat"] for a in assets))
    filters = ['<button class="ab-filter active" data-cat="*" type="button">Alle</button>']
    filters += ['<button class="ab-filter" data-cat="%s" type="button">%s</button>'
                % (esc(c), esc(c)) for c in cats]
    cards = []
    for a in assets:
        if a["ext"] in IMG_EXT:
            preview = ('<div class="ab-preview"><img src="%s" alt="%s" loading="lazy"/></div>'
                       % (esc(a["rel"]), esc(a["name"])))
        elif a["ext"] in VIDEO_EXT:
            preview = ('<div class="ab-preview"><video src="%s" muted loop '
                       'playsinline></video></div>' % esc(a["rel"]))
        else:
            preview = ('<div class="ab-preview ab-icon"><i class="ti ti-file" '
                       'aria-hidden="true"></i></div>')
        cards.append(
            '<div class="ab-card" data-cat="%s" data-name="%s">%s'
            '<div class="ab-meta"><span class="ab-name mono">%s</span>'
            '<span class="ab-tags"><span class="chip mono">%s</span>'
            '<span class="ab-size">%d KB</span></span></div>'
            '<a class="ab-dl" href="%s" download aria-label="Download %s">'
            '<i class="ti ti-download" aria-hidden="true"></i></a></div>'
            % (esc(a["cat"]), esc(a["name"].lower()), preview, esc(a["name"]),
               esc(a["ext"]), a["kb"], esc(a["rel"]), esc(a["name"])))
    return ('<div class="ab-bar">%s<input id="ab-search" type="search" '
            'placeholder="Assets durchsuchen&hellip;" aria-label="Assets durchsuchen"/></div>'
            '<div class="ab-grid">%s</div>' % ("".join(filters), "".join(cards)))


def facet_cards(sections, tokens):
    """Overview cards for every Komponenten section, tinted by its accent token."""
    by = {t["name"]: t["resolved"] for t in tokens
          if isinstance(t["resolved"], (str, int, float))}
    cards = []
    for s in sections:
        m = s["meta"]
        if (m.get("group") or "").strip().lower() != "komponenten":
            continue
        comp = m.get("component", "")
        accent = by.get("components.%s.color.accent" % comp) or "var(--accent)"
        cards.append(
            '<a class="facet-card" href="#%s" style="--facet:%s">'
            '<span class="facet-dot"></span><span class="facet-title">%s</span>'
            '<span class="facet-summary">%s</span></a>'
            % (m["id"], esc(str(accent)), esc(m["title"]),
               inline(m.get("summary", ""))))
    if not cards:
        return ""
    return ('<div class="panel"><div class="panel-head">'
            '<i class="ti ti-category" aria-hidden="true"></i> Facetten</div>'
            '<div class="facet-grid">%s</div></div>' % "".join(cards))


def split_specs(body):
    """Split a section body at the <!--specs--> marker into (showcase, specs)."""
    parts = re.split(r"<!--\s*specs\s*-->", body, maxsplit=1)
    if len(parts) == 2:
        return parts[0], parts[1]
    return body, ""


# --------------------------------------------------------------------------
# Assembly
# --------------------------------------------------------------------------

STATUS_LABEL = {"current": "current", "review": "review", "draft": "draft"}


def read_asset(rel):
    path = os.path.join(HERE, "_assets", rel)
    with open(path, "r", encoding="utf-8") as fh:
        return fh.read()


def load_sections(docs_dir):
    sections_dir = os.path.join(docs_dir, "sections")
    files = sorted(f for f in os.listdir(sections_dir)
                   if f.endswith(".md") and not f.startswith("_"))
    sections = []
    for fname in files:
        with open(os.path.join(sections_dir, fname), "r", encoding="utf-8") as fh:
            raw = fh.read()
        meta, body = parse_frontmatter(raw)
        meta.setdefault("id", slugify(meta.get("title", os.path.splitext(fname)[0])))
        meta.setdefault("title", meta["id"].replace("-", " ").title())
        sections.append({"file": fname, "meta": meta, "body": body})
    return sections


def freshness_panel(sections):
    rows = []
    for s in sections:
        st = s["effective_status"]
        cls = {"current": "ok", "review": "warn", "draft": "muted"}.get(st, "muted")
        linked = ", ".join(s["meta"].get("linked_paths") or []) or "&mdash;"
        rows.append(
            '<tr><td>%s</td><td class="mono muted">%s</td><td class="muted">%s</td>'
            '<td class="right"><span class="status status-%s">%s</span></td></tr>'
            % (esc(s["meta"]["title"]), linked,
               esc(s["meta"].get("last_updated", "&mdash;")), cls, st))
    return (
        '<div class="panel"><div class="panel-head">'
        '<i class="ti ti-activity" aria-hidden="true"></i> Freshness panel</div>'
        '<div class="table-wrap"><table class="freshness"><thead><tr>'
        '<th>section</th><th>linked code</th><th>updated</th>'
        '<th class="right">status</th></tr></thead><tbody>%s</tbody></table></div></div>'
        % "".join(rows))


def build_html(docs_dir, meta_cfg):
    has_git = git_available(docs_dir)
    repo_root = _git(["rev-parse", "--show-toplevel"], docs_dir) or docs_dir
    sections = load_sections(docs_dir)

    health_total = 0
    health_current = 0
    for s in sections:
        status, reason = compute_status(s["meta"], repo_root, has_git)
        s["effective_status"] = status
        s["status_reason"] = reason
        if s["meta"].get("id") != "changelog":
            health_total += 1
            if status == "current":
                health_current += 1
    health = round(100 * health_current / health_total) if health_total else 100

    project = meta_cfg.get("brand", meta_cfg.get("project", "Projekt"))
    accent = meta_cfg.get("accent", "#185FA5")
    default_theme = meta_cfg.get("theme", "auto")
    offline = meta_cfg.get("offline", True)
    built = _dt.date.today().isoformat()
    tokens = load_tokens(docs_dir)
    flavor = meta_cfg.get("flavor") or ("brand" if tokens else "code")
    brand_mode = flavor == "brand"
    if not brand_mode:
        tokens = []

    nav_items = []
    panes = []
    index = []
    first_id = sections[0]["meta"]["id"] if sections else "overview"
    last_group = None

    for s in sections:
        m = s["meta"]
        sid = m["id"]
        status = s["effective_status"]
        dot = {"current": "ok", "review": "warn", "draft": "muted"}.get(status, "muted")
        group = (m.get("group") or "").strip()
        if group and group != last_group:
            nav_items.append('<li class="nav-group">%s</li>' % esc(group))
        if group:
            last_group = group
        nav_items.append(
            '<li class="nav-item" data-target="%s" data-status="%s">'
            '<span class="dot dot-%s" title="%s"></span>'
            '<span class="nav-label">%s</span></li>'
            % (sid, status, dot, status, esc(m["title"])))

        headings = []
        showcase_md, specs_md = split_specs(s["body"])
        body_html = render_markdown(showcase_md, headings)
        if specs_md.strip():
            body_html += ('<details class="specs"><summary>'
                          '<i class="ti ti-list-details" aria-hidden="true"></i> '
                          'Specs &amp; Regeln</summary><div class="specs-body">%s'
                          '</div></details>'
                          % render_markdown(specs_md, headings))
        if sid == "tokens" or (m.get("tokens") or "").lower() == "auto":
            body_html += tokens_panel(tokens)

        chips = "".join(
            '<span class="chip mono"><i class="ti ti-link" aria-hidden="true"></i>%s</span>'
            % esc(p) for p in (m.get("linked_paths") or []))
        meta_line = []
        if m.get("last_updated"):
            meta_line.append("updated %s" % esc(m["last_updated"]))
        if m.get("owner"):
            meta_line.append(esc(m["owner"]))
        reason_html = ('<div class="stale-note"><i class="ti ti-alert-triangle" '
                       'aria-hidden="true"></i> %s</div>' % esc(s["status_reason"])
                       if status == "review" and s["status_reason"] else "")

        opener_html = ""
        if brand_mode:
            opener_html = ('<div class="sh-opener" aria-hidden="true">%s</div>'
                           % str(m.get("order", "")).zfill(2)[:2])
        header = (
            '<div class="section-header">%s'
            '<div class="sh-title"><h1>%s</h1><span class="status status-%s">%s</span></div>'
            '<div class="sh-meta">%s</div>%s%s</div>'
            % (opener_html, esc(m["title"]), dot, STATUS_LABEL.get(status, status),
               " &middot; ".join(meta_line),
               ('<div class="chips">%s</div>' % chips) if chips else "",
               reason_html))

        extra = ""
        hero = ""
        if sid == first_id:
            if brand_mode:
                hero = ('<div class="hero"><div class="hero-name">%s</div>'
                        '<div class="hero-essence">%s</div>'
                        '<div class="hero-stamp mono">brand guide &middot; %s</div></div>'
                        % (esc(project), inline(m.get("summary", "")), built))
                extra = facet_cards(sections, tokens) + freshness_panel(sections)
            else:
                extra = freshness_panel(sections)
        if m.get("summary") and not (sid == first_id and brand_mode):
            summary_html = '<p class="section-summary">%s</p>' % inline(m["summary"])
        else:
            summary_html = ""

        hidden_attr = "" if sid == first_id else " hidden"
        panes.append(
            '<section class="pane" id="pane-%s" data-status="%s"%s>%s%s%s%s%s</section>'
            % (sid, status, hidden_attr, hero, header, summary_html, extra, body_html))

        index.append({
            "id": sid,
            "title": m["title"],
            "status": status,
            "last_updated": m.get("last_updated", ""),
            "linked_paths": m.get("linked_paths", []),
            "summary": m.get("summary", ""),
            "anchors": [{"text": t, "id": hid} for _lvl, t, hid in headings],
        })

    if brand_mode:
        assets = scan_assets(docs_dir)
        nav_items.append('<li class="nav-group">Bibliothek</li>')
        nav_items.append(
            '<li class="nav-item" data-target="assets" data-status="current">'
            '<span class="dot dot-ok" title="generated"></span>'
            '<span class="nav-label">Asset-Board</span></li>')
        panes.append(
            '<section class="pane" id="pane-assets" data-status="current" hidden>'
            '<div class="section-header"><div class="sh-opener" aria-hidden="true">AB</div>'
            '<div class="sh-title"><h1>Asset-Board</h1>'
            '<span class="status status-ok">generated</span></div>'
            '<div class="sh-meta">automatisch aus <span class="mono">assets/</span> '
            'gescannt &middot; %d Dateien</div></div>%s</section>'
            % (len(assets), asset_board(assets)))
        index.append({
            "id": "assets", "title": "Asset-Board", "status": "current",
            "last_updated": built, "linked_paths": ["assets/"],
            "summary": "Automatisch generiertes Board aller Brand-Assets.",
            "anchors": [],
        })

    health_cls = "ok" if health >= 80 else "warn" if health >= 50 else "bad"

    css = read_asset("base.css")
    app_js = read_asset("app.js")
    if offline:
        mermaid_tag = "<script>%s</script>" % read_asset("vendor/mermaid.min.js")
    else:
        mermaid_tag = ('<script src="https://cdn.jsdelivr.net/npm/'
                       'mermaid@10/dist/mermaid.min.js"></script>')

    index_json = json.dumps({
        "project": project,
        "generated": built,
        "health": health,
        "sections": index,
    }, ensure_ascii=False, indent=0)

    doc = """<!DOCTYPE html>
<html lang="en" data-theme="{theme}">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="generator" content="KeystoneDoc"/>
<title>{project} &middot; {doc_label}</title>
<style>{brand_css}
{css}</style>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="topbar">
  <button id="menu-toggle" type="button" aria-label="Menü öffnen" aria-expanded="false">
    <i class="ti ti-menu-2" aria-hidden="true"></i></button>
  <div class="brand">
    <i class="ti {brand_icon} brand-icon" aria-hidden="true"></i>
    <div><div class="proj">{project}</div>
    <div class="sub">{doc_sub} &middot; built {built}</div></div>
  </div>
  <div class="top-actions">
    <div class="search">
      <i class="ti ti-search" aria-hidden="true"></i>
      <input id="search" type="search" placeholder="Search documentation&hellip;"
             autocomplete="off" aria-label="Search documentation"/>
      <div id="search-results" role="listbox"></div>
    </div>
    <span class="health health-{health_cls}" title="share of sections current">
      <i class="ti ti-heartbeat" aria-hidden="true"></i> {health}%</span>
    <button id="theme-toggle" type="button" aria-label="Toggle theme">
      <i class="ti ti-moon" aria-hidden="true"></i></button>
  </div>
</header>
<div class="layout">
  <nav class="sidebar" aria-label="Sections">
    <ul class="nav">{nav}</ul>
    <label class="stale-toggle"><input type="checkbox" id="only-stale"/>
      <span>Show only sections needing review</span></label>
  </nav>
  <main class="content" id="main">{panes}</main>
  <aside class="toc" aria-label="On this page">
    <div class="toc-title">On this page</div>
    <ul id="toc-list"></ul>
  </aside>
</div>
<div id="nav-backdrop"></div>
<div id="zoom-overlay" hidden><div id="zoom-inner"></div></div>
<script id="doc-index" type="application/json">{index_json}</script>
{mermaid_tag}
<script>{app_js}</script>
</body>
</html>""".format(theme=esc(default_theme), project=esc(project),
                  doc_label="Brand Guide" if brand_mode else "Documentation",
                  doc_sub="brand guide" if brand_mode else "project documentation",
                  brand_icon="ti-diamond" if brand_mode else "ti-book-2",
                  brand_css=brand_css(tokens, accent),
                  css=css, built=built, health=health, health_cls=health_cls,
                  nav="".join(nav_items), panes="".join(panes),
                  index_json=index_json.replace("</", "<\\/"),
                  mermaid_tag=mermaid_tag, app_js=app_js)

    return doc, sections, health, flavor


def verify(doc, sections):
    """Light verification: report broken in-page anchors and counts."""
    ids = set(re.findall(r'id="([^"]+)"', doc))
    section_ids = set(s["meta"]["id"] for s in sections)

    def ok(a):
        if not a or a == "main" or a in ids:
            return True
        parts = a.split("/", 1)
        if parts[0] in section_ids:
            return len(parts) == 1 or parts[1] in ids
        return False

    anchor_targets = set(re.findall(r'href="#([^"]+)"', doc))
    broken = [a for a in anchor_targets if not ok(a)]
    diagrams = doc.count('class="mermaid"')
    return {"sections": len(sections), "diagrams": diagrams, "broken_links": broken}


def write_llms_txt(docs_dir, meta_cfg, sections, tokens, out_name):
    """Machine-readable index so agents can navigate the brand docs."""
    brand = meta_cfg.get("brand", meta_cfg.get("project", "Brand"))
    lines = [
        "# %s - Brand Documentation" % brand,
        "",
        "> Single source of truth for this brand. Generated by Brandstone on %s."
        % _dt.date.today().isoformat(),
        "> Source files: sections/*.md (strategy, voice, visual identity, content).",
        "> Design tokens: _tokens.json (DTCG format) - canonical values for colors,",
        "> typography and voice scales. CSS export: tokens.css. Human view: %s." % out_name,
        "",
        "## Rules for agents",
        "",
        "- _tokens.json is the source of truth for colors, fonts and voice scales.",
        "  Never hardcode brand values; read them from there.",
        "- For strategy, messaging, voice and usage rules read the section files below.",
        "- If your work changes the brand (new asset, new decision, new component),",
        "  update the affected section, stamp it, and rerun: python3 build.py",
        "",
        "## Sections",
        "",
    ]
    for s in sections:
        m = s["meta"]
        lines.append("- sections/%s - %s (id: %s, status: %s, updated: %s)%s"
                     % (s["file"], m["title"], m["id"], s["effective_status"],
                        m.get("last_updated", "?"),
                        (": " + m["summary"]) if m.get("summary") else ""))
    if tokens:
        lines += ["", "## Tokens (%d)" % len(tokens), ""]
        for t in tokens:
            val = t["resolved"] if isinstance(t["resolved"], (str, int, float)) \
                else json.dumps(t["resolved"], ensure_ascii=False)
            lines.append("- %s = %s%s%s" % (
                t["name"], val,
                (" [%s]" % t["type"]) if t["type"] else "",
                (" - " + t["desc"]) if t["desc"] else ""))
    with open(os.path.join(docs_dir, "llms.txt"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines) + "\n")


def main(argv=None):
    parser = argparse.ArgumentParser(description="Build brand.html from sections/ and _tokens.json")
    parser.add_argument("--docs", default=HERE,
                        help="Path to the brand directory (defaults to build.py location)")
    parser.add_argument("--out", default=None, help="Output path override")
    args = parser.parse_args(argv)

    docs_dir = os.path.abspath(args.docs)
    meta_path = os.path.join(docs_dir, "_meta.json")
    meta_cfg = {}
    if os.path.exists(meta_path):
        with open(meta_path, "r", encoding="utf-8") as fh:
            meta_cfg = json.load(fh)

    doc, sections, health, flavor = build_html(docs_dir, meta_cfg)
    brand_mode = flavor == "brand"

    default_out = "brand.html" if brand_mode else "documentation.html"
    out_path = args.out or meta_cfg.get("output") or os.path.join(docs_dir, default_out)
    if not os.path.isabs(out_path):
        out_path = os.path.join(docs_dir, out_path)
    with open(out_path, "w", encoding="utf-8") as fh:
        fh.write(doc)

    tokens = load_tokens(docs_dir) if brand_mode else []
    if brand_mode:
        if tokens:
            with open(os.path.join(docs_dir, "tokens.css"), "w", encoding="utf-8") as fh:
                fh.write(tokens_css(tokens))
        write_llms_txt(docs_dir, meta_cfg, sections, tokens, os.path.basename(out_path))

    report = verify(doc, sections)
    size_kb = round(len(doc.encode("utf-8")) / 1024)
    stale = [s["meta"]["title"] for s in sections if s["effective_status"] == "review"]

    print("KeystoneDoc build complete (flavor: %s)" % flavor)
    print("  output:    %s (%d KB)" % (out_path, size_kb))
    print("  sections:  %d   diagrams: %d   tokens: %d   health: %d%%"
          % (report["sections"], report["diagrams"], len(tokens), health))
    if brand_mode:
        print("  also wrote: llms.txt%s" % (", tokens.css" if tokens else ""))
    if stale:
        print("  needs review: %s" % ", ".join(stale))
    if report["broken_links"]:
        print("  WARNING broken anchors: %s" % ", ".join(report["broken_links"]))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
