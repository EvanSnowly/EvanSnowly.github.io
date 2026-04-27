import './App.css'

const overviewCards = [
  {
    title: 'Agent Workflow Engineering',
    detail: 'Designing multi-step agent flows with guardrails, state transitions, and observable execution.',
  },
  {
    title: 'LLM Tool Calling',
    detail: 'Turning prompts into callable systems with stable interfaces, typed inputs, and controllable side effects.',
  },
  {
    title: 'Schema-Aware Database Agents',
    detail: 'Teaching agents to reason from real table structure instead of blindly loading oversized context windows.',
  },
  {
    title: 'RAG & Knowledge Systems',
    detail: 'Building retrieval pipelines, document routing, and context assembly for production use instead of demos.',
  },
  {
    title: 'Full-Stack Web Development',
    detail: 'Shipping React, TypeScript, APIs, and deployment pipelines as one coherent product surface.',
  },
  {
    title: 'Automation & Internal Tools',
    detail: 'Replacing repetitive engineering work with focused interfaces, scripts, and team-facing internal systems.',
  },
]

const skills = [
  {
    name: 'MySQL Schema Navigator',
    description: 'On-demand database schema inspector for AI agents.',
    solves: 'Avoid loading hundreds of tables into context and keep table inspection grounded in the configured database.',
    stack: 'Python / MySQL / Tool Calling / CLI Rendering',
    link: 'https://github.com/EvanSnowly/mysql-table-context',
  },
  {
    name: 'SQL Agent Service',
    description: 'DDL-aware SQL analysis service for agentic database workflows.',
    solves: 'Converts schema artifacts into callable capabilities for query planning, inspection, and downstream automation.',
    stack: 'TypeScript / SQL Parsing / Agent Services',
    link: 'https://github.com/EvanSnowly/sql-agent',
  },
  {
    name: 'Chat History Locator',
    description: 'A focused retrieval utility for locating prior Gemini chat context.',
    solves: 'Reduces manual backtracking when an agent or user needs to recover a previous conversation path quickly.',
    stack: 'JavaScript / Retrieval UX / Browser Workflow',
    link: 'https://github.com/EvanSnowly/gemini-chat-history',
  },
]

const projects = [
  {
    name: 'mysql-table-context',
    type: 'Agent Skill',
    stack: 'Python / MySQL / Vendored PyMySQL',
    capability: 'Schema inspection, comment extraction, sample row preview, and terminal-friendly table rendering.',
    link: 'https://github.com/EvanSnowly/mysql-table-context',
  },
  {
    name: 'sql-agent',
    type: 'Agent Infrastructure',
    stack: 'TypeScript / SQL / Service Design',
    capability: 'Analyzes SQL DDL and exposes agent-friendly services for structured database understanding.',
    link: 'https://github.com/EvanSnowly/sql-agent',
  },
  {
    name: 'ddd-base',
    type: 'Backend Foundation',
    stack: 'Java / DDD / Architecture Scaffold',
    capability: 'Provides a domain-driven baseline for turning service ideas into maintainable production modules.',
    link: 'https://github.com/EvanSnowly/ddd-base',
  },
  {
    name: 'EvanSnowly.github.io',
    type: 'Static Engineering Homepage',
    stack: 'React / TypeScript / Vite / GitHub Pages',
    capability: 'A deployable portfolio surface for communicating agent systems, skills, projects, and engineering logs.',
    link: 'https://github.com/EvanSnowly/EvanSnowly.github.io',
  },
]

const logs = [
  {
    id: 'LOG 001',
    title: 'Building Schema-Aware Agents',
    summary: 'How table metadata, comments, and sample rows become reliable context primitives for database agents.',
  },
  {
    id: 'LOG 002',
    title: 'Tool Calling Patterns',
    summary: 'Design patterns for keeping tools narrow, typed, observable, and safe enough for repeated production use.',
  },
  {
    id: 'LOG 003',
    title: 'From Prompt to Production',
    summary: 'The operational path from prototype interaction to deployable systems with testing, interfaces, and rollback thinking.',
  },
]

const consoleSignals = [
  { label: 'System Status', value: 'ACTIVE' },
  { label: 'Deployment', value: 'GitHub Pages' },
  { label: 'Primary Mode', value: 'Agent OS' },
  { label: 'Context Layer', value: 'Schema-aware' },
]

