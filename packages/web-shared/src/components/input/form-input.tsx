import { ForwardedRef, ReactNode, forwardRef } from "react";
import { Path, UseControllerProps, useController } from "react-hook-form";
import { z } from "zod";
import { cn } from "../../utils/client";
import { Input, InputProps } from "./input";

export type FormInputProps<T extends z.Schema> = {
  phoneInput?: false;
  className?: string;
  classNameOnError?: string;
} & InputProps &
  UseControllerProps<z.infer<T>, Path<z.infer<T>>>;

type FormInputComponentProps<T extends z.Schema> = {
  children?: ReactNode;
} & Omit<FormInputProps<z.infer<T>>, "children">;

export const FormInput = forwardRef(
  <T extends z.Schema>(
    {
      children,
      className,
      classNameOnError = "border-red-800 focus:border-red-800 hover:border-red-800",
      ...props
    }: FormInputComponentProps<T>,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const { field, fieldState } = useController<z.infer<T>>(props);
    return (
      <Input {...field} className={cn(fieldState.error && classNameOnError, className)} {...props} ref={ref}>
        {children}
      </Input>
    );
  },
);
