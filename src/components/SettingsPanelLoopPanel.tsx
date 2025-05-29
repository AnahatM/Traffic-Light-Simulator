import React from "react";
import ColorRow from "./SettingsPanelColorRow";
import "./SettingsPanelLoopPanel.css";

interface LoopPanelProps {
  colorOrder: string[];
  colors: Record<string, string>;
  times: Record<string, number>;
  enabled: Record<string, boolean>;
  updateTime: (color: string, value: number) => void;
  updateColor: (color: string, value: string) => void;
  updateEnabled: (color: string, value: boolean) => void;
  moveColor: (index: number, direction: -1 | 1) => void;
  handleDragStart: (idx: number) => void;
  handleDragOver: (idx: number, e: React.DragEvent) => void;
  handleDragEnd: () => void;
  draggedIdx: number | null;
  deleteColor: (color: string) => void;
  addNewColor: () => void;
}

const colorLabels: Record<string, string> = {
  red: "Red",
  yellow: "Yellow",
  green: "Green",
  yellow2: "Yellow",
};

const getColorLabel = (color: string, idx: number): string => {
  if (colorLabels[color]) return colorLabels[color];
  if (color.startsWith("custom")) {
    // Try to extract a number, otherwise use idx+1
    const match = color.match(/custom(\d+)/);
    return `Custom ${match ? parseInt(match[1], 10) : idx + 1}`;
  }
  return color;
};

const LoopPanel = React.forwardRef<HTMLDivElement, LoopPanelProps>(
  (
    {
      colorOrder,
      colors,
      times,
      enabled,
      updateTime,
      updateColor,
      updateEnabled,
      moveColor,
      handleDragStart,
      handleDragOver,
      handleDragEnd,
      draggedIdx,
      deleteColor,
      addNewColor,
    },
    ref
  ) => (
    <div className="loop-panel" style={{ position: "relative" }} ref={ref}>
      {colorOrder.map((color, idx) => (
        <ColorRow
          key={color}
          color={color}
          label={getColorLabel(color, idx)}
          value={times[color]}
          enabled={enabled[color]}
          colorValue={colors[color]}
          onTimeChange={(v) => updateTime(color, v)}
          onColorChange={(v) => updateColor(color, v)}
          onEnabledChange={(v) => updateEnabled(color, v)}
          onMoveUp={() => moveColor(idx, -1)}
          onMoveDown={() => moveColor(idx, 1)}
          canMoveUp={idx !== 0}
          canMoveDown={idx !== colorOrder.length - 1}
          onDelete={() => deleteColor(color)}
          dragging={draggedIdx === idx}
          onDragStart={() => handleDragStart(idx)}
          onDragOver={(e) => handleDragOver(idx, e)}
          onDragEnd={handleDragEnd}
        />
      ))}
      <button className="add-color-btn" onClick={addNewColor}>
        + New Color
      </button>
    </div>
  )
);

export default LoopPanel;
