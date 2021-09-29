/* 页面访问量统计 20210928 */

import React, {useEffect, useState} from 'react';
import "../../css/HomePage.css";
import {getPageView} from "../../service/HomeService";

const PageView = () => {
  const [total, setTotal] = useState(0);

  const fetchData = (data) => {
    if (data.status != undefined && data.status == 200) {
      let tmp = data.data;
      if (tmp.total != undefined && tmp.total != null) {
        setTotal(tmp.total);
      }
    }
  }

  useEffect(() => {
    getPageView(fetchData);
  }, [])

  return (
      <div className="vol-container">
        网站访问量：
        <div className="vol-number">
          &nbsp;{total}&nbsp;
        </div>
        次
      </div>
  )
}

export default PageView;
