/* eslint-disable react/react-in-jsx-scope */

import { RiCloseLargeFill } from "react-icons/ri";
import { Sections } from "../types";

interface Props {
  setSection: (seciton: Sections) => void;
  setShowMessagesModal: (state: boolean) => void;
}

function MessagesModal({ setShowMessagesModal, setSection }: Props) {
  return (
    <div
      onClick={() => {
        setShowMessagesModal(false);
        setSection("Home");
      }}
      className="fixed inset-0 bg-black bg-opacity-50 w-full flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#272835] rounded-lg shadow-lg pt-6 px-6 w-96 flex flex-col pb-8 text-center relative"
      >
        <RiCloseLargeFill
          className="cursor-pointer absolute top-3 left-3 text-white p-2"
          size={35}
          onClick={() => setShowMessagesModal(false)}
        />
        <h2 className="text-gray-300 text-xl font-bold mb-4">Messages</h2>
        <p className="text-gray-300 text-lg">There are no messages yet...</p>
      </div>
    </div>
  );
}

export default MessagesModal;
