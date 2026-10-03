import React, { forwardRef } from "react";

export interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

/**
 * Reusable TextAreaField component matching the InputField design system.
 */
export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    {
      label,
      error,
      containerClassName = "",
      className = "",
      id,
      rows = 3,
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
          className={`relative w-full bg-[#FFFDF8] border ${
            error ? "border-red-500" : "border-[#EAD8BF]"
          } rounded-[10px] sm:rounded-[12px] transition-all focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20`}
        >
          <textarea
            id={inputId}
            ref={ref}
            rows={rows}
            className={`w-full bg-transparent p-3.5 sm:p-4 font-poppins text-[14px] sm:text-[15px] text-[#2C1810] placeholder:text-[#A8988B] focus:outline-none resize-none ${className}`}
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

TextAreaField.displayName = "TextAreaField";

export default TextAreaField;
