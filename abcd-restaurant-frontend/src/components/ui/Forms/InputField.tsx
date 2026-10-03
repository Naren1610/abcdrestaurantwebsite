import React, { forwardRef } from "react";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefixElement?: React.ReactNode;
  containerClassName?: string;
}

/**
 * Reusable InputField component styled with Playfair & Poppins typography.
 * Follows the ABCD design system with subtle warm borders and rounded corners.
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      prefixElement,
      containerClassName = "",
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={`flex flex-col w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="font-poppins font-semibold text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-[#6B5E55] mb-1.5 block"
          >
            {label}
            {props.required && <span className="text-brand ml-0.5">*</span>}
          </label>
        )}

        <div
          className={`relative flex items-center w-full bg-[#FFFDF8] border ${
            error ? "border-red-500" : "border-[#EAD8BF]"
          } rounded-[10px] sm:rounded-[12px] transition-all focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20`}
        >
          {prefixElement && (
            <div className="flex items-center shrink-0 pl-3.5 pr-2.5 text-[#2C1810] border-r border-[#EAD8BF]/60 my-2">
              {prefixElement}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={`w-full h-[50px] sm:h-[52px] bg-transparent px-4 font-poppins text-[14px] sm:text-[15px] text-[#2C1810] placeholder:text-[#A8988B] focus:outline-none disabled:opacity-50 ${className}`}
            {...props}
          />
        </div>

        {error && (
          <span className="font-poppins text-[11px] sm:text-[12px] text-red-600 mt-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
