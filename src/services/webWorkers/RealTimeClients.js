import * as signalR from "@microsoft/signalr";

/* eslint-disable import/prefer-default-export */
export const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://bomberosnetcol.azurewebsites.net/notifications/localization", {
    accessTokenFactory: () => localStorage.getItem("token"),
  })
  .withAutomaticReconnect()
  .build();
