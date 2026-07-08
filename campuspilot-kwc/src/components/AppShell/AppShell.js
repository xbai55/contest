import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

export default function AppShell({ meta, currentRoute, children }) {
  return (
    <div className="app-shell">
      <Sidebar currentRoute={currentRoute} />
      <main className="main-panel">
        <Topbar meta={meta} />
        <section id="appView" className="route-view" aria-live="polite">
          {children}
        </section>
      </main>
    </div>
  );
}
