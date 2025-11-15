/* eslint-disable react/react-in-jsx-scope */

import { RiCloseLargeFill } from "react-icons/ri";
import { Sections } from "../types";

interface Props {
  setShowSettingsModal: (state: boolean) => void;
  setSection: (seciton: Sections) => void;
}

function SettingsModal({ setShowSettingsModal, setSection }: Props) {
  return (
    <div
      onClick={() => {
        setShowSettingsModal(false);
        setSection("Home");
      }}
      className="fixed inset-0 bg-black bg-opacity-50 w-full flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#272835] rounded-lg shadow-lg pt-6 px-6 w-96 flex flex-col pb-8 text-center"
      >
        <RiCloseLargeFill
          className="cursor-pointer absolute top-3 left-3 text-white p-2"
          size={35}
          onClick={() => setShowSettingsModal(false)}
        />
        <h2 className="text-gray-300 font-bold text-xl mb-4">Settings (simulation)</h2>
        <div className="flex flex-col gap-4">
          <label htmlFor="theme">
            <span className="text-lg text-gray-300 font-semibold mr-2">Theme</span>
            <select id="theme" className="p-2 rounded-lg bg-gray-600 text-white">
              <option value="dark">Dark</option>
              <option value="ligth">Light</option>
            </select>
          </label>
          <label htmlFor="language">
            <span className="text-lg text-gray-300 font-semibold mr-2">Language</span>
            <select id="language" className="p-2 rounded-lg bg-gray-600 text-white">
              <option value="ligth">English</option>
              <option value="dark">Spanish</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
