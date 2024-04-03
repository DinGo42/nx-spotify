"use client";
import { Button, Link } from "@web-shared/components";
import { animations, useOptionalStyle } from "@web-shared/hooks";
import { HeartIcon } from "@web-shared/icons";
import { cn } from "@web-shared/utils/client";
import { FC, useState } from "react";

export const SongInfo: FC = () => {
  const [liked, setLike] = useState(false);
  const { className, enableStyle, disableStyle } = useOptionalStyle({
    style: animations.shake,
    timing: "SHORT",
  });
  return (
    <div className="flex items-center gap-3 text-nowrap">
      <div className="bg-black-150 size-[60px] rounded-md"></div>
      <div className="flex flex-col">
        <Link href={"/"} className="hover:underline">
          redrum
        </Link>
        <Link href={"/"} className="text-black-150 hover:text-white-1000 hover:underline">
          21 Savage
        </Link>
      </div>
      <Button
        onClick={() => {
          setLike((prev) => !prev);
          liked ? disableStyle() : enableStyle();
        }}
      >
        <HeartIcon
          className={cn(
            "ml-2 transition-colors",
            liked ? "fill-green-800 stroke-green-800" : "hover:stroke-white-1000",
            className,
          )}
        />
      </Button>
    </div>
  );
};
