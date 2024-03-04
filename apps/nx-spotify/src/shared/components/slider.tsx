"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import { twJoin } from "tailwind-merge";

export const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={twJoin("group relative flex h-fit w-full touch-none  select-none  items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[6px] w-full grow overflow-hidden rounded-full bg-black-200 ">
      <SliderPrimitive.Range className="absolute h-full rounded-md bg-white-1000 group-hover:bg-green-800" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="hidden size-3 rounded-full bg-white-800 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-hover:block" />
  </SliderPrimitive.Root>
));
