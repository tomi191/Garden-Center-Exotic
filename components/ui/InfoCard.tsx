import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./Card";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  description: string;
  color?: string;
  hover?: boolean;
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export function InfoCard({
  icon: Icon,
  emoji,
  title,
  description,
  color = "var(--color-primary)",
  hover = true,
  className,
  orientation = "vertical",
}: InfoCardProps) {
  const isVertical = orientation === "vertical";

  return (
    <Card className={cn("h-full", hover && "hover:shadow-lg transition-shadow", className)}>
      <CardContent
        className={cn(
          isVertical ? "text-center" : "flex items-start gap-4",
          "p-6"
        )}
      >
        {/* Icon/Emoji */}
        {(Icon || emoji) && (
          <div
            className={cn(
              "rounded-full flex items-center justify-center flex-shrink-0",
              isVertical ? "w-16 h-16 mx-auto mb-4" : "w-12 h-12"
            )}
            style={{ backgroundColor: `${color}20` }}
          >
            {Icon && (
              <Icon
                className={isVertical ? "w-8 h-8" : "w-6 h-6"}
                style={{ color }}
              />
            )}
            {emoji && (
              <span className={isVertical ? "text-4xl" : "text-2xl"}>
                {emoji}
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn(isVertical && "text-center", "flex-1")}>
          <h3
            className={cn(
              "font-bold text-[var(--color-foreground)]",
              isVertical ? "text-xl mb-3" : "text-lg mb-2"
            )}
          >
            {title}
          </h3>
          <p className="text-[var(--color-gray-700)]">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
