// components/ui/switch.tsx
"use client";
import React from "react";

type SwitchProps = {
  checked?: boolean;
  onCheckedChange?: (newVal: boolean) => void;
  className?: string;
  "aria-label"?: string;
};

/**
 * Lightweight switch — uses native checkbox for accessibility.
 * Controlled (checked + onCheckedChange) or uncontrolled if not provided.
 */
export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, className = "", ...rest }) => {
  const isControlled = typeof checked === "boolean";

  const [internalChecked, setInternalChecked] = React.useState<boolean>(!!checked);

  React.useEffect(() => {
    if (isControlled) setInternalChecked(!!checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.checked;
    if (!isControlled) setInternalChecked(v);
    onCheckedChange?.(v);
  };

  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        className="sr-only"
        checked={internalChecked}
        onChange={handleChange}
        {...rest}
      />
      <span
        aria-hidden
        className={`w-10 h-6 rounded-full transition-all inline-block ${internalChecked ? "bg-cyan-400" : "bg-gray-500"}`}
      >
        <span
          className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${internalChecked ? "translate-x-4" : "translate-x-1"}`}
          style={{ marginTop: 4 }}
        />
      </span>
    </label>
  );
};

export default Switch;
