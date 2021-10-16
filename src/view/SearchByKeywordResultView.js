//全文搜索结果 20211015
import React, {useEffect, useState} from 'react';
import MyFooter from "../components/footer";
import {Layout, Table} from 'antd';
import {withRouter} from 'react-router-dom';
import "../css/HomePage.css";
import '../css/ChatPage.css';
import "../css/SearchPage.css";
import HeadWrap from "../components/HeadWrap";
import SideBar from "../components/SideBar";
import {getBooksByKeyWord} from "../service/BookService";

const SearchByKeywordResultView = (props) => {
  const [keyword, setKeyword] = useState("");
  const [total, setTotal] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    let search = props.location.search;
    let params = new URLSearchParams(search);
    let tmp = params.get('keyword');
    if (tmp != undefined && tmp != null && tmp != "") {
      setKeyword(tmp);
      getBooksByKeyWord(tmp, fetchData);
    }
  }, []);

  const fetchData = (data) => {
    if (!Array.isArray(data)) {
      return;
    }
    let num = data.length;
    setTotal(num);
    setData(data);
    console.log("length=", num);
  }

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      render: text => <a href={"./detail?id="+text}>{text}</a>,
      width: 50,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 50,
    },
    {
      title: '简介',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    }
  ]

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
                  找到<strong>{total}</strong>件相关商品
                </div>
                <div className="search-table-container">
                  <Table
                      columns={columns}
                      dataSource={data}
                      bordered
                      pagination={{pageSize: 5}}
                  />
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
