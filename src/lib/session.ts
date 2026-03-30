import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

// Aktuelle Session laden — gibt null zurück wenn nicht eingeloggt
export async function getSession() {
  const session = await auth()
  return session
}

// Session erzwingen — leitet zu /anmelden weiter wenn nicht eingeloggt
export async function requireSession() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/anmelden")
  }
  return session
}

// User mit Subscription laden
export async function getUserWithSubscription() {
  const session = await requireSession()

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  })

  if (!user) {
    redirect("/anmelden")
  }

  return user
}

// Prüfe ob User ein aktives Abo hat
export async function hasActiveSubscription() {
  const session = await auth()
  if (!session?.user?.id) return false

  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
  })

  if (!subscription) return false

  // Trial noch gültig?
  if (subscription.status === "TRIAL" && subscription.trialEndsAt) {
    return new Date() < subscription.trialEndsAt
  }

  return subscription.status === "ACTIVE"
}

// Prüfe ob User Admin ist
export async function isAdmin() {
  const session = await auth()
  if (!session?.user?.id) return false

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { isAdmin: true },
  })

  return user?.isAdmin ?? false
}
