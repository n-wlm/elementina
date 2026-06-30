export const PERSONAS = [
  {
    id: "goldina",
    name: "Goldina",
    element: "Au · 79",
    role: "Kontakt, SIM, Mikroprozessor",
    tagline: "Das wertvollste Metall der Welt",
    portrait: "Au",
    color: "#f0c020",
    colorLight: "#ffe878",
    glow: "rgba(240, 192, 32, 0.58)",
    ink: "#3a2000",
    bg: "#0d0a00",
    mood: "glamourös, selbstbewusst, nachdenklich",
  },
  {
    id: "kobaltin",
    name: "Kobaltin",
    element: "Co · 27",
    role: "Lithium-Ionen-Akku",
    tagline: "Die Kraft hinter jedem Akku",
    portrait: "Co",
    color: "#2878f0",
    colorLight: "#77b6ff",
    glow: "rgba(40, 120, 240, 0.58)",
    ink: "#07124f",
    bg: "#020510",
    mood: "stark, direkt, kämpferisch",
  },
  {
    id: "lithium",
    name: "Lithium",
    element: "Li · 3",
    role: "Lithium-Ionen-Akku",
    tagline: "Leichte Energie für dein Handy",
    portrait: "Li",
    color: "#9b7cf4",
    colorLight: "#c5b4ff",
    glow: "rgba(155, 124, 244, 0.58)",
    ink: "#230f5a",
    bg: "#0a0618",
    mood: "leicht, energiegeladen, sensibel",
  },
  {
    id: "indium",
    name: "Indium",
    element: "In · 49",
    role: "Touchschicht im Display",
    tagline: "Das unsichtbare Leitmaterial",
    portrait: "In",
    color: "#17a7a0",
    colorLight: "#76e3db",
    glow: "rgba(23, 167, 160, 0.58)",
    ink: "#003d39",
    bg: "#001211",
    mood: "unsichtbar, präzise, technisch",
  },
  {
    id: "gallium",
    name: "Gallium",
    element: "Ga · 31",
    role: "Display- und Beleuchtungstechnik",
    tagline: "Kleines Metall, große Hightech-Rolle",
    portrait: "Ga",
    color: "#62b84f",
    colorLight: "#b6ef92",
    glow: "rgba(98, 184, 79, 0.58)",
    ink: "#173e10",
    bg: "#071405",
    mood: "modern, selten, vernetzt",
  },
  {
    id: "silizium",
    name: "Silizium",
    element: "Si · 14",
    role: "Kamerasensor und Chips",
    tagline: "Die Basis fast aller Chips",
    portrait: "Si",
    color: "#6d8ea5",
    colorLight: "#b8d2e5",
    glow: "rgba(109, 142, 165, 0.58)",
    ink: "#173145",
    bg: "#061018",
    mood: "logisch, ruhig, leistungsstark",
  },
  {
    id: "zinn",
    name: "Zinn",
    element: "Sn · 50",
    role: "Lötstellen in der Elektronik",
    tagline: "Der unsichtbare Verbinder",
    portrait: "Sn",
    color: "#8c98a8",
    colorLight: "#d5dce5",
    glow: "rgba(140, 152, 168, 0.58)",
    ink: "#26303a",
    bg: "#0a0d10",
    mood: "verbindend, zuverlässig, unterschätzt",
  },
  {
    id: "neodym",
    name: "Neodym",
    element: "Nd · 60",
    role: "Lautsprecher-Magnet",
    tagline: "Kleine Magnete, großer Klang",
    portrait: "Nd",
    color: "#8a57e8",
    colorLight: "#c7adff",
    glow: "rgba(138, 87, 232, 0.58)",
    ink: "#2b0f62",
    bg: "#10051f",
    mood: "kraftvoll, magnetisch, selten",
  },
  {
    id: "dysprosium",
    name: "Dysprosium",
    element: "Dy · 66",
    role: "Hitzestabile Lautsprecher-Magnete",
    tagline: "Selten, aber für Magnete entscheidend",
    portrait: "Dy",
    color: "#cf4cb3",
    colorLight: "#ffb2ed",
    glow: "rgba(207, 76, 179, 0.58)",
    ink: "#5c073f",
    bg: "#1b0516",
    mood: "selten, stabil, unverzichtbar",
  },
  {
    id: "aluminium",
    name: "Aluminium",
    element: "Al · 13",
    role: "Gehäuse und Rahmen",
    tagline: "Leicht, stabil und gut recycelbar",
    portrait: "Al",
    color: "#b6bdc8",
    colorLight: "#eef2f6",
    glow: "rgba(182, 189, 200, 0.58)",
    ink: "#303740",
    bg: "#0c0f12",
    mood: "leicht, stabil, reflektiert",
  },
  {
    id: "nickel",
    name: "Nickel",
    element: "Ni · 28",
    role: "Gehäuse-Legierungen und Akkuchemie",
    tagline: "Härte und Korrosionsschutz",
    portrait: "Ni",
    color: "#53a783",
    colorLight: "#a4e2c5",
    glow: "rgba(83, 167, 131, 0.58)",
    ink: "#0c3b28",
    bg: "#04130d",
    mood: "robust, vielseitig, verborgen",
  },
  {
    id: "kupfer",
    name: "Kupfer",
    element: "Cu · 29",
    role: "Leitbahnen auf Platinen",
    tagline: "Der Stromleiter im Handy",
    portrait: "Cu",
    color: "#e07a3f",
    colorLight: "#ffc39c",
    glow: "rgba(224, 122, 63, 0.58)",
    ink: "#5b2008",
    bg: "#190804",
    mood: "warm, leitfähig, unverzichtbar",
  },
];

