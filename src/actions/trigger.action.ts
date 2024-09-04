"use server";

import { loggerTestTask } from "../trigger/example.trigger";

export const triggerAction = async () => {
  await loggerTestTask.trigger({});
};
