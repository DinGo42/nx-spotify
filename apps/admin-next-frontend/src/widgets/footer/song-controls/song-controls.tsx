"use client";
import { ShuffleIcon, NextSongIcon, PauseIcon, PlayIcon, RepeatIcon } from "@web-shared/icons";
import { Button, Slider } from "@web-shared/components";
import { FC, useState } from "react";

export const SongControls: FC = () => {
  const [paused, setPaused] = useState(false);
  return (
    <div className="flex h-full w-full min-w-[250px] max-w-[650px] flex-col items-center justify-between">
      <div className="flex items-center gap-5">
        <ShuffleIcon className="hover:fill-white-1000 transition-colors" />
        <NextSongIcon className="hover:fill-white-1000 hover:stroke-white-1000  rotate-180 transition-colors" />
        <Button
          onClick={() => setPaused((prev) => !prev)}
          className="bg-white-1000 flex size-8 items-center justify-center rounded-full transition-transform hover:scale-105"
        >
          {paused ? <PauseIcon /> : <PlayIcon className="mb-[1px] ml-1" />}
        </Button>
        <NextSongIcon className="hover:fill-white-1000 hover:stroke-white-1000  transition-colors" />
        <RepeatIcon className="hover:stroke-white-1000 transition-colors" />
      </div>
      <div className="flex w-full items-center justify-end gap-3">
        <span className="text-black-100 text-xs">01:00</span>
        <Slider className="mb-[1px]" defaultValue={[0]} max={100} step={1} />
        <span className="text-black-100 text-xs">02:00</span>
      </div>
    </div>
  );
};
