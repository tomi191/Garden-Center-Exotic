import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface CTAButton {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

interface CTASectionProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  emoji?: string;
  buttons?: CTAButton[];
  variant?: "primary" | "secondary" | "accent" | "gradient";
  bgVariant?: "white" | "light";
  className?: string;
}

export function CTASection({
  title,
  description,
  icon: Icon,
  emoji,
  buttons = [],
  variant = "gradient",
  bgVariant = "light",
  className,
}: CTASectionProps) {
  const cardVariants = {
    primary:
      "bg-[var(--color-primary)] text-white",
    secondary:
      "bg-[var(--color-secondary)] text-white",
    accent:
      "bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white",
    gradient:
      "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white",
  };

  const bgVariants = {
    white: "bg-white",
    light: "bg-[var(--color-light)]",
  };

  return (
    <Section className={cn(bgVariants[bgVariant], "py-10 md:py-16", className)}>
      <Container>
        <Card className={cn(cardVariants[variant], "border-0 shadow-lg rounded-2xl md:rounded-3xl")}>
          <CardContent className="p-5 md:p-8 text-center">
            {/* Icon */}
            {Icon && (
              <Icon className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 opacity-90" />
            )}
            {emoji && (
              <div className="text-4xl md:text-5xl mb-4">{emoji}</div>
            )}

            {/* Content */}
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-sm md:text-base text-white/80 mb-5 max-w-lg mx-auto leading-relaxed">
              {description}
            </p>

            {/* Buttons */}
            {buttons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {buttons.map((button, index) => (
                  <Link key={index} href={button.href}>
                    <Button
                      size="sm"
                      variant={button.variant}
                      className={cn(
                        "rounded-full",
                        button.variant === "primary" && "bg-white text-[var(--color-primary)] hover:bg-gray-100",
                        button.variant === "outline" && "border-white/30 text-white hover:bg-white/10"
                      )}
                    >
                      {button.label}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
