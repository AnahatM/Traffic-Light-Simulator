import React from "react";
import "./SettingsPanelButtons.css";

interface SettingsPanelButtonsProps {
  applySettings: () => void;
  resetSettings: () => void;
}

const SettingsPanelButtons: React.FC<SettingsPanelButtonsProps> = ({
  applySettings,
  resetSettings,
}) => (
  <div className="settings-buttons">
    <button id="applySettings" onClick={applySettings}>
      Apply
    </button>
    <button id="resetSettings" onClick={resetSettings}>
      Reset
    </button>
  </div>
);

export default SettingsPanelButtons;
