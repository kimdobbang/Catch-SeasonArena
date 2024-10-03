import { BottomNavBar } from "@/shared/ui";
import { CollectionbookLibrary } from "./collectionbook-library";

// import { useState } from "react";

export const Collectionbook = () => {
  // const [modalOpen, setModalOpen] = useState(true);

  // const handleItemClick = () => {};

  // const handleOpenModal = (itemId: number) => {
  //   setModalOpen(true);
  // };
  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <CollectionbookLibrary>
          <BottomNavBar />
        </CollectionbookLibrary>
      </div>
      {/* {modalOpen && <div className="w-screen h-screen bg-black">모달</div>} */}
    </div>
  );
};
