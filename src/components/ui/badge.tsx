import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-2.5 py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 transition-all duration-200 overflow-hidden shadow-sm",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-[--brand-hover]",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 shadow-destructive/20",
        outline:
          "text-foreground border-border [a&]:hover:bg-accent",
        success:
          "border-transparent bg-[--status-success-bg] text-[--status-success-text] border-[--status-success-border] [a&]:hover:bg-[--status-success-bg]/80",
        warning:
          "border-transparent bg-[--status-warning-bg] text-[--status-warning-text] border-[--status-warning-border] [a&]:hover:bg-[--status-warning-bg]/80",
        error:
          "border-transparent bg-[--status-error-bg] text-[--status-error-text] border-[--status-error-border] [a&]:hover:bg-[--status-error-bg]/80",
        sale:
          "border-transparent bg-[--gold-100] text-[--gold-700] [a&]:hover:bg-[--gold-200]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
