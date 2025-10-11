import { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary)] text-white shadow-sm hover:shadow-md",
        secondary:
          "bg-[var(--color-secondary)] text-white shadow-sm hover:shadow-md",
        accent:
          "bg-[var(--color-accent)] text-white shadow-sm hover:shadow-md",
        outline:
          "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
        ghost:
          "bg-[var(--color-primary-light)] text-[var(--color-primary)]",
        gradient:
          "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-lg",
        glass:
          "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  pulse?: boolean;
}

export function Badge({ className, variant, pulse, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {pulse && (
        <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
      )}
      {children}
    </div>
  );
}
