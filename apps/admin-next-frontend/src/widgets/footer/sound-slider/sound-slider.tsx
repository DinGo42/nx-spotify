"use client";
import { MaxVolumeIcon, MidVolumeIcon, MinVolumeIcon } from "@shared/svg";
import { Button, Slider } from "@spotify/shared";
import { FC, useState } from "react";

export const SoundSlider: FC = () => {
  const [volume, setVolume] = useState(0);
  const [muted, setMute] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => setMute((prev) => !prev)}>
        {muted || volume < 33 ? (
          <MinVolumeIcon className="transition-colors hover:fill-white-1000" />
        ) : volume < 66 ? (
          <MidVolumeIcon className="transition-colors hover:fill-white-1000" />
        ) : (
          <MaxVolumeIcon className="transition-colors hover:fill-white-1000" />
        )}
      </Button>
      <Slider
        value={muted ? [0] : [volume]}
        className="mb-[1px] min-w-20 max-w-24"
        onValueChange={(value) => {
          setVolume(value[0]);
          setMute(false);
        }}
        defaultValue={[volume]}
        max={100}
        step={1}
      />
    </div>
  );
};
