/* eslint-disable react/react-in-jsx-scope */
import { createContext, useEffect, useState } from "react";
import { OrdersContextType, type Order } from "../types";

export const AppContext = createContext<OrdersContextType | null>(null)

export function AppProvider ({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
      const storedOrders = localStorage.getItem('orders');
      return storedOrders ? JSON.parse(storedOrders) : [];
  });
  const [nowSetPrevSection, setNowSetPrevSection] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  const incrementQty = (id: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, qty: Math.min(order.qty + 1, order.bowlsAvaible) } : order
      )
    )
  }

  const decrementQty = (id: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, qty: Math.max(order.qty - 1, 1) } : order
      )
    );
  };

  return (
    <AppContext.Provider value={{ error, setError, decrementQty, incrementQty, orders, setOrders, nowSetPrevSection, setNowSetPrevSection}}>
      {children}
    </AppContext.Provider>
  )
}
