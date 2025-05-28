import { useState, useEffect } from "react";
import "./App.css";
import TrafficLight from "./components/TrafficLight";
import SettingsPanel from "./components/SettingsPanel";

function App() {
  // Default config
  const defaultTimes = { red: 1, yellow: 1, green: 1 };
  const defaultEnabled = { red: true, yellow: true, green: true };
  const defaultColorOrder = ["red", "yellow", "green"];
  const defaultCustomColors = {
    red: "#d32f2f",
    yellow: "#fbc02d",
    green: "#43a047",
  };
  const defaultDirection = "vertical";
  const defaultDisplayLayout = "rectangular";
  const defaultLoopMode = "pingpong";

  // State for traffic light settings
  const [times, setTimes] = useState<Record<string, number>>(defaultTimes);
  const [enabled, setEnabled] =
    useState<Record<string, boolean>>(defaultEnabled);
  const [hideDisabled, setHideDisabled] = useState<boolean>(false);
  const [direction, setDirection] = useState<"vertical" | "horizontal">(
    defaultDirection
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
  >(defaultDisplayLayout);
  const [colorOrder, setColorOrder] = useState<string[]>(defaultColorOrder);
  const [customColors, setCustomColors] =
    useState<Record<string, string>>(defaultCustomColors);
  // Loop mode state
  const [loopMode, setLoopMode] = useState<"cycle" | "pingpong" | "random">(
    defaultLoopMode
  );

  // On mount, always reset to default config
  useEffect(() => {
    setTimes(defaultTimes);
    setEnabled(defaultEnabled);
    setHideDisabled(false);
    setDirection(defaultDirection);
    setDisplayLayout(defaultDisplayLayout);
    setEnableClickingLights(true);
    setRandomizeTimes(false);
    setRandomRange({ min: 0.5, max: 5 });
    setFullscreen(false);
    setEnableShading(true);
    setCustomColors(defaultCustomColors);
    setColorOrder(defaultColorOrder);
    setLoopMode(defaultLoopMode);
  }, []);

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
