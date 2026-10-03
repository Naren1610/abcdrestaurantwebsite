import TeamMemberCard, { TeamMember } from "./TeamMemberCard";

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Mr. Jena",
    role: "FOUNDER & CHEF",
    description:
      "A storyteller at heart and a chef by passion, Arjun brings memories, spices, and creativity to every plate.",
    image: "/images/about/chef-image.png",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
  },
  {
    name: "Mr. Jena",
    role: "FOUNDER & CHEF",
    description:
      "A storyteller at heart and a chef by passion, Arjun brings memories, spices, and creativity to every plate.",
    image: "/images/about/chef-image.png",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
  },
  {
    name: "Mr. Jena",
    role: "FOUNDER & CHEF",
    description:
      "A storyteller at heart and a chef by passion, Arjun brings memories, spices, and creativity to every plate.",
    image: "/images/about/chef-image.png",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
  },
];

export default function MeetPeople() {
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

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-[560px] md:max-w-[640px] lg:max-w-none mx-auto lg:mx-0">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMemberCard key={`${member.name}-${index}`} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
