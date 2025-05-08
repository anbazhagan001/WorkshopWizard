import { FaLinkedin, FaTwitter, FaEnvelope, FaGithub, FaInstagram } from "react-icons/fa";
import { TeamMember } from "@/lib/data";

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'linkedin':
        return <FaLinkedin className="text-lg" />;
      case 'twitter':
        return <FaTwitter className="text-lg" />;
      case 'email':
        return <FaEnvelope className="text-lg" />;
      case 'github':
        return <FaGithub className="text-lg" />;
      case 'instagram':
        return <FaInstagram className="text-lg" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-neutral-lightest rounded-xl overflow-hidden text-center transition transform hover:-translate-y-1 hover:shadow-md">
      <img 
        src={member.imageUrl} 
        alt={member.name} 
        className="w-full h-64 object-cover object-center" 
      />
      <div className="p-6">
        <h3 className="font-heading font-bold text-xl mb-1">{member.name}</h3>
        <p className="text-primary mb-3">{member.position}</p>
        <p className="text-secondary-dark text-sm mb-4">{member.bio}</p>
        <div className="flex justify-center space-x-3">
          {member.socialLinks.map((link) => (
            <a 
              key={link.type} 
              href={link.url} 
              className="text-secondary hover:text-primary transition"
              aria-label={`${member.name}'s ${link.type}`}
            >
              {getSocialIcon(link.type)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
