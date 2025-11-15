/* eslint-disable react/react-in-jsx-scope */

import { NotificationData } from "../types";

interface Props {
  notification: NotificationData;
}

function Notification({ notification }: Props) {
  return (
    <p
      className="p-2 rounded-lg bg-gray-500 text-white text-lg"
    >
      <div className="font-bold text-xs text-gray-300 left-2 top-2">
        {notification.time}
      </div>
      {notification.message}
    </p>
  );
}

export default Notification;
