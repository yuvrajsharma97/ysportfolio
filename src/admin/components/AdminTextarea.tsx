import type { ChangeEvent } from "react";
import { adminInputClasses } from "./adminStyles";

type AdminTextareaProps = {
  label: string;
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
  placeholder?: string;
};

const AdminTextarea = ({
  label,
  id,
  value,
  onChange,
  rows = 3,
  required,
  placeholder,
}: AdminTextareaProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs text-text-secondary uppercase tracking-[0.08em]"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={`${adminInputClasses} resize-none`}
      />
    </div>
  );
};

export default AdminTextarea;
