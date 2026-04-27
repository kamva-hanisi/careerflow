import { useEffect, useState } from "react";

type Status = "Applied" | "Interview" | "Offer" | "Rejected";

type Application = {
  company: string;
  role: string;
  status: Status;
  date: string;
};

const stats = [
  { label: "Applications", value: "18" },
  { label: "Interviews", value: "5" },
  { label: "Offers", value: "1" },
  { label: "Rejections", value: "6" }
];

const applications: Application[] = [
  {
    company: "OpenAI",
    role: "Junior Developer",
    status: "Interview",
    date: "2026-04-28"
  },
  {
    company: "Shopify",
    role: "Frontend Engineer",
    status: "Applied",
    date: "2026-05-02"
  },
  {
    company: "Spotify",
    role: "Full Stack Developer",
    status: "Offer",
    date: "2026-04-24"
  }
];

function App() {
  const [apiMessage, setApiMessage] = useState("Connecting to API...");
  const apiBaseUrl =
    import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

  useEffect(() => {
    const loadHealth = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/health`);
        const data = (await response.json()) as { message: string };
        setApiMessage(data.message);
      } catch {
        setApiMessage("API not running yet");
      }
    };

    void loadHealth();
  }, [apiBaseUrl]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Career Management</p>
          <h1>CareerFlow</h1>
        </div>
        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#applications">Applications</a>
          <a href="#auth">Auth</a>
        </nav>
      </aside>

      <main className="content">
        <section className="hero" id="dashboard">
          <div>
            <p className="eyebrow">Portfolio Project</p>
            <h2>Track every job application with a workflow that feels real.</h2>
            <p className="hero-copy">
              React, TypeScript, Express, MySQL, JWT auth, search, filters, and
              a dashboard you can actually demo in interviews.
            </p>
            <p className="api-status">{apiMessage}</p>
          </div>

          <div className="hero-card">
            <span className="badge badge-interview">Interview</span>
            <strong>OpenAI</strong>
            <p>Follow up on Friday</p>
            <small>Deadline: 2026-04-28</small>
          </div>
        </section>

        <section className="stats-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </section>

        <section className="panel" id="applications">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Applications</p>
              <h3>Recent activity</h3>
            </div>
            <div className="filters">
              <input aria-label="Search company" placeholder="Search company" />
              <select aria-label="Filter status" defaultValue="All">
                <option>All</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          <div className="table">
            <div className="table-head">
              <span>Company</span>
              <span>Role</span>
              <span>Status</span>
              <span>Deadline</span>
            </div>

            {applications.map((item) => (
              <div className="table-row" key={`${item.company}-${item.role}`}>
                <span>{item.company}</span>
                <span>{item.role}</span>
                <span>
                  <span
                    className={`badge badge-${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </span>
                <span>{item.date}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel auth-panel" id="auth">
          <div>
            <p className="eyebrow">Authentication</p>
            <h3>Ready for register, login, and protected routes</h3>
          </div>

          <form className="auth-form">
            <input type="email" placeholder="Email address" />
            <input type="password" placeholder="Password" />
            <button type="button">Sign In</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
