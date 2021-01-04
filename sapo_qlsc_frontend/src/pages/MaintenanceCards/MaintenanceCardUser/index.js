import React, { useEffect, useRef, useState } from "react";
import { Button, Row, Col, Card } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import CustomerContainer from "../../../container/MaintenanceCardAdd/CustomerContainer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as maintenanceCardAddActions from "../../../actions/maintenanceCardAdd";
import ProductContainer from "../../../container/MaintenanceCardAdd/ProductContainer";
import PaymentHistoryContainer from "../../../container/MaintenanceCardAdd/PaymentHistoryContainer";
import MaintenanceCardInfoContainer from "../../../container/MaintenanceCardAdd/MaintenanceCardInfoContainer";
import StatusHistoryContainer from "../../../container/MaintenanceCardAdd/StatusHistoryContainer";
import Modal from "antd/lib/modal/Modal";
import { useReactToPrint } from "react-to-print";
import ExportMaintenanceCards from "./ExportMaintenanceCards";
import QRCode from "qrcode.react";
import ExportQrCode from "./ExportQrCode";
const MaintenanceCardEdit = (props) => {
  const [visible, setVisible] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleAddModal = () => {
    setIsModalVisible(false);
  };

  const componentRef2 = useRef();
  const exportQR = useReactToPrint({
    content: () => componentRef2.current,
  });

  useEffect(() => {
    setIsModalVisible(props.maintenanceCardAdd.isOpenQrCode);
  }, [props.maintenanceCardAdd.isOpenQrCode]);

  useEffect(() => {
    console.log("connecting to chat...");
    // eslint-disable-next-line no-undef
    let socket = new SockJS("http://localhost:8085" + "/chat");
    // eslint-disable-next-line no-undef
    let stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe(
        "/topic/messages/" + props.match.params.hmac,
        function (response) {
          const { maintenanceCardAddActionCreators } = props;
          const {
            actGetMaintenanceCardByHmac,
          } = maintenanceCardAddActionCreators;
          actGetMaintenanceCardByHmac(
            props.match.params.id,
            props.match.params.hmac
          );
        }
      );
    });
  }, []);

  useEffect(() => {
    const { maintenanceCardAddActionCreators } = props;
    const { actGetMaintenanceCardByHmac } = maintenanceCardAddActionCreators;
    actGetMaintenanceCardByHmac(props.match.params.id, props.match.params.hmac);
  }, [props.maintenanceCardAdd.reset]);

  const [returnDate, setReturnDate] = useState(null);

  useEffect(() => {
    setReturnDate(props.maintenanceCardAdd.info.returnDate);
  }, [props.maintenanceCardAdd.info.returnDate]);

  const [paymentHistories, setPaymentHistories] = useState([]);

  useEffect(() => {
    setPaymentHistories(props.maintenanceCardAdd.paymentHistories);
  }, [props.maintenanceCardAdd.paymentHistories]);

  const [workStatus, setWorkStatus] = useState(0);

  useEffect(() => {
    setWorkStatus(props.maintenanceCardAdd.workStatus);
  }, [props.maintenanceCardAdd.workStatus]);

  const renderTitleCard = (text) => {
    return (
      <>
        <div>{text}</div>
      </>
    );
  };

  const deleteMaintenanceCard = () => {
    const { maintenanceCardAddActionCreators } = props;
    const { actDeleteMaintenanceCard } = maintenanceCardAddActionCreators;
    actDeleteMaintenanceCard(props.match.params.id);
    setVisible(false);
  };

  const showQRcode = () => {
    const { maintenanceCardAddActionCreators } = props;
    const { actGetHmac } = maintenanceCardAddActionCreators;
    actGetHmac(props.match.params.id);
    setIsModalVisible(true);
  };

  const componentRef = useRef();
  const exportFile = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div style={{ backgroundColor: "#f0f2f5" }}>
        <div
          style={{
            width: "98%",
            marginRight: "1%",
            marginLeft: "1%",
          }}
        >
          <div style={{ marginBottom: 16, marginTop: 30 }}>
            <span style={{ fontWeight: "bold", fontSize: 35 }}>
              Thông tin phiếu sửa chữa
            </span>
          </div>
          <Row>
            <Col span={18}>
              <div style={{ marginBottom: 16, width: "100%" }}>
                <Card
                  title={renderTitleCard("Thông tin khách hàng")}
                  bordered={false}
                  style={{ width: "100%", borderRadius: 3 }}
                >
                  <CustomerContainer close={false} />
                </Card>
              </div>
              <div style={{ marginBottom: 16, width: "100%" }}>
                <Card
                  title={renderTitleCard("Thông tin sản phẩm")}
                  bordered={false}
                  style={{ width: "100%", borderRadius: 3 }}
                >
                  <ProductContainer />
                </Card>
              </div>
              <div style={{ marginBottom: 16, width: "100%", marginTop: 20 }}>
                <PaymentHistoryContainer />
              </div>
            </Col>
            <Col span={6}>
              <div
                style={{ marginBottom: 16, width: "100%", paddingLeft: "5%" }}
              >
                <Card
                  title={renderTitleCard("Thông tin đơn hàng")}
                  bordered={true}
                  style={{ width: "100%", borderRadius: 3, border: "none" }}
                >
                  <MaintenanceCardInfoContainer />
                </Card>
              </div>
              <div
                style={{ marginBottom: 16, width: "100%", paddingLeft: "5%" }}
              >
                <Card
                  title={renderTitleCard("Lịch sử thay đổi trạng thái dịch vụ")}
                  bordered={true}
                  style={{ width: "100%", borderRadius: 3, border: "none" }}
                >
                  <StatusHistoryContainer />
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    maintenanceCardAdd: state.maintenanceCardAdd,
    user: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    maintenanceCardAddActionCreators: bindActionCreators(
      maintenanceCardAddActions,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaintenanceCardEdit);
