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
    id: "lithia",
    name: "Lithia",
    element: "Li · 3",
    role: "Lithium-Ionen-Akku",
    tagline: "Die Energie im Akku",
    portrait: "Li",
    color: "#b85cff",
    colorLight: "#dda8ff",
    glow: "rgba(184, 92, 255, 0.58)",
    ink: "#25003d",
    bg: "#100018",
    mood: "energiegeladen, neugierig, direkt",
  },
  {
    id: "indira",
    name: "Indira",
    element: "In · 49",
    role: "Touchscreen, Display",
    tagline: "Die Berührung im Display",
    portrait: "In",
    color: "#2db7a3",
    colorLight: "#8af2df",
    glow: "rgba(45, 183, 163, 0.58)",
    ink: "#003d36",
    bg: "#021614",
    mood: "präzise, ruhig, aufmerksam",
  },
  {
    id: "gallia",
    name: "Gallia",
    element: "Ga · 31",
    role: "Chips, LEDs, Optik",
    tagline: "Das Licht in der Elektronik",
    portrait: "Ga",
    color: "#ff6f61",
    colorLight: "#ffb1a8",
    glow: "rgba(255, 111, 97, 0.58)",
    ink: "#4a0d08",
    bg: "#1a0504",
    mood: "hell, clever, schnell",
  },
  {
    id: "silico",
    name: "Silico",
    element: "Si · 14",
    role: "Chips, Sensoren, Prozessor",
    tagline: "Das Gehirn im Smartphone",
    portrait: "Si",
    color: "#58a6ff",
    colorLight: "#a9d1ff",
    glow: "rgba(88, 166, 255, 0.58)",
    ink: "#06284d",
    bg: "#020b18",
    mood: "logisch, konzentriert, sachlich",
  },
  {
    id: "zinnia",
    name: "Zinnia",
    element: "Sn · 50",
    role: "Lötstellen auf Platinen",
    tagline: "Die Verbindung im Inneren",
    portrait: "Sn",
    color: "#9aa5b1",
    colorLight: "#dce3ea",
    glow: "rgba(154, 165, 177, 0.58)",
    ink: "#24303b",
    bg: "#080b10",
    mood: "verbindend, bodenständig, ehrlich",
  },
  {
    id: "neodya",
    name: "Neodya",
    element: "Nd · 60",
    role: "Lautsprecher, Mikrofon, Vibration",
    tagline: "Die starke Kraft im Kleinen",
    portrait: "Nd",
    color: "#e84393",
    colorLight: "#ffadd4",
    glow: "rgba(232, 67, 147, 0.58)",
    ink: "#500026",
    bg: "#18000d",
    mood: "kraftvoll, magnetisch, dramatisch",
  },
  {
    id: "dysra",
    name: "Dysra",
    element: "Dy · 66",
    role: "Hitzefeste Magnete",
    tagline: "Die Ausdauer der Magnete",
    portrait: "Dy",
    color: "#7a5cff",
    colorLight: "#c5b7ff",
    glow: "rgba(122, 92, 255, 0.58)",
    ink: "#21134d",
    bg: "#0b061a",
    mood: "ruhig, widerstandsfähig, ernst",
  },
  {
    id: "alumina",
    name: "Alumina",
    element: "Al · 13",
    role: "Gehäuse, Rahmen, Verbindungen",
    tagline: "Das leichte Schutzschild",
    portrait: "Al",
    color: "#c0c7d1",
    colorLight: "#f2f5f8",
    glow: "rgba(192, 199, 209, 0.58)",
    ink: "#303946",
    bg: "#0a0c10",
    mood: "leicht, robust, klar",
  },
  {
    id: "nickelix",
    name: "Nickelix",
    element: "Ni · 28",
    role: "Akku, Stecker, Kontakte",
    tagline: "Die Widerstandskraft im Akku",
    portrait: "Ni",
    color: "#4ecdc4",
    colorLight: "#a6fff7",
    glow: "rgba(78, 205, 196, 0.58)",
    ink: "#06433f",
    bg: "#021411",
    mood: "hartnäckig, modern, direkt",
  },
  {
    id: "kupfero",
    name: "Kupfero",
    element: "Cu · 29",
    role: "Kabel, Ladebuchse, Leiterbahnen",
    tagline: "Die Strombahn im Smartphone",
    portrait: "Cu",
    color: "#d9772e",
    colorLight: "#ffc18e",
    glow: "rgba(217, 119, 46, 0.58)",
    ink: "#4b1f05",
    bg: "#170803",
    mood: "warm, leitend, offen",
  },
];

