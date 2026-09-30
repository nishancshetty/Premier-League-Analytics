import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Screen =
  | "hub"
  | "clubs"
  | "tactical"
  | "live"
  | "fixtures"
  | "transfers"
  | "analytics";

type IconName =
  | "arrow"
  | "ball"
  | "clubs"
  | "calendar"
  | "transfer"
  | "live"
  | "spark"
  | "grid"
  | "back";

const clubData = [
  { short: "ARS", name: "Arsenal", color: "#E30613", rank: "01", form: "WWDWW" },
  { short: "MCI", name: "Man City", color: "#6CABDD", rank: "02", form: "WDWWW" },
  { short: "LIV", name: "Liverpool", color: "#C8102E", rank: "03", form: "WLWWW" },
  { short: "AVL", name: "Aston Villa", color: "#95BFE5", rank: "04", form: "DWWLW" },
  { short: "TOT", name: "Tottenham", color: "#E7E9F2", rank: "05", form: "WLWDW" },
  { short: "NEW", name: "Newcastle", color: "#B9D5E8", rank: "06", form: "WWLWD" },
  { short: "CHE", name: "Chelsea", color: "#3154D1", rank: "07", form: "DWWWW" },
  { short: "MUN", name: "Man United", color: "#DA291C", rank: "08", form: "LDWLW" },
  { short: "BHA", name: "Brighton", color: "#33A6E8", rank: "09", form: "DDWWL" },
  { short: "WHU", name: "West Ham", color: "#7A263A", rank: "10", form: "WLDWD" },
  { short: "FUL", name: "Fulham", color: "#F4F4F4", rank: "11", form: "DLWLW" },
  { short: "BRE", name: "Brentford", color: "#E30613", rank: "12", form: "WLLWD" },
];

const players = [
  { n: 9, name: "Haaland", x: 50, y: 12, score: "9.1" },
  { n: 11, name: "Doku", x: 18, y: 31, score: "8.2" },
  { n: 47, name: "Foden", x: 82, y: 31, score: "8.7" },
  { n: 17, name: "De Bruyne", x: 50, y: 39, score: "8.9" },
  { n: 16, name: "Rodri", x: 36, y: 57, score: "8.4" },
  { n: 20, name: "Silva", x: 65, y: 57, score: "8.1" },
  { n: 24, name: "Gvardiol", x: 15, y: 76, score: "7.8" },
  { n: 3, name: "Dias", x: 38, y: 79, score: "8.0" },
  { n: 5, name: "Stones", x: 62, y: 79, score: "7.7" },
  { n: 2, name: "Walker", x: 85, y: 76, score: "7.9" },
  { n: 31, name: "Ederson", x: 50, y: 92, score: "7.4" },
];

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    back: <path d="m15 18-6-6 6-6" />,
    ball: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m9.5 9.2 2.5-2 2.5 2-1 3h-3zM12 7.2V3.5M10.5 12.2l-3 2.2m6-2.2 3 2.2M7.5 14.4l1 3.2m8-3.2-1 3.2" />
      </>
    ),
    clubs: (
      <>
        <path d="M6 3h12v6c0 5-2.4 8.3-6 10-3.6-1.7-6-5-6-10z" />
        <path d="M9 7h6M9 10h6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M8 3v4m8-4v4M3.5 10h17" />
      </>
    ),
    transfer: (
      <>
        <path d="M5 8h13l-3-3m3 11H5l3 3" />
      </>
    ),
    live: (
      <>
        <rect x="3.5" y="5" width="17" height="14" rx="2" />
        <path d="M8 12h2l1.2-3 2 6 1.3-3H17" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4z" />
        <path d="m18.5 16 .6 2.4 2.4.6-2.4.6-.6 2.4-.6-2.4-2.4-.6 2.4-.6z" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
  };
  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function Brand() {
  return (
    <div className="brand">
      <span className="brand-mark">
        <Icon name="ball" />
      </span>
      <span className="brand-copy">
        <b>PL/X</b>
        <small>Premier intelligence</small>
      </span>
    </div>
  );
}

