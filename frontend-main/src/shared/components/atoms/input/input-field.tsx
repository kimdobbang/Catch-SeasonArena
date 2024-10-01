interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string; // 입력 타입 (예: password, email 등)
  value: string;
  onChange: (value: string) => void;
  labelColor?: string; //optional
  borderColor?: string; //optional
  focusBorderColor?: string; //optional
  hasBottomLine?: boolean; //optional
}

export const InputField = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  labelColor = "text-catch-gray-999",
  borderColor = "border-catch-sub-400",
  focusBorderColor = "focus:border-catch-main-700",
  hasBottomLine = true,
}: InputFieldProps) => {
  return (
    <div className="relative w-full">
      <input
        autoComplete="off"
        id={label}
        name={label}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`peer h-10 w-full bg-transparent ${hasBottomLine ? `border-b-2 ${borderColor} ${focusBorderColor}` : ""} text-gray-900 focus:outline-none placeholder-transparent focus:placeholder-gray-400`}
      />
      <label
        htmlFor={label}
        className={`absolute left-0 -top-3.5 ${labelColor} text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm`}
      >
        {label}
      </label>
    </div>
  );
};
