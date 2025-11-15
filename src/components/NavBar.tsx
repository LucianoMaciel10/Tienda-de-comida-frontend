/* eslint-disable react/react-in-jsx-scope */
import { RiPieChartLine, RiSettings2Line, RiNotification2Line, RiMailLine  } from "react-icons/ri";
import { NotificationData } from "../types";

interface Props {
  isBigDesktop: boolean
  notifications: NotificationData[]
  setShowSidebar: (state: boolean) => void
  setIsScrollingDisabled: (state: boolean) => void
  setShowOrders: (state: boolean) => void
  setShowNotificationsModal: (state: boolean) => void
  setShowSettingsModal: (state: boolean) => void
  setShowMessagesModal: (state: boolean) => void
}

function NavBar({ setShowSettingsModal, notifications, setShowNotificationsModal, setShowMessagesModal , isBigDesktop, setIsScrollingDisabled, setShowSidebar, setShowOrders }: Props): JSX.Element {

  return (
    <nav className='bg-[#1E1D29] lg:hidden fixed w-full bottom-[-1px] left-0 flex text-3xl px-2 py-6 justify-around items-center text-white rounded-tl-3xl rounded-tr-3xl'>
      <button
        title="Notifications" 
        className="p-2 relative"
        onClick={() => setShowNotificationsModal(true)}
      > 
        {
          notifications && notifications.length > 0 && (
            <div className='absolute bg-[#DD8270] w-6 h-6 grid place-content-center text-base font-bold rounded-full right-0 top-0'>{notifications.length}</div>
          )
        } 
        <RiNotification2Line />
      </button>
      <button
        title="Messages" 
        className="p-2"
        onClick={() => setShowMessagesModal(true)}
      >
        <RiMailLine />
      </button>
      <button 
        title="Order" 
        className="p-2"
        onClick={() => {
          setShowOrders(true)
          setShowSidebar(false)
          if(!isBigDesktop) {
            setIsScrollingDisabled(true)
          }
        }}
      >
        <RiPieChartLine />
      </button>
      <button
        className="p-2"
        title="Settings"
        onClick={() => setShowSettingsModal(true)}
      >
        <RiSettings2Line />
      </button>
    </nav> 
  )
}

export default NavBar;
