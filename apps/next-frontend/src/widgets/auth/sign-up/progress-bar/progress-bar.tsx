import { FC, memo } from "react";
import { signUpFormSteps } from "../sign-up";

export type ProgressBarProps = {
  currentStep: number;
};

export const ProgressBar: FC<ProgressBarProps> = memo(({ currentStep }) => {
  const progress = (currentStep / (signUpFormSteps.length - 1)) * 100;
  return (
    <div
      className={`bg-black-200 relative h-[2px] w-[436px] min-w-full overflow-hidden rounded-full transition-all duration-1000`}
    >
      <div
        style={{
          width: progress + "%",
        }}
        className="absolute h-1 bg-green-700 transition-all duration-1000"
      />
    </div>
  );
});
