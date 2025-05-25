import { useState, useEffect } from "react";
import "./App.css";
import TrafficLight from "./components/TrafficLight";
import SettingsPanel from "./components/SettingsPanel";

function App() {
  // State for traffic light settings
  const [times, setTimes] = useState({ red: 1, yellow: 1, green: 1 });
  const [enabled, setEnabled] = useState({
    red: true,
    yellow: true,
    green: true,
  });
  const [hideDisabled, setHideDisabled] = useState(false);
  const [direction, setDirection] = useState<"vertical" | "horizontal">(
    "vertical"
  );
  const [enableClickingLights, setEnableClickingLights] = useState(true);
  const [randomizeTimes, setRandomizeTimes] = useState(false);
  const [randomRange, setRandomRange] = useState({ min: 0.5, max: 5 });
  const [fullscreen, setFullscreen] = useState(false);
  const [enableShading, setEnableShading] = useState(true);
  const [displayLayout, setDisplayLayout] = useState<
    "rectangular" | "circular"
  >("rectangular");

  // New custom color state with default colors aligning to index.css values
  const [customColors, setCustomColors] = useState({
    red: "#d32f2f",
    yellow: "#fbc02d",
    green: "#43a047",
  });

  // Update CSS variables so TrafficLight and shading update automatically
  useEffect(() => {
    document.documentElement.style.setProperty("--color-red", customColors.red);
    document.documentElement.style.setProperty(
      "--color-yellow",
      customColors.yellow
    );
    document.documentElement.style.setProperty(
      "--color-green",
      customColors.green
    );
  }, [customColors]);

  return (
    <div className="app-container">
      {" "}
      <TrafficLight
        times={times}
        enabled={enabled}
        hideDisabled={hideDisabled}
        direction={direction}
        displayLayout={displayLayout}
        enableClickingLights={enableClickingLights}
        randomizeTimes={randomizeTimes}
        randomRange={randomRange}
        fullscreen={fullscreen}
        enableShading={enableShading}
      />{" "}
      <SettingsPanel
        times={times}
        setTimes={setTimes}
        enabled={enabled}
        setEnabled={setEnabled}
        hideDisabled={hideDisabled}
        setHideDisabled={setHideDisabled}
        direction={direction}
        setDirection={setDirection}
        displayLayout={displayLayout}
        setDisplayLayout={setDisplayLayout}
        enableClickingLights={enableClickingLights}
        setEnableClickingLights={setEnableClickingLights}
        randomizeTimes={randomizeTimes}
        setRandomizeTimes={setRandomizeTimes}
        randomRange={randomRange}
        setRandomRange={setRandomRange}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
        enableShading={enableShading}
        setEnableShading={setEnableShading}
        customColors={customColors}
        setCustomColors={setCustomColors}
      />
    </div>
  );
}

export default App;
