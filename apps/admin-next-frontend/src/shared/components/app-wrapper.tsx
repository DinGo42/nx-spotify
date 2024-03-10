import { ReactNode } from "react";

export const AppWrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex h-screen w-full flex-col">{children}</div>
);
