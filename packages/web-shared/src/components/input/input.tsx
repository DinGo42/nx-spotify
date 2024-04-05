"use client";
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/client";
import { FormError } from "../form-error";

export enum InputStyleTypes {
  MAIN = "w-full h-12 text-white-1000 outline-none rounded-[4px] px-2 py-1 bg-black-600 border-black-150 border-[1px] transition-transform hover:border-white-1000 focus:border-white-1000 focus:border-2",
  NONE = "",
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
  error?: false | string;
  label?: string;
  labelClassName?: string;
  errorMessage?: boolean;
  errorInputClassName?: string;
  styleType?: keyof typeof InputStyleTypes;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      error,
      labelClassName = "text-base font-semibold",
      label,
      styleType = "NONE",
      type,
      errorInputClassName = "border-red-800 focus:border-red-800 hover:border-red-800",
      errorMessage = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("max-w-full", containerClassName)}>
        {!!label && <span className={labelClassName}>{label}</span>}
        <input
          className={cn(InputStyleTypes[styleType], error && errorInputClassName, className, "h-")}
          ref={ref}
          type={type}
          {...props}
        />
        {errorMessage && <FormError className="w-full text-end " errorText={error} />}
      </div>
    );
  },
);
Input.displayName = "Input";
