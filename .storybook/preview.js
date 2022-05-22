import "../styles/globals.css";
import * as NextImage from "next/image";
import { setupWorker, rest } from "msw";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

if (typeof global.process === "undefined") {
  const worker = setupWorker(
    rest.get("https://localhost:3000/api/hello", (req, res, ctx) => {
      return res(ctx.json({ name: "John Doh" }));
    })
  );
  worker.start();
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
