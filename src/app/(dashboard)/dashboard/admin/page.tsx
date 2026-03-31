import { AdminDashboard } from "./admin-dashboard"

export const metadata = {
  title: "Admin",
}

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Admin-Bereich</h1>
        <p className="text-[#4B5563]">
          Nutzerverwaltung und Mitgliedschaften
        </p>
      </div>

      <AdminDashboard />
    </div>
  )
}
