import { Resend } from "resend"
import { safeConfig } from "./env"

export const resend = new Resend(safeConfig.RESEND_API_KEY ?? "")
