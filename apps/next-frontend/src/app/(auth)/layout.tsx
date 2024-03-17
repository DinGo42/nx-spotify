import { LogoIcon } from "@web-shared";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="from-black-1000 to-black-200 flex h-full flex-col items-center justify-center gap-10 overflow-hidden bg-gradient-to-b pb-20">
      <div className="flex items-center gap-3 self-start px-11 pt-11">
        <LogoIcon className="scale-150" />
        <span className="text-xl font-semibold">Spotify</span>
      </div>
      {children}
    </div>
  );
}
