//全文搜索 20211015
import React, {useState} from 'react';
import MyFooter from "../components/footer";
import {Layout, Input, Button, message, Divider} from 'antd';
import {withRouter} from 'react-router-dom';
import "../css/HomePage.css";
import '../css/ChatPage.css';
import HeadWrap from "../components/HeadWrap";
import SideBar from "../components/SideBar";

const {TextArea} = Input;

const SearchByKeywordView = (props) => {
  const [text, setText] = useState("");

  function handleChange(e) {
    console.log(e.target.value);
    setText(e.target.value);
  }

  const renderClick = () => {
    if (text.length <= 0) {
      message.error("请输入搜索关键词！");
      return;
    }
    window.location.href = "../search_by_keyword_result?keyword=" + text;
  }

  return (
      <div className="book-page">
        <div className="book-container">
          <div className="head-container">
            <HeadWrap/>
          </div>
          <div className="detail-container">
            <Layout className="bookview-layout">
              <SideBar selected={"1"}/>
              <div className="search-keyword-layout">
                <div className="search-keyword-title">
                  高级搜索
                </div>
                <div className="search-keyword-subtitle">
                  根据书籍简介关键词，搜索书籍
                </div>
                <TextArea
                    allowClear={true}
                    bordered={true}
                    placeholder="请在此输入关键词"
                    defaultValue=""
                    showCount
                    maxLength={100}
                    onChange={handleChange}
                    style={{
                      width:'80%',
                      marginLeft:'10%',
                      marginTop:30,
                      minHeight:100,
                    }}
                    autoSize={{ minRows: 10 }}
                />
                <div className="search-keyword-button-container">
                  <Button
                      className="chat-content-sendButton"
                      type="primary"
                      onClick={renderClick}
                      style={{
                        alignSelf:'center',
                      }}
                  >
                    搜索
                  </Button>
                </div>
                <div style={{width:'90%',paddingLeft:'10%'}}>
                  <Divider/>
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

export default withRouter(SearchByKeywordView);
