import { Divider } from "antd";
import React from "react";
import "./index.css";
const MessageItem = (props) => {
  const { item } = props;

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        className={item.status ? "activeItem" : ""}
      >
        <div style={{ padding: 10,width: 300, height: 70 }}>
          <div style={{display: "flex",justifyContent:"space-between"}}>
            <div>{item.title}</div>
            <div>{item.createdDate}</div>
          </div>
          <div className="message-item-content">{item.content}</div>
        </div>
      </div>
      <div style={{height:1,width:"100%",backgroundColor:"#dadada"}}></div>
    </>
  );
};

export default MessageItem;
