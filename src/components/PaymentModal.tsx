/* eslint-disable react/react-in-jsx-scope */

import { useContext } from "react";
import { AppContext } from "../contexts/OrdersContext";
import { EatingOptions, NotificationData } from "../types";
import { toast } from "sonner";

interface Props {
  totalPrice: string;
  eatingOption: EatingOptions;
  orderNumber: string | null;
  notifications: NotificationData[];
  setTotalPrice: (price: string) => void;
  setNotifications: (notifications: NotificationData[]) => void;
  setShowPaymentModal: (state: boolean) => void;
}

function PaymentModal({
  totalPrice,
  notifications,
  setNotifications,
  setShowPaymentModal,
  setTotalPrice,
  orderNumber,
  eatingOption,
}: Props) {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "Error en la comunicacion de datos con el componente PaymentModal"
    );
  }

  const { orders, setOrders } = context;

  const handleClickPayment = () => {
    setShowPaymentModal(false);
    setOrders([]);
    const now = new Date();
    const day = now.toLocaleDateString("en-US", {
      weekday: "short", // Día abreviado (por ejemplo, Mon, Tue)
      month: "short",   // Mes abreviado (por ejemplo, Jan, Feb)
      day: "numeric",   // Día numérico (por ejemplo, 24)
      year: "numeric",  // Año completo
    });
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;
    const id = `${Date.now()}-${Math.random()}`;
    const newNotifications = [
      ...notifications,
      { message: `A payment of $${totalPrice} was made!`, time: `${day} at ${time}`, id },
    ];
    setTotalPrice("0");
    localStorage.removeItem("orders");
    toast.success("Payment made successfully");
    setNotifications(newNotifications);
    localStorage.setItem('notifications', JSON.stringify(newNotifications))
  };

  return (
    <div
      onClick={() => setShowPaymentModal(false)}
      className="fixed inset-0 bg-black bg-opacity-50 w-full flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#272835] rounded-lg shadow-lg pt-6 w-96 flex flex-col pb-8 items-center"
      >
        <h2 className="text-center text-xl text-gray-300 font-bold">
          Purchase order generated
        </h2>
        <table className="mt-4 mb-8 text-center">
          <caption className="text-lg font-semibold py-4 bg-gray-200">
            Product Information
          </caption>
          <thead className="bg-gray-300">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Unit Price</th>
              <th className="border border-gray-400 px-4 py-2">Qty</th>
              <th className="border border-gray-400 px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border border-gray-400 px-4 py-2">
                  {order.name}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  ${order.price}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {order.qty}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  ${order.price * order.qty}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-200">
            <tr>
              <td
                colSpan={3}
                className="border border-gray-400 px-4 py-2 font-semibold"
              >
                Order number
              </td>
              <td className="border border-gray-400 px-4 bg-gray-300 py-2 font-bold">
                #{orderNumber}
              </td>
            </tr>
            <tr>
              <td
                colSpan={3}
                className="border border-gray-400 px-4 py-2 font-semibold"
              >
                Type of order
              </td>
              <td className="border border-gray-400 px-4 bg-gray-300 py-2 font-bold">
                {eatingOption}
              </td>
            </tr>
            <tr>
              <td
                colSpan={3}
                className="border border-gray-400 px-4 py-2 font-semibold"
              >
                Grand Total
              </td>
              <td className="border border-gray-400 bg-gray-300 px-4 py-2 font-bold">
                ${totalPrice}
              </td>
            </tr>
          </tfoot>
        </table>
        <button
          className="bg-[#DD8270] p-3 active:bg-[#bf6f5f] text-white font-bold rounded-lg"
          onClick={handleClickPayment}
        >
          Confirm Payment (simulation)
        </button>
      </div>
    </div>
  );
}

export default PaymentModal;
