import {postRequest} from "../utils/ajax";
import {message} from "antd";
import {history} from "../utils/history";
import {prefix} from '../config.js';

export function getBooksByPage(num, callback) {
  const url = prefix + `getBooksByPage?num=${Number(num)}`;
  postRequest(url, {}, callback);
}

export function getBookById(bookId, callback) {
  const url = prefix + `getBookById?id=${Number(bookId)}`;
  postRequest(url, {}, callback);
}

export function getBookByName(name, callback) {
  const url = prefix + `getBookByName?name=${name}`;
  postRequest(url, {}, callback);
}

export function deleteBookById(id, callback) {
  const url = prefix + `deleteBookById?id=${id}`;
  postRequest(url, {}, callback);
}

export function addBook(data, callback) {
  const url = prefix + `addBook`;
  postRequest(url, data, callback);
}

export function updateBook(data, callback) {
  const url = prefix + `updateBook`;
  postRequest(url, data, callback);
}

export function getBooks(callback) {
  const url = prefix + `getBooks`;
  postRequest(url, {}, callback);
}

//全文搜索 20211015
export function getBooksByKeyWord(keyword, callback) {
  const url = prefix + `getBooksByKeyword?keyword=${keyword}`;
  postRequest(url, {}, callback);
}

//搜索作者微服务 20211019
export function findAuthorByBookName(bookName, callback) {
  const url = prefix + `findAuthorByBookName?bookName=${bookName}`;
  postRequest(url, {}, callback);
}
