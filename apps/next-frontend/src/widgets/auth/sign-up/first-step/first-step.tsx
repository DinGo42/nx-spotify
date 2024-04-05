"use client";
import { Routes } from "@/shared";
import { Button, FormInput } from "@web-shared/components";
import { useCustomForm } from "@web-shared/hooks";
import Link from "next/link";
import { memo, useCallback } from "react";
import z from "zod";

import { signUpSchema } from "../schema";
import { SignUpChildFormProps } from "../sign-up";

const firstStepSchema = signUpSchema.pick({ email: true });

type FirstStepSchema = z.infer<typeof firstStepSchema>;

export const FirstStep = memo(
  ({ getValuesFromParentForm, nextFormStep, setValueToParentForm }: SignUpChildFormProps) => {
    const { control, handleSubmit } = useCustomForm({
      defaultValues: {
        email: getValuesFromParentForm("email"),
      },
      schema: firstStepSchema,
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
        <form className="flex h-full w-[330px] flex-col gap-5" id="FormFirstStep" onSubmit={handleSubmit(onSubmit)}>
          <span className="mb-10 text-5xl font-semibold">Sign up to start listening</span>

          <div className="flex gap-4">
            <FormInput
              control={control}
              errorMessage={false}
              label="Email address"
              name="email"
              placeholder="example@gmail.com"
              styleType={"MAIN"}
            />
          </div>
          <Button
            className="text-black-1000 bg-green-800 p-3 text-lg font-bold hover:bg-green-700"
            form="FormFirstStep"
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
