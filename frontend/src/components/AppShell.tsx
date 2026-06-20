import { NavLink, Outlet } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Dashboard" },
  { to: "/new-claim", label: "New Claim" },
  { to: "/batch", label: "Batch Run" },
  { to: "/evaluation", label: "Evaluation" },
  { to: "/reference", label: "Reference" },
];

export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <span className="text-sm font-semibold text-[var(--color-text)]">Evidence Review</span>
            <nav className="hidden gap-6 md:flex">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `text-sm font-medium ${isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <NavLink
            to="/new-claim"
            className="rounded-md bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)]"
          >
            New Claim
          </NavLink>
        </div>
        <nav className="flex gap-4 overflow-x-auto border-t border-[var(--color-border)] px-4 py-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `shrink-0 text-sm font-medium ${isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
