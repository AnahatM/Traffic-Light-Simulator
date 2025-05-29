import { useState, useRef, useEffect } from "react";
import "./SettingsPanelLayout.css";
import "./SettingsPanelLoopPanel.css";
import "./SettingsPanelColorRow.css";
import "./SettingsPanelCheckboxes.css";
import "./SettingsPanelButtons.css";
import "./SettingsPanelSelects.css";
import LoopPanel from "./SettingsPanelLoopPanel";
import SettingsPanelCheckboxes from "./SettingsPanelCheckboxes.tsx";
import SettingsPanelSelects from "./SettingsPanelSelects.tsx";
import SettingsPanelButtons from "./SettingsPanelButtons.tsx";
import type { LightState, LightTiming } from "./TrafficLight";

interface SettingsPanelProps {
  times: LightTiming;
  setTimes: (times: LightTiming) => void;
  enabled: LightState;
  setEnabled: (enabled: LightState) => void;
  hideDisabled: boolean;
  setHideDisabled: (hide: boolean) => void;
  direction: "vertical" | "horizontal";
  setDirection: (direction: "vertical" | "horizontal") => void;
  displayLayout: "rectangular" | "circular";
  setDisplayLayout: (layout: "rectangular" | "circular") => void;
  enableClickingLights?: boolean;
  setEnableClickingLights?: (enable: boolean) => void;
  randomizeTimes?: boolean;
  setRandomizeTimes?: (enable: boolean) => void;
  randomRange?: { min: number; max: number };
  setRandomRange?: (range: { min: number; max: number }) => void;
  fullscreen?: boolean;
  setFullscreen?: (enable: boolean) => void;
  enableShading?: boolean;
  setEnableShading?: (enable: boolean) => void;
  customColors: Record<string, string>;
  setCustomColors: (colors: Record<string, string>) => void;
  colorOrder: string[];
  setColorOrder: (order: string[]) => void;
  loopMode: "cycle" | "pingpong" | "random";
  setLoopMode: (mode: "cycle" | "pingpong" | "random") => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const loopPanelRef = useRef<HTMLDivElement>(null);

