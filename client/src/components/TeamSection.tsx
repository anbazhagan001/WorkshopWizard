import TeamMemberCard from "./TeamMemberCard";
import { teamMembers } from "@/lib/data";

export default function TeamSection() {
  return (
    <section id="team" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm font-medium mb-3">
            OUR TEAM
          </span>
          <h2 className="font-heading font-bold text-3xl mb-4">Meet the Minds Behind ClassConnect</h2>
          <p className="text-secondary-dark max-w-2xl mx-auto">
            Our diverse team brings together expertise in education, technology, and community building.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
