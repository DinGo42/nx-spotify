"use client";
import { Routes } from "@/shared";
import { ApiResponse } from "@/shared/utils/server";
import { STATUS_CODES } from "@shared/api";
import { Button, FormInput } from "@web-shared/components";
import { useCustomForm, useToast } from "@web-shared/hooks";
import { ShownIcon, UnShownIcon } from "@web-shared/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { LoginUserType, loginUserSchema } from "./schema";

type LoginProps = {
  onSubmit: (args: LoginUserType) => Promise<ApiResponse<"auth", "login">>;
};

export const Login: FC<LoginProps> = ({ onSubmit }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { push } = useRouter();
  const { toast } = useToast();
  const { control, handleSubmit } = useCustomForm({
    schema: loginUserSchema,
  });

  const submitHandler = async (data: LoginUserType) => {
    const { body, status } = await onSubmit(data);

    if (status === STATUS_CODES.SUCCESS) return push(Routes.HOME);
    toast({
      title: `Oops you got error. ${body.name} ${status}`,
      description: body.message,
    });
    return;
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-black-600 flex h-fit w-[500px] flex-col gap-5 rounded-lg p-20"
    >
      <span className="mb-10 text-5xl font-semibold">Log in to Spotify</span>

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
      <Button
        styleType={"MAIN_ROUND"}
        className="text-black-1000 bg-green-800 p-3 text-lg font-bold transition-transform hover:scale-[1.03] hover:bg-green-700"
      >
        Log In
      </Button>
      <div className="border-black-400 mt-10 flex h-full w-full justify-center gap-3 border-t-[1px] pt-5">
        <span>Don`t have an account?</span>
        <Link className="underline hover:text-green-700" href={Routes.SIGN_UP}>
          Sign up for Spotify
        </Link>
      </div>
    </form>
  );
};
