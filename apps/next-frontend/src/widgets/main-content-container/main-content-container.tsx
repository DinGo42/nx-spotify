import { Image } from "@web-shared/components";
import { FC } from "react";

import { Header } from "./header";
import { RecentlyPlayed } from "./recently-played";

export const Mixes: FC = () => (
  <div className="flex h-fit w-fit grow flex-col rounded-[10px] bg-[#191919] p-4 transition-colors hover:bg-[#282828]">
    <div className="min-w-[80px] max-w-[300px] bg-green-800">
      <Image
        alt=""
        className="mb-3 grow rounded-md"
        height={100}
        src={"/selyavi.jpg"}
        style={{ height: "100%", width: "100%" }}
        width={100}
      />
    </div>
    <div className="h-fit w-full min-w-40 max-w-64 grow bg-green-800" />
    <span className="text-lg font-bold">Daily Mix 1</span>
    <span className="text-black-100 line-clamp-2 w-40 font-medium">Drake, Rich Amiri, socliche and more</span>
  </div>
);

export const MainContentContainer: FC = () => (
  <div className="bg-black-600 flex h-full w-full flex-col gap-5 rounded-xl p-4 pr-10">
    <Header />
    <div className="h-full w-full overflow-y-auto">
      <div className="flex h-[2000px] w-full flex-col gap-7">
        <span className="text-4xl font-bold">Good afternoon</span>
        <div className="flex h-fit w-full flex-wrap gap-5 xl:grid xl:grid-cols-3">
          <RecentlyPlayed
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            title="OBLADAET"
            type={"COMMUNITY_PLAYLIST"}
          />
          <RecentlyPlayed
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            title="Liked Songs"
            type={"USER_PLAYLIST"}
          />
          <RecentlyPlayed
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            title="Liked Songs"
            type={"COMMUNITY_PLAYLIST"}
          />
          <RecentlyPlayed
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            title="Liked Songs"
            type={"COMMUNITY_PLAYLIST"}
          />
          <RecentlyPlayed
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            title="Liked Songs"
            type={"COMMUNITY_PLAYLIST"}
          />
          <RecentlyPlayed
            cover={["/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg", "/selyavi.jpg"]}
            title="Liked Songs"
            type={"COMMUNITY_PLAYLIST"}
          />
        </div>
        <span className="text-2xl font-bold">Made for Иван Нестеренко</span>
        <div className="flex w-full flex-wrap gap-6 overflow-x-auto">
          <div className="flex gap-6">
            <Mixes />
            <Mixes />
            <Mixes />
            <Mixes />
            <Mixes />
            <Mixes />
            <Mixes />
            <Mixes />
          </div>
        </div>
      </div>
    </div>
  </div>
);
