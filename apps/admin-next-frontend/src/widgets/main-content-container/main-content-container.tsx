import { FC } from "react";
import { Header } from "./header";
import { RecentlyPlayed } from "./recently-played";
import { Image } from "@web-shared";

export const Mixes: FC = () => (
  <div className="flex h-fit w-fit grow flex-col rounded-[10px] bg-[#191919] p-4 transition-colors hover:bg-[#282828]">
    <div className="min-w-[80px] max-w-[300px] bg-green-800">
      <Image
        src={"/selyavi.jpg"}
        alt=""
        width={100}
        height={100}
        style={{ width: "100%", height: "100%" }}
        className="mb-3 grow rounded-md"
      />
    </div>
    <div className="h-fit w-full min-w-40 max-w-64 grow bg-green-800" />
    <span className="text-lg font-bold">Daily Mix 1</span>
    <span className="line-clamp-2 w-40 font-medium text-black-100">
      Drake, Rich Amiri, socliche and more
    </span>
  </div>
);

export const MainContentContainer: FC = () => (
  <div className="flex h-full w-full flex-col gap-5 rounded-xl bg-black-600 p-4 pr-10">
    <Header />
    <div className="h-full w-full overflow-y-auto">
      <div className="flex h-[2000px] w-full flex-col gap-7">
        <span className="text-4xl font-bold">Admin Good afternoon</span>
        <div className="flex h-fit w-full flex-wrap gap-5 xl:grid xl:grid-cols-3">
          <RecentlyPlayed
            type={"COMMUNITY_PLAYLIST"}
            title="OBLADAET"
            cover={[
              "/selyavi.jpg",
              "/selyavi.jpg",
              "/selyavi.jpg",
              "/selyavi.jpg",
            ]}
          />
          <RecentlyPlayed
            type={"USER_PLAYLIST"}
            title="Liked Songs"
            cover={[
              "/selyavi.jpg",
              "/selyavi.jpg",
              "/selyavi.jpg",
              "/selyavi.jpg",
            ]}
          />
          <RecentlyPlayed
            type={"COMMUNITY_PLAYLIST"}
            title="Liked Songs"
            cover={[
              "/selyavi.jpg",
              "/selyavi.jpg",
              "/selyavi.jpg",
              "/selyavi.jpg",
            ]}
          />
          <RecentlyPlayed
            type={"COMMUNITY_PLAYLIST"}
            title="Liked Songs"
            cover={[
              "/selyavi.jpg",
              "/selyavi.jpg",
              "/selyavi.jpg",
              "/selyavi.jpg",
            ]}
          />
          <RecentlyPlayed
            type={"COMMUNITY_PLAYLIST"}
            title="Liked Songs"
            cover={[
              "/selyavi.jpg",
              "/selyavi.jpg",
              "/selyavi.jpg",
              "/selyavi.jpg",
            ]}
          />
          <RecentlyPlayed
            type={"COMMUNITY_PLAYLIST"}
            title="Liked Songs"
            cover={[
              "/selyavi.jpg",
              "/selyavi.jpg",
              "/selyavi.jpg",
              "/selyavi.jpg",
            ]}
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
