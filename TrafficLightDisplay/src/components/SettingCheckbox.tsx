import "./SettingCheckbox.css";

interface SettingCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SettingCheckbox: React.FC<SettingCheckboxProps> = ({
  label,
  checked,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className="setting-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        id={`checkbox-${label.toLowerCase().replace(/\s+/g, "-")}`}
      />
      <label htmlFor={`checkbox-${label.toLowerCase().replace(/\s+/g, "-")}`}>
        {label}
      </label>
    </div>
  );
};

export default SettingCheckbox;
