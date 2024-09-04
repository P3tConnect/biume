import { logger, task, wait } from "@trigger.dev/sdk/v3";

export const helloWorldTask = task({
  id: "hello-world",
  run: async (payload: any, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx });

    await wait.for({ seconds: 5 });

    return {
      message: "Hello, world!",
    };
  },
});

export const loggerTestTask = task({
  id: "test-logger",
  run: async (payload: any, { ctx }) => {
    logger.debug("Ceci est un test du logger en debug");

    wait.for({ seconds: 30 });

    logger.info("Ceci est un test du logger en info");

    wait.for({ seconds: 30 });

    logger.warn("Ceci est un test du logger en warn");

    wait.for({ seconds: 30 });

    logger.error("Ceci est un test du logger en error");

    wait.for({ seconds: 45 });
  },
});
