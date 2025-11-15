/* eslint-disable react/react-in-jsx-scope */

import { RiCloseLargeFill } from "react-icons/ri";
import { EatingOptions } from "../types";
import { useContext } from "react";
import { AppContext } from "../contexts/OrdersContext.js";
import OrderCard from "./OrderCard.js";

interface Props {
  showOrders: boolean;
  orderNumber: string | null;
  eatingOption: EatingOptions;
  username: string | null
  totalPrice: string
  handleMouseLeave: () => void;
  handleMouseEnter: () => void;
  setShowPaymentModal: (state: boolean) => void
  handleClickOption: (option: EatingOptions) => void;
  setShowOrders: (show: boolean) => void;
  setShowLoginModal: (state: boolean) => void
  setTotalPrice: (price: string) => void
}

function Orders({
  showOrders,
  orderNumber,
  eatingOption,
  username,
  totalPrice,
  handleMouseLeave,
  handleMouseEnter,
  handleClickOption,
  setShowOrders,
  setShowLoginModal,
  setTotalPrice,
  setShowPaymentModal
}: Props): JSX.Element {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Orders must be used within an OrdersProvider");
  }

  const { orders, setNowSetPrevSection } = context;

  const handlePayment = () => {
    if (!username) {
      setShowLoginModal(true)
    } else {
      setShowPaymentModal(true)
    }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`w-full min-[1500px]:col-span-2 min-[1500px]:w-[calc((100%-5rem)/4)] h-full fixed transition-all top-0 bg-[#1E1D29] lg:w-1/2 ${
        showOrders ? "right-0" : "-right-full"
      } overflow-y-scroll scrollbar-hide min-[1500px]:right-0 `}
    >
      <div className="relative min-1500px:pt-8 pt-20 text-gray-300 p-8 mb-12">
        <RiCloseLargeFill
          className="hover:bg-[#2728359e] cursor-pointer p-3 box-content text-gray-300 bg-[#272835] rounded-full text-xl min-1500px:hidden fixed top-4 z-50"
          onClick={() => {
            setShowOrders(false);
            setNowSetPrevSection(true);
          }}
        />
        <div className="flex justify-between w-full">
          { username && <h2 className="md:text-3xl capitalize font-semibold text-[#DD8270] text-2xl">{username}</h2>}
          <h1 className="text-2xl md:text-3xl mb-4 font-bold">Order #{orderNumber}</h1>
        </div>
        <div className="flex gap-4 mb-4">
          <input
            type="radio"
            name="options"
            value="dineIn"
            id="dineIn"
            className="appearance-none hidden"
            defaultChecked={eatingOption === "Dine In"}
          />
          <label
            htmlFor="dineIn"
            className="border p-2 rounded-lg border-[#DD8270] text-[#DD8270] cursor-pointer select-none"
            onClick={() => handleClickOption("Dine In")}
          >
            Dine In
          </label>
          <input
            type="radio"
            name="options"
            value="toGo"
            id="toGo"
            className="appearance-none hidden"
            defaultChecked={eatingOption === "To Go"}
          />
          <label
            htmlFor="toGo"
            className="border p-2 rounded-lg border-[#DD8270] text-[#DD8270] cursor-pointer select-none"
            onClick={() => handleClickOption("To Go")}
          >
            To Go
          </label>
          <input
            type="radio"
            name="options"
            value="delivery"
            id="delivery"
            className="appearance-none hidden"
            defaultChecked={eatingOption === "Delivery"}
          />
          <label
            htmlFor="delivery"
            className="border p-2 rounded-lg border-[#DD8270] text-[#DD8270] cursor-pointer select-none"
            onClick={() => handleClickOption("Delivery")}
          >
            Delivery
          </label>
        </div>
        <div className="grid grid-cols-7 text-xl font-bold mb-4">
          <div className="flex justify-between col-span-6 pr-2">
            <h5 className="">Item</h5>
            <h5 className="">Qty</h5>
          </div>
          <h5 className="text-center pl-2">Price</h5>
        </div>
        <div className="mb-20">
          {!Array.isArray(orders) || orders.length === 0 ? (
            <p className="text-gray-500 mt-10 text-xl">
              Aún no hay nada en el carrito...
            </p>
          ) : (
            orders.map((order) => 
              <OrderCard
                bowlsAvaible={order.bowlsAvaible}
                key={order.id}
                setTotalPrice={setTotalPrice}
                id={order.id}
                name={order.name}
                price={order.price}
                qty={order.qty}
                img={order.img}
              />
            )
          )}
        </div>
      </div>
      <div className="bg-[#1E1D29] min-1500px:w-[calc((100%-5rem)/4)] lg:w-1/2 h-36 bottom-0 fixed text-gray-300 px-10 pt-4 w-full">
        <div className="flex justify-between w-full text-white">
          <span>Subtotal</span>
          <span className="font-bold text-lg">$ {totalPrice}</span>
        </div>
        <button
          disabled={orders.length === 0} 
          className="bg-[#DD8270] disabled:text-gray-400 text-white w-full p-4 rounded-lg font-bold mt-4 active:bg-[#bf6f5f] disabled:bg-[#a36255] disabled:cursor-not-allowed"
          onClick={handlePayment}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

export default Orders;
