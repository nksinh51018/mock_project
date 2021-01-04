import { Divider } from "antd";
import React from "react";
import "./index.css";
import history from "../../history";
import {formatDate} from "../../utils/DateFormat"
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as maintenanceCardAction from '../../actions/maintenanceCardAdd';
import * as messageAction from '../../actions/message';

const MessageItem = (props) => {
  const { item } = props;

const handClick = ()=>{
  const {maintenanceCardActionsCreator,messageActionsCreator} = props;
  const {actFetchMaintenanceCardById} = maintenanceCardActionsCreator;
  const {actReadMessages} = messageActionsCreator;
  const arr = item.url.split("/");
  const id = arr[arr.length - 1];
  console.log(arr[arr.length - 1]);
  console.log("id: "+id);
  actFetchMaintenanceCardById(id)
  actReadMessages(item.id)
  history.push(item.url)
}

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        className={item.status ? "activeItem" : ""}
        onClick={handClick}
      >
        <div style={{ padding: 10,width: 500, height: 70 }}>
          <div style={{display: "flex",justifyContent:"space-between"}}>
            <div>{item.title}</div>
            <div>{formatDate(item.createdDate)}</div>
          </div>
          <div className="message-item-content">{item.content}</div>
        </div>
      </div>
      <div style={{height:1,width:"100%",backgroundColor:"#dadada"}}></div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
      
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    maintenanceCardActionsCreator: bindActionCreators(maintenanceCardAction, dispatch),
    messageActionsCreator: bindActionCreators(messageAction, dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageItem);
