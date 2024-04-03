import { ApiResponse, api } from "@/shared/utils/server";
import { CreateUserType, SignUp } from "@/widgets";
import { STATUS_CODES } from "@shared/api";
import { setCookies } from "@web-shared/utils/server";

export default async function Index() {
  const submitHandler = async (data: CreateUserType): Promise<ApiResponse<"auth", "signup">> => {
    "use server";
    const response = await api.auth.signup({ body: data });
    const { headers, status } = response;
    if (status === STATUS_CODES.SUCCESS) setCookies(headers.getSetCookie());
    return response;
  };
  return <SignUp onSubmit={submitHandler} />;
}
