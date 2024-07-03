"use server";

import { loggerTestTask } from "../trigger/example";

export const triggerAction = async () => {
  await loggerTestTask.trigger({});
};
