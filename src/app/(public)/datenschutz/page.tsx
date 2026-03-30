import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Immobilien-Rechner",
  robots: "noindex",
}

export default function DatenschutzPage() {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-2xl prose prose-sm">
        <h1>Datenschutzerklärung</h1>
        <p>Stand: 30.03.2026</p>

        <h2>1. Verantwortlicher</h2>
        <p>
          Speckmann Webdesign GmbH
          <br />
          Dwaschweg 5<br />
          26133 Oldenburg
          <br />
          E-Mail: info@speckmann-webdesign.de
          <br />
          Telefon: 0152 0870 9068
        </p>

        <h2>2. Übersicht der Verarbeitungen</h2>
        <p>
          Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und
          die Zwecke ihrer Verarbeitung zusammen und verweist auf die
          betroffenen Personen.
        </p>
        <ul>
          <li>
            <strong>Bestandsdaten:</strong> Name, E-Mail-Adresse, Firma,
            Rechnungsadresse
          </li>
          <li>
            <strong>Nutzungsdaten:</strong> Aufgerufene Rechner, Zeitpunkt der
            Nutzung, Embed-Aufrufe
          </li>
          <li>
            <strong>Zahlungsdaten:</strong> Werden ausschließlich von Stripe
            verarbeitet (siehe Abschnitt 8)
          </li>
          <li>
            <strong>Kommunikationsdaten:</strong> E-Mail-Adressen für
            Transaktions-E-Mails
          </li>
        </ul>

        <h2>3. Rechtsgrundlagen</h2>
        <p>
          Wir verarbeiten personenbezogene Daten auf Grundlage folgender
          Rechtsgrundlagen:
        </p>
        <ul>
          <li>
            <strong>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</strong>{" "}
            Bereitstellung des Dienstes, Abrechnung, Account-Verwaltung
          </li>
          <li>
            <strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong>{" "}
            Newsletter, optionale Analyse-Cookies
          </li>
          <li>
            <strong>
              Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO):
            </strong>{" "}
            Fehlererkennung, Missbrauchsschutz, Verbesserung des Dienstes
          </li>
        </ul>

        <h2>4. Erhebung und Speicherung personenbezogener Daten</h2>

        <h3>4.1 Registrierung und Account</h3>
        <p>
          Bei der Registrierung erheben wir Ihre E-Mail-Adresse und optional
          Ihren Namen. Bei der Anmeldung über Google erhalten wir zusätzlich Ihr
          Profilbild und Ihren Namen von Google. Diese Daten werden für die
          Dauer Ihres Accounts gespeichert.
        </p>

        <h3>4.2 Rechnungsdaten</h3>
        <p>
          Für die Rechnungsstellung können Sie optional Firma, USt-IdNr. und
          Rechnungsadresse hinterlegen. Diese Daten werden an Stripe zur
          Rechnungserstellung übermittelt.
        </p>

        <h3>4.3 Nutzungsdaten</h3>
        <p>
          Wir erfassen, welche Rechner Sie nutzen und wann, um Ihnen
          Nutzungsstatistiken im Dashboard anzuzeigen. Für eingebettete Rechner
          erfassen wir die Anzahl der Aufrufe (ohne personenbezogene Daten der
          Website-Besucher).
        </p>

        <h3>4.4 Lead-Capture</h3>
        <p>
          Wenn Sie die Funktion &quot;Ergebnis per E-Mail senden&quot; nutzen, wird Ihre
          E-Mail-Adresse zusammen mit dem Berechnungsergebnis gespeichert. Dies
          erfolgt ausschließlich auf Ihre eigene Veranlassung.
        </p>

        <h2>5. Eingebettete Rechner (Embed)</h2>
        <p>
          Wenn unsere Rechner auf Drittanbieter-Websites eingebettet werden,
          werden folgende Daten verarbeitet:
        </p>
        <ul>
          <li>
            Der API-Key des Kunden wird bei jedem Laden des Rechners geprüft
          </li>
          <li>
            Die Domain der einbettenden Website wird mit der Whitelist
            abgeglichen
          </li>
          <li>
            Es werden <strong>keine personenbezogenen Daten</strong> der
            Website-Besucher erhoben oder gespeichert
          </li>
          <li>
            Es werden keine Cookies im Browser der Website-Besucher gesetzt
          </li>
        </ul>

        <h2>6. Hosting</h2>
        <p>
          Unser Dienst wird auf Servern der Hetzner Online GmbH in Deutschland
          gehostet. Hetzner verarbeitet Daten ausschließlich in unserem Auftrag
          und auf Grundlage eines Auftragsverarbeitungsvertrags (AVV).
        </p>
        <p>
          Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Deutschland
          <br />
          Datenschutzerklärung:{" "}
          <a
            href="https://www.hetzner.com/de/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            hetzner.com/de/legal/privacy-policy
          </a>
        </p>

        <h2>7. Authentifizierung</h2>

        <h3>7.1 E-Mail Magic Link</h3>
        <p>
          Bei der Anmeldung per E-Mail senden wir Ihnen einen einmaligen
          Anmeldelink über den Dienst Resend. Resend verarbeitet Ihre
          E-Mail-Adresse ausschließlich zum Versand der Transaktions-E-Mail.
        </p>
        <p>
          Resend, Inc., 2261 Market Street #4913, San Francisco, CA 94114, USA
          <br />
          Datenschutzerklärung:{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            resend.com/legal/privacy-policy
          </a>
        </p>

        <h3>7.2 Google OAuth</h3>
        <p>
          Wenn Sie sich über Google anmelden, erhalten wir Ihren Namen, Ihre
          E-Mail-Adresse und Ihr Profilbild von Google. Es werden keine
          weiteren Daten aus Ihrem Google-Account abgerufen.
        </p>
        <p>
          Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland
          <br />
          Datenschutzerklärung:{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            policies.google.com/privacy
          </a>
        </p>

        <h2>8. Zahlungsabwicklung</h2>
        <p>
          Die Zahlungsabwicklung erfolgt über Stripe. Wir übermitteln Ihre
          E-Mail-Adresse und optional Rechnungsdaten an Stripe. Ihre
          Zahlungsdaten (Kreditkarte, SEPA etc.) werden ausschließlich von
          Stripe verarbeitet und erreichen unsere Server nicht.
        </p>
        <p>
          Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal
          Dock, Dublin, D02 H210, Irland
          <br />
          Datenschutzerklärung:{" "}
          <a
            href="https://stripe.com/de/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            stripe.com/de/privacy
          </a>
        </p>

        <h2>9. Fehlerüberwachung</h2>
        <p>
          Wir nutzen Sentry zur Erkennung und Behebung technischer Fehler. Im
          Fehlerfall werden technische Daten (Browser, Betriebssystem,
          Fehlermeldung) an Sentry übermittelt. Eine Zuordnung zu einzelnen
          Nutzern erfolgt nicht.
        </p>
        <p>
          Functional Software, Inc. (Sentry), 45 Fremont Street, 8th Floor, San
          Francisco, CA 94105, USA
          <br />
          Datenschutzerklärung:{" "}
          <a
            href="https://sentry.io/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            sentry.io/privacy
          </a>
        </p>

        <h2>10. Cookies</h2>
        <p>Wir verwenden folgende Cookies:</p>
        <ul>
          <li>
            <strong>Notwendige Cookies:</strong> Session-Cookie für die
            Anmeldung (technisch erforderlich, keine Einwilligung nötig)
          </li>
          <li>
            <strong>Eingebettete Rechner:</strong> Setzen keine Cookies im
            Browser der Website-Besucher
          </li>
        </ul>
        <p>
          Wir verwenden keine Analyse- oder Marketing-Cookies. Sollte sich dies
          ändern, werden wir Sie vorab über einen Cookie-Banner um Ihre
          Einwilligung bitten.
        </p>

        <h2>11. Ihre Rechte</h2>
        <p>Sie haben jederzeit das Recht auf:</p>
        <ul>
          <li>
            <strong>Auskunft</strong> über Ihre bei uns gespeicherten Daten (Art.
            15 DSGVO)
          </li>
          <li>
            <strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)
          </li>
          <li>
            <strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO) — Sie können
            Ihren Account jederzeit in den Profileinstellungen löschen
          </li>
          <li>
            <strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)
          </li>
          <li>
            <strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)
          </li>
          <li>
            <strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)
          </li>
          <li>
            <strong>Widerruf</strong> einer erteilten Einwilligung (Art. 7 Abs.
            3 DSGVO)
          </li>
          <li>
            <strong>Beschwerde</strong> bei einer Aufsichtsbehörde (Art. 77
            DSGVO) — zuständig ist die Landesbeauftragte für den Datenschutz
            Niedersachsen
          </li>
        </ul>

        <h2>12. Speicherdauer</h2>
        <p>
          Personenbezogene Daten werden gelöscht, sobald der Zweck der
          Speicherung entfällt. Für Vertragsdaten gelten die gesetzlichen
          Aufbewahrungsfristen (6 bzw. 10 Jahre gemäß HGB/AO). Bei
          Account-Löschung werden alle persönlichen Daten unverzüglich gelöscht,
          soweit keine gesetzliche Aufbewahrungspflicht besteht.
        </p>

        <h2>13. Änderungen</h2>
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an
          geänderte Rechtslagen oder Änderungen des Dienstes anzupassen. Die
          jeweils aktuelle Fassung finden Sie auf dieser Seite.
        </p>
      </div>
    </div>
  )
}
