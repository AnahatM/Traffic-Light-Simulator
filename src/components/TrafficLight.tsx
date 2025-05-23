import { useState, useEffect, useRef } from "react";
import "./TrafficLight.css";

export interface LightState {
  red: boolean;
  yellow: boolean;
  green: boolean;
}

export interface LightTiming {
  red: number;
  yellow: number;
  green: number;
}

interface TrafficLightProps {
  times: LightTiming;
  enabled: LightState;
  hideDisabled: boolean;
  direction: "vertical" | "horizontal";
  enableClickingLights?: boolean;
  randomizeTimes?: boolean;
  randomRange?: { min: number; max: number };
  fullscreen?: boolean;
  enableShading?: boolean;
}

const TrafficLight: React.FC<TrafficLightProps> = ({
  times,
  enabled,
  hideDisabled,
  direction,
  enableClickingLights = true,
  randomizeTimes = false,
  randomRange = { min: 0.5, max: 5 },
  fullscreen = false,
  enableShading = true,
}) => {
  const [activeColor, setActiveColor] = useState<"red" | "yellow" | "green">(
    "red"
  );
  const [, setCurrentTimes] = useState({ ...times });
  const timerRef = useRef<number | null>(null);
  const order: Array<"red" | "yellow" | "green"> = ["red", "yellow", "green"];

  // Find next enabled light
  const findNextColor = (
    currentColor: "red" | "yellow" | "green"
  ): "red" | "yellow" | "green" => {
    const visibleLights = order.filter((color) => enabled[color]);
    if (visibleLights.length === 0) return "red";

    const currentIndex = order.indexOf(currentColor);
    let nextIndex = (currentIndex + 1) % order.length;

    // Find the next enabled light
    while (!enabled[order[nextIndex]] && nextIndex !== currentIndex) {
      nextIndex = (nextIndex + 1) % order.length;
    }

    return order[nextIndex];
  };
  // Get a random time within the specified range
  const getRandomTime = (color: keyof LightTiming) => {
    if (!randomizeTimes || !randomRange) {
      return times[color];
    }
    const { min, max } = randomRange;
    return Math.random() * (max - min) + min;
  };

  // Start or restart the timer
  const startTimer = (color: "red" | "yellow" | "green") => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    const visibleLights = order.filter((c) => enabled[c]);
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
      const nextColor = findNextColor(color);
      setActiveColor(nextColor);
      startTimer(nextColor);
    }, duration * 1000);
  };
  // Effect to restart timer when settings change
  useEffect(() => {
    const visibleLights = order.filter((color) => enabled[color]);
    if (visibleLights.length === 0) {
      setActiveColor("red");
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

    startTimer(activeColor);

    // Clean up timer on unmount
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [times, enabled, activeColor, randomizeTimes, randomRange]); // Handle click on a light
  const handleLightClick = (color: "red" | "yellow" | "green") => {
    if (!enableClickingLights || !enabled[color]) return;
    setActiveColor(color);
    startTimer(color);
  };
  return (
    <div
      className={`traffic-lights ${direction} ${
        fullscreen ? "fullscreen" : ""
      } ${enableShading ? "shaded" : ""}`}
    >
      {order.map((color) => (
        <div
          key={color}
          className={`light ${color} ${
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
          }}
          onClick={() => handleLightClick(color)}
        />
      ))}
    </div>
  );
};

export default TrafficLight;
