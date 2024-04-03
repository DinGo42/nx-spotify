"use client";
import { Routes } from "@/shared";
import { ApiResponse } from "@/shared/utils/server";
import { STATUS_CODES } from "@shared/api";
import { useCustomForm, useToast } from "@web-shared/hooks";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { FirstStep } from "./first-step";
import { ProgressBar } from "./progress-bar";
import { CreateUserType, signUpSchema } from "./schema";
import { SecondStep } from "./second-step";
import { ThirdStep } from "./third-step";

export type SignUpChildFormProps = {
  setValueToParentForm: UseFormSetValue<CreateUserType>;
  getValuesFromParentForm: UseFormGetValues<CreateUserType>;
  nextFormStep: () => void;
  prevFormStep: () => void;
  currentStep: number;
};

export const signUpFormSteps = [
  (props: SignUpChildFormProps) => <FirstStep {...props} />,
  (props: SignUpChildFormProps) => (
    <>
      <div className="flex h-full w-fit flex-col gap-3">
        <ProgressBar currentStep={props.currentStep} />
        <SecondStep {...props} />
      </div>
    </>
  ),
  (props: SignUpChildFormProps) => (
    <div className="flex h-full w-fit flex-col gap-3">
      <ProgressBar currentStep={props.currentStep} />
      <ThirdStep {...props} />
    </div>
  ),
];

type SignUpProps = {
  onSubmit: (args: CreateUserType) => Promise<ApiResponse<"auth", "signup">>;
};

export const SignUp: FC<SignUpProps> = ({ onSubmit }) => {
  const [currentStep, setStep] = useState(0);
  const { push } = useRouter();
  const { toast } = useToast();

  const { handleSubmit, getValues, setValue } = useCustomForm({
    schema: signUpSchema,
  });

  const nextStep = useCallback(() => {
    const nextStep = currentStep + 1;

    if (nextStep === Object.keys(signUpFormSteps).length) {
      handleSubmit(async (data) => {
        const { status, body } = await onSubmit(data);

        if (status === STATUS_CODES.SUCCESS) return push(Routes.HOME);

        toast({
          title: `Oops you got error. ${body.name} ${status}`,
          description: body.message,
        });
        return;
      })();

      return;
    }
    if (nextStep > Object.keys(signUpFormSteps).length) return;

    setStep(nextStep);
  }, [currentStep, handleSubmit, onSubmit, push, toast]);

  const prevStep = useCallback(() => {
    const prevStep = currentStep - 1;
    if (prevStep < 0) return;
    setStep(prevStep);
  }, [currentStep]);

  return signUpFormSteps[currentStep]({
    currentStep,
    getValuesFromParentForm: getValues,
    nextFormStep: nextStep,
    prevFormStep: prevStep,
    setValueToParentForm: setValue,
  });
};
