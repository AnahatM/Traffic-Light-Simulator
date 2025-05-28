import React from "react";
import SettingInput from "./SettingInput";
import SettingCheckbox from "./SettingCheckbox";
import ColorPicker from "./ColorPicker";
import "./SettingsPanelColorRow.css";

interface ColorRowProps {
  color: string;
  label: string;
  value: number;
  enabled: boolean;
  colorValue: string;
  onTimeChange: (value: number) => void;
  onColorChange: (value: string) => void;
  onEnabledChange: (value: boolean) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onDelete: () => void;
  dragging: boolean;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}

const ColorRow: React.FC<ColorRowProps> = ({
  label,
  value,
  enabled,
  colorValue,
  onTimeChange,
  onColorChange,
  onEnabledChange,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  onDelete,
  dragging,
  onDragStart,
  onDragOver,
  onDragEnd,
}) => (
  <div
    className={`color-row-panel${dragging ? " dragging" : ""}`}
    draggable
    onDragStart={onDragStart}
    onDragOver={onDragOver}
    onDragEnd={onDragEnd}
    onDrop={onDragEnd}
  >
    <div className="color-row-arrows">
      <button
        className="arrow-btn"
        disabled={!canMoveUp}
        onClick={onMoveUp}
        title="Move up"
        tabIndex={-1}
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <polyline
            points="4,11 9,6 14,11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <button
        className="arrow-btn"
        disabled={!canMoveDown}
        onClick={onMoveDown}
        title="Move down"
        tabIndex={-1}
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <polyline
            points="4,7 9,12 14,7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
    <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
      <SettingInput
        label={label}
        value={value}
        min={0.2}
        step={0.1}
        onChange={onTimeChange}
      >
        <ColorPicker color={colorValue} onChange={onColorChange} />
        <SettingCheckbox
          label={`Enable ${label}`}
          checked={enabled}
          onChange={onEnabledChange}
        />
      </SettingInput>
    </div>
    <div className="color-row-delete">
      <button
        className="arrow-btn color-row-delete-btn"
        onClick={onDelete}
        title="Delete color"
        tabIndex={-1}
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <line
            x1="4"
            y1="4"
            x2="12"
            y2="12"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="12"
            y1="4"
            x2="4"
            y2="12"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default ColorRow;
