import { FC } from "react";
import { cn } from "../../utils/client";

export type FormErrorType = false | null | string;

export type FormErrorProps = {
  className?: string;
  errorText?: FormErrorType;
};

export const FormError: FC<FormErrorProps> = ({ className, errorText }) => (
  <p className={cn("text-regular-caption text-red-500", className)}>{errorText || " "}</p>
);
