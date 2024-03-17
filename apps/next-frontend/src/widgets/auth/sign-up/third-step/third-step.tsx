"use client";
import z from "zod";
import { memo, useCallback } from "react";
import { ArrowIcon, Button, FormInput, useCustomForm } from "@web-shared";
import { SignUpChildFormProps, signUpFormSteps } from "../sign-up";
import { createUserSchema } from "../schema";

const thirdStepSchema = createUserSchema.pick({ userName: true });

type ThirdStepSchema = z.infer<typeof thirdStepSchema>;

export const ThirdStep = memo(
  ({
    getValuesFromParentForm,
    nextFormStep,
    prevFormStep,
    setValueToParentForm,
    currentStep,
  }: SignUpChildFormProps) => {
    const { control, handleSubmit } = useCustomForm({
      schema: thirdStepSchema,
      defaultValues: {
        userName: getValuesFromParentForm("userName"),
      },
    });

    const onSubmit = useCallback(
      ({ userName }: ThirdStepSchema) => {
        setValueToParentForm("userName", userName);
        nextFormStep();
      },
      [nextFormStep, setValueToParentForm],
    );

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-fit items-start justify-center gap-5"
        id="FormThirdStep"
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
            inputWrapperClassName="w-full flex-col-reverse justify-center"
            rules={{ required: true }}
            styleType={"MAIN"}
            className="h-12"
            control={control}
            name="userName"
          >
            <span className="text-base font-semibold">Nickname</span>
          </FormInput>
          <Button
            form="FormThirdStep"
            styleType={"MAIN_ROUND"}
            className="text-black-1000 mt-10 bg-green-800 p-3 text-lg font-bold hover:bg-green-700"
          >
            Next
          </Button>
        </div>
      </form>
    );
  },
);
