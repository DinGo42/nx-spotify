"use client";
import { HeartIcon } from "@web-shared";
import { Button, Link, animations, cn, useOptionalStyle } from "@web-shared";
import { FC, useState } from "react";

export const SongInfo: FC = () => {
  const [liked, setLike] = useState(false);
  const { className, enableStyle, disableStyle } = useOptionalStyle({
    style: animations.shake,
    timing: "SHORT",
  });
  return (
    <div className="flex items-center gap-3 text-nowrap">
      <div className="size-[60px] rounded-md bg-black-150"></div>
      <div className="flex flex-col">
        <Link href={"/"} className="hover:underline">
          redrum
        </Link>
        <Link
          href={"/"}
          className="text-black-150 hover:text-white-1000 hover:underline"
        >
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
            liked
              ? "fill-green-800 stroke-green-800"
              : "hover:stroke-white-1000",
            className,
          )}
        />
      </Button>
    </div>
  );
};
