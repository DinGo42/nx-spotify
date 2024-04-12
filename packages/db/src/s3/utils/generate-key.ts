import { randomBytes } from "crypto";

export const createCryptoKey = (length?: number) => randomBytes(length ?? 128).toString("hex");
