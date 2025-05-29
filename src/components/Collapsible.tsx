import React, { useState, type ReactNode } from "react";
import "./Collapsible.css";

interface CollapsibleProps {
  title?: string;
  headerContent?: ReactNode; // New: allows custom header
  defaultCollapsed?: boolean;
  children: ReactNode;
  className?: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  headerContent,
  defaultCollapsed = true,
  children,
  className = "",
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div
      className={`collapsible${collapsed ? " collapsed" : ""} ${className}`}
      style={{ marginTop: 24 }}
    >
      <div className="collapsible-header">
        <button
          className="collapsible-toggle"
          onClick={() => setCollapsed((c) => !c)}
          aria-expanded={!collapsed}
          aria-controls="collapsible-content"
        >
          <span className="collapsible-arrow">{collapsed ? "▶" : "▼"}</span>
        </button>
        {headerContent ? (
          <div className="collapsible-header-content">{headerContent}</div>
        ) : (
          <span className="collapsible-title">{title}</span>
        )}
      </div>
      <div
        id="collapsible-content"
        className="collapsible-content collapsible-panel-bg"
        style={{ display: collapsed ? "none" : "block" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapsible;
