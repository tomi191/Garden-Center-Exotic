import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-[var(--color-gray-700)] mb-1.5 ml-1">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full px-5 py-3.5 rounded-2xl bg-[var(--color-light)] border-2 border-transparent transition-all duration-300 appearance-none cursor-pointer",
              "text-[var(--color-foreground)]",
              "focus:bg-white focus:border-[var(--color-primary)]/20 focus:ring-4 focus:ring-[var(--color-primary)]/10 outline-none",
              "hover:bg-white hover:shadow-sm",
              error && "border-red-200 focus:border-red-500/50 focus:ring-red-500/10 bg-red-50/50",
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)] pointer-events-none" />
        </div>
        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-500 ml-2 animate-slide-up">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";