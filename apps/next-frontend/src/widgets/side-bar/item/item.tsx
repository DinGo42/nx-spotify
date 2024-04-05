import { Image } from "@web-shared/components";
import { cn } from "@web-shared/utils/client";
import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

export enum SideBarItemTypes {
  ARTIST = "rounded-full",
  COMMUNITY_PLAYLIST = "",
  USER_PLAYLIST = "grid grid-cols-2",
}

export type SideBarItemProps = {
  className?: string;
  cover: string[];
  type?: keyof typeof SideBarItemTypes;
};

type ToolTipProps = {
  artist: string;
  className?: string;
  title: string;
};

const ToolTip: FC<ToolTipProps> = ({ artist, className, title }) => (
  <div className={cn("bg-black-400 absolute z-50 flex flex-col rounded-md px-3 py-1", className)}>
    <span className="text-white-1000">{title}</span>
    <span className="text-black-150">{artist}</span>
  </div>
);

export const SideBarItem: FC<SideBarItemProps> = ({ className, cover, type }) => (
  <div className="group flex h-full w-full items-center justify-center rounded-md p-2 hover:bg-[#171717]">
    <div className={cn("bg-white-1000 size-12 overflow-hidden rounded-md", type && SideBarItemTypes[type], className)}>
      {cover.map((src) => (
        <Image alt={""} height={48} key={uuidv4()} src={src} width={48} />
      ))}
      <ToolTip
        artist="Album"
        className="-mt-1 ml-16 hidden transition-opacity group-hover:flex"
        title="Еби меня, малишка"
      />
    </div>
  </div>
);
