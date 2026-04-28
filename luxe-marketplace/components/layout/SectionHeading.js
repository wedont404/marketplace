import { Badge } from "@/components/ui/badge";

export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <Badge className="mb-4">{eyebrow}</Badge> : null}
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-white/60 md:text-lg">{description}</p> : null}
    </div>
  );
}
