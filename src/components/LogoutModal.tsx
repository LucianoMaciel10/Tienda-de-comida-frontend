/* eslint-disable react/react-in-jsx-scope */

import { useContext } from "react";
import { AppContext } from "../contexts/OrdersContext";

interface Props {
  setShowLogoutModal: (state: boolean) => void;
  setUsername: (username: string | null) => void;
	setTotalPrice: (price: string) => void
}

function LogoutModal({ setShowLogoutModal, setUsername, setTotalPrice }: Props) {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('Error en la comunicacion de datos con el componente LogoutModal')
  }

	const { setOrders } = context

  const handleClickLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("orders");
    setUsername(null);
		setOrders([])
    setShowLogoutModal(false);
		setTotalPrice('0')
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 w-full flex justify-center items-center z-50">
      <div className="bg-[#272835] rounded-lg shadow-lg pt-6 px-6 w-96 flex flex-col pb-8 ">
        <p className="text-center text-gray-300 font-bold text-xl">
          Are you sure you want to log out?
        </p>
        <div className="flex gap-4 mt-4 mx-auto font-semibold text-white">
          <button
            className="bg-[#48495d] p-3 rounded-lg"
            onClick={() => setShowLogoutModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-[#DD8270] p-3 rounded-lg"
            onClick={handleClickLogout}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
