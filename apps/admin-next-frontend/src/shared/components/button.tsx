import {
  ReactNode,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  forwardRef,
} from "react";
import { cn } from "../utils";

export enum ButtonStyleTypes {
  MAIN_ROUND = "p-1 rounded-full bg-black-400 transition-colors",
  NONE = "",
}

export type ButtonProps = {
  children: ReactNode;
  styleType?: keyof typeof ButtonStyleTypes;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, styleType, className, ...props }, ref) => (
    <button
      className={cn(styleType && ButtonStyleTypes[styleType], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  ),
);
