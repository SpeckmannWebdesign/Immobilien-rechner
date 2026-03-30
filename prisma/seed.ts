import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg(connectionString)
const prisma = new PrismaClient({ adapter })

// Grunderwerbsteuer-Sätze pro Bundesland (Stand 2026)
const grunderwerbsteuerSaetze = [
  { bundesland: "Baden-Württemberg", rate: 5.0, displayOrder: 1 },
  { bundesland: "Bayern", rate: 3.5, displayOrder: 2 },
  { bundesland: "Berlin", rate: 6.0, displayOrder: 3 },
  { bundesland: "Brandenburg", rate: 6.5, displayOrder: 4 },
  { bundesland: "Bremen", rate: 5.0, displayOrder: 5 },
  { bundesland: "Hamburg", rate: 4.5, displayOrder: 6 },
  { bundesland: "Hessen", rate: 6.0, displayOrder: 7 },
  { bundesland: "Mecklenburg-Vorpommern", rate: 6.0, displayOrder: 8 },
  { bundesland: "Niedersachsen", rate: 5.0, displayOrder: 9 },
  { bundesland: "Nordrhein-Westfalen", rate: 6.5, displayOrder: 10 },
  { bundesland: "Rheinland-Pfalz", rate: 5.0, displayOrder: 11 },
  { bundesland: "Saarland", rate: 6.5, displayOrder: 12 },
  { bundesland: "Sachsen", rate: 5.5, displayOrder: 13 },
  { bundesland: "Sachsen-Anhalt", rate: 5.0, displayOrder: 14 },
  { bundesland: "Schleswig-Holstein", rate: 6.5, displayOrder: 15 },
  { bundesland: "Thüringen", rate: 5.0, displayOrder: 16 },
]

// Standard-Konfigurationswerte
const appConfigs = [
  {
    key: "notar_rate",
    value: "1.5",
    label: "Notarkosten (%)",
  },
  {
    key: "grundbuch_rate",
    value: "0.5",
    label: "Grundbuchkosten (%)",
  },
  {
    key: "makler_rate_default",
    value: "3.57",
    label: "Standard-Maklerprovision inkl. MwSt (%)",
  },
  {
    key: "afa_rate_pre1925",
    value: "2.5",
    label: "AfA-Satz Baujahr vor 1925 (%)",
  },
  {
    key: "afa_rate_post1925",
    value: "2.0",
    label: "AfA-Satz Baujahr nach 1925 (%)",
  },
  {
    key: "afa_rate_neubau",
    value: "3.0",
    label: "AfA-Satz Neubau ab 2023 (%)",
  },
  {
    key: "peters_faktor",
    value: "1.5",
    label: "Peterssche Formel — Faktor",
  },
  {
    key: "mietausfall_risiko",
    value: "2.0",
    label: "Standard Mietausfallrisiko (%)",
  },
  {
    key: "kappungsgrenze_normal",
    value: "20.0",
    label: "Kappungsgrenze Mieterhöhung normal (%)",
  },
  {
    key: "kappungsgrenze_angespannt",
    value: "15.0",
    label: "Kappungsgrenze Mieterhöhung angespannter Markt (%)",
  },
]

async function main() {
  console.log("Seede Grunderwerbsteuer-Sätze...")

  for (const satz of grunderwerbsteuerSaetze) {
    await prisma.taxRate.upsert({
      where: { bundesland: satz.bundesland },
      update: { rate: satz.rate, displayOrder: satz.displayOrder },
      create: satz,
    })
  }

  console.log(`${grunderwerbsteuerSaetze.length} Bundesländer angelegt.`)

  console.log("Seede App-Konfiguration...")

  for (const config of appConfigs) {
    await prisma.appConfig.upsert({
      where: { key: config.key },
      update: { value: config.value, label: config.label },
      create: config,
    })
  }

  console.log(`${appConfigs.length} Konfigurationswerte angelegt.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
