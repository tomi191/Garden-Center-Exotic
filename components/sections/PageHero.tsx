import { ReactNode } from "react";
import { Container, Section } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description?: string;
  badge?: ReactNode;
  variant?: "gradient" | "solid" | "light";
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  title,
  description,
  badge,
  variant = "light",
  children,
  className,
}: PageHeroProps) {
  const variants = {
    gradient:
      "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white",
    solid: "bg-[var(--color-primary)] text-white",
    light: "bg-gradient-to-br from-[var(--color-light)] to-white",
  };

  const hasWave = variant !== "light";

  return (
    <Section
      className={cn(
        variants[variant],
        "pt-24 pb-16 relative overflow-hidden",
        className
      )}
    >
      {/* Background Pattern for gradient/solid variants */}
      {variant !== "light" && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full"></div>
        </div>
      )}

      <Container className="relative z-10">
        <div className="text-center mx-auto">
          {badge && (
            <div
              className={cn(
                "inline-block px-4 py-2 rounded-full text-sm font-medium mb-6",
                variant === "light"
                  ? "bg-[var(--color-accent)]/20 text-[var(--color-secondary)]"
                  : "bg-white/20 backdrop-blur-sm text-white"
              )}
            >
              {badge}
            </div>
          )}
          <h1
            className={cn(
              "mb-6",
              variant === "light"
                ? "text-[var(--color-foreground)]"
                : "text-white"
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "text-lg md:text-xl",
                variant === "light"
                  ? "text-[var(--color-gray-700)]"
                  : "text-white/90"
              )}
            >
              {description}
            </p>
          )}
          {children}
        </div>
      </Container>

      {/* Wave Bottom for gradient/solid variants */}
      {hasWave && (
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      )}
    </Section>
  );
}
