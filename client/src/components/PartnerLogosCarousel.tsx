import { useMemo } from "react";

const CARRIERS = [
  { name: "UnitedHealthcare", src: "/images/Providers_UnitedHealth_Logo_Transparent.png" },
  { name: "Aetna", src: "/images/Providers_Aetna_Logo_Transparent.png" },
  { name: "Cigna", src: "/images/Providers_Cigna_Logo_Transparent.png" },
  { name: "Humana", src: "/images/Providers_Humana_Logo_Transparent.png" },
  { name: "Anthem", src: "/images/Providers_Anthem_Logo_Transparent.png" },
  { name: "Kaiser Permanente", src: "/images/Providers_Kaiser_Logo_Transparent.png" },
  { name: "Molina Healthcare", src: "/images/Providers_Molina_Logo_Transparent.png" },
  { name: "Centene", src: "/images/Providers_Centene_Logo_Transparent.png" },
  { name: "Florida Blue", src: "/images/Providers_FloridaBlue_Logo_Transparent.png" },
] as const;

function LogoItem({ name, src }: { name: string; src: string }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center w-24 h-9 md:w-32 md:h-11 lg:w-40 lg:h-12 bg-transparent"
      title={name}
    >
      <img
        src={src}
        alt={name}
        className="max-h-full max-w-full w-auto h-auto object-contain object-center opacity-80 hover:opacity-100 transition-opacity duration-300 bg-transparent"
        loading="lazy"
        style={{ backgroundColor: "transparent" }}
      />
    </div>
  );
}

export default function PartnerLogosCarousel() {
  const duplicatedCarriers = useMemo(
    () => [...CARRIERS, ...CARRIERS] as const,
    []
  );

  return (
    <section
      className="relative overflow-hidden border-y border-border/30 py-6 md:py-8 bg-[var(--background)]"
      aria-label="Carriers we work with"
    >
      <div className="absolute inset-y-0 left-0 w-12 md:w-16 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 md:w-16 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

      <div className="marquee-content flex items-center gap-6 md:gap-8">
        {duplicatedCarriers.map((carrier, i) => (
          <LogoItem key={`${carrier.name}-${i}`} {...carrier} />
        ))}
      </div>
    </section>
  );
}
