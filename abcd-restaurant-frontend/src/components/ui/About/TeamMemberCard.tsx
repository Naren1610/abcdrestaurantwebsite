import Image from "next/image";
import Link from "next/link";

export type TeamMember = {
  name: string;
  role: string;
  description: string;
  image: string;
  facebookUrl?: string;
  instagramUrl?: string;
};

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div
      className="flex flex-row items-stretch rounded-[20px] overflow-hidden transition-transform duration-300 hover:-translate-y-1 border border-[#B98F5629]"
      style={{ backgroundColor: "#f7efe1" }}
    >
      {/* Left Column: Member Photo */}
      <div className="relative w-[42%] sm:w-[44%] shrink-0 overflow-hidden rounded-r-[18px]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top select-none"
        />
      </div>

      {/* Right Column: Member Details */}
      <div className="flex flex-col justify-between p-5 lg:p-6 w-[58%] sm:w-[56%]">
        <div>
          {/* Name (20px, Playfair Display) */}
          <h3 className="font-playfair-display text-[20px] font-normal leading-[1.2] text-[#511923]">
            {member.name}
          </h3>

          {/* Role (12px, Inter, Semi Bold) */}
          <p className="mt-1 font-inter text-[12px] font-semibold uppercase tracking-[0.12em] text-[#B98F56]">
            {member.role}
          </p>

          {/* Description (14px, Inter, Regular) */}
          <p className="mt-3.5 font-inter text-[14px] font-normal leading-[1.6] text-[#6B5E59]">
            {member.description}
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-5 flex items-center gap-3">
          {member.facebookUrl && (
            <Link
              href={member.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} Facebook`}
              className="opacity-90 transition-opacity hover:opacity-100 hover:scale-110"
            >
              <Image
                src="/images/about/Facebook.svg"
                alt="Facebook"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
            </Link>
          )}

          {member.instagramUrl && (
            <Link
              href={member.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} Instagram`}
              className="opacity-90 transition-opacity hover:opacity-100 hover:scale-110"
            >
              <Image
                src="/images/about/Instagram.svg"
                alt="Instagram"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
