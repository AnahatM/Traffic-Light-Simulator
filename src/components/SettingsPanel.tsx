import { useState } from "react";
import "./SettingsPanel.css";
import SettingInput from "./SettingInput.tsx";
import SettingCheckbox from "./SettingCheckbox.tsx";
import SettingSelect from "./SettingSelect.tsx";
import ColorPicker from "./ColorPicker";
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
  customColors: { red: string; yellow: string; green: string };
  setCustomColors: (colors: {
    red: string;
    yellow: string;
    green: string;
  }) => void;
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
}) => {
  const [collapsed, setCollapsed] = useState(true);

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
  });

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
    setCustomColors(formValues.colors);
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
  };

  return (
    <div className="settings-collapsible">
      <button id="toggleSettings" onClick={toggleCollapse}>
        ⚙️
      </button>
      <div className={`settings ${collapsed ? "collapsed" : ""}`}>
        <SettingInput
          label="Red"
          value={formValues.times.red}
          min={0.2}
          step={0.1}
          onChange={(value) => updateTime("red", value)}
        >
          <ColorPicker
            color={formValues.colors.red}
            onChange={(color) => updateColor("red", color)}
          />
          <SettingCheckbox
            label="Enable Red"
            checked={formValues.enabled.red}
            onChange={(checked) => updateEnabled("red", checked)}
          />
        </SettingInput>
        <SettingInput
          label="Yellow"
          value={formValues.times.yellow}
          min={0.2}
          step={0.1}
          onChange={(value) => updateTime("yellow", value)}
        >
          <ColorPicker
            color={formValues.colors.yellow}
            onChange={(color) => updateColor("yellow", color)}
          />
          <SettingCheckbox
            label="Enable Yellow"
            checked={formValues.enabled.yellow}
            onChange={(checked) => updateEnabled("yellow", checked)}
          />
        </SettingInput>
        <SettingInput
          label="Green"
          value={formValues.times.green}
          min={0.2}
          step={0.1}
          onChange={(value) => updateTime("green", value)}
        >
          <ColorPicker
            color={formValues.colors.green}
            onChange={(color) => updateColor("green", color)}
          />
          <SettingCheckbox
            label="Enable Green"
            checked={formValues.enabled.green}
            onChange={(checked) => updateEnabled("green", checked)}
          />
        </SettingInput>
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
