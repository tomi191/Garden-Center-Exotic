import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-[var(--color-gray-700)] mb-1.5 ml-1">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full px-5 py-4 rounded-2xl bg-[var(--color-light)] border-2 border-transparent transition-all duration-300 min-h-[140px] resize-y",
            "text-[var(--color-foreground)] placeholder:text-[var(--color-gray-400)]",
            "focus:bg-white focus:border-[var(--color-primary)]/20 focus:ring-4 focus:ring-[var(--color-primary)]/10 outline-none",
            "hover:bg-white hover:shadow-sm",
            error && "border-red-200 focus:border-red-500/50 focus:ring-red-500/10 bg-red-50/50",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-500 ml-2 animate-slide-up">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";