function Hero({ onEnter }: { onEnter: () => void }) {
  const navigate = useNavigate();

  return (
    <main className="hero">
      <div className="hero-photo" />
      <div className="hero-grid" />
      <div className="fog fog-one" />
      <div className="fog fog-two" />
      <div className="flare" />
      <header className="hero-header">
        <Brand />
        <div className="hero-meta">
          <span className="status-dot" />
          2025/26 SEASON
          <span className="meta-rule" />
          GLOBAL FEED
          <button
            onClick={() => navigate("/dashboard")}
            className="ml-4 px-3 py-1 text-xs border border-white/20 rounded hover:bg-white/10 transition-colors"
          >
            Open Dashboard →
          </button>
        </div>
      </header>

      <section className="hero-content">
        <div className="eyebrow"><span /> THE GAME, REIMAGINED</div>
        <div className="display-title">
          BEYOND
          <br />
          THE <em>PITCH.</em>
        </div>
        <p className="hero-intro">
          Enter a new dimension of Premier League football.
          <br />
          Every club. Every match. Every decisive detail.
        </p>
        <button className="enter-button" onClick={onEnter}>
          <span>ENTER THE EXPERIENCE</span>
          <span className="enter-icon"><Icon name="arrow" /></span>
        </button>
      </section>

      <div className="hero-footer">
        <span>01</span><i />
        <span>LONDON · 21:04:18</span>
        <span className="scroll-cue">SCROLL TO EXPLORE <b>↓</b></span>
      </div>
    </main>
  );
}

const navItems: { key: Screen; label: string; icon: IconName }[] = [
  { key: "hub", label: "Pitch hub", icon: "grid" },
  { key: "clubs", label: "Club explorer", icon: "clubs" },
  { key: "live", label: "Live matches", icon: "live" },
  { key: "fixtures", label: "Fixtures", icon: "calendar" },
  { key: "transfers", label: "Transfers", icon: "transfer" },
  { key: "analytics", label: "AI analytics", icon: "spark" },
];

