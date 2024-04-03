import { ApiResponse, api } from "@/shared/utils/server";
import { Login, LoginUserType } from "@/widgets";
import { STATUS_CODES } from "@shared/api";
import { setCookies } from "@web-shared/utils/server";

export default async function Index() {
  const submitHandler = async (data: LoginUserType): Promise<ApiResponse<"auth", "login">> => {
    "use server";
    const response = await api.auth.login({ body: data });
    const { headers, status } = response;
    if (status === STATUS_CODES.SUCCESS) setCookies(headers.getSetCookie());
    return response;
  };
  return <Login onSubmit={submitHandler} />;
}
