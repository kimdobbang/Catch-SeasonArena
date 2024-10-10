import { useState } from "react";
import { BottomNavBar } from "@/shared/ui";
import { CollectionbookLibrary } from "./collectionbook-library";
import { CollectTimerModal } from "@/features";

export const Collectionbook = () => {
  const [timerModalOpen, setTimerModalOpen] = useState(false);

  const handleTimerOpenModal = () => {
    setTimerModalOpen(true);
  };
  const handleTimerCloseModal = () => {
    setTimerModalOpen(false);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <CollectionbookLibrary>
          <BottomNavBar onTimerModalOpen={handleTimerOpenModal} />
        </CollectionbookLibrary>
      </div>
      {timerModalOpen && <CollectTimerModal onClose={handleTimerCloseModal} />}
    </div>
  );
};