const createDialog = (introStatement, answers) => ({
  introStatement,
  initialQuestionIds: ["q1", "q2", "q3", "q4", "q5", "q6"],
  questions: Object.fromEntries(
    answers.map(([eyebrow, label, answer], index) => {
      const id = `q${index + 1}`;

      return [id, { id, eyebrow, label, answer, unlocks: [] }];
    }),
  ),
});

const DIALOG_FLOWS = {
  goldina: createDialog(
    "Ich bin Goldina. In jedem Smartphone glänze ich unsichtbar in Kontakten und Schaltkreisen. Frag mich alles, ich antworte direkt.",
    [
      [
        "Herkunft",
        "Woher kommst du?",
        "Ich komme aus Südafrika, Australien, China, Russland und Ghana. Fast überall gibt es mich, aber nur in winzigen Mengen. Für ein Gramm Gold werden oft mehrere Tonnen Gestein zermahlen.",
      ],
      [
        "Abbau",
        "Wie wirst du abgebaut?",
        "Im Großbergbau werden ganze Berge aufgesprengt. Im Kleinbergbau wird Gold oft mit Quecksilber aus Gestein gelöst. Das Gift kann Flüsse, Böden und die Gesundheit der Menschen dauerhaft belasten.",
      ],
      [
        "Smartphone",
        "Wie steckst du im Handy?",
        "Ich stecke in der SIM-Karte, an Akku-Kontakten und in hauchdünnen Leiterbahnen. Ich leite zuverlässig und roste kaum. Pro Handy sind es weniger als 30 Milligramm, aber bei Milliarden Geräten summiert sich das.",
      ],
      [
        "Umwelt",
        "Ökologische Folgen?",
        "Tagebau zerstört große Naturflächen. Quecksilber und Zyanid können Gewässer und Böden über Jahrzehnte vergiften. Dazu kommen hoher Wasser- und Energieverbrauch.",
      ],
      [
        "Menschen",
        "Folgen für Menschen?",
        "In einigen Förderregionen arbeiten Erwachsene und Kinder ohne ausreichenden Schutz. Quecksilberdämpfe können Nerven, Gehirn und Nieren schädigen.",
      ],
      [
        "Danach",
        "Was passiert nach dem Handy?",
        "Gold ist vollständig recycelbar. Trotzdem landen viele Geräte im Müll oder in Schubladen. In einer Tonne alter Handys steckt oft mehr Gold als in einer Tonne Gold-Erz.",
      ],
    ],
  ),

  kobaltin: createDialog(
    "Ich bin Kobaltin. Ohne mich speichert dein Akku kaum Energie. Stell deine Fragen, ich rede Klartext.",
    [
      [
        "Herkunft",
        "Woher kommst du?",
        "Rund 70 Prozent von mir kommen aus der Demokratischen Republik Kongo, vor allem aus Katanga. Weitere Förderländer sind Russland, Australien, die Philippinen und Kanada.",
      ],
      [
        "Abbau",
        "Wie wirst du abgebaut?",
        "Ein Teil kommt aus großen Minen, viel aber auch aus Kleinbergbau. Menschen arbeiten dort teils in engen Schächten ohne Helm, Belüftung oder ausreichende Schutzausrüstung.",
      ],
      [
        "Smartphone",
        "Wie steckst du im Handy?",
        "Ich stecke in der Kathode vieler Lithium-Ionen-Akkus. Ich helfe dabei, Energie stabil und dicht zu speichern. Deshalb steckt meine Nachfrage nicht nur in Handys, sondern auch in Laptops und Elektroautos.",
      ],
      [
        "Umwelt",
        "Ökologische Folgen?",
        "Beim Bergbau können Säuren und Schwermetalle in Böden und Flüsse gelangen. Felder und Trinkwasser werden dadurch belastet, oft noch lange nach Schließung einer Mine.",
      ],
      [
        "Menschen",
        "Folgen für Menschen?",
        "Kleinbergbau bedeutet für viele Menschen Einsturzrisiken, Staub und Vergiftungen. Organisationen berichten seit Jahren auch über Kinderarbeit in Kobaltminen.",
      ],
      [
        "Danach",
        "Was passiert nach dem Handy?",
        "Kobalt lässt sich aus Akkus technisch gut zurückgewinnen. Viele alte Akkus liegen jedoch ungenutzt herum oder werden falsch entsorgt. Recycling senkt den Druck auf neue Minen.",
      ],
    ],
  ),

  lithia: createDialog(
    "Ich bin Lithia. Ich halte die Energie deines Smartphones fest – aber mein Weg bis in den Akku ist nicht leicht.",
    [
      [
        "Herkunft",
        "Woher kommst du?",
        "Ich komme vor allem aus dem südamerikanischen Lithium-Dreieck: Chile, Argentinien und Bolivien. Weitere wichtige Förderländer sind Australien und China.",
      ],
      [
        "Abbau",
        "Wie wirst du gewonnen?",
        "In Südamerika wird lithiumhaltige Sole aus Salzseen gepumpt und in großen Becken verdunstet, bis Lithiumcarbonat zurückbleibt. In Australien wird Lithium auch aus Hartgesteins-Erzen gewonnen.",
      ],
      [
        "Smartphone",
        "Wie steckst du im Handy?",
        "Ich bin ein zentraler Bestandteil des Lithium-Ionen-Akkus. Dort speichere ich Energie, damit dein Smartphone mobil bleibt.",
      ],
      [
        "Umwelt",
        "Ökologische Folgen?",
        "Meine Gewinnung verbraucht viel Frischwasser. Verdunstungsbecken und Chemikalien können Böden und Grundwasser belasten und Wasserstellen für Flora und Fauna gefährden.",
      ],
      [
        "Menschen",
        "Folgen für Menschen?",
        "Indigene Gemeinschaften berichten von versiegenden oder belasteten Wasserstellen, Problemen für Vieh und Landwirtschaft sowie gesundheitlichen Sorgen.",
      ],
      [
        "Danach",
        "Was passiert nach dem Handy?",
        "Akkus enthalten weiterhin Lithiumreserven und sind technisch weitgehend recycelbar. In der Praxis wird Lithium bisher aber noch viel zu selten zurückgewonnen.",
      ],
    ],
  ),

  indira: createDialog(
    "Ich bin Indira. Ich mache aus einer Glasfläche einen Touchscreen, der deine Berührung versteht.",
    [
      [
        "Herkunft",
        "Woher kommst du?",
        "Ich werde hauptsächlich als Nebenprodukt bei der Zinkraffination gewonnen. China dominiert mit etwa 60 bis 70 Prozent die Weltproduktion; weitere Produzenten sind Südkorea, Japan, Kanada und Peru.",
      ],
      [
        "Abbau",
        "Wie wirst du gewonnen?",
        "Ich falle bei der Aufbereitung von Zink- und Kupferlagerstätten an. Die Metallurgie trennt mich später als Nebenprodukt aus.",
      ],
      [
        "Smartphone",
        "Wie steckst du im Handy?",
        "Als Indiumzinnoxid bilde ich eine hauchdünne leitfähige Schicht auf dem Touchscreen-Glas. Sie sorgt dafür, dass dein Display Berührungen erkennen kann.",
      ],
      [
        "Umwelt",
        "Ökologische Folgen?",
        "Ich werde selten allein abgebaut. Die Umweltbelastungen hängen daher vor allem mit Zink- und Kupferbergbau zusammen, etwa giftigen Abwässern und Rückständen mit Schwermetallen.",
      ],
      [
        "Menschen",
        "Folgen für Menschen?",
        "In Förderregionen können giftige Schlämme und schwache Sicherheitsstandards ein Gesundheitsrisiko sein. Die starke Abhängigkeit von China schafft außerdem politische und wirtschaftliche Abhängigkeiten.",
      ],
      [
        "Danach",
        "Was passiert nach dem Handy?",
        "Ich bleibe meist im Elektronikschrott. Eine Rückgewinnung ist technisch aufwändig und findet bisher nur in kleinen Mengen statt.",
      ],
    ],
  ),

  gallia: createDialog(
    "Ich bin Gallia. Ich helfe Chips und LEDs dabei, schnell zu denken und zu leuchten.",
    [
      [
        "Herkunft",
        "Woher kommst du?",
        "Ich komme fast nur als Nebenprodukt aus der Bauxitverarbeitung. China liefert rund 98 Prozent der Produktion; kleinere Mengen kommen aus Russland, Japan und Südkorea.",
      ],
      [
        "Abbau",
        "Wie wirst du gewonnen?",
        "Ich werde bei der Raffination von Bauxit abgetrennt. Bauxit enthält nur geringe Spuren von mir, die im Aluminiumprozess herausgelöst werden können.",
      ],
      [
        "Smartphone",
        "Wie steckst du im Handy?",
        "Ich stecke vor allem in speziellen Halbleiterchips, LED-Anzeigen und optischen Bauteilen. Damit unterstütze ich Hochfrequenz- und Datentechnik.",
      ],
      [
        "Umwelt",
        "Ökologische Folgen?",
        "Meine eigenen Abfälle sind gering, aber ich bin an die Bauxit- und Aluminiumproduktion gekoppelt. Dort entstehen Rotschlamm, Tagebauflächen und teils Entwaldung.",
      ],
      [
        "Menschen",
        "Folgen für Menschen?",
        "Die starke Abhängigkeit von China schafft ein Versorgungsrisiko. In Abbaugebieten können Menschen unter Schadstoffen aus Bergbau und Raffinerien leiden.",
      ],
      [
        "Danach",
        "Was passiert nach dem Handy?",
        "Ich bleibe in elektronischen Bauteilen zurück. Eine gezielte Rückgewinnung aus Altgeräten findet bislang kaum statt.",
      ],
    ],
  ),

  silico: createDialog(
    "Ich bin Silico. Ohne mich gäbe es keine Chips, keine Sensoren und kein digitales Gehirn im Smartphone.",
    [
      [
        "Herkunft",
        "Woher kommst du?",
        "Ich bin eines der häufigsten Elemente der Erdkruste. Mein Ausgangsmaterial ist Quarz oder Quarzsand. Etwa zwei Drittel des industriellen Siliziums werden in China hergestellt.",
      ],
      [
        "Abbau",
        "Wie wirst du gewonnen?",
        "Quarz wird in Lichtbogenöfen bei mehr als 2.000 Grad mit Kohlenstoff reduziert und danach chemisch gereinigt. Für Chips braucht man extrem reines Silizium.",
      ],
      [
        "Smartphone",
        "Wie steckst du im Handy?",
        "Ich bilde die Wafer in Prozessoren, Speichern und Sensoren. Fast jeder Chip im Smartphone basiert auf hochreinem Silizium.",
      ],
      [
        "Umwelt",
        "Ökologische Folgen?",
        "Meine Herstellung verbraucht sehr viel Energie. Für ein Kilogramm metallisches Silizium entstehen ungefähr fünf Kilogramm CO₂; besonders viel bei Strom aus Kohle.",
      ],
      [
        "Menschen",
        "Folgen für Menschen?",
        "Hoher Energiebedarf und Luftschadstoffe aus Öfen können Anwohner in Produktionsregionen belasten. Die Produktion ist außerdem stark konzentriert, wodurch Lieferengpässe möglich sind.",
      ],
      [
        "Danach",
        "Was passiert nach dem Handy?",
        "Platinen werden oft recycelt, doch viele Chips gehen verloren, weil Altgeräte nicht vollständig aufbereitet werden. Spezialisierte Verfahren können Silizium dennoch zurückgewinnen.",
      ],
    ],
  ),

  zinnia: createDialog(
    "Ich bin Zinnia. Ich halte die Elektronik im Inneren deines Smartphones zusammen.",
    [
      [
        "Herkunft",
        "Woher kommst du?",
        "Ich komme meist als Kassiterit vor. Große Abbaugebiete liegen in China, Indonesien, Myanmar, Peru und Bolivien.",
      ],
      [
        "Abbau",
        "Wie wirst du gewonnen?",
        "Ich werde im Tagebau oder durch Seifenabbau gewonnen. Kassiterit-Erz wird mit Kohlenstoff reduziert. In traditionellen Minen graben Menschen teils kleinflächig nach Zinnerz.",
      ],
      [
        "Smartphone",
        "Wie steckst du im Handy?",
        "Mehr als 97 Prozent von mir werden für Lötlegierungen genutzt. Ich verbinde Bauteile auf Platinen – jeder Handy-Schaltkreis enthält Lötzinn.",
      ],
      [
        "Umwelt",
        "Ökologische Folgen?",
        "Beim Abbau entstehen große Rückstandshalden. Sie können Arsen, Cadmium, Quecksilber oder radioaktive Stoffe enthalten und Böden sowie Flüsse verunreinigen.",
      ],
      [
        "Menschen",
        "Folgen für Menschen?",
        "In einigen Förderregionen gibt es niedrige Umwelt- und Sozialstandards. Zinn aus Konfliktregionen wird mit Kinderarbeit und mangelndem Schutz lokaler Gemeinschaften in Verbindung gebracht.",
      ],
      [
        "Danach",
        "Was passiert nach dem Handy?",
        "Ich bin technisch gut recycelbar, werde aber wegen niedriger Preise und fehlender Sammelsysteme oft nicht zurückgewonnen.",
      ],
    ],
  ),

  neodya: createDialog(
    "Ich bin Neodya. Klein gebaut, aber magnetisch stark – ich bringe dein Smartphone zum Klingen und Vibrieren.",
    [
      [
        "Herkunft",
        "Woher kommst du?",
        "Ich gehöre zu den Seltenen Erden. Mehr als 80 Prozent des globalen Bedarfs werden in China produziert; weitere Lagerstätten gibt es in Australien, den USA und Russland.",
      ],
      [
        "Abbau",
        "Wie wirst du gewonnen?",
        "Ich werde zusammen mit anderen Seltenen Erden aus Mineralien wie Monazit oder Bastnäsit gefördert und chemisch aufbereitet. Dabei können radioaktive Abfälle entstehen.",
      ],
      [
        "Smartphone",
        "Wie steckst du im Handy?",
        "Als Neodym-Eisen-Bor-Magnet stecke ich in Lautsprechern, Mikrofonen und Vibrationsmotoren. Ich erzeuge starke Magnetfelder, obwohl ich nur wenig Platz brauche.",
      ],
      [
        "Umwelt",
        "Ökologische Folgen?",
        "Bei der Raffinierung entstehen toxische Abfallhalden. Thorium und Uran aus dem Ausgangsmaterial können radioaktive Schlämme erzeugen, die Boden und Wasser belasten.",
      ],
      [
        "Menschen",
        "Folgen für Menschen?",
        "In Abbaugebieten, etwa in der Inneren Mongolei, wurden schwere Umwelt- und Gesundheitsschäden dokumentiert. Kontaminiertes Wasser kann Menschen, Tiere und Landwirtschaft gefährden.",
      ],
      [
        "Danach",
        "Was passiert nach dem Handy?",
        "Meine Magnete landen meist im Elektroschrott. Das Recycling von Permanentmagneten steckt noch in den Anfängen.",
      ],
    ],
  ),

  dysra: createDialog(
    "Ich bin Dysra. Ich mache Magnete hitzefester, damit sie auch unter Druck zuverlässig bleiben.",
    [
      [
        "Herkunft",
        "Woher kommst du?",
        "Ich bin ebenfalls eine Seltene Erde und komme oft gemeinsam mit Neodym vor. Hauptförderer sind China, danach die USA, Australien und Russland.",
      ],
      [
        "Abbau",
        "Wie wirst du gewonnen?",
        "Meine Gewinnung ähnelt der von Neodym: Bergbau, große Abraumhalden und chemische Aufbereitung. Dabei treten oft radioaktive Begleitstoffe auf.",
      ],
      [
        "Smartphone",
        "Wie steckst du im Handy?",
        "Ich werde Neodym-Magneten beigemischt, damit sie temperaturbeständiger werden. So stecke ich indirekt in Lautsprechern und anderen Aktuatoren.",
      ],
      [
        "Umwelt",
        "Ökologische Folgen?",
        "Beim Abbau entstehen hochgiftige und teils radioaktive Abfälle. Alte Absetzbecken können Thorium und andere Schadstoffe enthalten, die Boden und Wasser verseuchen.",
      ],
      [
        "Menschen",
        "Folgen für Menschen?",
        "Anwohner von Abbauregionen können unter Umweltvergiftungen leiden. Strahlung und Schadstoffe erhöhen laut Berichten Gesundheits- und Krebsrisiken.",
      ],
      [
        "Danach",
        "Was passiert nach dem Handy?",
        "Wie Neodym-Magnete werde auch ich kaum recycelt. Oft bleibe ich im Elektroschrott zurück.",
      ],
    ],
  ),

  alumina: createDialog(
    "Ich bin Alumina. Ich halte dein Smartphone leicht, stabil und geschützt.",
    [
      [
        "Herkunft",
        "Woher kommst du?",
        "Ich werde aus Bauxit gewonnen. Große Förderländer sind Australien, China und Guinea. Für die energieintensive Verarbeitung sind Länder mit günstigem Strom besonders wichtig.",
      ],
      [
        "Abbau",
        "Wie wirst du gewonnen?",
        "Bauxit wird meist im Tagebau abgebaut und mit Natronlauge aufgeschlossen. Daraus entsteht Aluminiumoxid; beim Schmelzen zu Aluminium wird sehr viel Energie benötigt.",
      ],
      [
        "Smartphone",
        "Wie steckst du im Handy?",
        "Ich finde mich in Gehäuse, Rahmen, Folien, Kabeln und Verbindungen. Ich bin leicht, stabil und korrosionsbeständig.",
      ],
      [
        "Umwelt",
        "Ökologische Folgen?",
        "Bauxitabbau kann Regenwälder zerstören. Bei der Verarbeitung entsteht Rotschlamm, der ätzende Laugen und teils Schwermetalle enthält und Böden sowie Gewässer belasten kann.",
      ],
      [
        "Menschen",
        "Folgen für Menschen?",
        "Die Zerstörung von Wäldern und belastete Wasserquellen führen in Förderregionen zu Landkonflikten und Gesundheitsgefahren. Es gibt Berichte über Landraub und geschädigte Landwirtschaft.",
      ],
      [
        "Danach",
        "Was passiert nach dem Handy?",
        "Ich lasse mich sehr gut recyceln – mit nur etwa fünf Prozent der Energie der Primärproduktion. Trotzdem landet ein Teil noch im Elektroschrott.",
      ],
    ],
  ),

  nickelix: createDialog(
    "Ich bin Nickelix. Ich mache Kontakte robust und unterstütze moderne Akkus.",
    [
      [
        "Herkunft",
        "Woher kommst du?",
        "Die größten Vorkommen liegen heute vor allem in Indonesien. Weitere wichtige Förderländer sind die Philippinen, Russland, Kanada und Australien.",
      ],
      [
        "Abbau",
        "Wie wirst du gewonnen?",
        "Viele Lagerstätten liegen in tropischen Laterit-Erzen. Sie werden im Tagebau gewonnen und in sehr energieintensiven Öfen verarbeitet oder chemisch ausgelaugt.",
      ],
      [
        "Smartphone",
        "Wie steckst du im Handy?",
        "Ich stecke in Stecker- und Gehäuseteilen, in Legierungen für Kontakte und in einigen Akku-Kathoden moderner Lithium-Ionen-Batterien.",
      ],
      [
        "Umwelt",
        "Ökologische Folgen?",
        "Meine Raffination ist CO₂-intensiv, besonders wenn Kohle genutzt wird. Außerdem können Säureabwässer, giftige Schlämme und große Tagebaugruben Landschaften und Flüsse belasten.",
      ],
      [
        "Menschen",
        "Folgen für Menschen?",
        "Der Abbau greift oft in Regenwaldgebiete ein und kann lokale Gemeinden verdrängen. Verschmutzte Flüsse gefährden Fischerei, Landwirtschaft und die Lebensgrundlage der Bevölkerung.",
      ],
      [
        "Danach",
        "Was passiert nach dem Handy?",
        "Ich kann aus Batterien, Gehäusen und Elektronikmetallen zurückgewonnen werden. Viel Nickel bleibt aber in unsortiertem Elektroschrott.",
      ],
    ],
  ),

  kupfero: createDialog(
    "Ich bin Kupfero. Ich bin die Strombahn im Smartphone – ohne mich würde kein Signal ankommen.",
    [
      [
        "Herkunft",
        "Woher kommst du?",
        "Ich werde weltweit abgebaut. Die größten Produzenten sind Chile und Peru, danach unter anderem China, die USA und die Demokratische Republik Kongo.",
      ],
      [
        "Abbau",
        "Wie wirst du gewonnen?",
        "Meist komme ich aus riesigen Tagebauen. Für wenig Erz wird sehr viel Gestein bewegt, gesprengt und als Abraum gelagert. Das Erz wird anschließend aufbereitet.",
      ],
      [
        "Smartphone",
        "Wie steckst du im Handy?",
        "Ich stecke in Leiterbahnen, feinen Drähten, Kabeln und der Ladebuchse. Ich leite Strom sehr gut; in jedem Smartphone sind mehrere Gramm von mir verbaut.",
      ],
      [
        "Umwelt",
        "Ökologische Folgen?",
        "Sprengungen erzeugen Staub, Abbauwässer können Schwefelsäure und Schwermetalle enthalten. Halden können noch jahrzehntelang Schadstoffe ins Grundwasser abgeben und Süßwasserquellen bedrohen.",
      ],
      [
        "Menschen",
        "Folgen für Menschen?",
        "In vielen Abbaugebieten gibt es Konflikte um Wasser und Land. Menschen berichten von Wasserentzug, Verschmutzung, Gesundheitsproblemen und Problemen für Landwirtschaft.",
      ],
      [
        "Danach",
        "Was passiert nach dem Handy?",
        "Ich habe eine hohe Recyclingquote, weil ich wirtschaftlich wertvoll bin. Trotzdem geht Kupfer verloren, wenn Elektronikschrott nicht richtig getrennt und recycelt wird.",
      ],
    ],
   ),
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