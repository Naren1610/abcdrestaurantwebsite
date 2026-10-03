import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
  showTagline?: boolean;
  taglineClassName?: string;
  logoClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
};

export default function Logo({
  href = "/",
  showTagline = true,
  taglineClassName = "text-[#4E121E]",
  logoClassName,
  width = 100,
  height = 40,
  priority = false,
  className,
}: LogoProps) {
  const inner = (
    <>
    {/* Brand Logo */}
      <Image
        src="/images/logo.png"
        alt="ABCD Restaurant"
        width={width}
        height={height}
        priority={priority}
        className={["object-contain", logoClassName].filter(Boolean).join(" ")}
      />

      {/* Tagline */}
      {showTagline && (
        <span
          className={[
            "text-[10px] font-semibold tracking-[0.2em] uppercase font-outfit",
            taglineClassName,
          ].join(" ")}
        >
          American Brand Culturally Desi
        </span>
      )}
    </>
  );

  return (
    <Link
      href={href}
      className={["flex flex-col items-start gap-1.5 shrink-0", className]
        .filter(Boolean)
        .join(" ")}
    >
      {inner}
    </Link>
  );
}
