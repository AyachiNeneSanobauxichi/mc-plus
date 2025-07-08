import type { InjectionKey } from "vue";
import type { OtpContext } from "./types";

export const OTP_CTX_KEY: InjectionKey<OtpContext> = Symbol("OtpContext");
