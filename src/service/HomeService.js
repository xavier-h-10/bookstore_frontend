import {postRequest} from "../utils/ajax";
import {message} from "antd";
import {history} from "../utils/history";
import {prefix} from '../config.js';

export function getHomeContent(callback) {
  const url = prefix + `getHomeContent`;
  postRequest(url, {}, callback);
}

export function getPageView(callback) {
  const url = prefix + `getPageView`;
  postRequest(url, {}, callback);
}
