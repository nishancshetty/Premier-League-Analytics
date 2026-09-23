import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <main style={{ padding: "20px", flex: 1 }}>
          {children}
        </main>
      </div>
    </>
  );
}

export default MainLayout;