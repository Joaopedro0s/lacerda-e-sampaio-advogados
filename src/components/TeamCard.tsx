import Image from "next/image";
import { site } from "@/content/site";

/** Card de integrante da equipe, usado na home (sem formação) e em /sobre (completo). */
export function TeamCard({ member, showEducation = false }: { member: (typeof site.team)[number]; showEducation?: boolean }) {
  return (
    <>
      <div className="overflow-hidden rounded-sm bg-paper-deep">
        <Image
          src={member.photo}
          width={800}
          height={1000}
          alt={member.alt}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 80vw"
          className="aspect-[4/5] w-full object-cover object-[50%_25%]"
        />
      </div>
      <h3 className="mt-5 text-2xl font-medium">{member.name}</h3>
      <p className="mt-1 font-semibold text-brass-ink">
        {member.role} · {member.specialty}
      </p>
      {showEducation && <p className="mt-3 text-sm text-muted">{member.education}</p>}
      <p className={`text-sm text-muted ${showEducation ? "" : "mt-2"}`}>{member.registry}</p>
    </>
  );
}
