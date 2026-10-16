import Image from "next/image";
import type { TeamMember } from "@/types/api/team";

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const imageSrc =
    member.image_url && member.image_url.trim() !== ""
      ? member.image_url
      : "/images/about/chef-image.png";

  return (
    <div
      className="flex flex-row items-stretch rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-[#B98F5629] min-h-[250px] sm:min-h-[270px] lg:min-h-[280px] h-full"
      style={{ backgroundColor: "#f7efe1" }}
    >
      {/* Left Column: Member Photo */}
      <div suppressHydrationWarning className="relative w-[40%] sm:w-[42%] shrink-0 overflow-hidden rounded-r-[18px]">
        <Image
          src={imageSrc}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
          priority={false}
          className="object-cover object-top select-none"
        />
      </div>

      {/* Right Column: Content starts from the top (justify-start) with reduced spacing */}
      <div className="flex flex-col justify-start p-4 sm:p-5 lg:p-5 w-[60%] sm:w-[58%] overflow-hidden">
        {/* Name (Full name display without ellipsis) */}
        <h3 className="font-playfair-display text-[20px] sm:text-[22px] font-normal leading-[1.2] text-[#511923]">
          {member.name}
        </h3>

        {/* Role (Full role display without ellipsis) */}
        <p className="mt-1 font-inter text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.1em] text-[#B98F56]">
          {member.role}
        </p>

        {/* Story / Biography (Refined smaller text size, starting from top, with '...' if very long) */}
        {member.bio && member.bio.trim() !== "" && (
          <p
            title={member.bio}
            className="mt-2.5 font-inter text-[12.5px] sm:text-[13px] font-normal leading-[1.55] text-[#6B5E59] line-clamp-8"
          >
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}
