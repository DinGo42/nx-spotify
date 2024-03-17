"use client";
import { Button, FormInput, Link, useCustomForm } from "@web-shared";
import { SignUpChildFormProps } from "../sign-up";
import z from "zod";
import { memo, useCallback } from "react";
import { Routes } from "@/shared";
import { createUserSchema } from "../schema";

const firstStepSchema = createUserSchema.pick({ email: true });

type FirstStepSchema = z.infer<typeof firstStepSchema>;

export const FirstStep = memo(
  ({ getValuesFromParentForm, nextFormStep, setValueToParentForm }: SignUpChildFormProps) => {
    const { control, handleSubmit } = useCustomForm({
      schema: firstStepSchema,
      defaultValues: {
        email: getValuesFromParentForm("email"),
      },
    });

    const onSubmit = useCallback(
      ({ email }: FirstStepSchema) => {
        setValueToParentForm("email", email);
        nextFormStep();
      },
      [nextFormStep, setValueToParentForm],
    );

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="flex h-full w-[330px] flex-col gap-5" id="FormFirstStep">
          <span className="mb-10 text-5xl font-semibold">Sign up to start listening</span>

          <div className="flex gap-4">
            <FormInput
              inputWrapperClassName="w-full flex-col-reverse"
              rules={{ required: true }}
              styleType={"MAIN"}
              placeholder="example@gmail.com"
              className="h-12"
              control={control}
              name="email"
            >
              <span className="text-base font-semibold">Email address</span>
            </FormInput>
          </div>
          <Button
            form="FormFirstStep"
            className="text-black-1000 bg-green-800 p-3 text-lg font-bold hover:bg-green-700"
            styleType={"MAIN_ROUND"}
          >
            Next
          </Button>
        </form>
        <div className="flex justify-center gap-3">
          <span>Already have an account?</span>
          <Link className="underline hover:text-green-700" href={Routes.LOGIN}>
            Log in here.
          </Link>
        </div>
      </>
    );
  },
);
