"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextArea: React.FC<InputProps> = ({
  id,
  label,
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        rows={13}
        className={`peer w-full p-4 pt-10 font-light bg-[#232429] border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
          ${
            errors[id]
              ? "border-rose-500 focus:border-rose-500"
              : "border-black focus:border-neutral-300"
          }
        `}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 left-5 top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
