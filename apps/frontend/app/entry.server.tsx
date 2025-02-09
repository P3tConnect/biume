/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { PassThrough } from "node:stream";

import type { EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
// import { createInstance } from "i18next";
// import i18next from "@/server/i18next.server";
// import { I18nextProvider, initReactI18next } from "react-i18next";
// import Backend from "i18next-fs-backend";
// import i18n from "@/lib/i18n"; // your i18n configuration file
// import { resolve } from "node:path";

const ABORT_DELAY = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return isbot(request.headers.get("user-agent") || "")
    ? handleBotRequest(
      request,
      responseStatusCode,
      responseHeaders,
      remixContext
    )
    : handleBrowserRequest(
      request,
      responseStatusCode,
      responseHeaders,
      remixContext
    );
}

async function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  // let instance = createInstance();
  // let lng = await i18next.getLocale(request);
  // let ns = i18next.getRouteNamespaces(remixContext as any);

  // await instance
  //   .use(initReactI18next)
  //   .use(Backend)
  //   .init({
  //     ...i18n,
  //     lng,
  //     ns,
  //     backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
  //   });

  return new Promise((resolve, reject) => {

    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />
      ,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

async function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  // let instance = createInstance();
  // let lng = await i18next.getLocale(request);
  // let ns = i18next.getRouteNamespaces(remixContext as any);

  // await instance
  //   .use(initReactI18next)
  //   .use(Backend)
  //   .init({
  //     ...i18n,
  //     lng,
  //     ns,
  //     backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
  //   });

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      // <I18nextProvider i18n={instance}>
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      // </I18nextProvider>,
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
