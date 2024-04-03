"use client";
import { useCallback, useMemo, useState } from "react";
import { cn } from "../utils/client";

export enum AnimationsTimingKeys {
  SHORT = "short",
  MEDIUM = "medium",
  LONG = "long",
}
export const animationsTimings: Record<AnimationsTimingKeys, { className: string; ms: number }> = {
  [AnimationsTimingKeys.SHORT]: {
    className: "duration-[200ms]",
    ms: 200,
  },
  [AnimationsTimingKeys.MEDIUM]: {
    className: "duration-[500ms]",
    ms: 500,
  },
  [AnimationsTimingKeys.LONG]: {
    className: "duration-[700ms]",
    ms: 700,
  },
};

export const animations = {
  opacity: (isOpen: boolean) => (isOpen ? "animate-opacity" : "opacity-0"),
  mainPage: (isOpen: boolean) => (isOpen ? "animate-mainTransition" : "translate-y-full bg-[#fff]"),
  secondaryPage: (isOpen: boolean) => (isOpen ? "animate-secondaryTransition" : "translate-x-full"),
  shake: (isOpen: boolean) => (isOpen ? "" : "animate-shake"),
};

type UseOptionalStyleProps = {
  timing: keyof typeof AnimationsTimingKeys;
  initialIsEnabled?: boolean;
  style: (isOpen: boolean) => string;
  onEnable?: () => void;
  onDisable?: () => void;
};

export const useOptionalStyle = ({ timing, initialIsEnabled, style, onEnable, onDisable }: UseOptionalStyleProps) => {
  const [isEnabled, setIsEnabled] = useState(initialIsEnabled ?? true);

  const disableStyle = useCallback(() => {
    onDisable &&
      setTimeout(() => {
        onDisable();
      }, animationsTimings[AnimationsTimingKeys[timing]].ms);
    setIsEnabled(false);
  }, [onDisable, timing]);

  const enableStyle = useCallback(() => {
    setIsEnabled(true);
    onEnable && onEnable();
  }, [onEnable]);

  const autoCloseEnable = useCallback(() => {
    enableStyle();
    setTimeout(() => {
      disableStyle();
    }, animationsTimings[AnimationsTimingKeys[timing]].ms);
  }, [disableStyle, enableStyle, timing]);

  const className = useMemo(
    () => cn(style(isEnabled), animationsTimings[AnimationsTimingKeys[timing]].className),
    [timing, isEnabled, style],
  );

  return { enableStyle, disableStyle, className, autoCloseEnable };
};
