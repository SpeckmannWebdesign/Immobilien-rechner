export interface RechnerSeoData {
  features: { title: string; description: string }[]
  seoText: { heading: string; paragraphs: string[] }[]
  faq: { question: string; answer: string }[]
}

export const rechnerSeoData: Record<string, RechnerSeoData> = {
  "rendite-rechner": {
    features: [
      {
        title: "Drei Rendite-Kennzahlen",
        description:
          "Bruttomietrendite, Nettomietrendite und Eigenkapitalrendite auf einen Blick berechnen.",
      },
      {
        title: "Live-Berechnung",
        description:
          "Ergebnisse aktualisieren sich sofort bei jeder Eingabe — kein Warten, kein Neuladen.",
      },
      {
        title: "Visuelle Auswertung",
        description:
          "Donut-Chart zeigt die Kapitalverteilung zwischen Eigenkapital und Fremdkapital übersichtlich.",
      },
      {
        title: "Kaufnebenkosten inklusive",
        description:
          "Die Berechnung berücksichtigt automatisch Grunderwerbsteuer, Notar- und Grundbuchkosten.",
      },
    ],
    seoText: [
      {
        heading: "Was ist die Mietrendite und warum ist sie wichtig?",
        paragraphs: [
          "Die Mietrendite ist die wichtigste Kennzahl für Immobilien-Investoren. Sie zeigt, wie viel Prozent des eingesetzten Kapitals pro Jahr als Mieteinnahme zurückfließt. Damit lassen sich verschiedene Immobilien objektiv miteinander vergleichen — unabhängig von Lage, Größe oder Kaufpreis.",
          "Es gibt drei Arten der Mietrendite: Die Bruttomietrendite setzt die Jahreskaltmiete ins Verhältnis zum Kaufpreis. Die Nettomietrendite berücksichtigt zusätzlich die nicht-umlegbaren Bewirtschaftungskosten. Die Eigenkapitalrendite zeigt, wie sich das tatsächlich eingesetzte Eigenkapital verzinst — besonders relevant bei Finanzierung.",
        ],
      },
      {
        heading: "Wann lohnt sich eine Immobilie als Kapitalanlage?",
        paragraphs: [
          "Als Faustregel gilt: Eine Bruttomietrendite ab 5 % ist solide, ab 7 % überdurchschnittlich gut. In deutschen Großstädten wie München oder Hamburg liegen die Renditen oft unter 4 %, während B- und C-Lagen Renditen über 6 % bieten. Der Rendite-Rechner hilft, diese Unterschiede sofort sichtbar zu machen.",
          "Wichtig: Eine hohe Rendite allein garantiert kein gutes Investment. Faktoren wie Standortentwicklung, Mietausfallrisiko und Instandhaltungskosten müssen ebenfalls berücksichtigt werden. Unser Rechner liefert die Zahlengrundlage — die finale Entscheidung bleibt bei Ihnen.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist eine gute Mietrendite?",
        answer:
          "Eine Bruttomietrendite ab 5 % gilt als gut. In Top-Lagen deutscher Großstädte liegen die Renditen oft zwischen 3–4 %, während in B- und C-Städten 6–8 % realistisch sind. Die Nettomietrendite sollte mindestens 3,5 % betragen.",
      },
      {
        question: "Was ist der Unterschied zwischen Brutto- und Nettomietrendite?",
        answer:
          "Die Bruttomietrendite berücksichtigt nur Kaufpreis und Jahreskaltmiete. Die Nettomietrendite zieht zusätzlich nicht-umlegbare Kosten wie Instandhaltung, Verwaltung und Mietausfallwagnis ab und ist daher aussagekräftiger.",
      },
      {
        question: "Werden Kaufnebenkosten in die Rendite eingerechnet?",
        answer:
          "Ja, unser Rechner berücksichtigt Grunderwerbsteuer, Notar- und Grundbuchkosten sowie die Maklerprovision. Diese Kosten erhöhen die Gesamtinvestition und senken die tatsächliche Rendite.",
      },
      {
        question: "Wie berechnet sich die Eigenkapitalrendite?",
        answer:
          "Die Eigenkapitalrendite setzt den jährlichen Reinertrag (Mieteinnahmen minus Kosten minus Zinskosten) ins Verhältnis zum eingesetzten Eigenkapital. Bei Fremdfinanzierung kann die Eigenkapitalrendite deutlich höher als die Objektrendite sein — das nennt man den Leverage-Effekt.",
      },
    ],
  },

  "kaufnebenkosten-rechner": {
    features: [
      {
        title: "Alle Kostenpositionen",
        description:
          "Grunderwerbsteuer, Notarkosten, Grundbuchkosten und Maklerprovision auf einen Blick.",
      },
      {
        title: "Bundeslandspezifisch",
        description:
          "Automatische Anpassung der Grunderwerbsteuer je nach gewähltem Bundesland.",
      },
      {
        title: "Gesamtkosten-Übersicht",
        description:
          "Sofortige Berechnung der Gesamtkosten inklusive aller Kaufnebenkosten.",
      },
      {
        title: "Prozentuale Aufschlüsselung",
        description:
          "Zeigt den Anteil jeder Kostenposition am Gesamtkaufpreis in Prozent.",
      },
    ],
    seoText: [
      {
        heading: "Welche Kaufnebenkosten fallen beim Immobilienkauf an?",
        paragraphs: [
          "Beim Kauf einer Immobilie in Deutschland fallen neben dem eigentlichen Kaufpreis erhebliche Nebenkosten an. Diese betragen je nach Bundesland und Maklerbeteiligung zwischen 7 % und 15 % des Kaufpreises. Bei einem Kaufpreis von 300.000 € sind das bis zu 45.000 € zusätzlich.",
          "Die vier Hauptkostenpositionen sind: Grunderwerbsteuer (3,5–6,5 % je nach Bundesland), Notarkosten (ca. 1,5 % des Kaufpreises), Grundbuchkosten (ca. 0,5 %) und die Maklerprovision (bis zu 7,14 % inklusive Mehrwertsteuer). Seit Dezember 2020 gilt in Deutschland das Bestellerprinzip für Kaufimmobilien: Käufer und Verkäufer teilen sich die Maklerprovision in der Regel hälftig.",
        ],
      },
      {
        heading: "Warum sind Kaufnebenkosten so wichtig für die Investitionsentscheidung?",
        paragraphs: [
          "Kaufnebenkosten sind verlorenes Kapital — sie fließen nicht in den Immobilienwert ein. Daher müssen sie bei der Renditeberechnung zwingend berücksichtigt werden. Banken finanzieren Kaufnebenkosten in der Regel nicht, sodass sie vollständig aus dem Eigenkapital bezahlt werden müssen.",
          "Unser Kaufnebenkosten-Rechner zeigt Ihnen auf einen Blick, wie viel Eigenkapital Sie tatsächlich benötigen und wie sich die Nebenkosten auf Ihre Gesamtinvestition auswirken.",
        ],
      },
    ],
    faq: [
      {
        question: "Wie hoch sind die Kaufnebenkosten in Deutschland?",
        answer:
          "Die Kaufnebenkosten liegen zwischen 7 % und 15 % des Kaufpreises. Der größte Posten ist die Grunderwerbsteuer (3,5–6,5 %), gefolgt von Notarkosten (ca. 1,5 %), Grundbuchkosten (ca. 0,5 %) und der Maklerprovision (bis zu 7,14 %).",
      },
      {
        question: "Kann ich Kaufnebenkosten von der Steuer absetzen?",
        answer:
          "Bei vermieteten Immobilien können Notarkosten, Grundbuchkosten und die Grunderwerbsteuer als Anschaffungsnebenkosten über die AfA abgeschrieben werden. Bei Eigennutzung sind die Kaufnebenkosten steuerlich nicht absetzbar.",
      },
      {
        question: "Wer zahlt die Maklerprovision?",
        answer:
          "Seit Dezember 2020 gilt in Deutschland: Wer den Makler beauftragt, zahlt mindestens die Hälfte der Provision. In der Praxis teilen sich Käufer und Verkäufer die Kosten meist hälftig (je 3,57 % inkl. MwSt.).",
      },
    ],
  },

  "finanzierungsrechner": {
    features: [
      {
        title: "Monatliche Rate berechnen",
        description:
          "Annuität aus Zinssatz und Tilgungsrate berechnen — sofort sehen, was die Immobilie monatlich kostet.",
      },
      {
        title: "Sondertilgung einplanen",
        description:
          "Jährliche Sondertilgungen berücksichtigen und deren Auswirkung auf Laufzeit und Zinskosten sehen.",
      },
      {
        title: "Restschuld nach Zinsbindung",
        description:
          "Erfahren Sie, wie hoch die Restschuld nach Ablauf der Zinsbindungsfrist ist.",
      },
      {
        title: "Zinskosten-Übersicht",
        description:
          "Gesamte Zinskosten über die Laufzeit transparent aufgeschlüsselt.",
      },
    ],
    seoText: [
      {
        heading: "Wie funktioniert ein Annuitätendarlehen?",
        paragraphs: [
          "Das Annuitätendarlehen ist die gängigste Finanzierungsform für Immobilien in Deutschland. Die monatliche Rate (Annuität) bleibt über die gesamte Zinsbindungsfrist konstant. Sie setzt sich aus einem Zins- und einem Tilgungsanteil zusammen. Mit jeder Rate sinkt der Zinsanteil und der Tilgungsanteil steigt.",
          "Die Zinsbindungsfrist beträgt in Deutschland üblicherweise 10 bis 15 Jahre. Danach wird eine Anschlussfinanzierung für die Restschuld fällig. Je höher der anfängliche Tilgungssatz, desto schneller ist die Immobilie abbezahlt — aber desto höher ist auch die monatliche Belastung.",
        ],
      },
      {
        heading: "Worauf sollten Sie bei der Immobilienfinanzierung achten?",
        paragraphs: [
          "Drei Faktoren bestimmen Ihre Finanzierung: Zinssatz, Tilgungsrate und Sondertilgungsmöglichkeiten. Ein niedriger Zinssatz senkt die monatliche Rate, aber eine zu niedrige Tilgung verlängert die Gesamtlaufzeit enorm. Experten empfehlen eine anfängliche Tilgung von mindestens 2 %, besser 3 %.",
          "Sondertilgungen ermöglichen es, jährlich einen bestimmten Betrag zusätzlich zu tilgen (meist 5–10 % der Darlehenssumme). Das reduziert die Restschuld und spart erhebliche Zinskosten. Unser Finanzierungsrechner zeigt den Unterschied mit und ohne Sondertilgung.",
        ],
      },
    ],
    faq: [
      {
        question: "Wie hoch sollte die anfängliche Tilgung sein?",
        answer:
          "Experten empfehlen eine anfängliche Tilgung von mindestens 2 %, besser 3 %. Bei einem Zinssatz von 3,5 % und 2 % Tilgung dauert die vollständige Rückzahlung etwa 30 Jahre.",
      },
      {
        question: "Was passiert nach Ablauf der Zinsbindung?",
        answer:
          "Nach Ablauf der Zinsbindungsfrist müssen Sie für die Restschuld eine Anschlussfinanzierung abschließen. Der dann gültige Zinssatz kann höher oder niedriger sein. Eine lange Zinsbindung (15–20 Jahre) gibt Planungssicherheit.",
      },
      {
        question: "Lohnt sich eine Sondertilgung?",
        answer:
          "Ja, Sondertilgungen senken die Restschuld und damit die gesamten Zinskosten deutlich. Bei einem Darlehen von 300.000 € mit 3,5 % Zinsen spart eine jährliche Sondertilgung von 10.000 € über 10 Jahre mehr als 25.000 € an Zinsen.",
      },
    ],
  },

  "cashflow-rechner": {
    features: [
      {
        title: "Monatlicher Überschuss",
        description:
          "Berechnen Sie, ob Ihre Immobilie sich selbst trägt oder monatlich Geld kostet.",
      },
      {
        title: "Alle Kostenpositionen",
        description:
          "Kreditrate, Hausgeld, Instandhaltungsrücklage, Verwaltung und Mietausfallwagnis berücksichtigt.",
      },
      {
        title: "Positiver vs. negativer Cashflow",
        description:
          "Sofort erkennen, ob die Mieteinnahmen alle laufenden Kosten decken.",
      },
      {
        title: "Jährliche Hochrechnung",
        description:
          "Neben dem Monats-Cashflow auch den jährlichen Überschuss oder Zuschussbedarf sehen.",
      },
    ],
    seoText: [
      {
        heading: "Was ist der Cashflow bei Immobilien?",
        paragraphs: [
          "Der Cashflow einer Immobilie beschreibt den tatsächlichen Geldfluss pro Monat: Mieteinnahmen minus alle laufenden Kosten. Ein positiver Cashflow bedeutet, dass die Immobilie einen Überschuss erwirtschaftet. Ein negativer Cashflow bedeutet, dass Sie monatlich Geld zuschießen müssen.",
          "Für Kapitalanleger ist der Cashflow eine der wichtigsten Kennzahlen — neben der Rendite. Denn selbst eine Immobilie mit guter Rendite kann monatlich Geld kosten, wenn die Finanzierungskosten zu hoch sind oder die Mieteinnahmen zu niedrig ausfallen.",
        ],
      },
      {
        heading: "Welche Kosten müssen berücksichtigt werden?",
        paragraphs: [
          "Zu den laufenden Kosten gehören: Kreditrate (Zins + Tilgung), nicht-umlegbares Hausgeld, Instandhaltungsrücklage, Verwaltungskosten und ein Mietausfallwagnis von üblicherweise 2–4 %. Viele Anfänger vergessen die Instandhaltungsrücklage und das Mietausfallwagnis — das führt zu einer zu optimistischen Cashflow-Berechnung.",
          "Der Cashflow-Rechner berücksichtigt alle relevanten Positionen und zeigt Ihnen auf einen Blick, ob Ihre Immobilie sich selbst trägt oder wie hoch der monatliche Zuschuss ausfällt.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist ein guter Cashflow bei Immobilien?",
        answer:
          "Ein positiver Cashflow ist das Ziel vieler Investoren. Bereits ein leicht positiver Cashflow von 50–100 € pro Monat ist gut, da die Immobilie sich dann selbst trägt. In deutschen Großstädten ist ein negativer Cashflow von 100–200 € pro Monat bei Neubauten aber keine Seltenheit.",
      },
      {
        question: "Soll ich nur Immobilien mit positivem Cashflow kaufen?",
        answer:
          "Nicht unbedingt. Ein negativer Cashflow kann akzeptabel sein, wenn die Immobilie in einer Wachstumsregion liegt und durch Wertsteigerung langfristig Vermögen aufgebaut wird. Wichtig ist, dass der Zuschuss finanziell tragbar bleibt.",
      },
      {
        question: "Wie hoch sollte das Mietausfallwagnis sein?",
        answer:
          "Experten empfehlen, 2–4 % der Jahreskaltmiete als Mietausfallwagnis einzuplanen. In gefragten Lagen reichen 2 %, in strukturschwächeren Regionen sollten Sie mit 4 % oder mehr kalkulieren.",
      },
    ],
  },

  "grunderwerbsteuer-rechner": {
    features: [
      {
        title: "Alle 16 Bundesländer",
        description:
          "Aktuelle Grunderwerbsteuersätze für jedes deutsche Bundesland — immer auf dem neuesten Stand.",
      },
      {
        title: "Sofortiger Vergleich",
        description:
          "Vergleichen Sie die Steuerlast verschiedener Bundesländer direkt nebeneinander.",
      },
      {
        title: "Kaufpreis-Eingabe",
        description:
          "Geben Sie den Kaufpreis ein und sehen Sie sofort die fällige Grunderwerbsteuer.",
      },
      {
        title: "Aktueller Stand 2026",
        description:
          "Alle Steuersätze entsprechen dem aktuellen Stand — inklusive kürzlicher Änderungen.",
      },
    ],
    seoText: [
      {
        heading: "Grunderwerbsteuer in Deutschland — Was Sie wissen müssen",
        paragraphs: [
          "Die Grunderwerbsteuer ist die größte Einzelposition bei den Kaufnebenkosten einer Immobilie. Sie wird fällig bei jedem Grundstückskauf in Deutschland und beträgt je nach Bundesland zwischen 3,5 % und 6,5 % des Kaufpreises. Bei einem Kaufpreis von 400.000 € bedeutet das zwischen 14.000 € und 26.000 €.",
          "Die Steuersätze werden von den einzelnen Bundesländern festgelegt. Bayern und Sachsen haben mit 3,5 % die niedrigsten Sätze, während Brandenburg, Nordrhein-Westfalen, Saarland, Schleswig-Holstein und Thüringen mit 6,5 % die höchsten Sätze erheben.",
        ],
      },
      {
        heading: "Kann man die Grunderwerbsteuer senken oder vermeiden?",
        paragraphs: [
          "Die Grunderwerbsteuer lässt sich nicht direkt verhandeln, aber es gibt legale Gestaltungsmöglichkeiten: Bewegliche Gegenstände wie Einbauküchen oder Markisen können im Kaufvertrag separat ausgewiesen werden — sie sind nicht grunderwerbsteuerpflichtig. Bei einem Küchenwert von 15.000 € spart das je nach Bundesland bis zu 975 €.",
          "Bei vermieteten Immobilien wird die Grunderwerbsteuer Teil der Anschaffungskosten und kann über die AfA steuerlich geltend gemacht werden. Unser Rechner hilft Ihnen, die genaue Steuerlast für Ihr Bundesland zu ermitteln.",
        ],
      },
    ],
    faq: [
      {
        question: "Wie hoch ist die Grunderwerbsteuer in meinem Bundesland?",
        answer:
          "Die Grunderwerbsteuer variiert zwischen 3,5 % (Bayern, Sachsen) und 6,5 % (Brandenburg, NRW, Saarland, Schleswig-Holstein, Thüringen). Nutzen Sie unseren Rechner, um den genauen Betrag für Ihren Kaufpreis zu berechnen.",
      },
      {
        question: "Wann muss die Grunderwerbsteuer bezahlt werden?",
        answer:
          "Die Grunderwerbsteuer wird nach Beurkundung des Kaufvertrags vom Finanzamt festgesetzt. Sie muss in der Regel innerhalb von 4 Wochen nach Zugang des Steuerbescheids bezahlt werden. Erst danach erteilt das Finanzamt die Unbedenklichkeitsbescheinigung für die Grundbucheintragung.",
      },
      {
        question: "Kann ich die Grunderwerbsteuer von der Steuer absetzen?",
        answer:
          "Bei vermieteten Immobilien ja — die Grunderwerbsteuer wird den Anschaffungskosten zugerechnet und über die AfA (Absetzung für Abnutzung) abgeschrieben. Bei selbst genutzten Immobilien ist kein steuerlicher Abzug möglich.",
      },
    ],
  },

  "steuerersparnis-rechner": {
    features: [
      {
        title: "AfA-Berechnung",
        description:
          "Automatische Berechnung der Absetzung für Abnutzung je nach Baujahr und Gebäudeanteil.",
      },
      {
        title: "Werbungskosten berücksichtigt",
        description:
          "Zinsen, Verwaltung, Instandhaltung und weitere Werbungskosten in die Berechnung einbeziehen.",
      },
      {
        title: "Jährliche Steuerersparnis",
        description:
          "Sehen Sie auf einen Blick, wie viel Steuern Sie pro Jahr durch die Vermietung sparen.",
      },
      {
        title: "Individuelle Steuersätze",
        description:
          "Berechnung auf Basis Ihres persönlichen Einkommenssteuersatzes.",
      },
    ],
    seoText: [
      {
        heading: "Steuervorteile bei Immobilien als Kapitalanlage",
        paragraphs: [
          "Einer der größten Vorteile von Immobilien als Kapitalanlage ist die steuerliche Absetzbarkeit. Durch die Absetzung für Abnutzung (AfA) und den Abzug von Werbungskosten können Vermieter ihre Steuerlast erheblich senken. Die AfA beträgt bei Gebäuden ab Baujahr 1925 in der Regel 2 % pro Jahr über 50 Jahre, bei Neubauten ab 2023 sogar 3 % über 33 Jahre.",
          "Wichtig: Die AfA bezieht sich nur auf den Gebäudeanteil, nicht auf das Grundstück. In guten Lagen beträgt der Grundstücksanteil oft 30–50 % des Kaufpreises. Unser Rechner berücksichtigt dies automatisch und zeigt Ihnen die tatsächliche jährliche Steuerersparnis.",
        ],
      },
      {
        heading: "Welche Kosten sind als Werbungskosten absetzbar?",
        paragraphs: [
          "Als Werbungskosten bei Vermietung gelten: Darlehenszinsen (nicht die Tilgung), Verwaltungskosten, Instandhaltungskosten, Versicherungen, Grundsteuer, Fahrtkosten zur Immobilie und Abschreibung (AfA). Diese Kosten werden von den Mieteinnahmen abgezogen — der verbleibende Betrag wird versteuert.",
          "Übersteigen die Werbungskosten die Mieteinnahmen, entsteht ein steuerlicher Verlust, der mit anderen Einkünften verrechnet werden kann. Das ist besonders in den ersten Jahren einer Kapitalanlage häufig der Fall und senkt die Gesamtsteuerlast spürbar.",
        ],
      },
    ],
    faq: [
      {
        question: "Wie hoch ist die AfA bei Immobilien?",
        answer:
          "Die lineare AfA beträgt bei Bestandsgebäuden (Baujahr ab 1925) 2 % pro Jahr über 50 Jahre. Für Neubauten ab 2023 gilt ein erhöhter AfA-Satz von 3 % über 33 Jahre. Altbauten vor 1925 können mit 2,5 % über 40 Jahre abgeschrieben werden.",
      },
      {
        question: "Kann ich die Darlehenszinsen von der Steuer absetzen?",
        answer:
          "Ja, bei vermieteten Immobilien sind die Darlehenszinsen vollständig als Werbungskosten absetzbar. Die Tilgung hingegen ist nicht steuerlich absetzbar, da sie Vermögensaufbau darstellt.",
      },
      {
        question: "Lohnt sich eine Immobilie nur wegen der Steuerersparnis?",
        answer:
          "Nein, eine Immobilie sollte sich auch ohne Steuervorteile rechnen. Steuerersparnisse sind ein positiver Nebeneffekt, aber kein alleiniges Investitionskriterium. Rendite, Lage und Cashflow sind wichtiger.",
      },
    ],
  },

  "mietsteigerungsrechner": {
    features: [
      {
        title: "Langfrist-Prognose",
        description:
          "Mietentwicklung über 10, 20 oder 30 Jahre berechnen und grafisch darstellen.",
      },
      {
        title: "Individuelle Steigerungsrate",
        description:
          "Eigene jährliche Mietsteigerungsrate eingeben — passend zu Ihrer Region und Lage.",
      },
      {
        title: "Kumulierte Mehreinnahmen",
        description:
          "Sehen Sie, wie viel zusätzliche Mieteinnahmen über den gesamten Zeitraum entstehen.",
      },
      {
        title: "Inflationsbereinigt",
        description:
          "Vergleich der nominalen mit der realen (inflationsbereinigten) Mietentwicklung.",
      },
    ],
    seoText: [
      {
        heading: "Wie entwickeln sich Mieten in Deutschland?",
        paragraphs: [
          "Die Mieten in Deutschland steigen seit Jahren kontinuierlich an. Im Durchschnitt lag die jährliche Mietsteigerung in den letzten 10 Jahren bei etwa 2–3 % — in Großstädten teilweise deutlich darüber. Für Immobilien-Investoren ist die langfristige Mietentwicklung ein entscheidender Faktor bei der Renditeberechnung.",
          "Unser Mietsteigerungsrechner zeigt Ihnen, wie sich Ihre Mieteinnahmen über einen beliebigen Zeitraum entwickeln. So können Sie verschiedene Szenarien durchspielen und die Auswirkung auf Ihren Cashflow und Ihre Rendite abschätzen.",
        ],
      },
      {
        heading: "Welche Faktoren beeinflussen die Mietentwicklung?",
        paragraphs: [
          "Die Mietentwicklung hängt von vielen Faktoren ab: Bevölkerungsentwicklung, Wohnungsangebot und -nachfrage, Infrastrukturausbau, wirtschaftliche Entwicklung der Region und die allgemeine Inflation. In wachsenden Städten wie Leipzig oder Berlin steigen die Mieten stärker als in schrumpfenden Regionen.",
          "Beachten Sie auch rechtliche Grenzen: Die Mietpreisbremse, Kappungsgrenzen und der Mietspiegel begrenzen in vielen deutschen Städten die zulässige Mieterhöhung. Unser Rechner arbeitet mit Ihren individuellen Annahmen — die rechtlichen Rahmenbedingungen sollten Sie separat prüfen.",
        ],
      },
    ],
    faq: [
      {
        question: "Wie hoch ist die durchschnittliche Mietsteigerung in Deutschland?",
        answer:
          "Die durchschnittliche Mietsteigerung in Deutschland lag in den letzten Jahren bei etwa 2–3 % pro Jahr. In Großstädten und Ballungsräumen war sie deutlich höher (4–6 %), in ländlichen Regionen teilweise unter 1 %.",
      },
      {
        question: "Kann ich die Miete unbegrenzt erhöhen?",
        answer:
          "Nein, in Deutschland gelten Kappungsgrenzen: Die Miete darf innerhalb von 3 Jahren maximal um 20 % steigen (in angespannten Wohnungsmärkten nur 15 %). Außerdem darf die Miete den ortsüblichen Mietspiegel nicht wesentlich übersteigen.",
      },
      {
        question: "Sollte ich mit der Inflation oder darüber kalkulieren?",
        answer:
          "Für konservative Prognosen empfiehlt sich eine Steigerungsrate auf Inflationsniveau (ca. 2 %). In gefragten Lagen können Sie realistisch mit 3–4 % rechnen. Kalkulieren Sie lieber vorsichtig — positive Überraschungen sind immer besser als negative.",
      },
    ],
  },

  "instandhaltungskosten-rechner": {
    features: [
      {
        title: "Peterssche Formel",
        description:
          "Berechnung der empfohlenen Instandhaltungsrücklage nach der bewährten Petersschen Formel.",
      },
      {
        title: "Altersabhängig",
        description:
          "Berücksichtigt das Baujahr der Immobilie — ältere Gebäude benötigen höhere Rücklagen.",
      },
      {
        title: "Monatliche und jährliche Rücklage",
        description:
          "Ergebnis sowohl als monatlicher als auch als jährlicher Betrag pro Quadratmeter.",
      },
      {
        title: "Vergleich mit Hausgeld",
        description:
          "Vergleichen Sie die empfohlene Rücklage mit dem tatsächlichen Hausgeld Ihrer WEG.",
      },
    ],
    seoText: [
      {
        heading: "Was ist die Peterssche Formel?",
        paragraphs: [
          "Die Peterssche Formel ist die bekannteste Methode zur Berechnung der Instandhaltungsrücklage für Immobilien. Sie besagt, dass über die Lebensdauer eines Gebäudes (80 Jahre) das 1,5-Fache der Herstellungskosten für Instandhaltung anfällt. Daraus lässt sich die jährlich empfohlene Rücklage ableiten.",
          "Für Investoren und Hausverwaltungen ist die richtige Instandhaltungsrücklage entscheidend: Zu niedrige Rücklagen führen zu Sonderumlagen und finanziellen Engpässen. Zu hohe Rücklagen binden unnötig Kapital. Unser Rechner hilft, den richtigen Betrag zu finden.",
        ],
      },
      {
        heading: "Wie viel Instandhaltungsrücklage ist empfehlenswert?",
        paragraphs: [
          "Als Faustregel gelten je nach Baujahr und Zustand: Neubauten 7–10 €/m² pro Jahr, Bestandsgebäude (20–40 Jahre) 10–14 €/m² pro Jahr, und Altbauten (über 40 Jahre) 14–20 €/m² pro Jahr. Die Peterssche Formel liefert einen genaueren Wert basierend auf den tatsächlichen Herstellungskosten.",
          "Tipp: Vergleichen Sie die empfohlene Rücklage mit dem tatsächlichen Hausgeld Ihrer Wohnungseigentümergemeinschaft. Liegt die tatsächliche Rücklage deutlich unter der Empfehlung, drohen langfristig Sonderumlagen.",
        ],
      },
    ],
    faq: [
      {
        question: "Was besagt die Peterssche Formel?",
        answer:
          "Die Peterssche Formel besagt, dass über die Lebensdauer eines Gebäudes (80 Jahre) das 1,5-Fache der reinen Herstellungskosten (ohne Grundstück) für Instandhaltung anfällt. Geteilt durch 80 Jahre ergibt sich die jährlich empfohlene Rücklage.",
      },
      {
        question: "Wie hoch sollte die Instandhaltungsrücklage pro Quadratmeter sein?",
        answer:
          "Für Neubauten empfehlen sich 7–10 €/m² pro Jahr, für Bestandsgebäude (20–40 Jahre) 10–14 €/m² und für Altbauten (über 40 Jahre) 14–20 €/m². Die genaue Höhe hängt von den Herstellungskosten und dem Zustand des Gebäudes ab.",
      },
      {
        question: "Was passiert bei zu niedriger Instandhaltungsrücklage?",
        answer:
          "Bei zu niedriger Rücklage müssen notwendige Reparaturen und Sanierungen durch Sonderumlagen finanziert werden. Das belastet Eigentümer finanziell und kann den Wert der Immobilie mindern, wenn Instandhaltung aufgeschoben wird.",
      },
    ],
  },

  "objektvergleich": {
    features: [
      {
        title: "Bis zu 3 Objekte vergleichen",
        description:
          "Stellen Sie bis zu drei Immobilien nebeneinander und vergleichen Sie alle relevanten Kennzahlen.",
      },
      {
        title: "Automatische Rendite-Berechnung",
        description:
          "Rendite, Cashflow und Kaufnebenkosten werden für jedes Objekt automatisch berechnet.",
      },
      {
        title: "Übersichtliche Gegenüberstellung",
        description:
          "Alle Kennzahlen in einer Vergleichstabelle — der beste Wert wird hervorgehoben.",
      },
      {
        title: "Schnellere Entscheidung",
        description:
          "Statt drei separate Berechnungen: Ein Vergleich, eine fundierte Entscheidung.",
      },
    ],
    seoText: [
      {
        heading: "Warum sollten Sie Immobilien vergleichen?",
        paragraphs: [
          "Beim Immobilienkauf stehen Investoren oft vor der Wahl zwischen mehreren Objekten. Der direkte Vergleich auf Basis harter Zahlen ist der beste Weg, die richtige Entscheidung zu treffen. Unser Objektvergleich stellt bis zu drei Immobilien nebeneinander und berechnet alle relevanten Kennzahlen automatisch.",
          "Verglichen werden: Kaufpreis, Kaufnebenkosten, Gesamtinvestition, Brutto- und Nettomietrendite, monatlicher Cashflow und der Eigenkapitalbedarf. So erkennen Sie auf einen Blick, welches Objekt die beste Rendite bietet und welches am besten zu Ihren finanziellen Möglichkeiten passt.",
        ],
      },
      {
        heading: "Auf welche Kennzahlen kommt es beim Vergleich an?",
        paragraphs: [
          "Die wichtigsten Vergleichskriterien sind: Nettomietrendite (wie profitabel ist das Objekt?), Cashflow (trägt sich die Immobilie selbst?), Eigenkapitalrendite (wie gut arbeitet Ihr eingesetztes Kapital?) und die Gesamtinvestition (wie viel Kapital müssen Sie aufbringen?).",
          "Beachten Sie: Die beste Rendite bedeutet nicht automatisch das beste Investment. Lage, Zustand, Mieterstruktur und Wertsteigerungspotenzial sind qualitative Faktoren, die der Rechner nicht abbilden kann — aber die Zahlen liefern eine solide Grundlage für Ihre Entscheidung.",
        ],
      },
    ],
    faq: [
      {
        question: "Wie viele Immobilien kann ich gleichzeitig vergleichen?",
        answer:
          "Unser Objektvergleich ermöglicht den Vergleich von bis zu 3 Immobilien gleichzeitig. Geben Sie für jedes Objekt Kaufpreis, Mieteinnahmen und die wichtigsten Kosten ein — der Rest wird automatisch berechnet.",
      },
      {
        question: "Welche Kennzahlen werden verglichen?",
        answer:
          "Der Vergleich umfasst: Kaufpreis, Kaufnebenkosten, Gesamtinvestition, Bruttomietrendite, Nettomietrendite, Eigenkapitalrendite, monatlicher Cashflow und Eigenkapitalbedarf.",
      },
      {
        question: "Kann ich den Vergleich exportieren oder speichern?",
        answer:
          "Als registrierter Nutzer können Sie Ihre Vergleiche speichern und als PDF exportieren. In der kostenlosen Testversion sehen Sie alle Ergebnisse direkt im Browser.",
      },
    ],
  },

  "tilgungsplan-generator": {
    features: [
      {
        title: "Detaillierter Tilgungsplan",
        description:
          "Monat für Monat aufgeschlüsselt: Rate, Zinsanteil, Tilgungsanteil und Restschuld.",
      },
      {
        title: "PDF-Export",
        description:
          "Tilgungsplan als professionelles PDF herunterladen — ideal für Bank-Termine und Beratungsgespräche.",
      },
      {
        title: "Sondertilgung einplanbar",
        description:
          "Jährliche Sondertilgungen im Tilgungsplan berücksichtigen und die Auswirkung sehen.",
      },
      {
        title: "Jahresübersicht",
        description:
          "Kompakte Jahresübersicht mit Gesamttilgung, Gesamtzinsen und Restschuld je Jahr.",
      },
    ],
    seoText: [
      {
        heading: "Wozu braucht man einen Tilgungsplan?",
        paragraphs: [
          "Ein Tilgungsplan zeigt die vollständige Rückzahlung eines Immobiliendarlehens — Monat für Monat oder Jahr für Jahr. Er schlüsselt jede Rate in Zinsanteil und Tilgungsanteil auf und zeigt die verbleibende Restschuld. Für Investoren und Eigennutzer ist der Tilgungsplan ein unverzichtbares Planungsinstrument.",
          "Banken erstellen bei der Finanzierung einen Tilgungsplan, aber oft nur für die Zinsbindungsfrist. Unser Generator erstellt den vollständigen Plan bis zur Volltilgung und berücksichtigt dabei auch Sondertilgungen.",
        ],
      },
      {
        heading: "Tilgungsplan als Verhandlungsgrundlage",
        paragraphs: [
          "Ein detaillierter Tilgungsplan ist die ideale Vorbereitung für Bankgespräche. Er zeigt, dass Sie Ihre Finanzierung durchdacht haben und die Rückzahlungsdynamik verstehen. Außerdem können Sie verschiedene Szenarien durchspielen: Was passiert bei 2 % vs. 3 % Tilgung? Wie wirkt sich eine Sondertilgung von 10.000 € pro Jahr aus?",
          "Der PDF-Export ermöglicht es, den Tilgungsplan auszudrucken oder digital an Ihren Finanzberater zu senden. So haben alle Beteiligten die gleiche Informationsgrundlage.",
        ],
      },
    ],
    faq: [
      {
        question: "Was zeigt ein Tilgungsplan genau?",
        answer:
          "Ein Tilgungsplan zeigt für jede Periode (Monat oder Jahr): die Gesamtrate, den Zinsanteil, den Tilgungsanteil und die verbleibende Restschuld. So sehen Sie genau, wie sich das Verhältnis von Zinsen zu Tilgung über die Laufzeit verschiebt.",
      },
      {
        question: "Kann ich den Tilgungsplan als PDF herunterladen?",
        answer:
          "Ja, als registrierter Nutzer können Sie den Tilgungsplan als professionell formatiertes PDF herunterladen. Das PDF enthält eine Monatsübersicht und eine Jahresübersicht.",
      },
      {
        question: "Wie wirken sich Sondertilgungen im Tilgungsplan aus?",
        answer:
          "Sondertilgungen reduzieren die Restschuld sofort. Dadurch sinken die Zinskosten in den Folgeperioden und die Gesamtlaufzeit verkürzt sich. Im Tilgungsplan sehen Sie den Unterschied direkt Monat für Monat.",
      },
    ],
  },

  "kaufen-vs-mieten": {
    features: [
      {
        title: "Gesamtkosten-Vergleich",
        description:
          "Vergleichen Sie die Gesamtkosten von Kaufen und Mieten über einen frei wählbaren Zeitraum.",
      },
      {
        title: "Vermögensaufbau",
        description:
          "Sehen Sie, wie sich Ihr Vermögen bei Kauf (Tilgung + Wertsteigerung) vs. Miete (Geldanlage) entwickelt.",
      },
      {
        title: "Break-Even-Punkt",
        description:
          "Erfahren Sie, ab welchem Jahr sich der Kauf finanziell gegenüber der Miete lohnt.",
      },
      {
        title: "Individuelle Parameter",
        description:
          "Mietsteigerung, Wertsteigerung, Anlagezins und Inflation individuell anpassbar.",
      },
    ],
    seoText: [
      {
        heading: "Kaufen oder Mieten — was lohnt sich mehr?",
        paragraphs: [
          "Die Frage 'Kaufen oder Mieten?' ist eine der wichtigsten finanziellen Entscheidungen im Leben. Es gibt keine pauschale Antwort — sie hängt von Kaufpreis, Mietkosten, Zinsniveau, Wertsteigerung, Anlagehorizont und persönlichen Lebensumständen ab. Unser Rechner vergleicht beide Optionen auf Basis Ihrer individuellen Zahlen.",
          "Der Vergleich berücksichtigt alle relevanten Faktoren: Beim Kauf die Kreditkosten, Kaufnebenkosten, Instandhaltung und Wertsteigerung. Bei der Miete die Mietkosten, Mietsteigerung und die alternative Geldanlage des nicht eingesetzten Eigenkapitals.",
        ],
      },
      {
        heading: "Wann lohnt sich der Kauf einer Immobilie?",
        paragraphs: [
          "Grundsätzlich gilt: Je länger Sie in der Immobilie wohnen, desto eher lohnt sich der Kauf. Die Kaufnebenkosten (7–15 % des Kaufpreises) müssen erst einmal durch Wertsteigerung und eingesparte Miete amortisiert werden. In der Regel liegt der Break-Even-Punkt zwischen 8 und 15 Jahren.",
          "Niedrige Zinsen, moderate Kaufpreise und eine langfristige Wohnperspektive sprechen für den Kauf. Hohe Kaufpreise, kurzer Anlagehorizont und berufliche Flexibilität sprechen eher für die Miete. Unser Rechner zeigt Ihnen den Break-Even-Punkt für Ihre konkrete Situation.",
        ],
      },
    ],
    faq: [
      {
        question: "Ab wann lohnt sich Kaufen gegenüber Mieten?",
        answer:
          "Der Break-Even-Punkt liegt in der Regel zwischen 8 und 15 Jahren — abhängig von Kaufpreis, Miete, Zinsniveau und Wertsteigerung. Unser Rechner berechnet den genauen Zeitpunkt für Ihre individuelle Situation.",
      },
      {
        question: "Welche Kosten werden beim Vergleich berücksichtigt?",
        answer:
          "Beim Kauf: Kaufpreis, Kaufnebenkosten, Kreditrate, Instandhaltung, Versicherungen und Grundsteuer. Bei der Miete: Kaltmiete, Mietsteigerung und die Rendite einer alternativen Geldanlage für das Eigenkapital.",
      },
      {
        question: "Ist Mieten wirklich rausgeworfenes Geld?",
        answer:
          "Nein. Mieten gibt Ihnen Flexibilität und bindet kein Kapital. Das Eigenkapital, das Sie beim Kauf einsetzen würden, kann alternativ in ETFs oder andere Anlagen investiert werden. Ob sich der Kauf lohnt, hängt vom Verhältnis Kaufpreis zu Miete und der Wertentwicklung ab.",
      },
    ],
  },

  "vorfaelligkeitsentschaedigung-rechner": {
    features: [
      {
        title: "Entschädigung berechnen",
        description:
          "Berechnen Sie die voraussichtliche Vorfälligkeitsentschädigung bei vorzeitiger Kreditablösung.",
      },
      {
        title: "Sondertilgungsrecht berücksichtigt",
        description:
          "Bereits vereinbarte Sondertilgungsrechte werden von der Entschädigung abgezogen.",
      },
      {
        title: "Zwei Berechnungsmethoden",
        description:
          "Berechnung nach Aktiv-Passiv-Methode und nach Zinsmargenschaden-Methode.",
      },
      {
        title: "Restlaufzeit-Analyse",
        description:
          "Sehen Sie, wie sich die Entschädigung mit abnehmender Restlaufzeit verändert.",
      },
    ],
    seoText: [
      {
        heading: "Was ist eine Vorfälligkeitsentschädigung?",
        paragraphs: [
          "Eine Vorfälligkeitsentschädigung (VFE) ist der Betrag, den eine Bank verlangt, wenn Sie einen Immobilienkredit vor Ablauf der Zinsbindungsfrist zurückzahlen. Die Bank verliert dadurch die geplanten Zinseinnahmen und darf sich für diesen Verlust entschädigen lassen. Die VFE kann mehrere tausend Euro betragen.",
          "Typische Gründe für eine vorzeitige Kreditablösung sind: Verkauf der Immobilie, Umschuldung auf einen günstigeren Kredit oder die Nutzung einer Erbschaft zur Ablösung. In all diesen Fällen sollten Sie die voraussichtliche Vorfälligkeitsentschädigung vorab berechnen.",
        ],
      },
      {
        heading: "Wie wird die Vorfälligkeitsentschädigung berechnet?",
        paragraphs: [
          "Die Berechnung erfolgt nach der Aktiv-Passiv-Methode: Die Bank vergleicht die entgangenen Zinsen (Vertragszins) mit dem Zins, den sie am Kapitalmarkt für die Restlaufzeit erzielen kann (Wiederanlagezins). Die Differenz, multipliziert mit der Restschuld und Restlaufzeit, ergibt die VFE.",
          "Wichtig: Nach 10 Jahren Laufzeit haben Sie ein gesetzliches Sonderkündigungsrecht (§ 489 BGB) — dann fällt keine Vorfälligkeitsentschädigung an. Außerdem müssen vereinbarte Sondertilgungsrechte von der Entschädigung abgezogen werden.",
        ],
      },
    ],
    faq: [
      {
        question: "Wie hoch ist eine typische Vorfälligkeitsentschädigung?",
        answer:
          "Die Höhe hängt von Restschuld, Restlaufzeit und Zinsdifferenz ab. Bei einem Darlehen von 250.000 € mit 5 Jahren Restlaufzeit und 1,5 % Zinsdifferenz kann die VFE 15.000–20.000 € betragen.",
      },
      {
        question: "Kann ich die Vorfälligkeitsentschädigung vermeiden?",
        answer:
          "Ja, nach 10 Jahren Darlehenslaufzeit haben Sie gemäß § 489 BGB ein gesetzliches Sonderkündigungsrecht mit 6 Monaten Kündigungsfrist — ohne Vorfälligkeitsentschädigung. Auch bei fehlerhafter Widerrufsbelehrung kann die VFE entfallen.",
      },
      {
        question: "Wird das Sondertilgungsrecht angerechnet?",
        answer:
          "Ja, die Bank muss vereinbarte Sondertilgungsrechte bei der Berechnung der VFE berücksichtigen. Ein Sondertilgungsrecht von 5 % pro Jahr reduziert die Entschädigung entsprechend.",
      },
    ],
  },

  "beleihungswert-rechner": {
    features: [
      {
        title: "Beleihungswert ermitteln",
        description:
          "Berechnen Sie den Beleihungswert Ihrer Immobilie auf Basis des Kaufpreises oder Verkehrswertes.",
      },
      {
        title: "Maximales Darlehen",
        description:
          "Erfahren Sie, wie viel Kredit Ihnen die Bank auf Basis der Beleihungsgrenze maximal gewährt.",
      },
      {
        title: "Eigenkapitalbedarf",
        description:
          "Sehen Sie sofort, wie viel Eigenkapital Sie für Ihre Wunschimmobilie benötigen.",
      },
      {
        title: "Verschiedene Beleihungsausläufe",
        description:
          "Vergleichen Sie 60 %, 80 % und 100 % Beleihungsauslauf und deren Auswirkung auf den Zinssatz.",
      },
    ],
    seoText: [
      {
        heading: "Was ist der Beleihungswert einer Immobilie?",
        paragraphs: [
          "Der Beleihungswert ist der Wert, den eine Bank einer Immobilie als Sicherheit für ein Darlehen zuweist. Er liegt in der Regel 10–20 % unter dem Kaufpreis oder Verkehrswert, da die Bank einen Sicherheitsabschlag einrechnet. Auf Basis des Beleihungswerts bestimmt die Bank das maximale Darlehen.",
          "Die Beleihungsgrenze gibt an, bis zu welchem Prozentsatz des Beleihungswerts die Bank einen Kredit gewährt. Üblich sind 60–80 % für erstrangige Darlehen. Je niedriger der Beleihungsauslauf, desto günstiger ist in der Regel der Zinssatz — die Bank hat mehr Sicherheit.",
        ],
      },
      {
        heading: "Wie viel Eigenkapital brauche ich für den Immobilienkauf?",
        paragraphs: [
          "Banken erwarten in der Regel, dass Sie die Kaufnebenkosten (7–15 %) aus Eigenkapital bezahlen. Darüber hinaus empfehlen Experten mindestens 20 % des Kaufpreises als Eigenkapital. Bei einem Kaufpreis von 400.000 € bedeutet das: 30.000–60.000 € Kaufnebenkosten plus 80.000 € Eigenkapital — insgesamt 110.000–140.000 €.",
          "Eine 100 %-Finanzierung (ohne Eigenkapital für den Kaufpreis) ist möglich, wird aber mit deutlich höheren Zinsen bestraft. Unser Rechner zeigt Ihnen, wie sich verschiedene Eigenkapitalquoten auf die Finanzierung auswirken.",
        ],
      },
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen Beleihungswert und Verkehrswert?",
        answer:
          "Der Verkehrswert ist der am Markt erzielbare Preis einer Immobilie. Der Beleihungswert ist der von der Bank angesetzte Sicherheitenwert und liegt in der Regel 10–20 % unter dem Verkehrswert. Er dient als Grundlage für die Kreditvergabe.",
      },
      {
        question: "Was bedeutet Beleihungsauslauf?",
        answer:
          "Der Beleihungsauslauf gibt an, wie viel Prozent des Beleihungswerts durch das Darlehen ausgeschöpft werden. Bei einem Beleihungswert von 350.000 € und einem Darlehen von 280.000 € beträgt der Beleihungsauslauf 80 %.",
      },
      {
        question: "Bekomme ich einen besseren Zinssatz mit mehr Eigenkapital?",
        answer:
          "Ja, je mehr Eigenkapital Sie einsetzen, desto niedriger ist der Beleihungsauslauf und desto günstiger der Zinssatz. Der größte Zinssprung liegt meist bei 60 % Beleihungsauslauf — darunter bieten viele Banken ihre besten Konditionen.",
      },
    ],
  },

  "nebenkostenabrechnung-rechner": {
    features: [
      {
        title: "Umlegbare Kosten aufschlüsseln",
        description:
          "Alle umlagefähigen Betriebskosten nach der Betriebskostenverordnung (BetrKV) erfassen.",
      },
      {
        title: "Verteilerschlüssel",
        description:
          "Kosten nach Wohnfläche, Personenzahl oder Verbrauch auf Mieter umlegen.",
      },
      {
        title: "Nicht-umlegbare Kosten trennen",
        description:
          "Sauber zwischen umlegbaren und nicht-umlegbaren Kosten unterscheiden.",
      },
      {
        title: "Nachzahlung oder Guthaben",
        description:
          "Sofort sehen, ob der Mieter eine Nachzahlung leisten muss oder ein Guthaben erhält.",
      },
    ],
    seoText: [
      {
        heading: "Nebenkostenabrechnung erstellen — was Vermieter wissen müssen",
        paragraphs: [
          "Die Nebenkostenabrechnung ist für viele Vermieter und Hausverwaltungen eine jährliche Herausforderung. Sie muss innerhalb von 12 Monaten nach Ende des Abrechnungszeitraums zugestellt werden, sonst verfällt der Anspruch auf Nachzahlungen. Unser Rechner hilft, die Abrechnung korrekt und übersichtlich zu erstellen.",
          "Die Betriebskostenverordnung (BetrKV) definiert 17 umlagefähige Kostenarten — von Grundsteuer über Wasserversorgung bis zur Gebäudeversicherung. Kosten für Instandhaltung, Verwaltung und Bankgebühren sind hingegen nicht umlegbar und müssen vom Vermieter getragen werden.",
        ],
      },
      {
        heading: "Verteilerschlüssel richtig anwenden",
        paragraphs: [
          "Der Verteilerschlüssel bestimmt, wie die Gesamtkosten auf die einzelnen Mieter aufgeteilt werden. Die gängigsten Schlüssel sind: Wohnfläche (m²), Personenzahl oder Wohneinheiten. Verbrauchsabhängige Kosten wie Heizung und Wasser werden nach tatsächlichem Verbrauch abgerechnet.",
          "Wurde im Mietvertrag kein Verteilerschlüssel vereinbart, gilt laut Gesetz die Wohnfläche als Maßstab. Bei Heizkosten ist die Abrechnung nach Verbrauch gesetzlich vorgeschrieben (Heizkostenverordnung).",
        ],
      },
    ],
    faq: [
      {
        question: "Welche Nebenkosten darf ich auf den Mieter umlegen?",
        answer:
          "Umlegbar sind die in der Betriebskostenverordnung (BetrKV) genannten 17 Kostenarten, darunter: Grundsteuer, Wasserversorgung, Entwässerung, Heizung, Warmwasser, Aufzug, Straßenreinigung, Müllabfuhr, Gebäudereinigung, Gartenpflege, Beleuchtung, Schornsteinreinigung, Versicherungen und Hausmeister.",
      },
      {
        question: "Bis wann muss die Nebenkostenabrechnung zugestellt werden?",
        answer:
          "Die Abrechnung muss innerhalb von 12 Monaten nach Ende des Abrechnungszeitraums beim Mieter eingehen. Beispiel: Für den Abrechnungszeitraum 2025 muss die Abrechnung bis spätestens 31. Dezember 2026 zugestellt werden. Danach verfallen Nachforderungen.",
      },
      {
        question: "Was ist der häufigste Fehler bei der Nebenkostenabrechnung?",
        answer:
          "Die häufigsten Fehler sind: Umlage nicht-umlegbarer Kosten (z. B. Instandhaltung), falscher Verteilerschlüssel, fehlende Einzelaufstellung der Kostenpositionen und verspätete Zustellung. All das kann zur Unwirksamkeit der Abrechnung führen.",
      },
    ],
  },

  "mieterhoehungs-rechner": {
    features: [
      {
        title: "Kappungsgrenze berechnen",
        description:
          "Automatische Prüfung der 20 %- bzw. 15 %-Kappungsgrenze über 3 Jahre.",
      },
      {
        title: "Frühester Erhöhungszeitpunkt",
        description:
          "Berechnung des frühestmöglichen Zeitpunkts für die nächste Mieterhöhung.",
      },
      {
        title: "Angespannte Wohnungsmärkte",
        description:
          "Berücksichtigt, ob die Immobilie in einem Gebiet mit angespanntem Wohnungsmarkt liegt (15 %-Grenze).",
      },
      {
        title: "Vergleich mit Mietspiegel",
        description:
          "Prüfen Sie, ob die gewünschte Miete im Rahmen der ortsüblichen Vergleichsmiete liegt.",
      },
    ],
    seoText: [
      {
        heading: "Mieterhöhung in Deutschland — die wichtigsten Regeln",
        paragraphs: [
          "Mieterhöhungen sind in Deutschland streng reguliert. Vermieter können die Miete nicht willkürlich erhöhen, sondern müssen sich an gesetzliche Vorgaben halten. Die wichtigsten Instrumente sind: Anpassung an die ortsübliche Vergleichsmiete (§ 558 BGB), Mieterhöhung nach Modernisierung (§ 559 BGB) und die Staffelmiete.",
          "Unser Mieterhöhungs-Rechner konzentriert sich auf die häufigste Form: die Anpassung an die ortsübliche Vergleichsmiete. Er prüft automatisch die Kappungsgrenze und berechnet den frühestmöglichen Erhöhungszeitpunkt.",
        ],
      },
      {
        heading: "Was ist die Kappungsgrenze?",
        paragraphs: [
          "Die Kappungsgrenze begrenzt die maximale Mieterhöhung innerhalb von 3 Jahren auf 20 % der Ausgangsmiete. In Gebieten mit angespanntem Wohnungsmarkt (viele deutsche Großstädte) gilt eine verschärfte Kappungsgrenze von 15 %. Die Miete darf außerdem die ortsübliche Vergleichsmiete nicht übersteigen.",
          "Beispiel: Bei einer aktuellen Miete von 800 € darf die Miete in 3 Jahren um maximal 160 € (20 %) bzw. 120 € (15 % in angespannten Märkten) steigen. Eine Mieterhöhung ist frühestens 15 Monate nach der letzten Erhöhung zulässig.",
        ],
      },
    ],
    faq: [
      {
        question: "Wie oft darf die Miete erhöht werden?",
        answer:
          "Eine Mieterhöhung zur Anpassung an die ortsübliche Vergleichsmiete ist frühestens 12 Monate nach der letzten Erhöhung zulässig, wird aber erst nach weiteren 3 Monaten (Überlegungsfrist des Mieters) wirksam — also de facto alle 15 Monate.",
      },
      {
        question: "Was gilt die 15 % oder die 20 % Kappungsgrenze?",
        answer:
          "In Gebieten mit angespanntem Wohnungsmarkt gilt die verschärfte Kappungsgrenze von 15 %. Ob Ihre Stadt dazu gehört, legt die jeweilige Landesregierung per Verordnung fest. In allen anderen Gebieten gilt die reguläre Grenze von 20 %.",
      },
      {
        question: "Muss der Mieter der Mieterhöhung zustimmen?",
        answer:
          "Ja, bei einer Anpassung an die ortsübliche Vergleichsmiete muss der Mieter der Erhöhung zustimmen. Er hat dafür eine Überlegungsfrist bis zum Ende des zweiten Monats nach Zugang des Erhöhungsverlangens. Stimmt er nicht zu, kann der Vermieter auf Zustimmung klagen.",
      },
    ],
  },

  "wohnflaechenberechnung": {
    features: [
      {
        title: "Berechnung nach WoFlV",
        description:
          "Korrekte Wohnflächenberechnung nach der Wohnflächenverordnung — dem deutschen Standard.",
      },
      {
        title: "Dachschrägen berücksichtigt",
        description:
          "Automatische Anrechnung von Flächen unter Dachschrägen (ab 1 m Höhe 50 %, ab 2 m voll).",
      },
      {
        title: "Balkone und Terrassen",
        description:
          "Balkone, Loggien und Terrassen werden mit 25 % der Fläche angerechnet.",
      },
      {
        title: "Raumweise Eingabe",
        description:
          "Jeden Raum einzeln erfassen mit individuellen Besonderheiten wie Schrägen oder Nischen.",
      },
    ],
    seoText: [
      {
        heading: "Wohnfläche korrekt berechnen nach der WoFlV",
        paragraphs: [
          "Die korrekte Wohnflächenberechnung ist für Vermieter, Käufer und Hausverwaltungen von großer Bedeutung. Eine falsch berechnete Wohnfläche kann zu Mietkürzungen, Kaufpreiskorrekturen oder Problemen bei der Nebenkostenabrechnung führen. In Deutschland ist die Wohnflächenverordnung (WoFlV) der maßgebliche Standard.",
          "Die WoFlV unterscheidet zwischen voll anrechenbaren Flächen (normale Räume), teilweise anrechenbaren Flächen (Dachschrägen, Balkone) und nicht anrechenbaren Flächen (Keller, Garagen, Heizungsräume). Unser Rechner berücksichtigt alle Regeln automatisch.",
        ],
      },
      {
        heading: "Welche Flächen werden wie angerechnet?",
        paragraphs: [
          "Vollständig angerechnet werden: Alle Wohnräume, Küchen, Bäder, Flure und Abstellräume mit einer lichten Raumhöhe ab 2 Meter. Flächen unter Dachschrägen mit einer Höhe von 1 bis 2 Metern werden zu 50 % angerechnet, unter 1 Meter gar nicht.",
          "Balkone, Loggien, Dachgärten und Terrassen werden in der Regel zu 25 % angerechnet — bei besonders guter Ausstattung oder Lage bis zu 50 %. Nicht anrechenbar sind: Kellerräume, Waschküchen, Heizungsräume, Garagen und Abstellräume außerhalb der Wohnung.",
        ],
      },
    ],
    faq: [
      {
        question: "Wie werden Dachschrägen bei der Wohnfläche berechnet?",
        answer:
          "Flächen unter Dachschrägen mit einer lichten Höhe von 1 bis 2 Metern werden zu 50 % angerechnet. Flächen unter 1 Meter Höhe zählen nicht zur Wohnfläche. Flächen ab 2 Meter Höhe werden voll angerechnet.",
      },
      {
        question: "Zählt der Balkon zur Wohnfläche?",
        answer:
          "Ja, aber nur anteilig. Balkone, Loggien und Terrassen werden nach WoFlV in der Regel zu 25 % der Fläche angerechnet. Bei besonders guter Ausstattung oder Lage kann die Anrechnung bis zu 50 % betragen.",
      },
      {
        question: "Was passiert, wenn die Wohnfläche im Mietvertrag falsch angegeben ist?",
        answer:
          "Weicht die tatsächliche Wohnfläche um mehr als 10 % von der im Mietvertrag angegebenen Fläche ab, kann der Mieter die Miete mindern oder fristlos kündigen. Umgekehrt kann der Vermieter bei einer größeren tatsächlichen Fläche die Miete anpassen.",
      },
    ],
  },
}

/**
 * Gibt die SEO-Daten fuer einen Rechner anhand seines Slugs zurueck.
 * Gibt undefined zurueck, wenn kein Eintrag existiert.
 */
export function getRechnerSeoData(slug: string): RechnerSeoData | undefined {
  return rechnerSeoData[slug]
}
