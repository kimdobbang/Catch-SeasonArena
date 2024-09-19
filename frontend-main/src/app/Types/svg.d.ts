// SVG 파일을 ReactComponent로 import 하여 사용할 수 있도록
declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export { ReactComponent };
}
