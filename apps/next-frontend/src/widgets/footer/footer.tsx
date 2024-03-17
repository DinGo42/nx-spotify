import { SongControls } from "./song-controls";
import { SongInfo } from "./song-info";
import { SoundSlider } from "./sound-slider";

export const Footer = () => {
  return (
    <div className="bg-black-1000 flex w-full justify-between gap-10 px-3 py-4">
      <SongInfo />
      <SongControls />
      <SoundSlider />
    </div>
  );
};
