import Link from "next/link";
import ArrowRightIcon from "./ArrowRightIcon";

type CTAButtonProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  circleClassName?: string;
  arrowClassName?: string;
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
}: CTAButtonProps) {
  const content = (
    <>
      {label}
      <span className={circleClassName}>
        <ArrowRightIcon className={arrowClassName} size={16} />
      </span>
    </>
  );

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