function Shell({
  screen,
  setScreen,
  children,
}: {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <aside className="side-rail">
        <Brand />
        <nav>
          {navItems.map((item) => (
            <button
              aria-label={item.label}
              className={screen === item.key ? "rail-button active" : "rail-button"}
              key={item.key}
              onClick={() => setScreen(item.key)}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={() => navigate("/dashboard")}
          className="rail-button mt-auto text-xs text-slate-400 hover:text-white"
          title="Open Analytics Dashboard"
        >
          <Icon name="arrow" />
          <span>Dashboard</span>
        </button>
        <div className="rail-season">25<br /><span>/26</span></div>
      </aside>
      <div className="screen-wrap">
        <header className="topbar">
          <div className="breadcrumb">
            <span>PREMIER LEAGUE</span><i />{navItems.find((item) => item.key === screen)?.label}
          </div>
          <div className="topbar-actions">
            <span><b className="status-dot" /> LIVE DATA</span>
            <span>UTC 21:04</span>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-3 py-1 text-xs border border-white/20 rounded hover:bg-white/10 transition-colors"
            >
              Dashboard
            </button>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}

function PitchHub({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const zones: { cls: string; screen: Screen; title: string; sub: string; icon: IconName }[] = [
    { cls: "zone-center", screen: "analytics", title: "League Hub", sub: "Table · Form · Insights", icon: "ball" },
    { cls: "zone-left", screen: "clubs", title: "Club Explorer", sub: "Teams · Squads · Identity", icon: "clubs" },
    { cls: "zone-right", screen: "clubs", title: "Club Explorer", sub: "Teams · Squads · Identity", icon: "clubs" },
    { cls: "zone-corner", screen: "fixtures", title: "Fixtures", sub: "The road ahead", icon: "calendar" },
    { cls: "zone-dugout", screen: "transfers", title: "Transfers", sub: "Market intelligence", icon: "transfer" },
    { cls: "zone-score", screen: "live", title: "Live Matches", sub: "3 matches live", icon: "live" },
    { cls: "zone-tunnel", screen: "analytics", title: "AI Analytics", sub: "See what others miss", icon: "spark" },
  ];
  return (
    <main className="hub-screen">
      <div className="hub-heading">
        <div>
          <div className="eyebrow"><span /> THE PITCH IS YOUR NAVIGATION</div>
          <div className="page-title">WHERE DO YOU<br /><em>WANT TO PLAY?</em></div>
        </div>
        <p>Explore the league through its natural geography.<br />Select a zone to enter.</p>
      </div>
      <div className="pitch-stage">
        <div className="stadium-aura" />
        <div className="pitch">
          <div className="pitch-stripes" />
          <div className="touchline" />
          <div className="halfway" />
          <div className="center-circle" />
          <div className="center-dot" />
          <div className="box box-top"><i /></div>
          <div className="box box-bottom"><i /></div>
          {zones.map((zone) => (
            <button
              className={`pitch-zone ${zone.cls}`}
              key={zone.cls}
              onClick={() => setScreen(zone.screen)}
            >
              <span className="zone-marker"><Icon name={zone.icon} /></span>
              <span className="zone-tip"><b>{zone.title}</b><small>{zone.sub}</small></span>
            </button>
          ))}
        </div>
        <div className="pitch-index left">NORTH STAND · 01</div>
        <div className="pitch-index right">INTERACTIVE PITCH / V1.4</div>
      </div>
    </main>
  );
}

function ScreenHeading({ kicker, title, accent, copy }: { kicker: string; title: string; accent: string; copy: string }) {
  return (
    <div className="screen-heading">
      <div>
        <div className="eyebrow"><span /> {kicker}</div>
        <div className="page-title compact">{title}<br /><em>{accent}</em></div>
      </div>
      <p>{copy}</p>
    </div>
  );
}

function ClubExplorer({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const [active, setActive] = useState(0);
  const club = clubData[active];
  return (
    <main className="content-screen">
      <ScreenHeading kicker="20 CLUBS · ONE LEAGUE" title="CHOOSE YOUR" accent="ALLEGIANCE." copy="Hover to inspect. Select to open the tactical board." />
      <div className="club-layout">
        <div className="club-grid">
          {clubData.map((item, index) => (
            <button
              className={active === index ? "club-tile selected" : "club-tile"}
              key={item.short}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setScreen("tactical")}
            >
              <span className="club-rank">{item.rank}</span>
              <span className="crest" style={{ "--club": item.color } as React.CSSProperties}>
                <b>{item.short.slice(0, 1)}</b>
                <i />
              </span>
              <span className="club-name">{item.name}</span>
              <span className="club-code">{item.short}</span>
            </button>
          ))}
        </div>
        <aside className="club-card" style={{ "--club": club.color } as React.CSSProperties}>
          <div className="card-scanline" />
          <div className="club-card-top">
            <span>CLUB INTELLIGENCE</span>
            <b>{club.rank} / 20</b>
          </div>
          <div className="club-identity">
            <span className="crest large"><b>{club.short.slice(0, 1)}</b><i /></span>
            <div><small>{club.short}</small><strong>{club.name}</strong><span>ENGLAND · EST. 1886</span></div>
          </div>
          <div className="rating-row">
            <div><small>ATT</small><b>91</b></div>
            <div><small>MID</small><b>88</b></div>
            <div><small>DEF</small><b>85</b></div>
            <div className="overall"><small>OVR</small><b>89</b></div>
          </div>
          <div className="stat-chart">
            <div className="chart-head"><span>EXPECTED GOALS</span><b>2.34 <small>xG / 90</small></b></div>
            <svg viewBox="0 0 380 80" preserveAspectRatio="none">
              <defs><linearGradient id="chart" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#00c2ff" stopOpacity=".4" /><stop offset="1" stopColor="#00c2ff" stopOpacity="0" /></linearGradient></defs>
              <path className="chart-fill" d="M0 68 L30 60 60 65 90 44 120 48 150 26 180 38 210 30 240 40 270 18 300 26 330 10 380 15 V80 H0Z" />
              <path className="chart-line" d="M0 68 L30 60 60 65 90 44 120 48 150 26 180 38 210 30 240 40 270 18 300 26 330 10 380 15" />
            </svg>
          </div>
          <div className="form-row"><span>LAST 5</span>{club.form.split("").map((f, i) => <b className={f} key={i}>{f}</b>)}</div>
          <button className="card-action" onClick={() => setScreen("tactical")}>OPEN TACTICAL BOARD <Icon name="arrow" /></button>
        </aside>
      </div>
    </main>
  );
}

function TacticalBoard({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const [selected, setSelected] = useState(3);
  const player = players[selected];
  return (
    <main className="tactical-screen">
      <div className="tactical-head">
        <button className="back-button" onClick={() => setScreen("clubs")}><Icon name="back" /> CLUB EXPLORER</button>
        <div className="match-context"><span>TACTICAL BOARD</span><b>Manchester City</b><small>4–2–3–1 · POSSESSION</small></div>
        <div className="formation-switch"><button className="active">IN POSSESSION</button><button>OUT OF POSSESSION</button></div>
      </div>
      <div className="tactical-layout">
        <div className="tactical-pitch">
          <div className="pitch-stripes" /><div className="touchline" /><div className="halfway" /><div className="center-circle" />
          <svg className="connectors" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M50 12 18 31 50 39 82 31M18 31 36 57 50 39 65 57 82 31M36 57 15 76 38 79 62 79 85 76M50 92 38 79M50 92 62 79" />
          </svg>
          {players.map((item, index) => (
            <button
              className={selected === index ? "player selected" : "player"}
              key={item.n}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onClick={() => setSelected(index)}
            >
              <span>{item.n}</span><small>{item.name}</small>
            </button>
          ))}
        </div>
        <aside className="player-panel">
          <div className="player-overline">PLAYER PROFILE · {player.n}</div>
          <div className="player-name">{player.name.toUpperCase()}</div>
          <div className="player-role">CREATIVE MIDFIELDER <span>MCI</span></div>
          <div className="player-score"><strong>{player.score}</strong><span>MATCH<br />RATING</span><i>↑ 12%</i></div>
          <div className="metric"><span>Touches</span><b>84</b><i style={{ width: "84%" }} /></div>
          <div className="metric"><span>Pass accuracy</span><b>92%</b><i style={{ width: "92%" }} /></div>
          <div className="metric"><span>Progressive passes</span><b>14</b><i style={{ width: "68%" }} /></div>
          <div className="metric"><span>Expected assists</span><b>0.84</b><i style={{ width: "76%" }} /></div>
          <div className="ai-note"><Icon name="spark" /><div><b>AI OBSERVATION</b><p>Finding overloads in the right half-space. 74% of progressive actions originate here.</p></div></div>
        </aside>
      </div>
    </main>
  );
}

function LiveMatches() {
  const matches = [
    { minute: "72'", home: "ARS", away: "MCI", score: "2  :  1", status: "LIVE", detail: "Emirates Stadium" },
    { minute: "HT", home: "LIV", away: "TOT", score: "1  :  1", status: "HALF TIME", detail: "Anfield" },
    { minute: "35'", home: "CHE", away: "NEW", score: "0  :  0", status: "LIVE", detail: "Stamford Bridge" },
  ];
  return (
    <main className="content-screen">
      <ScreenHeading kicker="MATCHDAY 28 · LIVE" title="EVERY SECOND." accent="EVERY SIGNAL." copy="Live scores, match momentum and on-pitch intelligence." />
      <div className="live-layout">
        <div className="score-stack">
          {matches.map((match, index) => (
            <div className={index === 0 ? "score-card featured" : "score-card"} key={match.home}>
              <div className="score-status"><b className="status-dot" />{match.status}<span>{match.minute}</span></div>
              <div className="teams"><span><i>{match.home[0]}</i>{match.home}</span><strong>{match.score}</strong><span>{match.away}<i>{match.away[0]}</i></span></div>
              <div className="match-footer"><span>{match.detail}</span><span>VIEW MATCH CENTRE <Icon name="arrow" /></span></div>
            </div>
          ))}
        </div>
        <aside className="momentum-card">
          <div className="panel-label">LIVE MOMENTUM</div>
          <div className="momentum-title"><span>ARS</span><b>PRESSURE INDEX</b><span>MCI</span></div>
          <div className="momentum-bars">
            {[62, 43, 68, 78, 54, 35, 49, 71, 82, 66, 91, 73, 58, 42, 64, 84, 71, 55].map((v, i) => <i key={i} style={{ height: `${v}%` }} />)}
          </div>
          <div className="timeline"><span>0'</span><span>45'</span><b>72'</b><span>90'</span></div>
          <div className="event-feed">
            <div><b>70:42</b><span className="event-icon">⚽</span><p><strong>GOAL · ARSENAL</strong><small>Ødegaard · xG 0.42</small></p></div>
            <div><b>64:10</b><span className="event-icon plain">↑</span><p><strong>TACTICAL SHIFT</strong><small>Man City width increased</small></p></div>
            <div><b>58:03</b><span className="event-icon card" /><p><strong>YELLOW CARD</strong><small>Rice · Tactical foul</small></p></div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function SupportScreen({ type }: { type: "fixtures" | "transfers" | "analytics" }) {
  const configs = {
    fixtures: { kicker: "MATCHDAY 29", title: "THE ROAD", accent: "AHEAD.", copy: "Every fixture. Every venue. One continuous season.", icon: "calendar" as IconName },
    transfers: { kicker: "MARKET INTELLIGENCE", title: "MOVEMENT.", accent: "MEASURED.", copy: "Verified signals and valuation intelligence, in real time.", icon: "transfer" as IconName },
    analytics: { kicker: "PL/X INTELLIGENCE", title: "SEE WHAT", accent: "OTHERS MISS.", copy: "Predictive models trained on every touch, run and decision.", icon: "spark" as IconName },
  };
  const c = configs[type];
  return (
    <main className="content-screen support-screen">
      <ScreenHeading kicker={c.kicker} title={c.title} accent={c.accent} copy={c.copy} />
      <div className="support-grid">
        <section className="feature-panel">
          <div className="feature-orbit"><Icon name={c.icon} /><i /><i /><i /></div>
          <div className="panel-label">{type === "analytics" ? "PREDICTION ENGINE" : type === "transfers" ? "TRENDING SIGNAL" : "FEATURED FIXTURE"}</div>
          <div className="feature-value">{type === "analytics" ? "68.4%" : type === "transfers" ? "£94.2M" : "SUN · 16:30"}</div>
          <p>{type === "analytics" ? "Arsenal probability of finishing first" : type === "transfers" ? "Estimated market value · priority target" : "Manchester City vs Liverpool · Etihad Stadium"}</p>
        </section>
        <section className="data-panel">
          <div className="panel-label">REAL-TIME FEED</div>
          {[1, 2, 3, 4].map((n) => (
            <div className="data-row" key={n}>
              <span>0{n}</span>
              <div><b>{type === "fixtures" ? ["ARS — CHE", "AVL — TOT", "NEW — MUN", "BHA — LIV"][n - 1] : type === "transfers" ? ["STRIKER · 88 FIT", "MIDFIELDER · 84 FIT", "DEFENDER · 81 FIT", "WINGER · 79 FIT"][n - 1] : ["TITLE MODEL", "TOP FOUR MODEL", "RELEGATION MODEL", "GOLDEN BOOT"][n - 1]}</b><small>MODEL UPDATED · 2 MIN AGO</small></div>
              <strong>{[92, 84, 76, 68][n - 1]}%</strong>
            </div>
          ))}
        </section>
        <section className="insight-panel">
          <Icon name="spark" />
          <div><div className="panel-label">AI BRIEFING</div><p>Three new signals detected across the league. Confidence threshold exceeded.</p></div>
          <button>OPEN BRIEFING <Icon name="arrow" /></button>
        </section>
      </div>
    </main>
  );
}

export default function LandingPage() {
  const [entered, setEntered] = useState(false);
  const [screen, setScreen] = useState<Screen>("hub");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!entered) return;
    setTransitioning(true);
    const timer = window.setTimeout(() => setTransitioning(false), 700);
    return () => window.clearTimeout(timer);
  }, [screen, entered]);

  if (!entered) {
    return <Hero onEnter={() => setEntered(true)} />;
  }

  return (
    <Shell screen={screen} setScreen={setScreen}>
      <div className={transitioning ? "screen-transition entering" : "screen-transition"}>
        {screen === "hub" && <PitchHub setScreen={setScreen} />}
        {screen === "clubs" && <ClubExplorer setScreen={setScreen} />}
        {screen === "tactical" && <TacticalBoard setScreen={setScreen} />}
        {screen === "live" && <LiveMatches />}
        {(screen === "fixtures" || screen === "transfers" || screen === "analytics") && <SupportScreen type={screen} />}
      </div>
    </Shell>
  );
}
