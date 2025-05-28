import React from "react";
import SettingSelect from "./SettingSelect";
import "./SettingsPanelSelects.css";

interface SettingsPanelSelectsProps {
  formValues: any;
  setFormValues: (v: any) => void;
  setDirection: (d: "vertical" | "horizontal") => void;
  setDisplayLayout: (l: "rectangular" | "circular") => void;
  setLoopMode: (m: "cycle" | "pingpong" | "random") => void;
}

const SettingsPanelSelects: React.FC<SettingsPanelSelectsProps> = ({
  formValues,
  setFormValues,
  setDirection,
  setDisplayLayout,
  setLoopMode,
}) => (
  <>
    <SettingSelect
      label="Loop Mode"
      value={formValues.loopMode}
      options={[
        { value: "cycle", label: "Cycle (Repeat)" },
        { value: "pingpong", label: "Bounce (Back & Forth)" },
        { value: "random", label: "Random (No Repeat)" },
      ]}
      onChange={(value) => {
        setFormValues((prev: any) => ({ ...prev, loopMode: value }));
        setLoopMode(value as "cycle" | "pingpong" | "random");
      }}
    />
    <SettingSelect
      label="Direction"
      value={formValues.direction}
      options={[
        { value: "vertical", label: "Vertical" },
        { value: "horizontal", label: "Horizontal" },
      ]}
      onChange={(value) => {
        setFormValues((prev: any) => ({ ...prev, direction: value }));
        setDirection(value as "vertical" | "horizontal");
      }}
    />
    <SettingSelect
      label="Display Layout"
      value={formValues.displayLayout}
      options={[
        { value: "rectangular", label: "Rectangular" },
        { value: "circular", label: "Circular" },
      ]}
      onChange={(value) => {
        setFormValues((prev: any) => ({ ...prev, displayLayout: value }));
        setDisplayLayout(value as "rectangular" | "circular");
      }}
    />
  </>
);

export default SettingsPanelSelects;
