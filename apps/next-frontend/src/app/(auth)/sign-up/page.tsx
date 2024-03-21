import { ApiResponse, api, setCookies } from "@/shared/utils/server";
import { SignUp, CreateUserType } from "@/widgets";
import { STATUS_CODES } from "@shared";

export default async function Index() {
  const submitHandler = async (data: CreateUserType): Promise<ApiResponse<"createUser">> => {
    "use server";
    const response = await api.createUser({ body: data });
    const { headers, status } = response;
    if (status === STATUS_CODES.SUCCESS) setCookies(headers.getSetCookie());
    return response;
  };
  return <SignUp onSubmit={submitHandler} />;
}