"use client";
import { Button, FormInput } from "@web-shared/components";
import { useCustomForm } from "@web-shared/hooks";
import { ArrowIcon } from "@web-shared/icons";
import { memo, useCallback } from "react";
import z from "zod";

import { signUpSchema } from "../schema";
import { SignUpChildFormProps, signUpFormSteps } from "../sign-up";

const thirdStepSchema = signUpSchema.pick({ nickname: true });

type ThirdStepSchema = z.infer<typeof thirdStepSchema>;

export const ThirdStep = memo(
  ({
    currentStep,
    getValuesFromParentForm,
    nextFormStep,
    prevFormStep,
    setValueToParentForm,
  }: SignUpChildFormProps) => {
    const { control, handleSubmit } = useCustomForm({
      defaultValues: {
        nickname: getValuesFromParentForm("nickname"),
      },
      schema: thirdStepSchema,
    });

    const onSubmit = useCallback(
      ({ nickname }: ThirdStepSchema) => {
        setValueToParentForm("nickname", nickname);
        nextFormStep();
      },
      [nextFormStep, setValueToParentForm],
    );

    return (
      <form
        className="flex h-full w-fit items-start justify-center gap-5"
        id="FormThirdStep"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button className="mt-3 hover:scale-110" onClick={prevFormStep}>
          <ArrowIcon className="fill-black-100 hover:fill-white-800 rotate-90 scale-150 transition-all" />
        </Button>
        <div className="flex h-full w-[330px] flex-col gap-5">
          <div className="flex flex-col">
            <span className="text-black-150">
              Step {currentStep} of {signUpFormSteps.length - 1}
            </span>
            <span className="text-lg font-bold">Tell us about yourself</span>
          </div>

          <FormInput
            className="h-12"
            control={control}
            inputWrapperClassName="w-full flex-col-reverse justify-center"
            name="nickname"
            rules={{ required: true }}
            styleType={"MAIN"}
          >
            <span className="text-base font-semibold">Nickname</span>
          </FormInput>
          <Button
            className="text-black-1000 mt-10 bg-green-800 p-3 text-lg font-bold hover:bg-green-700"
            form="FormThirdStep"
            styleType={"MAIN_ROUND"}
          >
            Next
          </Button>
        </div>
      </form>
    );
  },
);
