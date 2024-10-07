import { BottomNavBar } from "@/shared/ui";
import { CollectionbookLibrary } from "./collectionbook-library";

export const Collectionbook = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <CollectionbookLibrary>
          <BottomNavBar />
        </CollectionbookLibrary>
      </div>
    </div>
  );
};
