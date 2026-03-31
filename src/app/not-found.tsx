import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      {/* Große 404-Zahl als Hintergrund-Element */}
      <p className="select-none text-[12rem] font-black leading-none text-[#E3E5EB] sm:text-[16rem]">
        404
      </p>

      {/* Inhalt */}
      <h1 className="-mt-8 text-2xl font-bold text-gray-900 sm:text-3xl">
        Seite nicht gefunden
      </h1>
      <p className="mt-3 max-w-md text-center text-gray-500">
        Die gesuchte Seite existiert nicht oder wurde verschoben.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-[#4338CA] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3730A3]"
        >
          Zur Startseite
        </Link>
        <Link
          href="/rechner"
          className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Alle Rechner
        </Link>
      </div>
    </div>
  )
}
