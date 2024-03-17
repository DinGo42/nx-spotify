import { Footer, MainContentContainer, SideBar } from "@/widgets";

export default async function Index() {
  return (
    <>
      <div className="flex h-full gap-2 overflow-hidden p-1">
        <SideBar />
        <MainContentContainer />
      </div>
      <Footer />
    </>
  );
}
