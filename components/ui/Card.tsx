import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "glass" | "outline" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
  hoverEffect?: boolean;
}

export function Card({ 
  children, 
  variant = "default", 
  padding = "md",
  hoverEffect = false,
  className, 
  ...props 
}: CardProps) {
  const variants = {
    default: "bg-white border border-[var(--color-gray-100)] shadow-sm",
    glass: "bg-white/70 backdrop-blur-md border border-white/50 shadow-glass",
    outline: "bg-transparent border border-[var(--color-gray-200)]",
    flat: "bg-[var(--color-gray-50)] border-none",
  };

  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8 md:p-10",
  };

  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        variants[variant],
        paddings[padding],
        hoverEffect && "hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Subcomponents for structure
export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-4 flex flex-col gap-1", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("font-serif text-2xl font-semibold leading-tight text-[var(--color-foreground)]", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-sm text-[var(--color-gray-500)]", className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mt-6 flex items-center pt-4 border-t border-[var(--color-gray-100)]", className)}>{children}</div>;
}