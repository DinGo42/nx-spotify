"use client";
import { Button, Image } from "@web-shared/components";
import { PauseIcon, PlayIcon } from "@web-shared/icons";
import { cn } from "@web-shared/utils/client";
import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export enum RecentlyPlayedTypes {
  COMMUNITY_PLAYLIST = "",
  USER_PLAYLIST = "grid grid-cols-2",
}

type RecentlyPlayedProps = {
  cover: string[];
  title: string;
  type?: keyof typeof RecentlyPlayedTypes;
};

export const RecentlyPlayed: FC<RecentlyPlayedProps> = ({ cover, title, type = "COMMUNITY_PLAYLIST" }) => {
  const [played, setPlayed] = useState(false);
  return (
    <div className="group relative flex min-w-[300px] max-w-full grow items-center justify-between overflow-hidden rounded-md bg-[#2c2b2d] transition-colors hover:bg-[#494547]">
      <div className="flex items-center gap-4">
        <div className={cn("bg-white-800 size-20", RecentlyPlayedTypes[type])}>
          {cover.map((src) => (
            <Image
              alt={""}
              className="h-full w-full"
              height={100}
              key={uuidv4()}
              src={src}
              style={{ height: "100%", width: "100%" }}
              width={100}
            />
          ))}
        </div>
        <span className="text-md w-[120px] overflow-hidden text-ellipsis font-bold">{title}</span>
      </div>
      <Button
        className={cn(
          "absolute right-5 flex size-12 items-center justify-center rounded-full bg-green-800 transition-transform hover:scale-105 group-hover:flex",
          !played && "hidden",
        )}
        onClick={() => setPlayed((prev) => !prev)}
      >
        {played ? <PauseIcon /> : <PlayIcon />}
      </Button>
    </div>
  );
};
