export function EmbedError({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center min-h-[300px] p-8">
      <div className="text-center space-y-3 max-w-md">
        <div className="mx-auto h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <svg
            className="h-6 w-6 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium">{message}</p>
        <a
          href="https://immobilien-rechner.net"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-primary hover:underline"
        >
          Mehr erfahren auf immobilien-rechner.net
        </a>
      </div>
    </div>
  )
}
