import './App.css'

const skills = [
  'Java / Spring Boot / JVM tuning',
  'React / TypeScript / Vite',
  'Redis / Kafka / RabbitMQ',
  'MySQL / PostgreSQL / Elasticsearch',
  'Docker / Linux / CI pipelines',
  'Microservices / Observability',
]

const posts = [
  {
    label: 'Architecture',
    title: 'Writing systems that stay simple under pressure',
    meta: 'Notes on Java services, boundaries, and production tradeoffs.',
  },
  {
    label: 'Frontend',
    title: 'React interfaces with tactile motion and quiet detail',
    meta: 'A working log for interaction, composition, and design systems.',
  },
  {
    label: 'Middleware',
    title: 'The boring parts that make distributed apps reliable',
    meta: 'Queues, caches, search, storage, and the discipline around them.',
  },
]

function App() {
  return (
    <main className="site-shell">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="grain" />

      <nav className="nav glass-panel" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="WuXuefeng home">
          <span className="brand-mark">WX</span>
          <span>WuXuefeng</span>
        </a>
        <div className="nav-links">
          <a href="#stack">Stack</a>
          <a href="#writing">Writing</a>
          <a href="#music">Music</a>
        </div>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-copy glass-panel reveal">
          <p className="eyebrow">Personal blog / engineering notebook</p>
          <h1>Building reliable software with a glass-clear interface.</h1>
          <p className="hero-text">
            I am WuXuefeng, a Java ecosystem engineer with React frontend experience and practical middleware knowledge. This space collects my technical thinking, system notes, and the music that keeps the rhythm going.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#writing">Read the notebook</a>
            <a className="secondary-action" href="https://github.com/EvanSnowly" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>

        <aside className="identity-card glass-panel reveal" aria-label="Profile summary">
          <div className="orbital-ring" />
          <div className="avatar-core">W</div>
          <p className="status-pill">Available for serious engineering conversations</p>
          <div className="identity-grid">
            <span>Name</span>
            <strong>WuXuefeng</strong>
            <span>Focus</span>
            <strong>Java + React</strong>
            <span>Signal</span>
            <strong>Music driven</strong>
          </div>
        </aside>
      </section>

      <section id="stack" className="section-block">
        <div className="section-heading reveal">
          <p className="eyebrow">Technical field</p>
          <h2>Backend depth, frontend sense, middleware fluency.</h2>
        </div>
        <div className="skill-cloud">
          {skills.map((skill, index) => (
            <span className="skill-chip glass-panel reveal" style={{ '--delay': `${index * 70}ms` } as React.CSSProperties} key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section id="writing" className="section-block split-layout">
        <div className="section-heading reveal">
          <p className="eyebrow">Selected notes</p>
          <h2>Future articles will live here with a calm, editorial rhythm.</h2>
          <p className="section-copy">
            The first version is a polished static front page. It leaves clean space for Markdown, project writeups, and deeper engineering essays later.
          </p>
        </div>
        <div className="post-stack">
          {posts.map((post, index) => (
            <article className="post-card glass-panel reveal" style={{ '--delay': `${index * 90}ms` } as React.CSSProperties} key={post.title}>
              <span>{post.label}</span>
              <h3>{post.title}</h3>
              <p>{post.meta}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="music" className="music-section glass-panel reveal">
        <div>
          <p className="eyebrow">Listening mode</p>
          <h2>Music is the private metronome behind the work.</h2>
          <p>
            Clean systems need rhythm: quiet concentration, sharp transitions, and a sense for when complexity becomes noise.
          </p>
        </div>
        <div className="equalizer" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => (
            <span style={{ '--i': index } as React.CSSProperties} key={index} />
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>WuXuefeng</span>
        <span>Java ecosystem / React interfaces / Middleware practice</span>
      </footer>
    </main>
  )
}

export default App
