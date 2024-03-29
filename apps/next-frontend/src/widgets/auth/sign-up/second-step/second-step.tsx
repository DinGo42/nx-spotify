"use client";
import { PasswordErrorMessages } from "@shared";
import { Button, FormInput } from "@web-shared/components";
import { useCustomForm } from "@web-shared/hooks";
import { ArrowIcon, ShownIcon, UnShownIcon } from "@web-shared/icons";
import { cn, getErrorMessages } from "@web-shared/utils/client";
import { FC, memo, useCallback, useState } from "react";
import z from "zod";
import { signUpSchema } from "../schema";
import { SignUpChildFormProps, signUpFormSteps } from "../sign-up";

const secondStepSchema = signUpSchema.pick({ password: true });

type SecondStepSchema = z.infer<typeof secondStepSchema>;

export type PasswordToolTipProps = {
  text: string;
  className?: string;
};

const passwordErrorsText: Record<PasswordErrorMessages, string> = {
  [PasswordErrorMessages.LETTER_CHECK]: "1 letter",
  [PasswordErrorMessages.SPECIAL_CHAR_CHECK]: "1 number or special character (example: # ? ! &)",
  [PasswordErrorMessages.TO_SHORT]: "10 characters",
};

export const PasswordToolTip: FC<PasswordToolTipProps> = memo(({ text, className }) => (
  <div className="flex items-center gap-2 text-sm font-medium">
    <div className={cn("size-3 rounded-full border-[1px]", className)} />

    <span>{text}</span>
  </div>
));

const { checkValue } = getErrorMessages({
  errorMessages: passwordErrorsText,
  schema: secondStepSchema,
});

export const SecondStep = memo(
  ({
    getValuesFromParentForm,
    nextFormStep,
    prevFormStep,
    setValueToParentForm,
    currentStep,
  }: SignUpChildFormProps) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const { control, handleSubmit, watch } = useCustomForm({
      schema: secondStepSchema,
      defaultValues: {
        password: getValuesFromParentForm("password"),
      },
    });
    const onSubmit = useCallback(
      ({ password }: SecondStepSchema) => {
        setValueToParentForm("password", password);
        nextFormStep();
      },
      [nextFormStep, setValueToParentForm],
    );

    const passwordChecksState = checkValue({ password: watch("password") ?? "" });

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-fit items-start justify-center gap-5"
        id="FormSecondStep"
      >
        <Button className="mt-3 hover:scale-110" onClick={prevFormStep}>
          <ArrowIcon className="fill-black-100 hover:fill-white-800 rotate-90 scale-150 transition-all" />
        </Button>
        <div className="flex h-full w-[330px] flex-col gap-5">
          <div className="flex flex-col">
            <span className="text-black-150">
              Step {currentStep} of {signUpFormSteps.length - 1}
            </span>
            <span className="text-lg font-bold">Create a password</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold">Password</span>
            <FormInput
              inputWrapperClassName="w-full flex-col-reverse justify-center"
              rules={{ required: true }}
              styleType={"MAIN"}
              className="h-12"
              placeholder="password"
              type={passwordShown ? "text" : "password"}
              control={control}
              name="password"
            >
              <Button type="button" className="absolute right-2" onClick={() => setPasswordShown((prev) => !prev)}>
                {passwordShown ? <ShownIcon /> : <UnShownIcon />}
              </Button>
            </FormInput>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-bold">Your password must contain at least</span>
            {passwordChecksState?.map(({ message, fatal }) => (
              <PasswordToolTip key={message} text={message} className={fatal ? "" : "border-green-800 bg-green-800"} />
            ))}
          </div>
          <Button
            form="FormSecondStep"
            className="text-black-1000 bg-green-800 p-3 text-lg font-bold hover:bg-green-700"
            styleType={"MAIN_ROUND"}
          >
            Next
          </Button>
        </div>
      </form>
    );
  },
);
