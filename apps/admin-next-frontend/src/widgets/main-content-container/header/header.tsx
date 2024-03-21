import { ArrowIcon, BellIcon, GroupIcon } from "@web-shared/icons";
import { Button, Image } from "@web-shared/components";

export const Header = () => (
  <div className="sticky top-0 flex w-full items-center justify-between">
    <div className="flex gap-3">
      <Button styleType={"MAIN_ROUND"} className="hover:bg-black-200">
        <ArrowIcon />
      </Button>
      <Button styleType={"MAIN_ROUND"} className="hover:bg-black-200 rotate-180">
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
      <Button styleType={"MAIN_ROUND"} className="bg-white-800 relative size-8 overflow-hidden p-0 hover:scale-105">
        <Image alt="" width={100} height={100} src="/selyavi.jpg" />
      </Button>
    </div>
  </div>
);