function App() {
  return (
    <main className="app-shell">
      <div className="backdrop-grid" />
      <div className="backdrop-glow backdrop-glow-one" />
      <div className="backdrop-glow backdrop-glow-two" />

      <header className="top-bar surface-card">
        <a className="brand" href="#top" aria-label="Agentic Full-Stack Engineering OS home">
          <span className="brand-mark">AO</span>
          <span className="brand-copy">
            <strong>Agentic Full-Stack Engineering OS</strong>
            <small>Operations surface for shipping production AI systems</small>
          </span>
        </a>

        <div className="top-bar-actions">
          <span className="status-pill">
            <span className="status-dot" />
            ACTIVE
          </span>
          <a className="github-button" href="https://github.com/EvanSnowly" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </header>

      <section id="top" className="hero-layout">
        <div className="hero-panel surface-card">
          <p className="section-kicker">Agentic Full-Stack Engineering OS</p>
          <h1>Agent Full-Stack Developer</h1>
          <p className="hero-copy">
            Building tool-driven AI agents, schema-aware systems, and production-ready full-stack applications.
          </p>
          <p className="hero-support">
            I work across agent workflows, tool interfaces, database-aware reasoning, RAG pipelines, and shipping web products from prototype to deployment.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="https://github.com/EvanSnowly" target="_blank" rel="noreferrer">
              View GitHub
            </a>
            <a className="secondary-button" href="#skills">
              Explore Skills
            </a>
            <a className="secondary-button" href="#logs">
              Read Engineering Logs
            </a>
          </div>
        </div>

        <aside className="console-panel surface-card" aria-label="Engineering console">
          <div className="console-header">
            <div className="console-lights" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span>agent-runtime.console</span>
          </div>

          <div className="signal-list">
            {consoleSignals.map((signal) => (
              <div className="signal-row" key={signal.label}>
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </div>
            ))}
          </div>

          <div className="console-note">
            <span className="note-label">Operating Thesis</span>
            <p>I build systems where LLMs are not demos, but production components.</p>
          </div>
        </aside>
      </section>

      <section id="overview" className="content-section">
        <div className="section-heading">
          <p className="section-kicker">System Overview</p>
          <h2>Core engineering modules for agentic product delivery.</h2>
        </div>

        <div className="overview-grid">
          {overviewCards.map((card, index) => (
            <article
              className="overview-card surface-card"
              style={{ '--delay': `${index * 55}ms` } as React.CSSProperties}
              key={card.title}
            >
              <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{card.title}</h3>
              <p>{card.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Skills Showcase</p>
          <h2>Agent tools with clear scope, real repositories, and deployment-level intent.</h2>
        </div>

        <div className="card-grid">
          {skills.map((skill, index) => (
            <article
              className="info-card surface-card"
              style={{ '--delay': `${index * 70}ms` } as React.CSSProperties}
              key={skill.name}
            >
              <div className="card-label">Skill</div>
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
              <dl className="meta-list">
                <div>
                  <dt>Solves</dt>
                  <dd>{skill.solves}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>{skill.stack}</dd>
                </div>
              </dl>
              <a className="text-link" href={skill.link} target="_blank" rel="noreferrer">
                GitHub Repository
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Projects</p>
          <h2>GitHub projects shaped around usable engineering surfaces.</h2>
        </div>

        <div className="card-grid project-grid">
          {projects.map((project, index) => (
            <article
              className="info-card surface-card"
              style={{ '--delay': `${index * 65}ms` } as React.CSSProperties}
              key={project.name}
            >
              <div className="card-meta">
                <span className="card-label">{project.type}</span>
                <span className="stack-pill">{project.stack}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.capability}</p>
              <a className="text-link" href={project.link} target="_blank" rel="noreferrer">
                Open on GitHub
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="logs" className="content-section log-layout">
        <div className="section-heading">
          <p className="section-kicker">Engineering Logs</p>
          <h2>Blog posts reframed as system logs instead of diary entries.</h2>
        </div>

        <div className="log-list">
          {logs.map((log, index) => (
            <article
              className="log-card surface-card"
              style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}
              key={log.id}
            >
              <span className="log-id">{log.id}</span>
              <h3>{log.title}</h3>
              <p>{log.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="content-section">
        <div className="about-card surface-card">
          <p className="section-kicker">About</p>
          <h2>Not prompt-only. System-level engineering.</h2>
          <p>
            I build end-to-end agent systems with interfaces, tool contracts, schema understanding, retrieval layers, frontend surfaces, and deployment paths that survive beyond demos.
          </p>
          <p className="about-quote">
            I build systems where LLMs are not demos, but production components.
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
