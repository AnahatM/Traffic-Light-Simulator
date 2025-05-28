import React from "react";
import SettingCheckbox from "./SettingCheckbox";
import "./SettingsPanelCheckboxes.css";

interface SettingsPanelCheckboxesProps {
  formValues: any;
  setFormValues: (v: any) => void;
}

const SettingsPanelCheckboxes: React.FC<SettingsPanelCheckboxesProps> = ({
  formValues,
  setFormValues,
}) => (
  <div className="setting-checkbox-group">
    <SettingCheckbox
      label="Hide disabled lights"
      checked={formValues.hideDisabled}
      onChange={(checked) =>
        setFormValues((prev: any) => ({ ...prev, hideDisabled: checked }))
      }
    />
    <SettingCheckbox
      label="Enable clicking lights"
      checked={formValues.enableClickingLights}
      onChange={(checked) =>
        setFormValues((prev: any) => ({
          ...prev,
          enableClickingLights: checked,
        }))
      }
    />
    <SettingCheckbox
      label="Fullscreen active light"
      checked={formValues.fullscreen}
      onChange={(checked) =>
        setFormValues((prev: any) => ({ ...prev, fullscreen: checked }))
      }
    />
    <SettingCheckbox
      label="Enable shading effect"
      checked={formValues.enableShading}
      onChange={(checked) =>
        setFormValues((prev: any) => ({ ...prev, enableShading: checked }))
      }
    />
    <SettingCheckbox
      label="Randomize times"
      checked={formValues.randomizeTimes}
      onChange={(checked) =>
        setFormValues((prev: any) => ({ ...prev, randomizeTimes: checked }))
      }
    />
  </div>
);

export default SettingsPanelCheckboxes;
