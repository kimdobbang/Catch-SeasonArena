import ServiceTitleSymbol from "@/assets/symbols/service-title.svg?react";
import { Leave } from "@atoms/index";

export const ServiceTitle = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row mr-24">
        <Leave width="50" className=" fill-catch-sub-400" />
        <Leave width="35" color="text-catch-sub-400" className="rotate-90" />
      </div>
      <ServiceTitleSymbol />
    </div>
  );
};
