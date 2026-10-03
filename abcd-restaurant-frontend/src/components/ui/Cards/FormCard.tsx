import React from "react";

interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable FormCard component
 * Styled with border #EAD8BF (1px) and background #FFFDF8DB
 * Designed for checkout, reservation, and inquiry form containers
 */
export default function FormCard({
  children,
  className = "",
  ...props
}: FormCardProps) {
  // Only apply default large form padding if caller hasn't specified custom padding
  const hasCustomPadding = /\b(!?p-|!?px-|!?py-|!?pt-|!?pb-|!?pl-|!?pr-)/.test(className);
  const defaultPadding = hasCustomPadding ? "" : "p-6 sm:p-8 lg:p-10";

  return (
    <div
      className={`relative bg-[#FFFDF8DB] border border-[#EAD8BF] rounded-[12px] ${defaultPadding} shadow-[0_4px_24px_rgba(78,18,30,0.03)] backdrop-blur-xs transition-all ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
