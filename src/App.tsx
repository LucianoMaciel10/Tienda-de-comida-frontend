/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import { type Sections, type Users, type EatingOptions, NotificationData } from "./types";
import Orders from "./components/Orders";
import LoginModal from "./components/LoginModal";
import Home from "./components/Home";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { AppContext } from "./contexts/OrdersContext";
import ErrorComponent from "./components/Error";
import { Toaster } from "sonner";
import LogoutModal from "./components/LogoutModal";
import PaymentModal from "./components/PaymentModal";
import MessagesModal from "./components/MessagesModal";
import NotificationsModal from "./components/NotificationsModal";
import SettingsModal from "./components/SettingsModal";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [eatingOption, setEatingOption] = useState<EatingOptions>("Dine In");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [showOrders, setShowOrders] = useState(false);
  const [isScrollingDisabled, setIsScrollingDisabled] = useState(false);
  const [isBigDesktop, setIsBigDesktop] = useState(window.innerWidth >= 1500);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [formType, setFormType] = useState<"login" | "register" | null>(null);
  const [users, setUsers] = useState<Users[]>([]);
  const [totalPrice, setTotalPrice] = useState("0");
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [section, setSection] = useState<Sections>("Home");

  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Error en la solicitud de datos para el componente App");
  }

  const { error, setError } = context;

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/67425d9ae41b4d34e4596d3d")
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Error con la comunicacion al servidor, status: ${res.status}`
          );
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data.record.users);
      })
      .catch((error) => setError(error.message));
  }, [formType]);

  useEffect(() => {
    const username = localStorage.getItem("user");

    if (username) {
      setUsername(JSON.parse(username));
    }

    const notifications = localStorage.getItem('notifications')

    if (notifications) {
      setNotifications(JSON.parse(notifications))
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(false);
      }

      if (window.innerWidth >= 1500) {
        setIsBigDesktop(true);
      } else {
        setIsBigDesktop(false);
      }
    };

    window.addEventListener("resize", handleResize);

    const generatedOrderNumber = Math.round(Math.random() * 9999 + 100);
    setOrderNumber(generatedOrderNumber.toString().trim());

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isScrollingDisabled) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [isScrollingDisabled]);

  useEffect(() => {
    if (!showOrders) {
      setIsScrollingDisabled(false);
    }
  }, [showOrders]);

  const handleMouseEnter = () => {
    if (isBigDesktop) {
      setIsScrollingDisabled(true);
    }
  };

  const handleMouseLeave = () => {
    if (isBigDesktop) {
      setIsScrollingDisabled(false);
    }
  };

  const handleClickOption = (option: EatingOptions) => {
    setEatingOption(option);
  };

  return (
    <div className={`bg-[#272835] w-full min-h-screen`}>
      <Sidebar
        section={section}
        setSection={setSection}
        notifications={notifications}
        username={username}
        setShowLogoutModal={setShowLogoutModal}
        isBigDesktop={isBigDesktop}
        setIsScrollingDisabled={setIsScrollingDisabled}
        showMenu={showSidebar}
        setShowSidebar={setShowSidebar}
        showOrders={showOrders}
        setShowOrders={setShowOrders}
        setShowMessagesModal={setShowMessagesModal}
        setShowNotificationsModal={setShowNotificationsModal}
        setShowSettingsModal={setShowSettingsModal}
      />
      <NavBar
        notifications={notifications}
        setShowMessagesModal={setShowMessagesModal}
        setShowNotificationsModal={setShowNotificationsModal}
        setShowSettingsModal={setShowSettingsModal}
        setShowSidebar={setShowSidebar}
        isBigDesktop={isBigDesktop}
        setIsScrollingDisabled={setIsScrollingDisabled}
        setShowOrders={setShowOrders}
      />
      <main className="lg:pl-20 grid grid-cols-1 lg:grid-cols-8 h-full lg:pr-0 lg:pt-0 pb-12 max-lg:p-4">
        <Home />
        <Toaster position="top-center" richColors />
        {showLoginModal && (
          <LoginModal
            setShowLoginModal={setShowLoginModal}
            setFormType={setFormType}
          />
        )}
        {formType === "login" && (
          <LoginForm
            setShowLoginModal={setShowLoginModal}
            setUsername={setUsername}
            users={users}
            setFormType={setFormType}
          />
        )}
        {formType === "register" && (
          <RegisterForm
            setShowLoginModal={setShowLoginModal}
            users={users}
            setFormType={setFormType}
          />
        )}
        {error && <ErrorComponent error={error} />}
        {showLogoutModal && (
          <LogoutModal
            setTotalPrice={setTotalPrice}
            setUsername={setUsername}
            setShowLogoutModal={setShowLogoutModal}
          />
        )}
        {showPaymentModal && (
          <PaymentModal
            notifications={notifications}
            setNotifications={setNotifications}
            orderNumber={orderNumber}
            eatingOption={eatingOption}
            setShowPaymentModal={setShowPaymentModal}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
        )}
        {
          showMessagesModal && (
            <MessagesModal setSection={setSection} setShowMessagesModal={setShowMessagesModal} />
          )
        }
        {
          showNotificationsModal && (
            <NotificationsModal setSection={setSection} setNotifications={setNotifications} notifications={notifications} setShowNotificationsModal={setShowNotificationsModal} />
          )
        }
        {
          showSettingsModal && (
            <SettingsModal setSection={setSection} setShowSettingsModal={setShowSettingsModal} />
          )
        }
      </main>
      <aside>
        <Orders
          setShowPaymentModal={setShowPaymentModal}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          username={username}
          setShowLoginModal={setShowLoginModal}
          eatingOption={eatingOption}
          handleClickOption={handleClickOption}
          orderNumber={orderNumber}
          setShowOrders={setShowOrders}
          showOrders={showOrders}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </aside>
    </div>
  );
}

export default App;
