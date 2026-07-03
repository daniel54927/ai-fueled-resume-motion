
import { useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import AnimatedCard from './AnimatedCard';
import { Award, GraduationCap } from 'lucide-react';

interface BadgeData {
  name: string;
  issuer: string;
  issuedDate: string;
  imageUrl?: string;
  credlyUrl?: string;
  externalUrl?: string;
  linkLabel?: string;
  note?: string;
}

const Badges = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const comptiaCerts: BadgeData[] = [
    {
      name: "CompTIA Security+ ce Certification",
      issuer: "CompTIA",
      issuedDate: "Oct 2024 – Oct 2027",
      imageUrl: "https://images.credly.com/size/340x340/images/80d8a06a-c384-42bf-ad36-db81bce5adce/blob",
      credlyUrl: "https://www.credly.com/badges/73de6044-de25-4f04-9074-5d7a922b422c/public_url"
    },
    {
      name: "CompTIA Network+ ce Certification",
      issuer: "CompTIA",
      issuedDate: "Sep 2024 – Sep 2027",
      imageUrl: "https://images.credly.com/size/340x340/images/c70ba73e-3c8a-46fa-9d60-4a9af94ad662/blob",
      credlyUrl: "https://www.credly.com/badges/9a5ce4a7-a184-4b1b-a6ae-2caef64b2281/public_url"
    }
  ];

  const training: BadgeData[] = [
    {
      name: "Designing & Building AI Products and Services",
      issuer: "MIT xPRO",
      issuedDate: "Oct 2025",
      note: "Course completion"
    },
    {
      name: "Cybersecurity Bootcamp (incl. CySA+ & PenTest+ training)",
      issuer: "Northeastern Illinois University / QuickStart",
      issuedDate: "2024",
      note: "Course completion — not a CompTIA exam certification"
    },
    {
      name: "Python for All",
      issuer: "QuickStart",
      issuedDate: "Jul 2024",
      imageUrl: "https://images.credly.com/size/340x340/images/0252ceb2-35ba-43bb-892d-7c7742c7d724/image.png",
      credlyUrl: "https://www.credly.com/badges/19c10610-55dc-495e-b001-10d3ba96bcc5/public_url",
      note: "Course completion"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.badge-item').forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('animate-fade-in');
            }, i * 150);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const renderCard = (badge: BadgeData, index: number, isTraining = false) => {
    const inner = (
      <AnimatedCard className="h-full flex flex-col items-center p-6 dark:bg-tech-dark/50 transition-all group-hover:scale-105">
        <div className="relative mb-6 w-40 h-40 flex items-center justify-center">
          {badge.imageUrl ? (
            <img
              src={badge.imageUrl}
              alt={badge.name}
              className="max-w-full max-h-full object-contain"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-tech-blue/10 rounded-lg border border-tech-blue/20">
              <GraduationCap className="h-16 w-16 text-tech-blue" />
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-center line-clamp-3">{badge.name}</h3>
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          <Badge variant="outline" className="bg-tech-blue/10 text-tech-blue border-tech-blue/20">
            {badge.issuer}
          </Badge>
          <Badge variant="outline" className="bg-tech-purple/10 text-tech-purple border-tech-purple/20">
            {badge.issuedDate}
          </Badge>
        </div>
        {badge.note && (
          <p className="text-xs text-muted-foreground text-center mt-2 italic">{badge.note}</p>
        )}
        {badge.credlyUrl && (
          <div className="mt-auto pt-4 flex items-center text-tech-blue">
            <Award className="h-4 w-4 mr-1" />
            <span className="text-sm">View on Credly</span>
          </div>
        )}
      </AnimatedCard>
    );

    return badge.credlyUrl ? (
      <a
        key={index}
        href={badge.credlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="badge-item opacity-0 group block h-full"
      >
        {inner}
      </a>
    ) : (
      <div key={index} className="badge-item opacity-0 group block h-full">
        {inner}
      </div>
    );
  };

  return (
    <section id="badges" ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-tech-dark dark:to-tech-dark">
      <div className="section-container">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-underline">Certifications & Training</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A clear split between earned CompTIA exam certifications and course/bootcamp completions.
          </p>
        </div>

        {/* CompTIA Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center tech-gradient-text">CompTIA Certifications</h3>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {comptiaCerts.map((b, i) => renderCard(b, i))}
          </div>
        </div>

        {/* Training & Education */}
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-center tech-gradient-text">Training & Education</h3>
          <p className="text-center text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
            Course completions — these are not CompTIA exam certifications.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {training.map((b, i) => renderCard(b, i, true))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            <a
              href="https://www.credly.com/users/daniel-charles-brown"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tech-blue hover:text-tech-blue/80 inline-flex items-center"
            >
              <Award className="h-4 w-4 mr-1" />
              <span>View all certifications on Credly</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Badges;
