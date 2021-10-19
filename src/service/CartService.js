import {postRequest} from "../utils/ajax";
import {prefix} from '../config.js';

export function addCartItem(bookId, amount, active, callback) {
  const url = prefix + `addCartItem?bookId=${Number(bookId)}&amount=${Number(
      amount)}&active=${Boolean(active)}`;
  postRequest(url, {}, callback);
}

export function setCartItem(bookId, active, callback) {
  const url = prefix + `setCartItem?bookId=${Number(bookId)}&active=${Boolean(
      active)}`;
  postRequest(url, {}, callback);
}

export function deleteCartItem(bookId, callback) {
  const url = prefix + `deleteCartItem?bookId=${Number(bookId)}`;
  postRequest(url, {}, callback);
}

export function submitCart(callback) {
  const url = prefix + `submitCart`;
  postRequest(url, {}, callback);
}

export function getCartItems(callback) {
  const url = prefix+`getCartItems`;
  postRequest(url, {}, callback);
}

export function getRealCartItems(callback) {
  const url = prefix+`getRealCartItems`;
  postRequest(url, {}, callback);
}
