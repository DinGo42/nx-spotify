"use client";

import { Button, Slider } from "@web-shared/components";
import { MaxVolumeIcon, MidVolumeIcon, MinVolumeIcon } from "@web-shared/icons";
import { FC, useState } from "react";

export const SoundSlider: FC = () => {
  const [volume, setVolume] = useState(50);
  const [muted, setMute] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => setMute((prev) => !prev)}>
        {muted || volume < 33 ? (
          <MinVolumeIcon className="hover:fill-white-1000 transition-colors" />
        ) : volume < 66 ? (
          <MidVolumeIcon className="hover:fill-white-1000 transition-colors" />
        ) : (
          <MaxVolumeIcon className="hover:fill-white-1000 transition-colors" />
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
