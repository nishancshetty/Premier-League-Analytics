import Desktop from "../os/Desktop";
import Dock from "../os/Dock";
import WindowManager from "../os/WindowManager";

function Layout() {
  return (
    <Desktop>

      <WindowManager />

      <Dock />

    </Desktop>
  );
}

export default Layout;