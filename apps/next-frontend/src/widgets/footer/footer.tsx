"use client";
import { SongControls } from "./song-controls";
import { SongInfo } from "./song-info";
import { SoundSlider } from "./sound-slider";

export const Footer = () => (
  <div className="flex w-full justify-between gap-10 bg-black-1000 px-3 py-4">
    <SongInfo />
    <SongControls />
    <SoundSlider />
  </div>
);
