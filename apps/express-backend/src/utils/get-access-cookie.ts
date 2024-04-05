import { Request } from "express";

import { decodeToken } from "../modules";

export const getDecodedAccessToken = (req: Request): string => decodeToken(req.cookies.accessToken?.split(" ")[1]);
