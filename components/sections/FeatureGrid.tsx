import { LucideIcon } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { InfoCard } from "@/components/ui/InfoCard";
import { cn } from "@/lib/utils";

interface Feature {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  description: string;
  color?: string;
}

interface FeatureGridProps {
  title?: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: "default" | "light" | "white";
  className?: string;
}

export function FeatureGrid({
  title,
  description,
  features,
  columns = 3,
  variant = "default",
  className,
}: FeatureGridProps) {
  const bgVariants = {
    default: "bg-white",
    light: "bg-[var(--color-light)]",
    white: "bg-white",
  };

  const gridColumns = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <Section className={cn(bgVariants[variant], className)}>
      <Container>
        {(title || description) && (
          <div className="text-center mx-auto mb-12">
            {title && <h2 className="mb-4">{title}</h2>}
            {description && (
              <p className="text-lg text-[var(--color-gray-700)]">
                {description}
              </p>
            )}
          </div>
        )}

        <div className={cn("grid gap-6", gridColumns[columns])}>
          {features.map((feature, index) => (
            <InfoCard
              key={index}
              icon={feature.icon}
              emoji={feature.emoji}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
