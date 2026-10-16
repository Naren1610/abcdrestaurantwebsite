"use client";

import TeamMemberCard from "./TeamMemberCard";
import { useTeamMembers } from "@/hooks/use-team";

export default function MeetPeople() {
  const { data: teamMembers, isLoading } = useTeamMembers();

  return (
    <section
      aria-label="Meet the people behind ABCD"
      className="relative w-full bg-background py-10 lg:py-14"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Section Title (48px) */}
        <div className="mb-8 lg:mb-10 max-w-[560px] md:max-w-[640px] lg:max-w-none mx-auto lg:mx-0">
          <h2 className="font-playfair-display text-[34px] sm:text-[42px] lg:text-[48px] font-normal leading-[1.12] tracking-tight text-[#511923]">
            Meet the people{" "}
            <span className="block italic text-[#B98F56]">
              behind ABCD
            </span>
          </h2>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-[560px] md:max-w-[640px] lg:max-w-none mx-auto lg:mx-0">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="flex flex-row items-stretch rounded-[20px] overflow-hidden border border-[#B98F5629] animate-pulse min-h-[250px] sm:min-h-[270px] lg:min-h-[280px] h-full"
                style={{ backgroundColor: "#f7efe1" }}
              >
                <div className="w-[40%] sm:w-[42%] shrink-0 bg-[#e8ded0] rounded-r-[18px]" />
                <div className="flex flex-col justify-start p-4 sm:p-5 lg:p-5 w-[60%] sm:w-[58%] space-y-2.5">
                  <div className="h-5 w-3/4 bg-[#e8ded0] rounded" />
                  <div className="h-3 w-1/2 bg-[#e8ded0] rounded" />
                  <div className="h-16 w-full bg-[#e8ded0] rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Team Members Grid */}
        {!isLoading && teamMembers && teamMembers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-[560px] md:max-w-[640px] lg:max-w-none mx-auto lg:mx-0">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
