import { FaBell, FaMagnifyingGlass } from "react-icons/fa6";

function Topbar() {
  return (
    <header className="topbar">

      <div className="topbar-left">
        <h1>Football Intelligence</h1>
        <p>Premier League Analytics Platform</p>
      </div>

      <div className="topbar-center">

        <div className="search-box">

          <FaMagnifyingGlass />

          <input
            type="text"
            placeholder="Search clubs, players..."
          />

        </div>

      </div>

      <div className="topbar-right">

        <button className="icon-btn">
          <FaBell />
        </button>

        <div className="profile">

          <div className="avatar">
            NS
          </div>

          <div>
            <h4>Nishan</h4>
            <p>Administrator</p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;