import { useState, useRef, useEffect } from "react";
import "./SettingsPanel.css";
import SettingCheckbox from "./SettingCheckbox.tsx";
import SettingSelect from "./SettingSelect.tsx";
import type { LightState, LightTiming } from "./TrafficLight";
import LoopPanel from "./SettingsPanelLoopPanel.tsx";

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
  loopMode: "cycle" | "pingpong";
  setLoopMode: (mode: "cycle" | "pingpong") => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  times,
  setTimes,
  enabled,
  setEnabled,
  hideDisabled,
  setHideDisabled,
  direction,
  setDirection,
  displayLayout,
  setDisplayLayout,
  enableClickingLights = true,
  setEnableClickingLights,
  randomizeTimes = false,
  setRandomizeTimes,
  randomRange = { min: 0.5, max: 5 },
  setRandomRange,
  fullscreen = false,
  setFullscreen,
  enableShading = true,
  setEnableShading,
  customColors,
  setCustomColors,
  colorOrder,
  setColorOrder,
  loopMode,
  setLoopMode,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const loopPanelRef = useRef<HTMLDivElement>(null);

  // Local state to track form values (including colors)
  const [formValues, setFormValues] = useState({
    times: { ...times },
    enabled: { ...enabled },
    hideDisabled,
    direction,
    displayLayout,
    enableClickingLights:
      enableClickingLights !== undefined ? enableClickingLights : true,
    randomizeTimes: randomizeTimes !== undefined ? randomizeTimes : false,
    randomRange: randomRange || { min: 0.5, max: 5 },
    fullscreen: fullscreen !== undefined ? fullscreen : false,
    enableShading: enableShading !== undefined ? enableShading : true,
    colors: { ...customColors },
    colorOrder: [...colorOrder],
  });

  const [loopModeLocal, setLoopModeLocal] = useState<"cycle" | "pingpong">(
    loopMode
  );

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const updateTime = (color: keyof LightTiming, value: number) => {
    setFormValues((prev) => ({
      ...prev,
      times: {
        ...prev.times,
        [color]: Math.max(0.2, value),
      },
    }));
  };

  const updateEnabled = (color: keyof LightState, value: boolean) => {
    setFormValues((prev) => ({
      ...prev,
      enabled: {
        ...prev.enabled,
        [color]: value,
      },
    }));
  };

  const updateColor = (color: keyof typeof customColors, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [color]: value,
      },
    }));
  };

  // Reorder colorOrder array
  const moveColor = (index: number, direction: -1 | 1) => {
    setFormValues((prev) => {
      const arr = [...prev.colorOrder];
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= arr.length) return prev;
      [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
      return { ...prev, colorOrder: arr };
    });
  };

  // Drag and drop handlers
  const handleDragStart = (idx: number) => setDraggedIdx(idx);
  const handleDragOver = (idx: number, e: React.DragEvent) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;
    setFormValues((prev) => {
      const arr = [...prev.colorOrder];
      const [removed] = arr.splice(draggedIdx, 1);
      arr.splice(idx, 0, removed);
      return { ...prev, colorOrder: arr };
    });
    setDraggedIdx(idx);
  };
  const handleDragEnd = () => setDraggedIdx(null);

  // Add new color logic
  const addNewColor = (): void => {
    // Generate a unique color key
    let i = 1;
    let newKey = `custom${i}`;
    while (formValues.colors[newKey]) {
      i++;
      newKey = `custom${i}`;
    }
    setFormValues((prev) => ({
      ...prev,
      times: { ...prev.times, [newKey]: 1 },
      enabled: { ...prev.enabled, [newKey]: true },
      colors: { ...prev.colors, [newKey]: "#888888" },
      colorOrder: [...prev.colorOrder, newKey],
    }));
  };

  const applySettings = () => {
    setTimes(formValues.times);
    setEnabled(formValues.enabled);
    setHideDisabled(formValues.hideDisabled);
    setDirection(formValues.direction);
    setDisplayLayout(formValues.displayLayout);
    if (setEnableClickingLights) {
      setEnableClickingLights(formValues.enableClickingLights);
    }
    if (setRandomizeTimes) {
      setRandomizeTimes(formValues.randomizeTimes);
    }
    if (setRandomRange) {
      setRandomRange(formValues.randomRange);
    }
    if (setFullscreen) {
      setFullscreen(formValues.fullscreen);
    }
    if (setEnableShading) {
      setEnableShading(formValues.enableShading);
    }
    // Propagate all custom colors to parent
    setCustomColors(formValues.colors);
    setColorOrder(formValues.colorOrder);
    setLoopMode(loopModeLocal);
  };

  const resetSettings = () => {
    const defaultSettings = {
      times: { red: 1, yellow: 1, green: 1 },
      enabled: { red: true, yellow: true, green: true },
      hideDisabled: false,
      direction: "vertical" as const,
      displayLayout: "rectangular" as const,
      enableClickingLights: true,
      randomizeTimes: false,
      randomRange: { min: 0.5, max: 5 },
      fullscreen: false,
      enableShading: true,
      colors: {
        red: "#d32f2f",
        yellow: "#fbc02d",
        green: "#43a047",
      },
      colorOrder: ["red", "yellow", "green"],
    };
    setFormValues(defaultSettings);
    setTimes(defaultSettings.times);
    setEnabled(defaultSettings.enabled);
    setHideDisabled(defaultSettings.hideDisabled);
    setDirection(defaultSettings.direction);
    setDisplayLayout(defaultSettings.displayLayout);
    if (setEnableClickingLights) {
      setEnableClickingLights(defaultSettings.enableClickingLights);
    }
    if (setRandomizeTimes) {
      setRandomizeTimes(defaultSettings.randomizeTimes);
    }
    if (setRandomRange) {
      setRandomRange(defaultSettings.randomRange);
    }
    if (setFullscreen) {
      setFullscreen(defaultSettings.fullscreen);
    }
    if (setEnableShading) {
      setEnableShading(defaultSettings.enableShading);
    }
    setCustomColors(defaultSettings.colors);
    setColorOrder(defaultSettings.colorOrder);
    setLoopMode("pingpong");
    setLoopModeLocal("pingpong");
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
        <div ref={loopPanelRef}>
          <LoopPanel
            colorOrder={formValues.colorOrder}
            colors={formValues.colors}
            times={formValues.times}
            enabled={formValues.enabled}
            updateTime={updateTime}
            updateColor={updateColor}
            updateEnabled={updateEnabled}
            moveColor={moveColor}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragEnd={handleDragEnd}
            draggedIdx={draggedIdx}
            deleteColor={(color: string) => {
              setFormValues((prev) => {
                const newOrder = prev.colorOrder.filter((c) => c !== color);
                const { [color]: _, ...newColors } = prev.colors;
                const { [color]: __, ...newTimes } = prev.times;
                const { [color]: ___, ...newEnabled } = prev.enabled;
                return {
                  ...prev,
                  colorOrder: newOrder,
                  colors: newColors,
                  times: newTimes,
                  enabled: newEnabled,
                };
              });
            }}
            addNewColor={addNewColor}
          />
        </div>
        <SettingSelect
          label="Loop Mode"
          value={loopModeLocal}
          options={[
            { value: "cycle", label: "Cycle (Repeat)" },
            { value: "pingpong", label: "Bounce (Back & Forth)" },
          ]}
          onChange={(value) => setLoopModeLocal(value as "cycle" | "pingpong")}
        />
        <div className="setting-checkbox-group">
          <SettingCheckbox
            label="Hide disabled lights"
            checked={formValues.hideDisabled}
            onChange={(checked) =>
              setFormValues((prev) => ({ ...prev, hideDisabled: checked }))
            }
          />
          <SettingCheckbox
            label="Enable clicking lights"
            checked={formValues.enableClickingLights}
            onChange={(checked) =>
              setFormValues((prev) => ({
                ...prev,
                enableClickingLights: checked,
              }))
            }
          />{" "}
          <SettingCheckbox
            label="Fullscreen active light"
            checked={formValues.fullscreen}
            onChange={(checked) =>
              setFormValues((prev) => ({ ...prev, fullscreen: checked }))
            }
          />
          <SettingCheckbox
            label="Enable shading effect"
            checked={formValues.enableShading}
            onChange={(checked) =>
              setFormValues((prev) => ({ ...prev, enableShading: checked }))
            }
          />
          <SettingCheckbox
            label="Randomize times"
            checked={formValues.randomizeTimes}
            onChange={(checked) =>
              setFormValues((prev) => ({ ...prev, randomizeTimes: checked }))
            }
          />
        </div>
        {formValues.randomizeTimes && (
          <div className="random-time-settings">
            <div className="setting-row">
              <label>
                <span className="setting-label">Min time (s)</span>
                <input
                  type="number"
                  value={formValues.randomRange.min}
                  min={0.2}
                  step={0.1}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      setFormValues((prev) => ({
                        ...prev,
                        randomRange: {
                          ...prev.randomRange,
                          min: Math.max(
                            0.2,
                            Math.min(value, prev.randomRange.max)
                          ),
                        },
                      }));
                    }
                  }}
                />
              </label>
            </div>

            <div className="setting-row">
              <label>
                <span className="setting-label">Max time (s)</span>
                <input
                  type="number"
                  value={formValues.randomRange.max}
                  min={0.5}
                  step={0.1}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      setFormValues((prev) => ({
                        ...prev,
                        randomRange: {
                          ...prev.randomRange,
                          max: Math.max(prev.randomRange.min, value),
                        },
                      }));
                    }
                  }}
                />
              </label>
            </div>
          </div>
        )}{" "}
        <SettingSelect
          label="Direction"
          value={formValues.direction}
          options={[
            { value: "vertical", label: "Vertical" },
            { value: "horizontal", label: "Horizontal" },
          ]}
          onChange={(value) =>
            setFormValues((prev) => ({
              ...prev,
              direction: value as "vertical" | "horizontal",
            }))
          }
        />
        <SettingSelect
          label="Display Layout"
          value={formValues.displayLayout}
          options={[
            { value: "rectangular", label: "Rectangular" },
            { value: "circular", label: "Circular" },
          ]}
          onChange={(value) =>
            setFormValues((prev) => ({
              ...prev,
              displayLayout: value as "rectangular" | "circular",
            }))
          }
        />
        <div className="settings-buttons">
          <button id="applySettings" onClick={applySettings}>
            Apply
          </button>
          <button id="resetSettings" onClick={resetSettings}>
            Reset
          </button>
        </div>
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
