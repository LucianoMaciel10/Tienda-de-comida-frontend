/* eslint-disable react/react-in-jsx-scope */

import { useContext, useEffect, useState } from "react";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { AppContext } from "../contexts/OrdersContext";

interface Props {
  name: string
  img: string
  id: string
}

const MealCard = ({ name, img, id }: Props): JSX.Element => {
  const [bowlsAvaible, setBowlsAvaible] = useState(0);
  const [price, setPrice] = useState(0)
  const [qty, setQty] = useState(0);

  const context = useContext(AppContext)

  if(!context) {
    throw new Error('Orders must be used within an OrdersProvider')
  }
  
  const { setOrders, orders } = context

  useEffect(() => {
    setBowlsAvaible(Math.round(Math.random() * 100));
    setPrice(parseFloat((Math.random() * 29 + 1).toFixed(2)))
  }, []);

  const incrementBowls = () => {
    if (qty < bowlsAvaible) {
      setQty(qty + 1)
    }
  }

  const decrementBowls = () => {
    if (qty > 0) {
      setQty(qty - 1)
    }
  }

  const addToOrder = () => {
    const existsInOrder = orders.find(order => order.id === id)

    if(qty !== 0 && !existsInOrder) {
      setOrders((prevOrders) => [
        ...prevOrders,
        { price, qty, name, id, img, bowlsAvaible }
      ])
    }
  }

  return (
    <>
      <img
        src={img}
        alt={name}
        width={250}
        className="mb-2 rounded-full -mt-20 shadow-2xl"
      />
      <p className={`px-12 md:px-0 ${name.length > 31 ? 'text-sm' : 'text-xl'} `}>{name}</p>
      <span className="text-gray-200">
        ${price}
      </span>
      <div className="flex gap-8 items-center">
        <div className="flex">
          <input
            type="number"
            max={bowlsAvaible}
            className="w-16 bg-gray-700 rounded-tl-xl text-lg rounded-bl-xl outline-none text-center no-spinner pointer-events-none"
            min={1}
            value={qty}
            readOnly
          />
          <div className="flex flex-col">
            <button
              className=" bg-gray-800 flex justify-center rounded-tr-xl text-white active:bg-gray-700 w-10 h-8"
              onClick={incrementBowls}
            >
              <RiArrowDropUpLine size={30} />
            </button>
            <button 
              className=" bg-gray-800 rounded-br-xl text-white active:bg-gray-700 w-10 flex justify-center h-8" 
              onClick={decrementBowls}
            >
              <RiArrowDropDownLine size={30} />
            </button>
          </div>
        </div>
        <button 
          className="p-4 text-xl bg-[#DD8270] rounded-tr-xl rounded-xl active:bg-[#bf6f5f] outline -outline-offset-4 outline-[1px] disabled:bg-[#a36255] disabled:cursor-not-allowed"
          onClick={addToOrder}
          disabled={qty === 0}
        >
          <MdOutlineAddShoppingCart />
        </button>
      </div>
      <p className="text-gray-400">{bowlsAvaible} Bowls available</p>
    </>
  );
};

export default MealCard;
