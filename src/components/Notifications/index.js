import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import NotificationItem from "examples/Items/NotificationItem";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import InfiniteScroll from "react-infinite-scroll-component";
import { connectionBuilder } from "../../services/notifications/notificationsServices";
import {
  getNotificationsByUser,
  addNewNotification,
  getNotificationsByTenant,
  switchBooleanGetNotification,
  chageStateNotification,
  changeStateNotificationByTenant,
  updateDatabyNotification,
} from "../../store/notifications/actions";

function Notifications({ isOpen, onClose, idMenuNotificacions, anchorEl }) {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const [connection, setConnection] = useState(null);

  const listNotifications = useSelector(({ notifications }) => notifications.notifications);
  const isFirstGet = useSelector(({ notifications }) => notifications.isFirstGet);
  const hasMoreByUser = useSelector(({ notifications }) => notifications.hasMoreByUser);
  const hasMoreByTenant = useSelector(({ notifications }) => notifications.hasMoreByTenant);
  const listNotificationsBytenant = useSelector(
    ({ notifications }) => notifications.notificationsByTenat
  );

  const handleGetNotifications = async (value = 0) => {
    setPageNumber(pageNumber + value);
    const dataFilter = {
      pageNumber,
      pageSize: 8,
      orderBy: ["date desc"],
    };
    await dispatch(getNotificationsByUser(dataFilter));
    await dispatch(getNotificationsByTenant(dataFilter));
  };
  const handleChangeStateNotifications = async () => {
    const notificationNotViewed = listNotifications
      .filter((item) => !item.viewed && item.id)
      .map((item) => item.id);
    const notificationByTenantNotViewed = listNotificationsBytenant
      .filter((item) => !item.viewed && item.id)
      .map((item) => item.id);
    const dataNotifications = {
      usersNotificationsId: notificationNotViewed,
    };
    const dataNotificationBytenant = {
      tenantUserNotificationsId: notificationByTenantNotViewed,
    };
    if (notificationNotViewed.length !== 0)
      await dispatch(chageStateNotification(dataNotifications));
    if (notificationByTenantNotViewed.length !== 0)
      await dispatch(changeStateNotificationByTenant(dataNotificationBytenant));
  };

  useEffect(() => {
    const newConnection = connectionBuilder();
    if (isFirstGet) handleGetNotifications();
    dispatch(switchBooleanGetNotification());
    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (isOpen) handleChangeStateNotifications();
  }, [isOpen, listNotifications, listNotificationsBytenant]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("NotificationFromServer", (type, fullData) => {
            const newNotification = {
              type,
              id: fullData.id,
              userId: Math.random(),
              date: Date.now(),
              viewed: false,
              data: {
                Message: fullData.message,
                Label: fullData.label,
              },
            };
            dispatch(addNewNotification(newNotification));
            dispatch(updateDatabyNotification(fullData));
          });
        }) // eslint-disable-next-line no-console
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={idMenuNotificacions}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpen}
      onClose={onClose}
      sx={{ mt: "45px", maxWidth: 360 }}
    >
      <InfiniteScroll
        dataLength={listNotifications.length + listNotificationsBytenant.length}
        next={() => handleGetNotifications(1)}
        hasMore={hasMoreByUser || hasMoreByTenant}
        loader={
          <>
            {" "}
            <NotificationItem loading icon={<Icon>email</Icon>} title="Check new messages" />
            <Divider variant="middle" />
            <NotificationItem loading icon={<Icon>email</Icon>} title="Check new messages" />
            <Divider variant="middle" />
            <NotificationItem loading icon={<Icon>email</Icon>} title="Check new messages" />
          </>
        }
        endMessage={
          <MenuItem disabled>
            {" "}
            <p style={{ textAlign: "center" }}>
              <b>No hay mas notificaciones</b>
            </p>
          </MenuItem>
        }
        height={460}
      >
        {listNotificationsBytenant.length !== 0 &&
          listNotificationsBytenant.map((notification) => (
            <NotificationItem icon={notification.data.Label} message={notification.data.Message} />
          ))}
        {listNotifications.length !== 0 &&
          listNotifications.map((notification) => (
            <NotificationItem icon={notification.data.Label} message={notification.data.Message} />
          ))}
      </InfiniteScroll>
    </Menu>
  );
}

Notifications.defaultProps = {
  idMenuNotificacions: "menu-notifications-app",
};

Notifications.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  idMenuNotificacions: PropTypes.string,
  anchorEl: PropTypes.node.isRequired,
};

export default Notifications;
