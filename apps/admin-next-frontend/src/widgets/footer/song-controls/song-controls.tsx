"use client";
import {
  ShuffleIcon,
  NextSongIcon,
  PlayIcon,
  PauseIcon,
  RepeatIcon,
} from "@spotify/icons";
import { Button, Slider } from "@spotify/shared";
import { FC, useState } from "react";

export const SongControls: FC = () => {
  const [paused, setPaused] = useState(false);
  return (
    <div className="flex h-full w-full min-w-[250px] max-w-[650px] flex-col items-center justify-between">
      <div className="flex items-center gap-5">
        <ShuffleIcon className="transition-colors hover:fill-white-1000" />
        <NextSongIcon className="rotate-180 transition-colors  hover:fill-white-1000 hover:stroke-white-1000" />
        <Button
          onClick={() => setPaused((prev) => !prev)}
          className="flex size-8 items-center justify-center rounded-full bg-white-1000 transition-transform hover:scale-105"
        >
          {paused ? <PauseIcon /> : <PlayIcon className="mb-[1px] ml-1" />}
        </Button>
        <NextSongIcon className="transition-colors hover:fill-white-1000  hover:stroke-white-1000" />
        <RepeatIcon className="transition-colors hover:stroke-white-1000" />
      </div>
      <div className="flex w-full items-center justify-end gap-3">
        <span className="text-xs text-black-100">01:00</span>
        <Slider className="mb-[1px]" defaultValue={[0]} max={100} step={1} />
        <span className="text-xs text-black-100">02:00</span>
      </div>
    </div>
  );
};
