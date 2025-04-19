import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-base ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-main-foreground bg-main border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none",
        noShadow: "text-main-foreground bg-main border-2 border-border",
        neutral:
          "bg-secondary-background text-foreground border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none",
        reverse:
          "text-main-foreground bg-main border-2 border-border hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-shadow",
        destructive:
          "text-[#FF6B6B] bg-[#FCD7D7] border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none",
        destructivenoShadow: "bg-[#FF6B6B] text-black border-2 border-border",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        xl: "h-12 px-10",
        xxl: "h-14 px-12",
        icon: "size-10",
      },
      textSize: {
        sm: "text-sm", // small text size
        md: "text-md", // medium text size (default)
        lg: "text-lg", // large text size
        xl: "text-xl", // extra-large text size
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      textSize: "md", // default text size set to 'md'
    },
  },
);

function Button({
  className,
  variant,
  size,
  textSize,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, textSize, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
