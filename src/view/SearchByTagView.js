//根据标签搜索相关书籍 20211113
import React, {useEffect, useState} from 'react';
import MyFooter from "../components/footer";
import {Layout, Divider, Row, Col, Card} from 'antd';
import {withRouter} from 'react-router-dom';
import "../css/HomePage.css";
import '../css/ChatPage.css';
import "../css/SearchPage.css";
import HeadWrap from "../components/HeadWrap";
import SideBar from "../components/SideBar";
import {findRelatedBooksByTags} from "../service/BookService";
import BookTags from "../components/SearchPage/BookTags";

const {Meta} = Card;

const SearchByTagView = (props) => {
  const [keyword, setKeyword] = useState("");
  const [totalTag, setTotalTag] = useState(0);
  const [totalBook, setTotalBook] = useState(0);
  const [tag, setTag] = useState(null);
  const [book, setBook] = useState(null);

  useEffect(() => {
    let search = props.location.search;
    let params = new URLSearchParams(search);
    let id = params.get('id');
    let name = params.get('name');
    console.log("id=", id);
    console.log("name=", name);
    if (id != undefined && id != null && id != "") {
      if (name != undefined && name != null && name != "") {
        setKeyword(name);
      }
      findRelatedBooksByTags(id, fetchData);
    }
  }, [keyword]);

  const fetchData = (data) => {
    console.log("data=", data);
    if (data == undefined || data == null) {
      return;
    }
    if (data.tags != undefined && data.tags
        != null && Array.isArray(data.tags)) {
      setTag(data.tags);
      setTotalTag(data.tags.length);
    }
    if (data.books != undefined && data.books != null && Array.isArray(
        data.books)) {
      setBook(data.books);
      setTotalBook(data.books.length);
    }
  }

  const renderBook = () => {
    if (book == undefined || book == null) {
      return;
    }
    let res = [];
    for (let i = 0; i < book.length; i++) {
      res.push(
          <Col span={6}>
            <Card
                bordered={false}
                cover={<img src={book[i].image}
                            style={{height: 200, width: 200}}/>}
                onClick={e => {
                  window.location.href = "./detail?id="
                      + book[i].bookId;
                }}
            >
              <Meta title={book[i].name}
                    description={"¥" + book[i].price}/>
            </Card>
          </Col>
      );
    }
    return res;
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
                  <a className="second">搜索"{keyword}"相关书籍</a>
                </div>
                <div className="search-information">
                  <strong>"{keyword}"</strong>
                  找到<strong>{totalTag}</strong>个相关标签
                </div>
                <div>
                  <BookTags data={tag}/>
                </div>
                <div style={{width: '95%', paddingTop: '1%'}}>
                  <Divider/>
                </div>
                <div className="search-information">
                  <strong>"{keyword}"</strong>
                  找到<strong>{totalBook}</strong>本相关图书
                </div>
                <div className="book1-wrapper" style={{paddingTop: 30}}>
                  <Row gutter={16}>
                    {renderBook()}
                  </Row>
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

export default withRouter(SearchByTagView);
