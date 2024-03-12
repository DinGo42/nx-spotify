import NextImage, { ImageProps as NextImageProps } from "next/image";
import { FC, ReactNode } from "react";
import { cn } from "../utils";

export type ImageProps = {
  children?: ReactNode;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
  style?: NextImageProps["style"];
} & NextImageProps;

export const Image: FC<ImageProps> = ({
  children,
  className,
  style = { width: "100%", height: "auto" },
  ...props
}) => (
  <div className={cn("relative h-fit w-full overflow-hidden", className)}>
    <NextImage style={style} {...props} />
    {children}
  </div>
);
