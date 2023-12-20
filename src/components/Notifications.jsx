import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../index.css";

const Notification = ({ message }) => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    setNotificationMessage(notification)

  }, [notification])


  if (message === null) {
    return null;
  }

  return <div className="notification">{message}</div>;
};

export default Notification;
