import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen — Immobilien-Rechner",
  robots: "noindex",
}

export default function AGBPage() {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-2xl prose prose-sm">
        <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>
        <p>Stand: 30.03.2026</p>

        <h2>§ 1 Geltungsbereich</h2>
        <p>
          (1) Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung des
          Online-Dienstes „Immobilien-Rechner" (nachfolgend „Dienst"), betrieben
          von der Speckmann Webdesign GmbH, Dwaschweg 5, 26133 Oldenburg
          (nachfolgend „Anbieter").
        </p>
        <p>
          (2) Der Dienst richtet sich an Unternehmer im Sinne des § 14 BGB
          sowie an Verbraucher im Sinne des § 13 BGB.
        </p>
        <p>
          (3) Abweichende Geschäftsbedingungen des Kunden werden nicht
          anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich
          schriftlich zu.
        </p>

        <h2>§ 2 Vertragsgegenstand</h2>
        <p>
          (1) Der Anbieter stellt dem Kunden über das Internet eine
          Software-as-a-Service-Lösung (SaaS) zur Nutzung von
          Immobilien-Rechnern bereit.
        </p>
        <p>
          (2) Der genaue Leistungsumfang ergibt sich aus dem gewählten
          Abo-Plan (Starter, Pro, Business) und der jeweiligen aktuellen
          Leistungsbeschreibung auf der Website.
        </p>
        <p>
          (3) Die Rechner-Ergebnisse dienen ausschließlich als unverbindliche
          Richtwerte und ersetzen keine professionelle Beratung. Der Anbieter
          übernimmt keine Haftung für wirtschaftliche Entscheidungen auf Basis
          der Berechnungen.
        </p>

        <h2>§ 3 Registrierung und Account</h2>
        <p>
          (1) Die Nutzung des Dienstes erfordert eine Registrierung. Der Kunde
          ist verpflichtet, wahrheitsgemäße Angaben zu machen.
        </p>
        <p>
          (2) Der Kunde ist für die Sicherheit seiner Zugangsdaten
          verantwortlich. Der Anbieter haftet nicht für Schäden durch
          unbefugte Nutzung des Accounts.
        </p>
        <p>
          (3) Jede natürliche oder juristische Person darf nur einen Account
          registrieren.
        </p>

        <h2>§ 4 Kostenloser Testzeitraum</h2>
        <p>
          (1) Neue Kunden erhalten einen kostenlosen Testzeitraum von 7 Tagen
          mit Zugang zu allen Funktionen.
        </p>
        <p>
          (2) Nach Ablauf des Testzeitraums wird der Zugang zu den Rechnern
          gesperrt, bis ein kostenpflichtiges Abo abgeschlossen wird.
        </p>
        <p>
          (3) Gespeicherte Einstellungen (Domains, API-Keys, Profildaten)
          bleiben erhalten.
        </p>

        <h2>§ 5 Preise und Zahlung</h2>
        <p>
          (1) Die aktuellen Preise sind auf der Preisseite einsehbar. Alle
          Preise sind Bruttopreise inklusive der gesetzlichen Mehrwertsteuer
          von 19%.
        </p>
        <p>
          (2) Die Abrechnung erfolgt monatlich oder jährlich im Voraus,
          abhängig vom gewählten Abrechnungsintervall.
        </p>
        <p>
          (3) Die Zahlungsabwicklung erfolgt über Stripe. Es gelten zusätzlich
          die Nutzungsbedingungen von Stripe.
        </p>
        <p>
          (4) Bei Zahlungsverzug ist der Anbieter berechtigt, den Zugang zum
          Dienst zu sperren, bis die ausstehenden Zahlungen beglichen sind.
        </p>

        <h2>§ 6 Einbettung (Embed)</h2>
        <p>
          (1) Je nach gewähltem Plan kann der Kunde Rechner auf
          Drittanbieter-Websites einbetten.
        </p>
        <p>
          (2) Der Kunde ist für die rechtskonforme Einbettung auf seiner
          Website verantwortlich, insbesondere für erforderliche Hinweise in
          seiner eigenen Datenschutzerklärung.
        </p>
        <p>
          (3) Jeder eingebettete Rechner zeigt den Hinweis „Berechnet mit
          immobilien-rechner.net". Dieser Hinweis darf nicht entfernt oder
          verdeckt werden.
        </p>
        <p>
          (4) API-Keys sind vertraulich zu behandeln. Der Kunde haftet für
          Missbrauch seiner API-Keys.
        </p>
        <p>
          (5) Bei Kündigung oder Ablauf des Abos werden eingebettete Rechner
          deaktiviert und durch einen entsprechenden Hinweis ersetzt.
        </p>

        <h2>§ 7 Laufzeit und Kündigung</h2>
        <p>
          (1) Der Vertrag wird auf unbestimmte Zeit geschlossen und kann von
          beiden Seiten jederzeit zum Ende der laufenden Abrechnungsperiode
          gekündigt werden.
        </p>
        <p>
          (2) Die Kündigung erfolgt über das Abrechnungsportal im Dashboard
          oder per E-Mail an info@speckmann-webdesign.de.
        </p>
        <p>
          (3) Bei Kündigung bleibt der Zugang bis zum Ende der bezahlten
          Laufzeit bestehen.
        </p>
        <p>
          (4) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund
          bleibt unberührt.
        </p>

        <h2>§ 8 Verfügbarkeit</h2>
        <p>
          (1) Der Anbieter bemüht sich um eine Verfügbarkeit von 99% im
          Jahresmittel. Geplante Wartungsarbeiten werden nach Möglichkeit
          vorab angekündigt.
        </p>
        <p>
          (2) Der Anbieter haftet nicht für Ausfälle, die durch höhere Gewalt,
          Störungen beim Hosting-Provider oder Netzwerkprobleme verursacht
          werden.
        </p>

        <h2>§ 9 Haftung</h2>
        <p>
          (1) Der Anbieter haftet unbeschränkt für Vorsatz und grobe
          Fahrlässigkeit.
        </p>
        <p>
          (2) Für leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung
          wesentlicher Vertragspflichten (Kardinalpflichten) und beschränkt auf
          den vorhersehbaren, vertragstypischen Schaden.
        </p>
        <p>
          (3) Die Haftung für Schäden aus der Verletzung des Lebens, des
          Körpers oder der Gesundheit bleibt unberührt.
        </p>
        <p>
          (4) Der Anbieter übernimmt keine Haftung für die Richtigkeit der
          Berechnungsergebnisse. Die Rechner dienen als Orientierungshilfe und
          ersetzen keine professionelle Beratung durch Steuerberater, Makler
          oder Finanzberater.
        </p>

        <h2>§ 10 Datenschutz</h2>
        <p>
          Die Erhebung und Verarbeitung personenbezogener Daten erfolgt gemäß
          unserer{" "}
          <a href="/datenschutz">Datenschutzerklärung</a>.
        </p>

        <h2>§ 11 Account-Löschung</h2>
        <p>
          (1) Der Kunde kann seinen Account jederzeit über die
          Profileinstellungen löschen.
        </p>
        <p>
          (2) Bei der Löschung werden alle personenbezogenen Daten
          unwiderruflich entfernt, soweit keine gesetzlichen
          Aufbewahrungspflichten bestehen.
        </p>
        <p>
          (3) Ein aktives Abo wird bei Stripe automatisch gekündigt.
        </p>

        <h2>§ 12 Änderungen der AGB</h2>
        <p>
          (1) Der Anbieter behält sich vor, diese AGB zu ändern, soweit dies
          aufgrund von Gesetzesänderungen, Änderungen der Rechtsprechung oder
          Änderungen des Dienstes erforderlich ist.
        </p>
        <p>
          (2) Über Änderungen wird der Kunde per E-Mail informiert. Die
          Änderungen gelten als genehmigt, wenn der Kunde nicht innerhalb von
          vier Wochen nach Zugang der Änderungsmitteilung widerspricht.
        </p>

        <h2>§ 13 Schlussbestimmungen</h2>
        <p>
          (1) Es gilt das Recht der Bundesrepublik Deutschland unter
          Ausschluss des UN-Kaufrechts.
        </p>
        <p>
          (2) Für Unternehmer ist der Gerichtsstand Oldenburg.
        </p>
        <p>
          (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder
          werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
        </p>
      </div>
    </div>
  )
}