  // Local state for form values
  const [formValues, setFormValues] = useState({
    times: { ...props.times },
    enabled: { ...props.enabled },
    hideDisabled: props.hideDisabled,
    direction: props.direction,
    displayLayout: props.displayLayout,
    enableClickingLights: props.enableClickingLights ?? true,
    randomizeTimes: props.randomizeTimes ?? false,
    randomRange: props.randomRange || { min: 0.5, max: 5 },
    fullscreen: props.fullscreen ?? false,
    enableShading: props.enableShading ?? true,
    colors: { ...props.customColors },
    colorOrder: [...props.colorOrder],
    loopMode: props.loopMode,
  });

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Fading gradient for overflow: add .has-overflow class if scrollable
  useEffect(() => {
    const panel = loopPanelRef.current;
    if (!panel) return;
    const checkOverflow = () => {
      if (panel.scrollHeight > panel.clientHeight) {
        panel.classList.add("has-overflow");
      } else {
        panel.classList.remove("has-overflow");
      }
    };
    checkOverflow();
    panel.addEventListener("scroll", checkOverflow);
    window.addEventListener("resize", checkOverflow);
    return () => {
      panel.removeEventListener("scroll", checkOverflow);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [formValues.colorOrder.length]);

  return (
    <div className="settings-collapsible">
      <button id="toggleSettings" onClick={toggleCollapse}>
        ⚙️
      </button>
      <div className={`settings ${collapsed ? "collapsed" : ""}`}>
        <LoopPanel
          colorOrder={formValues.colorOrder}
          colors={formValues.colors}
          times={formValues.times}
          enabled={formValues.enabled}
          updateTime={(color, value) =>
            setFormValues((f) => ({
              ...f,
              times: { ...f.times, [color]: value },
            }))
          }
          updateColor={(color, value) =>
            setFormValues((f) => ({
              ...f,
              colors: { ...f.colors, [color]: value },
            }))
          }
          updateEnabled={(color, value) =>
            setFormValues((f) => ({
              ...f,
              enabled: { ...f.enabled, [color]: value },
            }))
          }
          moveColor={(index, direction) => {
            setFormValues((f) => {
              const arr = [...f.colorOrder];
              const newIndex = index + direction;
              if (newIndex < 0 || newIndex >= arr.length) return f;
              [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
              return { ...f, colorOrder: arr };
            });
          }}
          handleDragStart={setDraggedIdx}
          handleDragOver={(idx, e) => {
            e.preventDefault();
            if (draggedIdx === null || draggedIdx === idx) return;
            setFormValues((f) => {
              const arr = [...f.colorOrder];
              const [removed] = arr.splice(draggedIdx, 1);
              arr.splice(idx, 0, removed);
              return { ...f, colorOrder: arr };
            });
            setDraggedIdx(idx);
          }}
          handleDragEnd={() => setDraggedIdx(null)}
          draggedIdx={draggedIdx}
          deleteColor={(color) => {
            setFormValues((f) => {
              const { [color]: _, ...restColors } = f.colors;
              const { [color]: __, ...restTimes } = f.times;
              const { [color]: ___, ...restEnabled } = f.enabled;
              return {
                ...f,
                colors: restColors,
                times: restTimes,
                enabled: restEnabled,
                colorOrder: f.colorOrder.filter((c) => c !== color),
              };
            });
          }}
          addNewColor={() => {
            // Find next available custom color name
            let idx = 1;
            let newColor = `custom${idx}`;
            while (formValues.colorOrder.includes(newColor)) {
              idx++;
              newColor = `custom${idx}`;
            }
            setFormValues((f) => ({
              ...f,
              colors: { ...f.colors, [newColor]: "#888888" },
              times: { ...f.times, [newColor]: 1 },
              enabled: { ...f.enabled, [newColor]: true },
              colorOrder: [...f.colorOrder, newColor],
            }));
          }}
        />
        <SettingsPanelSelects
          formValues={formValues}
          setFormValues={setFormValues}
          setDirection={props.setDirection}
          setDisplayLayout={props.setDisplayLayout}
          setLoopMode={props.setLoopMode}
        />
        <SettingsPanelCheckboxes
          formValues={formValues}
          setFormValues={setFormValues}
        />
        {formValues.randomizeTimes && (
          <div
            className="color-panel random-range-controls"
            style={{ marginTop: 0, marginBottom: "1.2em" }}
          >
            <div className="random-row">
              <label htmlFor="min-time">Min time (s)</label>
              <input
                id="min-time"
                type="number"
                min={0.1}
                step={0.1}
                value={formValues.randomRange.min}
                onChange={(e) =>
                  setFormValues((f) => ({
                    ...f,
                    randomRange: {
                      ...f.randomRange,
                      min: parseFloat(e.target.value),
                    },
                  }))
                }
                className="random-input"
              />
            </div>
            <div className="random-row">
              <label htmlFor="max-time">Max time (s)</label>
              <input
                id="max-time"
                type="number"
                min={formValues.randomRange.min}
                step={0.1}
                value={formValues.randomRange.max}
                onChange={(e) =>
                  setFormValues((f) => ({
                    ...f,
                    randomRange: {
                      ...f.randomRange,
                      max: parseFloat(e.target.value),
                    },
                  }))
                }
                className="random-input"
              />
            </div>
          </div>
        )}
        <SettingsPanelButtons
          applySettings={() => {
            props.setTimes(formValues.times);
            props.setEnabled(formValues.enabled);
            props.setHideDisabled(formValues.hideDisabled);
            props.setDirection(formValues.direction);
            props.setDisplayLayout(formValues.displayLayout);
            if (props.setEnableClickingLights)
              props.setEnableClickingLights(formValues.enableClickingLights);
            if (props.setRandomizeTimes)
              props.setRandomizeTimes(formValues.randomizeTimes);
            if (props.setRandomRange)
              props.setRandomRange(formValues.randomRange);
            if (props.setFullscreen) props.setFullscreen(formValues.fullscreen);
            if (props.setEnableShading)
              props.setEnableShading(formValues.enableShading);
            props.setCustomColors(formValues.colors);
            props.setColorOrder(formValues.colorOrder);
            props.setLoopMode(formValues.loopMode);
          }}
          resetSettings={() => {
            // Only restore red, yellow, green, and their default colors/layouts
            setFormValues({
              times: { red: 1, yellow: 1, green: 1 },
              enabled: { red: true, yellow: true, green: true },
              hideDisabled: false,
              direction: "vertical",
              displayLayout: "rectangular",
              enableClickingLights: true,
              randomizeTimes: false,
              randomRange: { min: 0.5, max: 5 },
              fullscreen: false,
              enableShading: true,
              colors: { red: "#d32f2f", yellow: "#fbc02d", green: "#43a047" },
              colorOrder: ["red", "yellow", "green"],
              loopMode: "cycle",
            });
            // Also update parent state to match
            props.setTimes({ red: 1, yellow: 1, green: 1 });
            props.setEnabled({ red: true, yellow: true, green: true });
            props.setHideDisabled(false);
            props.setDirection("vertical");
            props.setDisplayLayout("rectangular");
            if (props.setEnableClickingLights)
              props.setEnableClickingLights(true);
            if (props.setRandomizeTimes) props.setRandomizeTimes(false);
            if (props.setRandomRange)
              props.setRandomRange({ min: 0.5, max: 5 });
            if (props.setFullscreen) props.setFullscreen(false);
            if (props.setEnableShading) props.setEnableShading(true);
            props.setCustomColors({
              red: "#d32f2f",
              yellow: "#fbc02d",
              green: "#43a047",
            });
            props.setColorOrder(["red", "yellow", "green"]);
            props.setLoopMode("cycle");
          }}
        />
        <div className="settings-footer">
          <a
            href="https://github.com/AnahatM/Traffic-Light-Simulator"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository
          </a>
          <a
            href="https://anahatmudgal.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developer Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;

// TODO: Implement bounce (pingpong) mode logic in TrafficLight component
