//书籍标签组件 20211113
import React, {useState, useEffect} from 'react';
import {getBookTags, getBookTagsById} from "../../service/BookService";
import {Tag} from 'antd';

const BookTags = (props) => {
  const [content, setContent] = useState(null);
  const [isSearchPage, setIsSearchPage] = useState(true);  //书籍详情页和搜索页采用不同布局

  const color = ["magenta", "red", "volcano", "orange", "gold", "lime", "green",
    "cyan", "blue", "geekblue", "purple"];

  const fetchData = (data) => {
    console.log("BookTags: data=", data);
    let content = [];
    let content1 = [];
    let len = color.length;
    for (let i = 0; i < data.length; i++) {
      if (data[i] != undefined && data[i].name != undefined && data[i].name
          != null && data[i].tagId != undefined && data[i].tagId != null) {
        content1.push(
            <Tag color={color[i % len]}
                 onClick={e => {
                   window.location.href = '../search_by_tag?id='
                       + data[i].tagId + '&name=' + data[i].name;
                 }
                 }
            >
              {data[i].name}
            </Tag>
        );
        if ((i + 1) % 15 == 0) {
          content.push(
              <div
                  style={isSearchPage ? {paddingTop: 15} : {}}
              >
                {content1}
              </div>
          )
          content1 = [];
        }
      }
    }
    if (data.length % 15 != 0) {
      content.push(
          <div
              style={isSearchPage ? {paddingTop: 15} : {}}
          >
            {content1}
          </div>
      )
    }
    setContent(content);
  }

  useEffect(() => {
    if (props != undefined && props != null && props.data != undefined
        && props.data != null) {
      fetchData(props.data);
      return;
    }
    if (props == undefined || props == null || props.id == undefined || props.id
        == null) {
      setIsSearchPage(true);
      getBookTags(fetchData);
    } else {
      if (props.id != undefined && props.id != null) {
        setIsSearchPage(false);
        getBookTagsById(props.id, fetchData);
      }
    }
  }, [props.data]);

  return (
      <div
          style={isSearchPage ? {paddingLeft: 50} : {marginTop: -15}}
      >
        {content}
      </div>
  );
}

export default BookTags;

