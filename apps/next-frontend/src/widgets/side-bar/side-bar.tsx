import { HomeIcon, LibraryIcon, SearchIcon } from "@web-shared/icons";

import { SideBarItem } from "./item";

export const SideBar = () => (
  <div className="flex h-full flex-col items-center gap-2">
    <div className="bg-black-600 flex flex-col gap-5 rounded-xl p-5">
      <HomeIcon className="hover:fill-white-800 transition-colors" />
      <SearchIcon className="hover:stroke-white-800 transition-colors" />
    </div>
    <div className="bg-black-600 flex h-full w-full flex-col items-center gap-4 overflow-y-auto rounded-xl px-1 pt-3">
      <div>
        <LibraryIcon className="hover:fill-white-800 transition-colors" />
      </div>
      <div className="h-full w-full overflow-y-auto pb-4">
        <div className="flex h-fit w-full flex-col items-center gap-1">
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            type={"USER_PLAYLIST"}
          />
          <SideBarItem className="bg-green-800" cover={[""]} type={"USER_PLAYLIST"} />
        </div>
      </div>
    </div>
  </div>
);
