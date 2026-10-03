import { ArrowRight } from "lucide-react";

type ArrowRightIconProps = {
  className?: string;
  size?: number;
};

export default function ArrowRightIcon({
  className = "text-current",
  size = 16,
}: ArrowRightIconProps) {
  return (
    <ArrowRight
      size={size}
      className={className}
      strokeWidth={1.8}
      aria-hidden="true"
    />
  );
}
