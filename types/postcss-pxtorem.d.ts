declare module "postcss-pxtorem" {
  import type { PluginCreator } from "postcss";

  interface PxtoremOptions {
    rootValue?: number | ((input: { file: string }) => number);
    unitPrecision?: number;
    propList?: string[];
    selectorBlackList?: string[];
    replace?: boolean;
    mediaQuery?: boolean;
    minPixelValue?: number;
    exclude?: string | RegExp | ((file: string) => boolean);
    include?: string | RegExp | ((file: string) => boolean);
    unit?: string;
    landscape?: boolean;
    landscapeUnit?: string;
    landscapeWidth?: number;
  }

  const postcssPxToRem: PluginCreator<PxtoremOptions>;

  export default postcssPxToRem;
  export type { PxtoremOptions };
}
