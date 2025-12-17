import { ReactNode } from "react";
import { Container, Section } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description?: string;
  badge?: ReactNode;
  variant?: "image" | "gradient" | "solid" | "light";
  backgroundImage?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  title,
  description,
  badge,
  variant = "light",
  backgroundImage,
  children,
  className,
}: PageHeroProps) {
  const variants = {
    image: "text-white",
    gradient:
      "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white",
    solid: "bg-[var(--color-primary)] text-white",
    light: "bg-gradient-to-br from-[var(--color-light)] to-white",
  };

  const hasWave = variant !== "light";
  const hasImage = variant === "image" && backgroundImage;

  // Different padding for image variant (taller hero)
  const paddingClasses = variant === "image"
    ? "pt-28 pb-20 md:pt-36 md:pb-28"
    : "pt-20 pb-10 md:pt-24 md:pb-14";

  return (
    <Section
      className={cn(
        variants[variant],
        paddingClasses,
        "relative overflow-hidden",
        className
      )}
    >
      {/* Background Image */}
      {hasImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </>
      )}

      {/* Background Pattern for gradient/solid variants */}
      {variant !== "light" && variant !== "image" && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-24 h-24 md:w-32 md:h-32 border-2 md:border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 md:w-48 md:h-48 border-2 md:border-4 border-white rounded-full"></div>
        </div>
      )}

      <Container className="relative z-10">
        <div className="text-center mx-auto max-w-2xl">
          {badge && (
            <div
              className={cn(
                "inline-block px-3 py-1.5 rounded-full text-xs font-medium mb-4",
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
              "font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3",
              variant === "light"
                ? "text-[var(--color-foreground)]"
                : "!text-white"
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "text-sm md:text-base leading-relaxed max-w-xl mx-auto",
                variant === "light"
                  ? "text-[var(--color-gray-600)]"
                  : "!text-white"
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
