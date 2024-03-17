import { ApiResponse, api, setCookies } from "@/shared/utils/server";
import { Login, LoginUserType } from "@/widgets";
import { STATUS_CODES } from "@shared";

export default async function Index() {
  const submitHandler = async (data: LoginUserType): Promise<ApiResponse<"loginUser">> => {
    "use server";
    const response = await api.loginUser({ body: data });
    const { headers, status } = response;
    if (status === STATUS_CODES.SUCCESS) setCookies(headers.getSetCookie());
    return response;
  };
  return <Login onSubmit={submitHandler} />;
}
