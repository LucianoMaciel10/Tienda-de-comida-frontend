/* eslint-disable react/react-in-jsx-scope */
import { RiCloseLargeFill } from "react-icons/ri";
import { NotificationData, Sections } from "../types";
import Notification from "./Notification";

interface Props {
  notifications: NotificationData[];
  setNotifications: (notifications: NotificationData[]) => void;
  setShowNotificationsModal: (state: boolean) => void;
  setSection: (section: Sections) => void;
}

function NotificationsModal({
  notifications,
  setNotifications,
  setShowNotificationsModal,
  setSection,
}: Props) {
  return (
    <div
      onClick={() => {
        setShowNotificationsModal(false);
        setSection("Home");
      }}
      className="fixed inset-0 bg-black bg-opacity-50 w-full flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#272835] rounded-lg shadow-lg pt-6 px-6 w-96 flex flex-col pb-8 text-center relative"
      >
        <RiCloseLargeFill
          className="cursor-pointer absolute top-3 left-3 text-white p-2"
          size={35}
          onClick={() => setShowNotificationsModal(false)}
        />
        <div className="right-6 top-6 absolute bg-gray-400 text-sm font-bold text-white w-6 h-6 grid place-content-center rounded-full">
          {notifications.length}
        </div>
        <h2 className="text-gray-300 text-xl font-bold mb-4">Notifications</h2>
        <div className="flex flex-col gap-3">
          {notifications && notifications.length > 0 ? (
            notifications.map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))
          ) : (
            <p className="text-gray-300 text-lg">
              There are no notifications yet...
            </p>
          )}
        </div>
        {notifications && notifications.length > 0 && (
          <button
            className="p-2 bg-[#DD8270] mt-8 w-[55%] font-semibold text-gray-300 rounded-lg mx-auto"
            onClick={() => {
              setNotifications([])
              localStorage.removeItem('notifications')
            }}
          >
            Clear all notifications
          </button>
        )}
      </div>
    </div>
  );
}

export default NotificationsModal;
