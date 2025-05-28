import { useState, useEffect, useRef } from "react";
import "./TrafficLight.css";

export interface LightState {
  [color: string]: boolean;
}

export interface LightTiming {
  [color: string]: number;
}

interface TrafficLightProps {
  times: LightTiming;
  enabled: LightState;
  hideDisabled: boolean;
  direction: "vertical" | "horizontal";
  displayLayout: "rectangular" | "circular";
  enableClickingLights?: boolean;
  randomizeTimes?: boolean;
  randomRange?: { min: number; max: number };
  fullscreen?: boolean;
  enableShading?: boolean;
  colorOrder: string[];
  loopMode?: "cycle" | "pingpong";
  customColors?: Record<string, string>;
}

const TrafficLight: React.FC<TrafficLightProps> = ({
  times,
  enabled,
  hideDisabled,
  direction,
  displayLayout,
  enableClickingLights = true,
  randomizeTimes = false,
  randomRange = { min: 0.5, max: 5 },
  fullscreen = false,
  enableShading = true,
  colorOrder,
  loopMode = "pingpong",
  customColors = {},
}) => {
  const [activeColor, setActiveColor] = useState<string>(colorOrder[0]);
  const [, setCurrentTimes] = useState<LightTiming>({ ...times });
  const timerRef = useRef<number | null>(null);
  const [directionForward, setDirectionForward] = useState<boolean>(true);

  // Find next enabled light (cycle or pingpong)
  const findNextColor = (
    currentColor: string,
    forward: boolean
  ): { nextColor: string; nextDirection: boolean } => {
    const visibleLights = colorOrder.filter((color) => enabled[color]);
    if (visibleLights.length === 0) {
      return { nextColor: colorOrder[0], nextDirection: true };
    }
    const currentIndex = colorOrder.indexOf(currentColor);
    if (loopMode === "cycle") {
      // Standard cycle mode
      let nextIndex = (currentIndex + 1) % colorOrder.length;
      // Find the next enabled light
      while (!enabled[colorOrder[nextIndex]] && nextIndex !== currentIndex) {
        nextIndex = (nextIndex + 1) % colorOrder.length;
      }
      return { nextColor: colorOrder[nextIndex], nextDirection: true };
    } else {
      // Pingpong mode
      let nextIndex = currentIndex + (forward ? 1 : -1);
      let nextDir = forward;
      // Bounce at ends
      if (nextIndex >= colorOrder.length) {
        nextIndex = colorOrder.length - 2;
        nextDir = false;
      } else if (nextIndex < 0) {
        nextIndex = 1;
        nextDir = true;
      }
      // Find the next enabled light in the direction
      let attempts = 0;
      while (
        (!enabled[colorOrder[nextIndex]] || nextIndex === currentIndex) &&
        attempts < colorOrder.length
      ) {
        nextIndex += nextDir ? 1 : -1;
        if (nextIndex >= colorOrder.length) {
          nextIndex = colorOrder.length - 2;
          nextDir = false;
        } else if (nextIndex < 0) {
          nextIndex = 1;
          nextDir = true;
        }
        attempts++;
      }
      return { nextColor: colorOrder[nextIndex], nextDirection: nextDir };
    }
  };

  // Get a random time within the specified range
  const getRandomTime = (color: string) => {
    if (!randomizeTimes || !randomRange) {
      return times[color];
    }
    const { min, max } = randomRange;
    return Math.random() * (max - min) + min;
  };

  // Start or restart the timer
  const startTimer = (color: string, forward: boolean) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    const visibleLights = colorOrder.filter((c) => enabled[c]);
    if (visibleLights.length === 0) return;
    // Get the time for this light (random or fixed)
    const duration = randomizeTimes ? getRandomTime(color) : times[color];
    // Update the current times state for display
    if (randomizeTimes) {
      setCurrentTimes((prev) => ({
        ...prev,
        [color]: duration,
      }));
    }
    timerRef.current = window.setTimeout(() => {
      const { nextColor, nextDirection } = findNextColor(color, forward);
      setActiveColor(nextColor);
      setDirectionForward(nextDirection);
      startTimer(nextColor, nextDirection);
    }, duration * 1000);
  };

  // Effect to restart timer when settings change
  useEffect(() => {
    const visibleLights = colorOrder.filter((color) => enabled[color]);
    if (visibleLights.length === 0) {
      setActiveColor(colorOrder[0]);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    // If current color is not enabled, switch to first enabled color
    if (!enabled[activeColor]) {
      setActiveColor(visibleLights[0]);
    }
    // If not randomizing, update current times to match fixed times
    if (!randomizeTimes) {
      setCurrentTimes({ ...times });
    }
    startTimer(activeColor, directionForward);
    // Clean up timer on unmount
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line
  }, [
    times,
    enabled,
    activeColor,
    randomizeTimes,
    randomRange,
    colorOrder,
    loopMode,
  ]);

  // Handle click on a light
  const handleLightClick = (color: string) => {
    if (!enableClickingLights || !enabled[color]) return;
    setActiveColor(color);
    startTimer(color, directionForward);
  };

  return (
    <div
      className={`traffic-lights ${direction} ${
        fullscreen ? "fullscreen" : ""
      } ${enableShading ? "shaded" : ""} ${displayLayout}`}
    >
      {colorOrder.map((color) => {
        // Determine if this is a known color for class styling
        const isKnown = ["red", "yellow", "green", "yellow2"].includes(color);
        const colorClass = color === "yellow2" ? "yellow" : color;
        return (
          <div
            key={color}
            className={`light ${isKnown ? colorClass : "custom"} ${
              activeColor === color ? "active" : "inactive"
            } ${enableClickingLights ? "clickable" : ""} ${
              enableShading ? "shaded" : ""
            }`}
            style={{
              display:
                (fullscreen && activeColor !== color) ||
                (!enabled[color] && hideDisabled)
                  ? "none"
                  : "block",
              background:
                !isKnown && activeColor === color
                  ? customColors?.[color] || "#888888"
                  : undefined,
            }}
            onClick={() => handleLightClick(color)}
          />
        );
      })}
    </div>
  );
};

export default TrafficLight;
