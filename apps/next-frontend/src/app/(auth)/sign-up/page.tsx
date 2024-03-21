import { ApiResponse, api } from "@/shared/utils/server";
import { SignUp, CreateUserType } from "@/widgets";
import { STATUS_CODES } from "@shared";
import { setCookies } from "@web-shared/utils/server";

export default async function Index() {
  const submitHandler = async (data: CreateUserType): Promise<ApiResponse<"auth", "createUser">> => {
    "use server";
    const response = await api.auth.createUser({ body: data });
    const { headers, status } = response;
    if (status === STATUS_CODES.SUCCESS) setCookies(headers.getSetCookie());
    return response;
  };
  return <SignUp onSubmit={submitHandler} />;
}
