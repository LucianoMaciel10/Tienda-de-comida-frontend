/* eslint-disable react/react-in-jsx-scope */
import { RiArrowDropDownLine, RiArrowDropUpLine, RiDeleteBin7Line } from "react-icons/ri"
import { useContext, useEffect } from "react"
import { AppContext } from "../contexts/OrdersContext"

interface Props {
  id: string 
  name: string
  price: number
  qty: number
  img: string
  bowlsAvaible: number
  setTotalPrice: (total: string) => void
}

function OrderCard({ id, name, price, qty, img, setTotalPrice, bowlsAvaible }: Props) {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("Orders must be used within an OrdersProvider")
  }

  const { setOrders, orders, decrementQty, incrementQty } = context

  const calculatePrice = (): string => {
    return (price * qty).toFixed(2)
  }

  useEffect(() => {
    setTotalPrice(orders.reduce((sum, order) => sum + order.price * order.qty, 0).toFixed(2))
  }, [orders])

  return (
    <div className="bg-[#1E1D29] grid grid-cols-7 mb-8">
      <div className="col-span-6">
        <div className="flex flex-col">
          <div className="flex min-[600px]:mb-5 mb-3 relative items-center">
            <img src={img} alt={name} className="w-14 h-14 rounded-full" />
            <div className="ml-3">
              <p className="text-gray-200 text-sm text-wrap pr-20 min-[600px]:pr-24">{name}</p>
              <span className="text-gray-400">$ {price}</span>
            </div>
            <div className="flex gap-2 lg:gap-1 flex-col absolute right-14 min-[600px]:right-16">
              <button
                className=" bg-gray-800 rounded-xl text-white active:bg-gray-700 w-6 h-6 grid place-content-center min-[600px]:p-4"
                onClick={() => incrementQty(id)} // aqui incrementar el qty
              >
                <RiArrowDropUpLine size={30} />
              </button>
              <button 
                className=" bg-gray-800 rounded-xl text-white active:bg-gray-700 w-6 h-6 grid place-content-center min-[600px]:p-4" 
                onClick={() => decrementQty(id)} // aqui decrementar el qty
              >
                <RiArrowDropDownLine size={30} />
              </button>
            </div>
            <input max={bowlsAvaible} className="min-[600px]:w-14 min-[600px]:h-14 min-[300px]:text-base absolute right-0 w-12 h-12 text-center rounded-lg bg-[#272835] border border-gray-600 font-bold text-lg min-[600px]:text-xl outline-none pointer-events-none" readOnly value={qty} />
          </div>
          <textarea className="resize-none min-[600px]:p-3 text-sm bg-[#272835] p-2 rounded-lg border border-gray-600 outline-none min-[600px]:text-base"  placeholder="Order note..." ></textarea>
        </div>
      </div>
      <div className="flex flex-col items-center ml-4 min-1500px:ml-6">
        <span className={`text-lg font-bold flex items-center h-full mb-3  ${calculatePrice().length >= 7 ? 'text-sm min-[600px]:text-lg min-1500px:text-sm' : ''}`}>
          <span className={calculatePrice().length >= 6 ? 'md:mr-1 min-1500px:mr-0 max-sm:ml-2' : 'mr-1'}>$</span>
          {calculatePrice()}
        </span>
        <button 
          className="border border-[#DD8270] text-[#DD8270] p-[6px] rounded-lg active:border-[#DD8270] active:bg-[#DD8270] active:text-white h-1/2 min-[600px]:p-3 max-[600px]:max-h-10 mb-[0.65rem] min-1500px:max-h-14"
          onClick={() => {
            const updateOrders = orders.filter(order => order.id !== id)
            setTotalPrice(updateOrders.reduce((sum, order) => sum + order.price * order.qty, 0).toFixed(2))
            setOrders(updateOrders)
          }}
        >
          <RiDeleteBin7Line size={25} />
        </button>
      </div>
    </div>
  )
}

export default OrderCard