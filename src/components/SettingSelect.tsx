import "./SettingSelect.css";

interface SelectOption {
  value: string;
  label: string;
}

interface SettingSelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

const SettingSelect: React.FC<SettingSelectProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="setting-row">
      <label>
        <span className="setting-label">{label}</span>
        <select value={value} onChange={handleChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SettingSelect;
