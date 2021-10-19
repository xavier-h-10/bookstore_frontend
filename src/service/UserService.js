import {postRequest} from "../utils/ajax";
import {message} from "antd";
import {history} from "../utils/history";
import request from "request";
import {postRequest_v2} from "../utils/ajax";
import {prefix} from '../config.js';

export function login(data) {
  const callback = data => {
    if (data.status > 0) {
      localStorage.setItem('user', JSON.stringify(data.data));
      history.push("/");
      history.go(0);
      message.success(data.message);
    } else {
      message.error(data.message);
    }
  };
  const url = prefix + `login`;
  postRequest(url, data, callback);
}

export function checkSession(callback) {
  const url = prefix + `checkSession`;
  postRequest_v2(url, {}, callback);
}

export function logout() {
  const url = prefix + `logout`;
  const callback = data => {
    if (data.status > 0) {
      localStorage.removeItem('user');
      history.push("/login");
      message.success(data.message);
    } else {
      history.push("login");
      message.error(data.message);
    }
  };
  postRequest(url, {}, callback);
}

export function getUser(callback) {
  const url = prefix + `getUser`;
  postRequest(url, {}, callback);
}

export function getAllUsers(callback) {
  const url = prefix + `getAllUsers`;
  postRequest(url, {}, callback);
}

export function getUserById(userId, callback) {
  const url = prefix + `getUserById?userId=${Number(userId)}`;
  postRequest(url, {}, callback);
}

export function updateUserStatus(userId, enabled, callback) {
  const url = prefix + `updateUserStatus?userId=${Number(
      userId)}&enabled=${Boolean(enabled)}`;
  postRequest(url, {}, callback);
}

export function register(data) {
  const callback = data => {
    if (data.status > 0) {
      localStorage.setItem('user', JSON.stringify(data.data));
      history.push("/login");
      history.go(0);
      message.success(data.message);
    } else {
      message.error(data.message);
    }
  };
  const url = prefix + `register`;
  postRequest(url, data, callback);
}

export async function registerCheck(username, callback) {
  const url = prefix + `registerCheck?username=${username}`;
  return new Promise(resolve => {
    postRequest(url, {}, callback)
  });
  //return true;
  // return  request(url);
}
