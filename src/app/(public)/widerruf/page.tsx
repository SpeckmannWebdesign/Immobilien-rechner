import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Widerrufsbelehrung — Immobilien-Rechner",
  robots: "noindex",
}

export default function WiderrufPage() {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-2xl prose prose-sm">
        <h1>Widerrufsbelehrung</h1>
        <p>Stand: 30.03.2026</p>

        <h2>Widerrufsrecht</h2>
        <p>
          Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
          diesen Vertrag zu widerrufen.
        </p>
        <p>
          Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
          Vertragsschlusses.
        </p>
        <p>
          Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer
          eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder
          eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen,
          informieren. Sie können dafür das beigefügte Muster-Widerrufsformular
          verwenden, das jedoch nicht vorgeschrieben ist.
        </p>

        <p>
          <strong>Kontakt für den Widerruf:</strong>
        </p>
        <p>
          Speckmann Webdesign GmbH
          <br />
          Dwaschweg 5<br />
          26133 Oldenburg
          <br />
          E-Mail: info@speckmann-webdesign.de
        </p>

        <p>
          Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung
          über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist
          absenden.
        </p>

        <h2>Folgen des Widerrufs</h2>
        <p>
          Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen,
          die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen
          vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
          Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese
          Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
          ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen
          wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden
          Ihnen wegen dieser Rückzahlung Entgelte berechnet.
        </p>
        <p>
          Haben Sie verlangt, dass die Dienstleistungen während der
          Widerrufsfrist beginnen sollen, so haben Sie uns einen angemessenen
          Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie
          uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags
          unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum
          Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
        </p>

        <h2>Muster-Widerrufsformular</h2>
        <p>
          (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses
          Formular aus und senden Sie es zurück.)
        </p>
        <div className="bg-muted rounded-lg p-4">
          <p>
            An: Speckmann Webdesign GmbH, Dwaschweg 5, 26133 Oldenburg,
            E-Mail: info@speckmann-webdesign.de
          </p>
          <p>
            Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*)
            abgeschlossenen Vertrag über die Erbringung der folgenden
            Dienstleistung:
          </p>
          <p>_________________________________________________</p>
          <p>Bestellt am (*) / erhalten am (*):</p>
          <p>_________________________________________________</p>
          <p>Name des/der Verbraucher(s):</p>
          <p>_________________________________________________</p>
          <p>Anschrift des/der Verbraucher(s):</p>
          <p>_________________________________________________</p>
          <p>Datum:</p>
          <p>_________________________________________________</p>
          <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):</p>
          <p>_________________________________________________</p>
          <p className="text-xs text-muted-foreground">
            (*) Unzutreffendes streichen.
          </p>
        </div>

        <h2>Ausschluss des Widerrufsrechts</h2>
        <p>
          Das Widerrufsrecht erlischt bei einem Vertrag über die Erbringung von
          Dienstleistungen, wenn der Unternehmer die Dienstleistung vollständig
          erbracht hat und mit der Ausführung der Dienstleistung erst begonnen
          hat, nachdem der Verbraucher dazu seine ausdrückliche Zustimmung
          gegeben hat und gleichzeitig seine Kenntnis davon bestätigt hat, dass
          er sein Widerrufsrecht bei vollständiger Vertragserfüllung durch den
          Unternehmer verliert.
        </p>
      </div>
    </div>
  )
}
