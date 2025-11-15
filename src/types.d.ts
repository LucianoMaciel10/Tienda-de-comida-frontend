export type categorys = 'Beef' | 'Chicken' | 'Pasta' | 'Dessert'

export type Meal = {
    idMeal: string
    strMeal: string
    strMealThumb: string
}

export type EatingOptions = 'Dine In' | 'To Go' | 'Delivery'

export interface Order {
    name: string
    id: string
    qty: number
    price: number
    img: string
    bowlsAvaible: number
}

export type OrdersContextType = {
    orders: Order[]
    nowSetPrevSection: boolean
    error: string | null
    setError: (error: string | null) => void
    incrementQty: (id: string) => void
    decrementQty: (id: string) => void
    setNowSetPrevSection: React.Dispatch<React.SetStateAction<boolean>>
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>
}

export type Sections = 'Home' | 'Time' | 'Order' | 'Messages' | 'Notifications' | 'Settings' | 'Logout'

export type Users = { 
    username: string, 
    email: string, 
    password: string, 
    phoneNumber?: string 
}

interface NotificationData {
    id: string;
    message: string;
    time: string;
}