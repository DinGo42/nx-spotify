"use client";
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode, forwardRef, useState } from "react";
import { cn } from "../utils";

export enum InputStyleTypes {
  MAIN = "w-full text-white-1000 outline-none rounded-[4px] px-2 py-1 bg-black-600 border-black-150 border-[1px] transition-transform hover:border-white-1000 focus:border-white-1000 focus:border-2",
  NONE = "",
}

export type InputProps = {
  children?: ReactNode;
  styleType?: keyof typeof InputStyleTypes;
  inputWrapperClassName?: string;
  className?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, inputWrapperClassName, styleType, value, onChange, ...props }, ref) => {
    const [inputValue, setInputValue] = useState("");
    return (
      <div className={cn("relative flex h-fit w-full items-start gap-2", inputWrapperClassName)}>
        <input
          className={cn(styleType && InputStyleTypes[styleType], "h-full w-full", className)}
          {...props}
          value={value || inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange?.(e);
          }}
          ref={ref}
        />
        {children}
      </div>
    );
  },
);
