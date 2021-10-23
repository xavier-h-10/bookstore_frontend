//全文搜索+搜索作者微服务 20211015
import React, {useState} from 'react';
import MyFooter from "../components/footer";
import {Layout, Input, Button, message, Divider, Table} from 'antd';
import {withRouter} from 'react-router-dom';
import "../css/HomePage.css";
import '../css/ChatPage.css';
import HeadWrap from "../components/HeadWrap";
import SideBar from "../components/SideBar";
import {findAuthorByBookName} from "../service/BookService";

const {TextArea, Search} = Input;

const SearchByKeywordView = (props) => {
  const [text, setText] = useState("");
  const [searchData, setSearchData] = useState(null);

  const columns = [
    {
      title: '编号',
      dataIndex: 'bookId',
      key: 'bookId',
      render: text => <a href={"./detail?id=" + text}>{text}</a>,
      width: 100,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      width: 100,
    }
  ];

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

  const fetchData = (data) => {
    if (data == undefined || data == null) {
      return;
    }
    if (data.code == undefined || data.code != 200) {
      return;
    }
    if (data.data == undefined || data.data == null) {
      return;
    }
    setSearchData(data.data);
  }

  const handleSearch = (value) => {
    console.log(value);
    if (value.length <= 0) {
      setSearchData(null);
      return;
    }
    findAuthorByBookName(value, fetchData);
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
                      width: '80%',
                      marginLeft: '10%',
                      marginTop: 30,
                      minHeight: 100,
                    }}
                    autoSize={{minRows: 10}}
                />
                <div className="search-keyword-button-container">
                  <Button
                      className="chat-content-sendButton"
                      type="primary"
                      onClick={renderClick}
                      style={{
                        alignSelf: 'center',
                      }}
                  >
                    搜索
                  </Button>
                </div>
                <div style={{width: '90%', paddingLeft: '10%'}}>
                  <Divider/>
                </div>
                <div className="search-keyword-author-title">
                  搜索图书作者
                </div>
                <Search
                    placeholder="请输入图书名称"
                    allowClear
                    enterButton
                    // onSearch={onSearch}
                    style={{
                      paddingLeft: '10%',
                      paddingTop: '2%',
                      width: '50%',
                    }}
                    onSearch={handleSearch}
                />
                <div style={{paddingLeft: '10%'}}>
                  <div style={{paddingTop: 20}}>搜索结果如下：</div>
                  <div style={{paddingTop: 20, width: '90%'}}>
                    <Table
                        columns={columns}
                        dataSource={searchData}

                    />
                  </div>
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
