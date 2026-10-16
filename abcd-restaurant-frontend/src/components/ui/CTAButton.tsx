import Link from "next/link";
import ArrowRightIcon from "./ArrowRightIcon";

type CTAButtonProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  circleClassName?: string;
  arrowClassName?: string;
  disabled?: boolean;
};

const BASE_BUTTON =
  "inline-flex items-center gap-3 rounded-full bg-brand pl-6 pr-1.5 py-1.5 text-[15px] font-semibold font-outfit text-btn-text transition-opacity duration-200 hover:opacity-90 shrink-0";

const BASE_CIRCLE =
  "flex h-8 w-8 items-center justify-center rounded-full bg-white";

const BASE_ARROW = "text-brand";

export default function CTAButton({
  label,
  href,
  onClick,
  className = BASE_BUTTON,
  circleClassName = BASE_CIRCLE,
  arrowClassName = BASE_ARROW,
  disabled = false,
}: CTAButtonProps) {
  const content = (
    <>
      {label}
      <span className={circleClassName}>
        <ArrowRightIcon className={arrowClassName} size={16} />
      </span>
    </>
  );

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={`${className} opacity-50 cursor-not-allowed pointer-events-none select-none`}
      >
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}
