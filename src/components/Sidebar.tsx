/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from "react";
import {
  RiHome4Line,
  RiLogoutBoxRLine,
  RiPieChartLine,
  RiSettings2Line,
  RiMailLine,
  RiStore2Fill,
  RiNotification2Line,
} from "react-icons/ri";
import "../index.css";
import { AppContext } from "../contexts/OrdersContext";
import { NotificationData, type Sections } from "../types";

interface Props {
  showMenu: boolean
  showOrders: boolean
  isBigDesktop: boolean
  username: string | null
  notifications: NotificationData[]
  section: Sections
  setShowLogoutModal: (state: boolean) => void
  setIsScrollingDisabled: (state: boolean) => void
  setShowSidebar: (state: boolean) => void
  setShowOrders: (state: boolean) => void
  setShowNotificationsModal: (state: boolean) => void
  setShowSettingsModal: (state: boolean) => void
  setShowMessagesModal: (state: boolean) => void
  setSection: (section: Sections) => void
}

function Sidebar({ section, setSection, setShowSettingsModal, setShowNotificationsModal, setShowMessagesModal, username, showMenu, notifications, setShowOrders, isBigDesktop, setShowLogoutModal, showOrders, setShowSidebar, setIsScrollingDisabled }: Props): JSX.Element {
  const [prevSection, setPrevSection] = useState<Sections>()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Orders must be used within an OrdersProvider");
  }

  const { nowSetPrevSection, setNowSetPrevSection } = context

  useEffect(() => {
    if (prevSection) {
      setSection(prevSection as Sections)
      setNowSetPrevSection(false)
    }
  }, [nowSetPrevSection])

  const handleClick = (
    section: Sections,
    sectionAct?: Sections
  ) => {
    setSection(section);
    setPrevSection(sectionAct)
    if(section === 'Order') {
      setShowOrders(true)
    } else {
      if (showOrders) {
        setShowOrders(false)
      }
    }
    if (isMobile) {
      setShowSidebar(false)
    }
  };

  return (
    <aside className={`bg-[#1E1D29] rounded-tr-xl rounded-br-xl lg:left-0 max-lg:w-28 fixed top-0 w-20 h-screen ${showMenu ? 'left-0' : '-left-full'} transition-all z-50`} >
      <ul className="h-full flex flex-col items-center justify-between py-8">
        <li>
          <div
            title="Store Logo"
            className="bg-[#4D3E3F] rounded-xl block"
          >
            <RiStore2Fill size={50} className="p-2" color="#D88072" />
          </div>
        </li>
        <li className="rounded-tl-xl rounded-bl-xl lg:hover:bg-[#272835] p-2 grid place-content-center pr-4 ml-[11px]">
          <button
            title="Home"
            className={section === "Home" ? "bg-[#DD8270] rounded-xl" : ""}
            onClick={() => handleClick("Home", section)}
          >
            <RiHome4Line
              size={45}
              className="p-2"
              color={section === "Home" ? "#fff" : "#DC8272"}
            />
          </button>
        </li>
        {
          !isBigDesktop && (
            <li className="rounded-tl-xl rounded-bl-xl lg:hover:bg-[#272835] grid place-content-center p-2 pr-4 ml-[11px]">
              <button
                title="Order"
                className={
                  section === "Order" ? "bg-[#DD8270] rounded-xl" : ""
                }
                onClick={() => {
                  handleClick("Order", section)
                  if(!isBigDesktop) {
                    setIsScrollingDisabled(true)
                  }
                }}
              >
                <RiPieChartLine
                  size={45}
                  className="p-2"
                  color={section === "Order" ? "#fff" : "#DC8272"}
                />
              </button>
            </li>
          )
        }
        <li className="rounded-tl-xl rounded-bl-xl lg:hover:bg-[#272835] p-2 pr-4 ml-[11px] grid place-content-center">
          <button
            title="Messages"
            className={
              section === "Messages" ? "bg-[#DD8270] rounded-xl" : ""
            }
            onClick={() =>  {
              handleClick("Messages", section)
              setShowMessagesModal(true)
            }}
          >
            <RiMailLine
              size={45}
              className="p-2"
              color={section === "Messages" ? "#fff" : "#DC8272"}
            />
          </button>
        </li>
        <li className="rounded-tl-xl rounded-bl-xl lg:hover:bg-[#272835] p-2 pr-4 ml-[11px] grid place-content-center">
          <button
            title="Notifications"
            className={`relative ${section === "Notifications" ? "bg-[#DD8270] rounded-xl" : ""}`}
            onClick={() => {
              handleClick("Notifications", section)
              setShowNotificationsModal(true)
            }}
          >
            {
              notifications && notifications.length > 0 && (
                <div className={`${section === "Notifications" ? "text-white" : ""} absolute bg-[#DD8270] text-base w-6 h-6 grid place-content-center font-bold rounded-full right-0 top-0`}>{notifications.length}</div>
              )
            } 
            <RiNotification2Line
              size={45}
              className="p-2"
              color={section === "Notifications" ? "#fff" : "#DC8272"}
            />
          </button>
        </li>
        <li className="rounded-tl-xl rounded-bl-xl lg:hover:bg-[#272835] p-2 pr-4 ml-[11px] grid place-content-center">
          <button
            title="Settings"
            className={
              section === "Settings" ? "bg-[#DD8270] rounded-xl" : ""
            }
            onClick={() => {
              handleClick("Settings", section)
              setShowSettingsModal(true)
            }} 
          >
            <RiSettings2Line
              size={45}
              className="p-2"
              color={section === "Settings" ? "#fff" : "#DC8272"}
            />
          </button>
        </li>
        {
          username && (
            <li className="rounded-tl-xl rounded-bl-xl lg:hover:bg-[#272835] p-2 pr-4 ml-[11px]">
              <button 
                title="Logout"
                onClick={() => setShowLogoutModal(true)}
              >
                <RiLogoutBoxRLine size={45} className="p-2" color="#DC8272" />
              </button>
            </li>
          )
        }
      </ul>
    </aside>
  );
}

export default Sidebar;
