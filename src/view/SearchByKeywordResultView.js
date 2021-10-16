//全文搜索结果 20211015
import React, {useEffect, useState} from 'react';
import MyFooter from "../components/footer";
import {Layout, Input, Button, message, Row} from 'antd';
import {withRouter} from 'react-router-dom';
import "../css/HomePage.css";
import '../css/ChatPage.css';
import "../css/SearchPage.css";
import HeadWrap from "../components/HeadWrap";
import SideBar from "../components/SideBar";
import {getBooksByKeyWord} from "../service/BookService";

const SearchByKeywordResultView = (props) => {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    let search = props.location.search;
    let params = new URLSearchParams(search);
    let tmp = params.get('keyword');
    if (tmp != undefined && tmp != null && tmp != "") {
      setKeyword(tmp);
      getBooksByKeyWord(tmp,fetchData);
    }
  }, []);

  const fetchData=(data)=>{
    
  }


  return (
      <div className="book-page">
        <div className="book-container">
          <div className="head-container">
            <HeadWrap/>
          </div>
          <div className="detail-container">
            <Layout className="bookview-layout">
              <SideBar/>
              <div className="search-container">
                <div className="search-breadhead">
                  <a className="first">
                    全部商品
                  </a>
                  <a className="second">搜索"{keyword}"相关简介</a>
                </div>
                <div className="search-information">
                  <strong>"{keyword}"</strong>
                  找到以下相关商品
                </div>
                <div className="foot-container" style={{display: "block"}}>
                  <MyFooter/>
                </div>
              </div>
            </Layout>
          </div>
        </div>
      </div>
  )
};

export default withRouter(SearchByKeywordResultView);
