import { v4 as uuidv4 } from "uuid";
import { Image } from "@web-shared/components";
import { FC } from "react";
import { cn } from "@web-shared/utils";

export enum SideBarItemTypes {
  ARTIST = "rounded-full",
  USER_PLAYLIST = "grid grid-cols-2",
  COMMUNITY_PLAYLIST = "",
}

export type SideBarItemProps = {
  className?: string;
  type?: keyof typeof SideBarItemTypes;
  cover: string[];
};

type ToolTipProps = {
  title: string;
  artist: string;
  className?: string;
};

const ToolTip: FC<ToolTipProps> = ({ artist, title, className }) => (
  <div className={cn("bg-black-400 absolute z-50 flex flex-col rounded-md px-3 py-1", className)}>
    <span className="text-white-1000">{title}</span>
    <span className="text-black-150">{artist}</span>
  </div>
);

export const SideBarItem: FC<SideBarItemProps> = ({ cover, className, type }) => (
  <div className="group flex h-full w-full items-center justify-center rounded-md p-2 hover:bg-[#171717]">
    <div className={cn("bg-white-1000 size-12 overflow-hidden rounded-md", type && SideBarItemTypes[type], className)}>
      {cover.map((src) => (
        <Image width={48} height={48} key={uuidv4()} src={src} alt={""} />
      ))}
      <ToolTip
        artist="Album"
        title="Еби меня, малишка"
        className="-mt-1 ml-16 hidden transition-opacity group-hover:flex"
      />
    </div>
  </div>
);
