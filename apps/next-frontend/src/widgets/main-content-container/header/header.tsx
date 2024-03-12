import { ArrowIcon, BellIcon, GroupIcon } from "@web-shared";
import { Button, Image } from "@web-shared";

export const Header = () => (
  <div className="sticky top-0 flex w-full items-center justify-between">
    <div className="flex gap-3">
      <Button styleType={"MAIN_ROUND"} className="hover:bg-black-200">
        <ArrowIcon />
      </Button>
      <Button
        styleType={"MAIN_ROUND"}
        className="rotate-180 hover:bg-black-200"
      >
        <ArrowIcon />
      </Button>
    </div>
    <div className="flex gap-3">
      <Button styleType={"MAIN_ROUND"} className="group hover:scale-105">
        <BellIcon className="group-hover:stroke-white-800" />
      </Button>
      <Button styleType={"MAIN_ROUND"} className="group hover:scale-105">
        <GroupIcon className="group-hover:fill-white-800" />
      </Button>
      <Button
        styleType={"MAIN_ROUND"}
        className="relative size-8 overflow-hidden bg-white-800 p-0 hover:scale-105"
      >
        <Image alt="" width={100} height={100} src="/selyavi.jpg" />
      </Button>
    </div>
  </div>
);
