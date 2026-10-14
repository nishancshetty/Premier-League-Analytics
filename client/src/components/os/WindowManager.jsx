import { useState } from "react";

import Window from "./Window";
import DesktopIcon from "./DesktopIcon";
import apps from "./apps";

function WindowManager() {
  const [windows, setWindows] = useState([]);

  const openWindow = (app) => {
    setWindows((prev) => {
      const exists = prev.find((w) => w.id === app.id);

      if (exists) {
        return prev.map((w) =>
          w.id === app.id
            ? { ...w, zIndex: Date.now() }
            : w
        );
      }

      return [
        ...prev,
        {
          ...app,
          zIndex: Date.now(),
        },
      ];
    });
  };

  const closeWindow = (id) => {
    setWindows((prev) =>
      prev.filter((w) => w.id !== id)
    );
  };

  const focusWindow = (id) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              zIndex: Date.now(),
            }
          : w
      )
    );
  };

  return (
    <>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-8 mb-10">

        {apps.map((app) => (
          <DesktopIcon
            key={app.id}
            icon={app.icon}
            title={app.title}
            onClick={() => openWindow(app)}
          />
        ))}

      </div>

      {windows.map((window) => {
        const Component = window.component;

        return (
          <div
            key={window.id}
            style={{
              position: "absolute",
              zIndex: window.zIndex,
            }}
            onMouseDown={() =>
              focusWindow(window.id)
            }
          >
            <Window title={window.title}>
              <Component />

              <div className="mt-8">
                <button
                  onClick={() =>
                    closeWindow(window.id)
                  }
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
                >
                  Close Window
                </button>
              </div>

            </Window>
          </div>
        );
      })}
    </>
  );
}

export default WindowManager;