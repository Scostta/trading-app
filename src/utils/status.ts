import { COLORS } from "../constants/colors";

export const getColorFromAccountStatus = (status: string) => ({
  "CONNECTED": COLORS.GREEN,
  "DISCONNECTED_FROM_BROKER": COLORS.RED,
  "DISCONNECTED": COLORS.RED
}[status || "DISCONNECTED"])
