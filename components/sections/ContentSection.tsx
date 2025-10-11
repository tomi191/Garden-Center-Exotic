import { ReactNode } from "react";
import { Container, Section } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  title?: string;
  children: ReactNode;
  aside?: ReactNode;
  imageUrl?: string;
  imagePlaceholder?: { emoji: string; text: string };
  reverse?: boolean;
  variant?: "white" | "light";
  className?: string;
}

export function ContentSection({
  title,
  children,
  aside,
  imageUrl,
  imagePlaceholder,
  reverse = false,
  variant = "white",
  className,
}: ContentSectionProps) {
  const bgVariants = {
    white: "bg-white",
    light: "bg-[var(--color-light)]",
  };

  const hasAside = aside || imageUrl || imagePlaceholder;

  return (
    <Section className={cn(bgVariants[variant], className)}>
      <Container>
        {title && (
          <div className="text-center mx-auto mb-12">
            <h2 className="mb-4">{title}</h2>
          </div>
        )}

        <div
          className={cn(
            "grid gap-12 items-center",
            hasAside && "lg:grid-cols-2"
          )}
        >
          {/* Main Content */}
          <div className={cn(reverse && hasAside && "lg:order-2")}>
            {children}
          </div>

          {/* Aside Content */}
          {hasAside && (
            <div className={cn(reverse && "lg:order-1")}>
              {aside}
              {(imageUrl || imagePlaceholder) && (
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    imagePlaceholder && (
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white">
                        <div className="text-center px-6">
                          <div className="text-8xl mb-4">
                            {imagePlaceholder.emoji}
                          </div>
                          <p className="text-xl font-medium">
                            {imagePlaceholder.text}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
