import { useState } from "react";
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
      />
    </div>
  );
}

export default App;