// Fragebaum pro Persona:
// - introStatement: erster Text beim Start des Calls
// - initialQuestionIds: Fragen, die direkt sichtbar sind
// - questions[id].unlocks: neue Fragen, die nach Antwort auf diese Frage erscheinen
const DIALOG_FLOWS = {
  goldina: {
    introStatement:
      "Ich bin Goldina. In jedem Smartphone glänze ich unsichtbar in Kontakten und Schaltkreisen. Frag mich alles, ich antworte direkt.",
    initialQuestionIds: ["q1", "q3"],
    questions: {
      q1: {
        id: "q1",
        eyebrow: "Herkunft",
        label: "Woher kommst du?",
        answer:
          "Ich werde weltweit gewonnen, besonders in China, Russland, Australien, Kanada und Ghana. Oft stecke ich nur in winzigen Mengen im Gestein, deshalb müssen große Mengen Erz bewegt und verarbeitet werden, um mich zu gewinnen. Ein kleiner Teil von mir fällt auch als Nebenprodukt beim Kupferabbau an.",
        unlocks: ["q2", "q4"],
      },
      q2: {
        id: "q2",
        eyebrow: "Abbau",
        label: "Wie wirst du gewonnen?",
        answer:
          "In großen Minen wird goldhaltiges Gestein abgebaut, zerkleinert und industriell verarbeitet. Im handwerklichen Kleinbergbau wird in manchen Regionen noch Quecksilber eingesetzt, um Gold aus Sedimenten oder Gestein zu lösen. Das ist besonders problematisch, weil Quecksilber ein giftiges Schwermetall ist.",
        unlocks: ["q5"],
      },
      q3: {
        id: "q3",
        eyebrow: "Smartphone",
        label: "Wo steckst du im Handy?",
        answer:
          "Ich stecke auf winzigen Kontaktflächen von Chips, Platinen, Steckern und der SIM-Karte. Dort schütze ich elektrische Verbindungen vor Korrosion und sorge dafür, dass Signale zuverlässig übertragen werden. In einem einzelnen Handy ist nur sehr wenig von mir enthalten, aber bei Milliarden Geräten wird daraus eine große Nachfrage.",
        unlocks: ["q6"],
      },
      q4: {
        id: "q4",
        eyebrow: "Umwelt",
        label: "Ökologische Folgen?",
        answer:
          "Der Goldabbau kann große Flächen verändern und benötigt viel Energie und Wasser. Besonders gefährlich ist Quecksilber im handwerklichen Bergbau: Es kann in Gewässer gelangen, sich in Fischen anreichern und so ganze Ökosysteme belasten.",
        unlocks: [],
      },
      q5: {
        id: "q5",
        eyebrow: "Menschen",
        label: "Folgen für Menschen?",
        answer:
          "Quecksilber kann Nerven, Nieren und die Entwicklung ungeborener Kinder schädigen. In manchen Regionen arbeiten Menschen außerdem unter unsicheren Bedingungen im Kleinbergbau. Deshalb sind sichere Verfahren, Schutzkleidung und faire Lieferketten besonders wichtig.",
        unlocks: [],
      },
      q6: {
        id: "q6",
        eyebrow: "Danach",
        label: "Was passiert nach dem Handy?",
        answer:
          "Wenn ein altes Handy in der Schublade bleibt, bleibe ich ungenutzt auf seinen Kontaktflächen zurück. Ich kann aus Elektronikschrott zurückgewonnen werden und verliere dabei kaum an Wert. Deshalb ist fachgerechtes Recycling besser, als für neues Gold wieder mehr Gestein abzubauen.",
        unlocks: [],
      },
    },
  },

  kobaltin: {
    introStatement:
      "Ich bin Kobaltin. In vielen Akkus helfe ich dabei, Energie auf kleinem Raum zu speichern. Stell deine Fragen, ich rede Klartext.",
    initialQuestionIds: ["q1", "q3"],
    questions: {
      q1: {
        id: "q1",
        eyebrow: "Herkunft",
        label: "Woher kommst du?",
        answer:
          "Der größte Teil des weltweit abgebauten Kobalts kommt aus der Demokratischen Republik Kongo. Danach folgt Indonesien mit deutlich kleinerem Anteil. Ich komme häufig zusammen mit Kupfer- oder Nickelerzen vor und werde deshalb oft als Nebenprodukt gewonnen.",
        unlocks: ["q2", "q4"],
      },
      q2: {
        id: "q2",
        eyebrow: "Abbau",
        label: "Wie wirst du gewonnen?",
        answer:
          "Ein Teil von mir stammt aus großen industriellen Minen. Im handwerklichen Bergbau graben Menschen in manchen Regionen jedoch in engen Schächten und oft ohne ausreichende Schutzkleidung nach kobalthaltigem Gestein. Danach werde ich aus den Erzen chemisch weiterverarbeitet.",
        unlocks: ["q5"],
      },
      q3: {
        id: "q3",
        eyebrow: "Smartphone",
        label: "Wo steckst du im Handy?",
        answer:
          "Ich komme in vielen Lithium-Ionen-Akkus vor, genauer in bestimmten Kathodenmaterialien. Dort kann ich dazu beitragen, dass Batterien Energie dicht speichern und stabil arbeiten. Nicht jeder Akku enthält gleich viel von mir, weil es unterschiedliche Akkuchemien gibt.",
        unlocks: ["q6"],
      },
      q4: {
        id: "q4",
        eyebrow: "Umwelt",
        label: "Ökologische Folgen?",
        answer:
          "Beim Bergbau und bei der Verarbeitung können Staub, Abraum und belastete Rückstände entstehen. Wenn diese nicht sicher behandelt werden, können Böden und Gewässer belastet werden. Gute Umweltstandards sind deshalb entscheidend.",
        unlocks: [],
      },
      q5: {
        id: "q5",
        eyebrow: "Menschen",
        label: "Folgen für Menschen?",
        answer:
          "Amnesty International dokumentierte im handwerklichen Kobaltabbau in der Demokratischen Republik Kongo gefährliche Arbeitsbedingungen, Unfälle, fehlende Schutzausrüstung und Kinderarbeit. Das betrifft nicht jede Mine, zeigt aber, warum Unternehmen ihre Lieferketten sorgfältig prüfen müssen.",
        unlocks: [],
      },
      q6: {
        id: "q6",
        eyebrow: "Danach",
        label: "Was passiert nach dem Handy?",
        answer:
          "Bleibt ein altes Handy ungenutzt liegen, bleibe ich im Akku verborgen. Werden Akkus fachgerecht gesammelt, kann ich mit modernen Verfahren zurückgewonnen werden. Recycling kann deshalb den Bedarf an neuem Kobaltabbau verringern.",
        unlocks: [],
      },
    },
  },

  lithium: {
    introStatement:
      "Ich bin Lithium. Ich mache deinen Akku leicht und leistungsfähig, aber meine Gewinnung braucht viel Aufmerksamkeit. Frag mich.",
    initialQuestionIds: ["q1", "q3"],
    questions: {
      q1: {
        id: "q1",
        eyebrow: "Herkunft",
        label: "Woher kommst du?",
        answer:
          "Ich komme aus Salzlaken und Hartgestein. Wichtige Förderländer sind Australien, China, Chile und Argentinien. Das sogenannte Lithium-Dreieck umfasst Chile, Argentinien und Bolivien und ist besonders für große Salzseen und Solelagerstätten bekannt.",
        unlocks: ["q2", "q4"],
      },
      q2: {
        id: "q2",
        eyebrow: "Abbau",
        label: "Wie wirst du gewonnen?",
        answer:
          "In Australien werde ich meist aus Hartgestein, vor allem Spodumen, gewonnen. In Teilen von Chile und Argentinien wird lithiumhaltige Sole aus dem Untergrund gefördert und anschließend in Verdunstungsbecken oder mit neueren Direkt-Extraktionsverfahren verarbeitet.",
        unlocks: ["q5"],
      },
      q3: {
        id: "q3",
        eyebrow: "Smartphone",
        label: "Wo steckst du im Handy?",
        answer:
          "Ich stecke im Akku, genauer in der Lithium-Ionen-Batterie. Dort helfe ich dabei, Energie zu speichern und beim Benutzen des Handys wieder abzugeben. Ohne mich wären viele heutige Akkus schwerer und hätten weniger Energiedichte.",
        unlocks: ["q6"],
      },
      q4: {
        id: "q4",
        eyebrow: "Umwelt",
        label: "Ökologische Folgen?",
        answer:
          "In trockenen Salzsee-Regionen kann meine Förderung den empfindlichen Wasserhaushalt verändern. Das ist besonders kritisch, weil Wasser dort ohnehin knapp ist. Deshalb müssen Wasserverbrauch, Messdaten und Auswirkungen auf die Landschaft transparent kontrolliert werden.",
        unlocks: [],
      },
      q5: {
        id: "q5",
        eyebrow: "Menschen",
        label: "Folgen für Menschen?",
        answer:
          "Wenn Bergbau Wasserquellen, Landwirtschaft oder Weideflächen beeinträchtigt, kann es zu Konflikten mit lokalen und indigenen Gemeinschaften kommen. Wichtig sind deshalb Mitsprache, faire Vereinbarungen und verlässliche Informationen darüber, wie sich die Förderung auf Wasser auswirkt.",
        unlocks: [],
      },
      q6: {
        id: "q6",
        eyebrow: "Danach",
        label: "Was passiert nach dem Handy?",
        answer:
          "Wenn dein altes Handy in der Schublade liegt, bleibe ich ungenutzt im Akku zurück. Fachgerechte Sammel- und Recyclingverfahren können mich zurückgewinnen, aber dafür müssen alte Geräte zuerst abgegeben werden. Ein Akku gehört niemals in den Restmüll.",
        unlocks: [],
      },
    },
  },

  indium: {
    introStatement:
      "Ich bin Indium. Du siehst mich nicht, aber ohne meine transparente Leitfähigkeit würde dein Touchscreen anders funktionieren.",
    initialQuestionIds: ["q1", "q3"],
    questions: {
      q1: {
        id: "q1",
        eyebrow: "Herkunft",
        label: "Woher kommst du?",
        answer:
          "Ich werde meistens als Nebenprodukt aus Zinkerzen gewonnen. China ist der wichtigste Produzent, weitere Mengen werden unter anderem in Südkorea, Japan, Kanada und anderen Ländern verarbeitet. Weil ich nicht in eigenen großen Indium-Minen gefördert werde, hängt meine Verfügbarkeit stark vom Zinkbergbau ab.",
        unlocks: ["q2", "q4"],
      },
      q2: {
        id: "q2",
        eyebrow: "Abbau",
        label: "Wie wirst du gewonnen?",
        answer:
          "Ich falle bei der Verarbeitung von Zinksulfid-Erzen an. Aus Zwischenprodukten der Zinkraffination werde ich chemisch abgetrennt und weiter gereinigt. Ich werde also meistens nicht wegen mir allein abgebaut.",
        unlocks: ["q5"],
      },
      q3: {
        id: "q3",
        eyebrow: "Smartphone",
        label: "Wo steckst du im Handy?",
        answer:
          "Ich bilde zusammen mit Zinn eine transparente und elektrisch leitfähige Schicht im Display. Diese Schicht heißt Indiumzinnoxid, kurz ITO. Sie hilft dabei, dass ein Bildschirm Berührungen erkennen kann, obwohl man durch sie hindurchsehen kann.",
        unlocks: ["q6"],
      },
      q4: {
        id: "q4",
        eyebrow: "Umwelt",
        label: "Ökologische Folgen?",
        answer:
          "Meine Umweltfolgen hängen vor allem mit dem Zinkbergbau zusammen. Dort können Abraum, Staub und belastete Rückstände entstehen, wenn sie nicht sicher behandelt werden. Weil ich nur als Nebenprodukt anfalle, lassen sich meine Folgen nicht immer getrennt vom Zinkabbau betrachten.",
        unlocks: [],
      },
      q5: {
        id: "q5",
        eyebrow: "Menschen",
        label: "Folgen für Menschen?",
        answer:
          "Wenn Umwelt- und Arbeitsschutz im Zinkbergbau schwach sind, können Beschäftigte und Anwohner durch Staub oder belastete Rückstände gefährdet werden. Gleichzeitig macht die starke Konzentration der Produktion viele Unternehmen von wenigen Lieferländern abhängig.",
        unlocks: [],
      },
      q6: {
        id: "q6",
        eyebrow: "Danach",
        label: "Was passiert nach dem Handy?",
        answer:
          "Nach dem Handy bleibe ich als hauchdünne Schicht im Display zurück. Aus Produktionsresten werde ich bereits zurückgewonnen, aus alten Handys aber bisher nur begrenzt. Deshalb gehen viele meiner kleinen Mengen verloren, wenn Geräte nicht gezielt recycelt werden.",
        unlocks: [],
      },
    },
  },

  gallium: {
    introStatement:
      "Ich bin Gallium. Ich bin selten sichtbar, aber für moderne Elektronik und Lichttechnik ziemlich wichtig.",
    initialQuestionIds: ["q1", "q3"],
    questions: {
      q1: {
        id: "q1",
        eyebrow: "Herkunft",
        label: "Woher kommst du?",
        answer:
          "Ich werde überwiegend als Nebenprodukt bei der Verarbeitung von Bauxit und Zinkerzen gewonnen. China produziert fast das gesamte weltweit gewonnene Primärgallium. Deshalb kann sich eine Entscheidung in einem einzigen Land schnell auf die globale Elektronikbranche auswirken.",
        unlocks: ["q2", "q4"],
      },
      q2: {
        id: "q2",
        eyebrow: "Abbau",
        label: "Wie wirst du gewonnen?",
        answer:
          "Ich werde nicht in einer eigenen Gallium-Mine gefördert. Stattdessen werde ich aus Prozesslösungen der Aluminium- oder Zinkverarbeitung abgetrennt. Meine Produktion hängt deshalb davon ab, wie viel Bauxit und Zinkerz gerade verarbeitet werden.",
        unlocks: ["q5"],
      },
      q3: {
        id: "q3",
        eyebrow: "Smartphone",
        label: "Wo steckst du im Handy?",
        answer:
          "In eurem Modell bin ich dem Display zugeordnet. In echten Smartphones kann ich je nach Modell in LED-Technik, im Kamerablitz oder in speziellen Funkchips vorkommen. Besonders Galliumarsenid und Galliumnitrid sind für Hochfrequenztechnik und optoelektronische Bauteile wichtig.",
        unlocks: ["q6"],
      },
      q4: {
        id: "q4",
        eyebrow: "Umwelt",
        label: "Ökologische Folgen?",
        answer:
          "Meine Umweltfolgen hängen vor allem mit der Bauxit-, Aluminium- und Zinkverarbeitung zusammen. Beim Bauxitabbau können Landschaften verändert werden, und bei der Aluminiumoxid-Produktion können stark alkalische Rückstände entstehen. Ich selbst komme dabei nur in kleinen Mengen mit heraus.",
        unlocks: [],
      },
      q5: {
        id: "q5",
        eyebrow: "Menschen",
        label: "Folgen für Menschen?",
        answer:
          "Meine größte menschliche und wirtschaftliche Herausforderung ist die starke Lieferabhängigkeit. Wenn Exporte eingeschränkt werden oder es politische Konflikte gibt, kann das die Herstellung von Funktechnik, LEDs und Elektronik weltweit beeinflussen.",
        unlocks: [],
      },
      q6: {
        id: "q6",
        eyebrow: "Danach",
        label: "Was passiert nach dem Handy?",
        answer:
          "Nach dem Handy bleibe ich in kleinen elektronischen Bauteilen zurück. Aus Produktionsresten kann Gallium zurückgewonnen werden, aus alten Geräten findet bisher jedoch kaum gezieltes Recycling statt. Dadurch bleibt viel von mir im Elektroschrott verborgen.",
        unlocks: [],
      },
    },
  },

  silizium: {
    introStatement:
      "Ich bin Silizium. Ohne mich gäbe es keine modernen Chips – und damit auch kein Smartphone, wie du es kennst.",
    initialQuestionIds: ["q1", "q3"],
    questions: {
      q1: {
        id: "q1",
        eyebrow: "Herkunft",
        label: "Woher kommst du?",
        answer:
          "Ich beginne als Quarz beziehungsweise Siliciumdioxid in Gestein und Sand. Für die Elektronik werde ich aber extrem stark gereinigt, bis daraus hochreines Halbleitermaterial entsteht. Ich bin in der Erdkruste häufig, doch Chipqualität zu erzeugen ist sehr aufwendig.",
        unlocks: ["q2", "q4"],
      },
      q2: {
        id: "q2",
        eyebrow: "Abbau",
        label: "Wie wirst du gewonnen?",
        answer:
          "Quarz wird bei sehr hohen Temperaturen zu Silizium verarbeitet. Danach wird das Material in mehreren Schritten gereinigt und zu dünnen Wafern verarbeitet. Auf diese Wafer werden später die winzigen Strukturen von Chips aufgebracht.",
        unlocks: ["q5"],
      },
      q3: {
        id: "q3",
        eyebrow: "Smartphone",
        label: "Wo steckst du im Handy?",
        answer:
          "Ich bin der Grundstoff für fast alle Chips im Smartphone: Prozessor, Speicher, Funktechnik und Kamerasensor. In eurem Modell bin ich der Kamera zugeordnet, weil der Bildsensor auf Silizium basiert und Licht in digitale Bilddaten verwandelt.",
        unlocks: ["q6"],
      },
      q4: {
        id: "q4",
        eyebrow: "Umwelt",
        label: "Ökologische Folgen?",
        answer:
          "Die Herstellung von hochreinem Silizium und Chips benötigt viel Energie. Wie groß die Klimabelastung ist, hängt deshalb stark davon ab, ob dafür Strom aus Kohle, Gas oder erneuerbaren Quellen eingesetzt wird.",
        unlocks: [],
      },
      q5: {
        id: "q5",
        eyebrow: "Menschen",
        label: "Folgen für Menschen?",
        answer:
          "Quarz ist nicht selten, aber moderne Chipfertigung ist auf wenige Regionen und Unternehmen konzentriert. Störungen in wichtigen Produktionsstandorten können deshalb weltweit Lieferprobleme verursachen – das hat man bei den Chipengpässen der vergangenen Jahre deutlich gesehen.",
        unlocks: [],
      },
      q6: {
        id: "q6",
        eyebrow: "Danach",
        label: "Was passiert nach dem Handy?",
        answer:
          "In alten Handys bleibe ich in Chips und Sensoren zurück. Weil diese Bauteile winzig und komplex sind, werde ich meist nicht wieder zu neuem hochreinem Chip-Silizium verarbeitet. Deshalb ist die längere Nutzung eines funktionierenden Smartphones besonders sinnvoll.",
        unlocks: [],
      },
    },
  },

  zinn: {
    introStatement:
      "Ich bin Zinn. Ich halte winzige Bauteile zusammen, damit dein Smartphone überhaupt funktioniert.",
    initialQuestionIds: ["q1", "q3"],
    questions: {
      q1: {
        id: "q1",
        eyebrow: "Herkunft",
        label: "Woher kommst du?",
        answer:
          "Ich werde meist aus dem Mineral Kassiterit gewonnen. Wichtige Förderländer sind China, Indonesien, Peru, Brasilien und die Demokratische Republik Kongo. Meine Lieferketten können sehr unterschiedlich aussehen: von großen Minen bis zu kleinem, handwerklichem Abbau.",
        unlocks: ["q2", "q4"],
      },
      q2: {
        id: "q2",
        eyebrow: "Abbau",
        label: "Wie wirst du gewonnen?",
        answer:
          "Je nach Lagerstätte werde ich im Tagebau, Untertagebau oder durch das Auswaschen von Schwemmsedimenten gewonnen. Danach wird Kassiterit-Erz aufbereitet und das Metall durch Schmelzprozesse gewonnen. Besonders beim Abbau in Fluss- und Küstenregionen müssen Böden und Gewässer geschützt werden.",
        unlocks: ["q5"],
      },
      q3: {
        id: "q3",
        eyebrow: "Smartphone",
        label: "Wo steckst du im Handy?",
        answer:
          "Ich verbinde elektronische Bauteile durch Lötstellen miteinander. In eurem Modell bin ich der Kamera zugeordnet, tatsächlich komme ich aber in Lötstellen vieler Smartphone-Bauteile vor. Ohne diese winzigen Verbindungen würden Chips, Sensoren und Platinen nicht zuverlässig zusammenarbeiten.",
        unlocks: ["q6"],
      },
      q4: {
        id: "q4",
        eyebrow: "Umwelt",
        label: "Ökologische Folgen?",
        answer:
          "Besonders der Abbau aus Schwemmsedimenten kann Böden aufwühlen und Flüsse mit Sedimenten belasten. Auch Rückstände aus dem Bergbau müssen sicher gelagert werden, damit sie nicht in Böden oder Gewässer gelangen.",
        unlocks: [],
      },
      q5: {
        id: "q5",
        eyebrow: "Menschen",
        label: "Folgen für Menschen?",
        answer:
          "Ich gehöre zusammen mit Gold, Tantal und Wolfram zu den sogenannten Konfliktmineralien. Das bedeutet nicht, dass jedes Zinn problematisch ist. Aber Lieferketten aus Konflikt- und Hochrisikogebieten brauchen besondere Kontrollen, damit Menschenrechte und sichere Arbeit geschützt werden.",
        unlocks: [],
      },
      q6: {
        id: "q6",
        eyebrow: "Danach",
        label: "Was passiert nach dem Handy?",
        answer:
          "Ich bleibe in Lötstellen auf Platinen und Modulen zurück. Ich kann recycelt werden, aber nur wenn alte Geräte gesammelt, zerlegt und fachgerecht behandelt werden. Bleibt das Handy in der Schublade, bleibe auch ich dort gebunden.",
        unlocks: [],
      },
    },
  },

  neodym: {
    introStatement:
      "Ich bin Neodym. Meine Magnete sind klein, aber stark genug, damit dein Smartphone klingt und vibriert.",
    initialQuestionIds: ["q1", "q3"],
    questions: {
      q1: {
        id: "q1",
        eyebrow: "Herkunft",
        label: "Woher kommst du?",
        answer:
          "Ich gehöre zu den Seltenen Erden und werde gemeinsam mit anderen Seltenen Erden gefördert. China ist besonders wichtig für Förderung und Verarbeitung, es gibt aber auch Produktion in anderen Ländern. Weltweit werden Seltene Erden vor allem für starke Magnete gebraucht.",
        unlocks: ["q2", "q4"],
      },
      q2: {
        id: "q2",
        eyebrow: "Abbau",
        label: "Wie wirst du gewonnen?",
        answer:
          "Ich werde nicht allein abgebaut, sondern aus Mineralgemischen zusammen mit anderen Seltenen Erden gewonnen. Danach müssen die einzelnen Elemente mit aufwendigen chemischen Verfahren voneinander getrennt werden. Diese Verarbeitung ist technisch anspruchsvoll und erzeugt viele Rückstände.",
        unlocks: ["q5"],
      },
      q3: {
        id: "q3",
        eyebrow: "Smartphone",
        label: "Wo steckst du im Handy?",
        answer:
          "Ich stecke in starken Permanentmagneten. Diese Magnete befinden sich zum Beispiel im Lautsprecher, im Vibrationsmotor und teilweise in weiteren kleinen Antrieben. Ich mache es möglich, dass Magnete klein bleiben und trotzdem sehr kräftig sind.",
        unlocks: ["q6"],
      },
      q4: {
        id: "q4",
        eyebrow: "Umwelt",
        label: "Ökologische Folgen?",
        answer:
          "Einige Seltene-Erden-Erze enthalten auch Thorium. Bei der Verarbeitung können deshalb belastete oder radioaktive Rückstände entstehen, die sorgfältig überwacht und sicher gelagert werden müssen. Das gilt nicht für jede Lagerstätte gleich stark.",
        unlocks: [],
      },
      q5: {
        id: "q5",
        eyebrow: "Menschen",
        label: "Folgen für Menschen?",
        answer:
          "Menschen in der Nähe von Minen und Aufbereitungsanlagen können betroffen sein, wenn Staub, belastetes Wasser oder Rückstände nicht sicher kontrolliert werden. Das Risiko steigt besonders bei schwachen Umwelt- und Sicherheitsstandards.",
        unlocks: [],
      },
      q6: {
        id: "q6",
        eyebrow: "Danach",
        label: "Was passiert nach dem Handy?",
        answer:
          "Nach dem Handy bleibe ich in winzigen Magneten zurück. Seltene Erden werden aus Elektroschrott bisher nur in begrenzten Mengen zurückgewonnen. Deshalb ist es wichtig, alte Geräte nicht ungenutzt liegen zu lassen, sondern fachgerecht abzugeben.",
        unlocks: [],
      },
    },
  },

  dysprosium: {
    introStatement:
      "Ich bin Dysprosium. Ich komme nur in kleinen Mengen vor, aber ich helfe Magneten dabei, auch bei Wärme stabil zu bleiben.",
    initialQuestionIds: ["q1", "q3"],
    questions: {
      q1: {
        id: "q1",
        eyebrow: "Herkunft",
        label: "Woher kommst du?",
        answer:
          "Ich bin ebenfalls eine Seltene Erde und komme gemeinsam mit anderen Seltenen Erden vor. Meine Lieferkette ist besonders stark auf wenige Förder- und Verarbeitungsregionen konzentriert, vor allem auf China. Gerade weil ich so spezialisiert bin, kann eine Unterbrechung schnell Folgen haben.",
        unlocks: ["q2", "q4"],
      },
      q2: {
        id: "q2",
        eyebrow: "Abbau",
        label: "Wie wirst du gewonnen?",
        answer:
          "Ich werde aus einem Gemisch Seltener Erden chemisch abgetrennt. Das ist aufwendig, weil ich vielen anderen Seltenen Erden chemisch ähnlich bin. Daher braucht meine Gewinnung mehrere Schritte der Aufbereitung und Trennung.",
        unlocks: ["q5"],
      },
      q3: {
        id: "q3",
        eyebrow: "Smartphone",
        label: "Wo steckst du im Handy?",
        answer:
          "Ich kann Neodym-Magneten in kleinen Mengen beigemischt werden. Dadurch bleiben diese Magnete auch bei Wärme stabil und funktionieren zuverlässig. In eurem Modell bin ich deshalb dem Lautsprecher zugeordnet.",
        unlocks: ["q6"],
      },
      q4: {
        id: "q4",
        eyebrow: "Umwelt",
        label: "Ökologische Folgen?",
        answer:
          "Wie bei Neodym können bei bestimmten Seltene-Erden-Erzen belastete oder radioaktive Begleitstoffe anfallen. Gute Abfallbehandlung ist deshalb besonders wichtig. Nicht jede Mine verursacht die gleichen Folgen, aber die Risiken müssen ernst genommen werden.",
        unlocks: [],
      },
      q5: {
        id: "q5",
        eyebrow: "Menschen",
        label: "Folgen für Menschen?",
        answer:
          "Meine Versorgung ist stark konzentriert. Exportbeschränkungen oder politische Konflikte können deshalb weltweit die Produktion von Magneten und Elektronik beeinflussen. 2025 unterlag ich zeitweise chinesischen Exportkontrollen.",
        unlocks: [],
      },
      q6: {
        id: "q6",
        eyebrow: "Danach",
        label: "Was passiert nach dem Handy?",
        answer:
          "Ich bleibe zusammen mit Neodym in alten Magneten zurück. Weil ich nur in sehr kleinen Mengen vorkomme, ist meine Rückgewinnung aus Elektroschrott schwierig. Umso wichtiger ist es, dass alte Geräte überhaupt in den Recyclingkreislauf gelangen.",
        unlocks: [],
      },
    },
  },

  aluminium: {
    introStatement:
      "Ich bin Aluminium. Ich mache viele Smartphones leicht und stabil – aber meine Herstellung braucht sehr viel Energie.",
    initialQuestionIds: ["q1", "q3"],
    questions: {
      q1: {
        id: "q1",
        eyebrow: "Herkunft",
        label: "Woher kommst du?",
        answer:
          "Ich werde aus Bauxit gewonnen. Bauxit wird meist im Tagebau abgebaut und anschließend zu Aluminiumoxid und danach zu Aluminium verarbeitet. Für die letzte Stufe wird besonders viel Strom benötigt.",
        unlocks: ["q2", "q4"],
      },
      q2: {
        id: "q2",
        eyebrow: "Abbau",
        label: "Wie wirst du gewonnen?",
        answer:
          "Zuerst wird Bauxit abgebaut und mit Natronlauge zu Aluminiumoxid verarbeitet. Danach wird Aluminiumoxid durch Elektrolyse in Aluminium umgewandelt. Dieser Prozess ist sehr energieintensiv, weshalb der Strommix eine große Rolle spielt.",
        unlocks: ["q5"],
      },
      q3: {
        id: "q3",
        eyebrow: "Smartphone",
        label: "Wo steckst du im Handy?",
        answer:
          "In eurem Modell stecke ich im Gehäuse und Rahmen. Ich mache viele Smartphones leicht, stabil und hochwertig. Je nach Modell kann ich außerdem in weiteren Bauteilen und Abschirmungen vorkommen.",
        unlocks: ["q6"],
      },
      q4: {
        id: "q4",
        eyebrow: "Umwelt",
        label: "Ökologische Folgen?",
        answer:
          "Für Bauxitminen können Wälder und Böden großflächig verändert werden. Bei der Verarbeitung entsteht außerdem Bauxitrückstand, auch Rotschlamm genannt, der sicher gelagert werden muss. Ohne gute Planung können Böden und Gewässer belastet werden.",
        unlocks: [],
      },
      q5: {
        id: "q5",
        eyebrow: "Menschen",
        label: "Folgen für Menschen?",
        answer:
          "Wenn Minen Land, Wasser oder Wälder verändern, kann das Landwirtschaft und lokale Lebensgrundlagen beeinträchtigen. Faire Entschädigung, Beteiligung der Bevölkerung und Renaturierung nach dem Abbau sind deshalb wichtige Themen.",
        unlocks: [],
      },
      q6: {
        id: "q6",
        eyebrow: "Danach",
        label: "Was passiert nach dem Handy?",
        answer:
          "Ich kann sehr gut eingeschmolzen und wiederverwendet werden. Recycling-Aluminium benötigt deutlich weniger Energie als neues Aluminium aus Bauxit. Das funktioniert aber nur, wenn alte Handys gesammelt und fachgerecht recycelt werden.",
        unlocks: [],
      },
    },
  },

  nickel: {
    introStatement:
      "Ich bin Nickel. Ich kann Metall härter machen und spiele auch in manchen modernen Akkuchemien eine wichtige Rolle.",
    initialQuestionIds: ["q1", "q3"],
    questions: {
      q1: {
        id: "q1",
        eyebrow: "Herkunft",
        label: "Woher kommst du?",
        answer:
          "Ich werde vor allem aus Laterit- und Sulfiderzen gewonnen. Indonesien ist heute mit großem Abstand der wichtigste Förderstaat für Nickel. Weitere Mengen kommen unter anderem aus den Philippinen, Russland, Kanada und Australien.",
        unlocks: ["q2", "q4"],
      },
      q2: {
        id: "q2",
        eyebrow: "Abbau",
        label: "Wie wirst du gewonnen?",
        answer:
          "Lateriterze werden häufig im Tagebau abgebaut und danach geschmolzen oder chemisch ausgelaugt. Sulfiderze werden anders verarbeitet und können zusammen mit Kupfer oder Kobalt vorkommen. Beide Wege brauchen viel Energie und sorgfältige Kontrolle der Rückstände.",
        unlocks: ["q5"],
      },
      q3: {
        id: "q3",
        eyebrow: "Smartphone",
        label: "Wo steckst du im Handy?",
        answer:
          "In eurem Modell bin ich dem Gehäuse zugeordnet, weil ich in Legierungen und Beschichtungen vorkommen kann. In modernen Smartphones bin ich aber auch für bestimmte Akkuchemien wichtig. Deshalb kann ich je nach Modell an mehreren Stellen auftauchen.",
        unlocks: ["q6"],
      },
      q4: {
        id: "q4",
        eyebrow: "Umwelt",
        label: "Ökologische Folgen?",
        answer:
          "Nickelabbau und Raffination benötigen oft viel Energie. Bei unzureichendem Schutz können Abraum, Sedimente oder belastete Abwässer Böden, Flüsse oder Küstengewässer beeinträchtigen. Besonders in tropischen Regionen sind gute Umweltauflagen wichtig.",
        unlocks: [],
      },
      q5: {
        id: "q5",
        eyebrow: "Menschen",
        label: "Folgen für Menschen?",
        answer:
          "Wenn Gewässer oder Fischgründe belastet werden, trifft das Menschen, die von Landwirtschaft oder Fischerei leben. Auch sichere Arbeitsbedingungen und die Beteiligung lokaler Gemeinschaften sind wichtige Themen, wenn neue Minen und Raffinerien entstehen.",
        unlocks: [],
      },
      q6: {
        id: "q6",
        eyebrow: "Danach",
        label: "Was passiert nach dem Handy?",
        answer:
          "Ich kann aus Akkus, Legierungen und Elektronikschrott zurückgewonnen werden. Wenn Handys nicht gesammelt werden, bleibe ich jedoch ungenutzt in alten Geräten. Recycling ist besonders sinnvoll, weil Nickel auch aus Schrott wieder in den Kreislauf zurückkehren kann.",
        unlocks: [],
      },
    },
  },

  kupfer: {
    introStatement:
      "Ich bin Kupfer. Ich leite Strom durch dein Smartphone und verbinde viele seiner Bauteile miteinander.",
    initialQuestionIds: ["q1", "q3"],
    questions: {
      q1: {
        id: "q1",
        eyebrow: "Herkunft",
        label: "Woher kommst du?",
        answer:
          "Ich werde weltweit gefördert. Chile ist derzeit der größte Produzent, gefolgt von der Demokratischen Republik Kongo und Peru. Die große Kupfermine Escondida liegt in Chile, nicht in Peru.",
        unlocks: ["q2", "q4"],
      },
      q2: {
        id: "q2",
        eyebrow: "Abbau",
        label: "Wie wirst du gewonnen?",
        answer:
          "Ich werde aus Kupfererz gewonnen, häufig in großen Tagebauen, manchmal aber auch unter Tage. Das Erz wird zerkleinert, aufbereitet und anschließend geschmolzen oder durch Laugung verarbeitet. Je niedriger der Kupfergehalt im Gestein ist, desto mehr Material muss bewegt werden.",
        unlocks: ["q5"],
      },
      q3: {
        id: "q3",
        eyebrow: "Smartphone",
        label: "Wo steckst du im Handy?",
        answer:
          "Ich bilde Leitbahnen auf Platinen, feine Drähte und elektrische Verbindungen. Von allen Metallen steckt von mir besonders viel in einem Smartphone, weil ich Strom sehr gut leite. Ich verbinde dadurch viele Bauteile miteinander.",
        unlocks: ["q6"],
      },
      q4: {
        id: "q4",
        eyebrow: "Umwelt",
        label: "Ökologische Folgen?",
        answer:
          "Bei sulfidischen Kupfererzen kann saure Grubenentwässerung entstehen. Diese kann Schwermetalle aus dem Gestein lösen und Grundwasser, Flüsse oder Böden belasten. Deshalb müssen Minenabwässer langfristig kontrolliert werden.",
        unlocks: [],
      },
      q5: {
        id: "q5",
        eyebrow: "Menschen",
        label: "Folgen für Menschen?",
        answer:
          "In Bergbauregionen entstehen häufig Konflikte, wenn Minen viel Wasser benötigen oder Trinkwasserquellen gefährden. Gute Kontrolle, transparente Umweltprüfungen und Mitsprache der Bevölkerung sind deshalb entscheidend.",
        unlocks: [],
      },
      q6: {
        id: "q6",
        eyebrow: "Danach",
        label: "Was passiert nach dem Handy?",
        answer:
          "Ich bin wertvoll und kann gut recycelt werden. Wenn ein Handy richtig gesammelt wird, kann ich aus Elektronikschrott zurückgewonnen und erneut eingesetzt werden. Bleibt es in der Schublade, bleibe ich für den Kreislauf verloren.",
        unlocks: [],
      },
    },
  },
};

function getDialog(personaId) {
  return DIALOG_FLOWS[personaId] ?? {
    introStatement: "",
    initialQuestionIds: [],
    questions: {},
  };
}

export function getPersonaIntro(personaId) {
  return getDialog(personaId).introStatement;
}

export function getInitialQuestions(personaId) {
  const dialog = getDialog(personaId);

  return dialog.initialQuestionIds
    .map((questionId) => dialog.questions[questionId])
    .filter(Boolean);
}

export function getQuestionById(personaId, questionId) {
  return getDialog(personaId).questions[questionId] ?? null;
}

export function getVisibleQuestions(personaId, visibleQuestionIds) {
  const dialog = getDialog(personaId);

  return visibleQuestionIds
    .map((questionId) => dialog.questions[questionId])
    .filter(Boolean);
}

export function getResponseForQuestion(personaId, questionId) {
  const question = getQuestionById(personaId, questionId);

  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        answer: question?.answer ?? "Dazu habe ich gerade keine Antwort.",
        unlocks: question?.unlocks ?? [],
      });
    }, 720);
  });
}