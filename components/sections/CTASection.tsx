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
    <Section className={cn(bgVariants[bgVariant], className)}>
      <Container>
        <Card className={cn(cardVariants[variant], "border-0 shadow-xl")}>
          <CardContent className="p-8 md:p-12 text-center">
            {/* Icon */}
            {Icon && (
              <Icon className="w-16 h-16 mx-auto mb-6 opacity-90" />
            )}
            {emoji && (
              <div className="text-6xl mb-6">{emoji}</div>
            )}

            {/* Content */}
            <h2 className="text-white mb-4">{title}</h2>
            <p className="text-xl text-white/90 mb-8 mx-auto">
              {description}
            </p>

            {/* Buttons */}
            {buttons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {buttons.map((button, index) => (
                  <Link key={index} href={button.href}>
                    <Button
                      size={button.size || "lg"}
                      variant={button.variant}
                      className={cn(
                        button.variant === "primary" && "bg-white text-[var(--color-primary)] hover:bg-gray-100",
                        button.variant === "outline" && "border-white text-white hover:bg-white/10"
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
