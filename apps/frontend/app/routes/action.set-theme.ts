import { createThemeAction } from "remix-themes";

import { themeSessionResolver } from "../server/theme.server";

export const action = createThemeAction(themeSessionResolver);
