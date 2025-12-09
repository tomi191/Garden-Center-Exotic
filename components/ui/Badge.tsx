import { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] border border-[var(--color-primary)]/10",
        secondary:
          "bg-[var(--color-secondary-light)] text-[var(--color-secondary)] border border-[var(--color-secondary)]/10",
        outline:
          "bg-transparent border border-[var(--color-gray-200)] text-[var(--color-gray-600)]",
        dark:
          "bg-[var(--color-gray-900)] text-white",
        success:
          "bg-green-100 text-green-800 border border-green-200",
        warning:
          "bg-amber-100 text-amber-800 border border-amber-200",
        glass: 
          "bg-white/80 backdrop-blur-sm border border-white/40 text-[var(--color-foreground)] shadow-sm",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

export function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="w-3 h-3">{icon}</span>}
      {children}
    </div>
  );
}