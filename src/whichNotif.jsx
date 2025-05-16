import React from "react";
import NotificationBell from "./notificationsPro";
import NotificationComp from "./notificationsCompany";
import NotificationsStudent from "./notificationsStudent";
import NotificationScad from "./notificationsScad";

const RenderNotif = ({
  role,
 
}) => {
  switch (role) {
    case "student":
      return <NotificationsStudent/>;

    case "pro":
      return (
        <NotificationBell
          
        />
      );

    case "company":
      return (
        <NotificationComp
          
        />
      );

    case "scad":
      return (
        <NotificationScad
        
        />
      );

    default:
      return null;
  }
};

export default RenderNotif;
