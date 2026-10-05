import type { ChangeEvent } from "react";
import { adminInputClasses } from "./adminStyles";

type AdminFieldProps = {
  label: string;
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

const AdminField = ({
  label,
  id,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: AdminFieldProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs text-text-secondary uppercase tracking-[0.08em]"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={adminInputClasses}
      />
    </div>
  );
};

export default AdminField;
