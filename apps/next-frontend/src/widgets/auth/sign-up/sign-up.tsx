"use client";
import { useCustomForm } from "@web-shared";
import { FC, useCallback, useState } from "react";
import { FirstStep } from "./first-step";
import { SecondStep } from "./second-step";
import { ThirdStep } from "./third-step";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ProgressBar } from "./progress-bar";
import { CreateUserType, createUserSchema } from "./schema";

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
  onSubmit: (args: CreateUserType) => void;
};

export const SignUp: FC<SignUpProps> = ({ onSubmit }) => {
  const [currentStep, setStep] = useState(0);

  const { handleSubmit, getValues, setValue } = useCustomForm({
    schema: createUserSchema,
  });

  const nextStep = useCallback(() => {
    const nextStep = currentStep + 1;

    if (nextStep === Object.keys(signUpFormSteps).length) {
      handleSubmit((data) => onSubmit(data))();
      return;
    }
    if (nextStep > Object.keys(signUpFormSteps).length) return;

    setStep(nextStep);
  }, [currentStep, handleSubmit, onSubmit]);

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
