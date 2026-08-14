import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout({
  activePage,
  onNavigate,
  children,
}) {
  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
      />

      <div className="app-main">
        <Header />

        {children}
      </div>
    </div>
  );
}

export default AppLayout;