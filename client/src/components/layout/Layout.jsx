import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex relative overflow-x-hidden selection:bg-[#1EF2C5] selection:text-black font-sans">
      {/* Background Grid & Ambient Glows matching Landing Page */}
      <div className="pl-background-grid"></div>
      <div className="pl-glow-left"></div>
      <div className="pl-glow-right"></div>

      {/* Navigation Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen transition-all duration-300 relative z-10 w-full overflow-hidden">
        <Topbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;