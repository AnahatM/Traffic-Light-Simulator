import { useState, useEffect } from "react";
import "./App.css";
import TrafficLight from "./components/TrafficLight";
import SettingsPanel from "./components/SettingsPanel";

function App() {
  // State for traffic light settings
  const [times, setTimes] = useState<Record<string, number>>({
    red: 1,
    yellow: 1,
    green: 1,
    yellow2: 1,
  });
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    red: true,
    yellow: true,
    green: true,
    yellow2: true,
  });
  const [hideDisabled, setHideDisabled] = useState<boolean>(false);
  const [direction, setDirection] = useState<"vertical" | "horizontal">(
    "vertical"
  );
  const [enableClickingLights, setEnableClickingLights] =
    useState<boolean>(true);
  const [randomizeTimes, setRandomizeTimes] = useState<boolean>(false);
  const [randomRange, setRandomRange] = useState<{ min: number; max: number }>({
    min: 0.5,
    max: 5,
  });
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [enableShading, setEnableShading] = useState<boolean>(true);
  const [displayLayout, setDisplayLayout] = useState<
    "rectangular" | "circular"
  >("rectangular");
  const [colorOrder, setColorOrder] = useState<string[]>([
    "red",
    "yellow",
    "green",
    "yellow2",
  ]);
  // New custom color state with default colors aligning to index.css values
  const [customColors, setCustomColors] = useState<Record<string, string>>({
    red: "#d32f2f",
    yellow: "#fbc02d",
    green: "#43a047",
  });
  // Loop mode state
  const [loopMode, setLoopMode] = useState<"cycle" | "pingpong" | "random">(
    "pingpong"
  );

  // Update CSS variables so TrafficLight and shading update automatically
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-red",
      customColors.red ?? "#d32f2f"
    );
    document.documentElement.style.setProperty(
      "--color-yellow",
      customColors.yellow ?? "#fbc02d"
    );
    document.documentElement.style.setProperty(
      "--color-green",
      customColors.green ?? "#43a047"
    );
  }, [customColors]);

  return (
    <div className="app-container">
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
        colorOrder={colorOrder}
        loopMode={loopMode}
        customColors={customColors}
      />
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
        colorOrder={colorOrder}
        setColorOrder={setColorOrder}
        loopMode={loopMode}
        setLoopMode={setLoopMode}
      />
    </div>
  );
}

export default App;
