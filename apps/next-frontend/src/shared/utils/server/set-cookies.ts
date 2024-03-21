import { cookiesUtil } from "@web-shared/utils/server";

const accessTokenService = cookiesUtil<string>("accessToken");
const refreshTokenService = cookiesUtil<string>("refreshToken");

type SetCookiesProps = { accessToken: string; refreshToken: string } | string[];

export const setCookies = (cookies: SetCookiesProps) => {
  if (!Array.isArray(cookies)) {
    accessTokenService.set(cookies.accessToken);
    refreshTokenService.set(cookies.refreshToken);
    return;
  }
  const tokens: { accessToken: string | null; refreshToken: string | null } = {
    accessToken: null,
    refreshToken: null,
  };

  for (const cookie of cookies) {
    if (typeof cookie !== "string") continue;
    const [key, value] = cookie.split("=");
    if (key === "accessToken" || key === "refreshToken") {
      tokens[key] = value.replace("; ", "");
    }
    if (tokens.accessToken !== null && tokens.refreshToken !== null) {
      break;
    }
  }

  if (tokens.accessToken === null || tokens.refreshToken === null) return;
  accessTokenService.set(tokens.accessToken);
  refreshTokenService.set(tokens.refreshToken);
};
