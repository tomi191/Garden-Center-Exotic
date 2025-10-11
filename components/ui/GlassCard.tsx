import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl",
        "transition-all duration-500",
        hover && "hover:scale-105 hover:shadow-2xl hover:border-white/30",
        glow && "before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-br before:from-[var(--color-primary)]/20 before:to-[var(--color-accent)]/20 before:blur-xl before:transition-opacity before:opacity-0 hover:before:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
