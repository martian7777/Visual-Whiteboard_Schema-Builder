export function Hero() {
  return (
    <header className="space-y-2">
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300">
        <span className="size-1.5 rounded-full bg-indigo-400" /> AI Micro-SaaS
      </div>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
        Visual Whiteboard → Schema Builder
      </h1>
      <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
        Upload a sketch, paste a screenshot, or describe your app. Get a Prisma schema, raw Postgres SQL,
        and a live Mermaid ER diagram — all in one shot.
      </p>
    </header>
  );
}
