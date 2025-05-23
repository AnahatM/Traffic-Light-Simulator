import type { ReactNode } from "react";
import "./SettingInput.css";

interface SettingInputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  children?: ReactNode;
}

const SettingInput: React.FC<SettingInputProps> = ({
  label,
  value,
  min = 0,
  max,
  step = 1,
  onChange,
  children,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };
  // Generate class name based on label (red, yellow, green)
  const colorClass = label.toLowerCase();
  return (
    <div className={`setting-row ${colorClass}-setting`}>
      <div className="setting-input-container">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          className={`${colorClass}-input`}
        />
        <span className="unit">s</span>
        {children}
      </div>
    </div>
  );
};

export default SettingInput;
