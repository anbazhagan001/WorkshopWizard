// Team members data
export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  socialLinks: {
    type: string;
    url: string;
  }[];
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Co-Founder & CEO",
    bio: "Former student body president with a passion for community education and accessibility.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    socialLinks: [
      { type: "linkedin", url: "#" },
      { type: "twitter", url: "#" },
      { type: "email", url: "mailto:sarah@classconnect.io" }
    ]
  },
  {
    id: 2,
    name: "David Chen",
    position: "Co-Founder & CTO",
    bio: "Computer science graduate who built the first ClassConnect prototype as his senior project.",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    socialLinks: [
      { type: "linkedin", url: "#" },
      { type: "github", url: "#" },
      { type: "email", url: "mailto:david@classconnect.io" }
    ]
  },
  {
    id: 3,
    name: "Maya Rodriguez",
    position: "Marketing Director",
    bio: "Marketing graduate with experience in campus event coordination and social media strategy.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    socialLinks: [
      { type: "linkedin", url: "#" },
      { type: "instagram", url: "#" },
      { type: "email", url: "mailto:maya@classconnect.io" }
    ]
  },
  {
    id: 4,
    name: "James Wilson",
    position: "Operations Manager",
    bio: "Business administration graduate with a focus on community partnerships and instructor relations.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    socialLinks: [
      { type: "linkedin", url: "#" },
      { type: "twitter", url: "#" },
      { type: "email", url: "mailto:james@classconnect.io" }
    ]
  }
];

// Testimonials data
export interface Testimonial {
  id: number;
  name: string;
  title: string;
  imageUrl: string;
  rating: number;
  comment: string;
  classTaken: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emily T.",
    title: "Biology Major, Junior",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    rating: 5,
    comment: "I found an amazing pottery class through ClassConnect that perfectly complemented my science-heavy course load. It was easy to book, and I even got my roommate to join me!",
    classTaken: "Beginner's Pottery Workshop"
  },
  {
    id: 2,
    name: "Michael K.",
    title: "Computer Science, Senior",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    rating: 4.5,
    comment: "The real-time availability feature saved me so much time. I was able to find and book a Python workshop that had an opening just hours before it started. Great for last-minute planners like me!",
    classTaken: "Advanced Python for Data Science"
  },
  {
    id: 3,
    name: "Sophia L.",
    title: "Marketing, Sophomore",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    rating: 5,
    comment: "I love how easy it is to share classes on social media. I posted about a graphic design workshop I booked, and five of my classmates ended up joining. Made the experience so much better!",
    classTaken: "Branding & Logo Design Workshop"
  },
  {
    id: 4,
    name: "Jason M.",
    title: "Engineering, Freshman",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    rating: 5,
    comment: "ClassConnect helped me find a great electronics workshop near campus. The instructor was amazing and I learned practical skills that complemented my engineering coursework perfectly.",
    classTaken: "DIY Electronics Workshop"
  }
];
