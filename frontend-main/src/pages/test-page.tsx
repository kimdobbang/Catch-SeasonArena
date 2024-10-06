import { CollectCard } from "@/shared/ui";

export const TestPage = () => {
  return (
    <div>
      <CollectCard onClose={() => console.log("클로즈")} />
    </div>
  );
};
