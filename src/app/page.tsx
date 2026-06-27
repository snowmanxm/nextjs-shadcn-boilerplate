const backendCards = [
  {
    name: 'ChatChat',
    role: 'ChatChatAdmin',
    description: 'Admin users, whitelist, settings, skills, and predefined agents.',
  },
  {
    name: 'ChatAndBuild',
    role: 'ChatAndBuildAdmin',
    description: 'Whitelist controls for the build product backend.',
  },
  {
    name: 'Living Brain',
    role: 'LivingBrainAdmin',
    description: 'Tenant provisioning and API key lifecycle management.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-8 text-primary md:px-10">
      <section className="mx-auto flex max-w-6xl flex-col gap-12">
        <header className="flex flex-col gap-6 pt-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
              Unified Admin
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-primary md:text-6xl">
              One calm control plane for every Pivotal backend.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-tertiary">
              This shell will connect ChatChat, ChatAndBuild, and Living Brain through the shared
              admin JWT and per-session 2FA step-up flow.
            </p>
          </div>
          <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-secondary shadow-sm">
            Light theme foundation
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {backendCards.map((backend) => (
            <article
              key={backend.name}
              className="rounded-[28px] border border-gray-200 bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] backdrop-blur"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-primary">{backend.name}</h2>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  {backend.role}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-tertiary">{backend.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
