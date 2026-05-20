import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-zinc-100 flex flex-col justify-between">
      {/* Background glow effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-24 sm:space-y-32 relative z-10">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 animate-fade-in">
            <span className="size-2 rounded-full bg-indigo-400 animate-pulse" />
            Empowered by Gemini 3.1 Pro & Mermaid
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Turn Whiteboard Sketches <br className="hidden sm:inline" />
            into <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Database Code</span> Instantly
          </h1>
          
          <p className="text-zinc-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            One-shot AI database architect. Upload a hand-drawn ERD sketch, paste a screenshot, or write a description — get an interactive live-rendered diagram, raw Postgres SQL, and a Prisma schema in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/generate"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Start Building Free
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.97H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/examples"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 hover:text-white font-medium transition-all text-zinc-300 flex items-center justify-center gap-2"
            >
              See Examples
            </Link>
            <Link
              href="/how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 hover:text-white font-medium transition-all text-zinc-300 flex items-center justify-center gap-2"
            >
              See How It Works
            </Link>
          </div>

          {/* Interactive Interface Mockup Card */}
          <div className="pt-8 sm:pt-12">
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/60 p-2 sm:p-4 shadow-2xl backdrop-blur-sm">
              <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl pointer-events-none" />
              <div className="flex items-center gap-2 px-3 pb-3 border-b border-zinc-900">
                <div className="size-3 rounded-full bg-red-500/50" />
                <div className="size-3 rounded-full bg-yellow-500/50" />
                <div className="size-3 rounded-full bg-green-500/50" />
                <div className="text-[10px] text-zinc-600 font-mono ml-4">schema_builder_workbench</div>
              </div>
              <div className="grid md:grid-cols-[280px_1fr] gap-4 p-2 sm:p-4 text-left font-sans">
                {/* Mock Sidebar */}
                <div className="border border-zinc-900 rounded-xl bg-zinc-900/30 p-4 space-y-4">
                  <div className="flex gap-1.5 p-1 rounded-lg bg-zinc-950/80 w-fit text-xs text-zinc-500">
                    <span className="px-2 py-1 bg-indigo-500/10 text-indigo-300 rounded">Upload</span>
                    <span className="px-2 py-1">Paste</span>
                    <span className="px-2 py-1">Describe</span>
                  </div>
                  <div className="h-32 rounded-lg border border-dashed border-zinc-800 flex flex-col items-center justify-center text-center p-3 text-zinc-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mb-1 text-zinc-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="text-[10px]">Drop whiteboard sketch here</span>
                  </div>
                  <div className="h-9 w-full rounded-lg bg-indigo-500/40 text-indigo-100 flex items-center justify-center font-medium text-xs">
                    Generate schema
                  </div>
                </div>
                {/* Mock Right Area */}
                <div className="border border-zinc-900 rounded-xl bg-zinc-900/10 p-4 flex flex-col justify-between h-48 md:h-auto">
                  <div className="flex gap-2 border-b border-zinc-900 pb-2">
                    <span className="text-[11px] font-semibold text-indigo-300 border-b border-indigo-400 pb-2 -mb-2.5">Diagram</span>
                    <span className="text-[11px] text-zinc-600">Prisma</span>
                    <span className="text-[11px] text-zinc-600">SQL</span>
                    <span className="text-[11px] text-zinc-600">Mermaid</span>
                  </div>
                  {/* Mock Diagram Rendering */}
                  <div className="flex-1 flex items-center justify-center py-4">
                    <div className="flex items-center gap-6 text-zinc-600 font-mono text-[9px]">
                      <div className="border border-zinc-800 bg-zinc-900/30 rounded p-2 text-zinc-400">
                        <span className="text-zinc-500 font-semibold">users</span>
                        <hr className="border-zinc-900 my-1" />
                        uuid id PK <br />
                        text email UK <br />
                        date created_at
                      </div>
                      <span>─── FK ───►</span>
                      <div className="border border-zinc-800 bg-zinc-900/30 rounded p-2 text-zinc-400">
                        <span className="text-zinc-500 font-semibold">orders</span>
                        <hr className="border-zinc-900 my-1" />
                        uuid id PK <br />
                        uuid user_id FK <br />
                        numeric amount
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW (HOW IT WORKS) SECTION */}
        <section className="space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">The 3-Step Execution Pipeline</h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
              How Visual Whiteboard transforms pixels and words into code.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 hover:border-zinc-800/80 transition-colors">
              <div className="size-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-medium text-zinc-100">Draw or Describe</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Take a picture of your whiteboard layout, capture an ERD screenshot, or describe it in plain English. Paste or upload it directly.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 hover:border-zinc-800/80 transition-colors">
              <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-medium text-zinc-100">Gemini Structured Analysis</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Our secure backend calls Gemini 3.1 Pro under strict JSON schema guidelines, interpreting names, keys, datatypes, and connections.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 hover:border-zinc-800/80 transition-colors">
              <div className="size-10 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-medium text-zinc-100">Get Four Rich Outputs</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Review tables/columns, copy clean Prisma models, execute ordered Postgres SQL statements, or interact with a live-rendered Mermaid diagram.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section className="space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Engineered for Rapid DB Architecting</h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
              Everything you need to skip the boilerplate coding of schema creation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4 hover:scale-[1.01] transition-transform">
              <div className="size-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-zinc-200">Sketch Image Upload</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Drag-and-drop PNG, JPG, WEBP, or GIF sketches of your tables. Files downscaled client-side for rapid generation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4 hover:scale-[1.01] transition-transform">
              <div className="size-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.524 2.25h-3.048a2.25 2.25 0 0 0-2.143 1.638L5.78 10.939a.75.75 0 0 0 .08.625l1.83 2.746A2.25 2.25 0 0 0 9.58 15.35h4.839a2.25 2.25 0 0 0 1.89-1.04l1.83-2.747a.75.75 0 0 0 .08-.625l-2.036-7.05Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 22h6m-3-4V4" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-zinc-200">Instant Clipboard Paste</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Take a quick crop of a diagram drawing, paste using <kbd className="text-[10px] bg-zinc-900 border border-zinc-800 px-1 rounded">Ctrl+V</kbd> anywhere, and generate schemas on the spot.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4 hover:scale-[1.01] transition-transform">
              <div className="size-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-zinc-200">Natural Language &quot;Describe&quot;</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Describe your application needs in plain English and let Gemini structure relationships, primary keys, and junction tables automatically.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4 hover:scale-[1.01] transition-transform">
              <div className="size-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-zinc-200">Prisma ORM Generator</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Generates valid `schema.prisma` files with standard postgres config settings and correctly typed model mappings ready for usage.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4 hover:scale-[1.01] transition-transform">
              <div className="size-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-zinc-200">Supabase-Ready Postgres</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Emits clean CREATE TABLE and ALTER TABLE queries structured in dependency order so database migrations execute without FK errors.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 space-y-4 hover:scale-[1.01] transition-transform">
              <div className="size-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-zinc-200">Stateless & Privacy-First</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                No databases storing your proprietary models or private keys. All configurations are stored locally on your device.
              </p>
            </div>

          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="space-y-16 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Got questions about database generation? We have answers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-2">
              <h4 className="font-semibold text-zinc-200">How does the image recognition work?</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                When you drag and drop or paste a whiteboard sketch, our frontend downscales the image client-side to ensure lightweight transmission and sends it secure-proxy style via server actions to Gemini.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-zinc-200">What Postgres conventions are followed?</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Gemini is constrained to use snake_case plural table names, uuid primary keys with random default values, explicit foreign keys, and safe PostgreSQL types (like jsonb, numeric, text).
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-zinc-200">Is my data secure?</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Yes. Visual Whiteboard is entirely stateless. We do not persist your schemas or files. If you input a custom API key, it is kept 100% locally in your browser&apos;s private localStorage.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-zinc-200">Are the schemas ready for production?</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Yes. The generated Prisma and PostgreSQL SQL are structured logically. However, we advise adding custom row-level security (RLS) policies or specific column validation checks where needed.
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="text-center py-12 rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-950/40 to-indigo-950/10 p-8 sm:p-12 space-y-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-indigo-500/5 blur-[80px] pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ready to Accelerate Your DB Design?</h2>
          <p className="text-zinc-400 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Stop coding database boilerplate schemas manually. Let visual diagrams turn into production-ready schemas in seconds.
          </p>
          <div className="pt-2">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all hover:scale-[1.02]"
            >
              Launch Schema Builder
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.97H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
