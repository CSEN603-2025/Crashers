import React from "react";
import NotificationBell from "./notificationsPro";
import NotificationComp from "./notificationsCompany";
import NotificationsStudent from "./notificationsStudent";
import NotificationScad from "./notificationsScad";

const RenderNotif = ({
  role,
  showDropdown,
  onBellClick,
}) => {
  switch (role) {
    case "student":
      return <NotificationsStudent/>;

    case "pro":
      return (
        <NotificationBell
          showDropdown={showDropdown}
          onBellClick={onBellClick}
        />
      );

    case "company":
      return (
        <NotificationComp
          showDropdown={showDropdown}
          onBellClick={onBellClick}
        />
      );

    case "scad":
      return (
        <NotificationScad
          showDropdown={showDropdown}
          onBellClick={onBellClick}
        />
      );

    default:
      return null;
  }
};

export default RenderNotif;
