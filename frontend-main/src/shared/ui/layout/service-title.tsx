import ServiceTitleSymbol from "@/assets/symbols/service-title.svg?react";
import { Leave } from "../../components/atoms";

export const ServiceTitle: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row mr-24">
        <Leave width="50" className=" fill-catch-main-7 00" />
        <Leave color="text-catch-main-700" className="rotate-90" />
      </div>
      <ServiceTitleSymbol />
    </div>
  );
};
