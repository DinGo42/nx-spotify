import { Button, Image } from "@web-shared/components";
import { ArrowIcon, BellIcon, GroupIcon } from "@web-shared/icons";

export const Header = () => (
  <div className="sticky top-0 flex w-full items-center justify-between">
    <div className="flex gap-3">
      <Button className="hover:bg-black-200" styleType={"MAIN_ROUND"}>
        <ArrowIcon />
      </Button>
      <Button className="hover:bg-black-200 rotate-180" styleType={"MAIN_ROUND"}>
        <ArrowIcon />
      </Button>
    </div>
    <div className="flex gap-3">
      <Button className="group hover:scale-105" styleType={"MAIN_ROUND"}>
        <BellIcon className="group-hover:stroke-white-800" />
      </Button>
      <Button className="group hover:scale-105" styleType={"MAIN_ROUND"}>
        <GroupIcon className="group-hover:fill-white-800" />
      </Button>
      <Button className="bg-white-800 relative size-8 overflow-hidden p-0 hover:scale-105" styleType={"MAIN_ROUND"}>
        <Image alt="" height={100} src="/selyavi.jpg" width={100} />
      </Button>
    </div>
  </div>
);
