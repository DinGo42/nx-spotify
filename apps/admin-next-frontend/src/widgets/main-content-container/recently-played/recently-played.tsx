"use client";
import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { cn, Button, Image } from "@spotify/shared";
import { PauseIcon, PlayIcon } from "@shared/svg";

export enum RecentlyPlayedTypes {
  USER_PLAYLIST = "grid grid-cols-2",
  COMMUNITY_PLAYLIST = "",
}

type RecentlyPlayedProps = {
  title: string;
  cover: string[];
  type?: keyof typeof RecentlyPlayedTypes;
};

export const RecentlyPlayed: FC<RecentlyPlayedProps> = ({
  cover,
  title,
  type = "COMMUNITY_PLAYLIST",
}) => {
  const [played, setPlayed] = useState(false);
  return (
    <div className="group relative flex min-w-[300px] max-w-full grow items-center justify-between overflow-hidden rounded-md bg-[#2c2b2d] transition-colors hover:bg-[#494547]">
      <div className="flex items-center gap-4">
        <div className={cn("size-20 bg-white-800", RecentlyPlayedTypes[type])}>
          {cover.map((src) => (
            <Image
              key={uuidv4()}
              src={src}
              alt={""}
              width={100}
              height={100}
              className="h-full w-full"
              style={{ width: "100%", height: "100%" }}
            />
          ))}
        </div>
        <span className="text-md w-[120px] overflow-hidden text-ellipsis font-bold">
          {title}
        </span>
      </div>
      <Button
        onClick={() => setPlayed((prev) => !prev)}
        className={cn(
          "absolute right-5 flex size-12 items-center justify-center rounded-full bg-green-800 transition-transform hover:scale-105 group-hover:flex",
          !played && "hidden",
        )}
      >
        {played ? <PauseIcon /> : <PlayIcon />}
      </Button>
    </div>
  );
};
