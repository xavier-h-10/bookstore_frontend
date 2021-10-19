import {postRequest} from "../utils/ajax";
import {prefix} from '../config.js';

export function getOrder(callback) {
  const url = prefix + `getOrder`;
  postRequest(url, {}, callback);
}

export function getAllOrder(callback) {
  const url = prefix + `getAllOrder`;
  postRequest(url, {}, callback);
}

export function getOrderItemById(orderId, callback) {
  const url = prefix + `getOrderItemById?orderId=${orderId}`;
  postRequest(url, {}, callback);
}

export function getOrderByTime(t1, t2, callback) {
  const url = prefix + `getOrderByTime?t1=${t1}&t2=${t2}`;
  postRequest(url, {}, callback);
}

export function getAllOrderByTime(t1, t2, callback) {
  const url = prefix + `getAllOrderByTime?t1=${t1}&t2=${t2}`;
  postRequest(url, {}, callback);
}
