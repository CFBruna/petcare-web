import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/presentation/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary-600 text-white shadow hover:bg-primary-700 focus-visible:ring-primary-500",
                secondary:
                    "bg-secondary-600 text-white shadow hover:bg-secondary-700 focus-visible:ring-secondary-500",
                accent: "bg-accent-600 text-white shadow hover:bg-accent-700 focus-visible:ring-accent-500",
                outline:
                    "border-2 border-primary-600 text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-500",
                ghost: "hover:bg-neutral-100 text-neutral-700 focus-visible:ring-neutral-500",
                link: "text-primary-600 underline-offset-4 hover:underline",
            },
            size: {
                sm: "h-9 px-4 text-xs",
                md: "h-11 px-6",
                lg: "h-13 px-8 text-base",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
