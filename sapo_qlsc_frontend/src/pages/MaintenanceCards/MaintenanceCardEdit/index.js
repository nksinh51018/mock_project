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
  const [hmac, setHmac] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleAddModal = () => {
    setIsModalVisible(false);
  };

  const componentRef2 = useRef();
  const exportQR = useReactToPrint({
    content: () => componentRef2.current,
  });


  useEffect(() => {
    setIsModalVisible(props.maintenanceCardAdd.isOpenQrCode)
    if(props.maintenanceCardAdd.hmac && props.maintenanceCardAdd.hmac !== '' ){
      setHmac(props.maintenanceCardAdd.hmac.replace("/","."));
    }
  }, [props.maintenanceCardAdd.isOpenQrCode]);


  useEffect(() => {
    const { maintenanceCardAddActionCreators } = props;
    const { actFetchMaintenanceCardById } = maintenanceCardAddActionCreators;
    actFetchMaintenanceCardById(props.match.params.id);
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
  const [payStatus, setPayStatus] = useState(0);

  useEffect(() => {
    setWorkStatus(props.maintenanceCardAdd.workStatus);
  }, [props.maintenanceCardAdd.workStatus]);

  useEffect(() => {
    setPayStatus(props.maintenanceCardAdd.payStatus);
  }, [props.maintenanceCardAdd.payStatus]);

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

  const showQRcode = ()=>{
    const { maintenanceCardAddActionCreators } = props;
    const { actGetHmac } = maintenanceCardAddActionCreators;
    actGetHmac(props.match.params.id)
    setIsModalVisible(true)
  }

  const componentRef = useRef();
  const exportFile = useReactToPrint({
    content: () => componentRef.current,
  });
  
  const setReturnDateSaga = ()=>{
    const { maintenanceCardAddActionCreators } = props;
    const { actSetReturnDate } = maintenanceCardAddActionCreators;
    actSetReturnDate();
  }

  return (
    <>
      <Modal
        visible={visible}
        title="Xóa khách hàng"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={deleteMaintenanceCard}
        cancelText={"Thoát"}
        okText={"Hủy"}
        footer={[
          <Button
            key={1}
            onClick={() => {
              setVisible(false);
            }}
          >
            Thoát
          </Button>,
          <Button danger type="primary" onClick={deleteMaintenanceCard}>
            Hủy
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn hủy phiếu ?</p>
      </Modal>
      <Modal
        title="Mã QR"
        visible={isModalVisible}
        onCancel={toggleAddModal}
        footer={[
          <Button key={1} onClick={toggleAddModal}>
            Quay lại
          </Button>,
          <Button key={2} onClick={exportQR}>
            In QR code
          </Button>,
        ]}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <QRCode value={encodeURI(`http://localhost:3000/user/${props.match.params.id}/${hmac}`)} size={300} />
        </div>
      </Modal>
      <div style={{ display: "none" }}>
        <ExportQrCode ref={componentRef2} url={encodeURI(`http://localhost:3000/user/${props.match.params.id}/${hmac}`)} />
      </div>
      <div style={{ width: "98%", marginRight: "1%", marginLeft: "1%" }}>
        <div style={{ marginBottom: 16, marginTop: 30 }}>
          <p>
            <NavLink to="/admin/maintenanceCards">
              <LeftOutlined /> Danh sách phiếu sửa chữa
            </NavLink>
          </p>
          <span style={{ fontWeight: "bold", fontSize: 35 }}>
            Thông tin phiếu sửa chữa
          </span>
          <div style={{ float: "right" }}>
            <div style={{ display: "inline" }}>
              {props.user.role !== 2 ? <Button type="button" onClick={showQRcode} style={{ height: 37,marginRight: 10 }}>
                Xem QR code
              </Button> : ""}
              {props.user.role !== 2 && returnDate === null ? (
                <>
                  {workStatus === 0 &&
                  (paymentHistories === undefined ||
                    paymentHistories.length === 0) ? (
                    <Button
                      style={{ height: 37, marginRight: 10 }}
                      type="ghost"
                      onClick={() => {
                        setVisible(true);
                      }}
                    >
                      <span>Hủy</span>
                    </Button>
                  ) : (
                    ""
                  )}

                  <Button
                    style={{ height: 37 }}
                    type="primary"
                    form="maintenanceCardInfo"
                    key="submit"
                    htmlType="submit"
                  >
                    <span>Lưu</span>
                  </Button>
                </>
              ) : (
                <></>
              )}

              {props.user.role !== 2 && returnDate !== null ? (
                <>
                  <Button type="button" onClick={exportFile}>
                    In hoá đơn
                  </Button>
                  <div style={{ display: "none" }}>
                    <ExportMaintenanceCards
                      ref={componentRef}
                      data={{ ...props.maintenanceCardAdd }}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
              {props.user.role === 2 && workStatus !== 2 ? (
                <>
                  <Button
                    style={{ height: 37 }}
                    type="primary"
                    onClick={() => {
                      const { maintenanceCardAddActionCreators } = props;
                      const {
                        actCompleteCard,
                      } = maintenanceCardAddActionCreators;
                      let maintenanceCardId = [];
                      maintenanceCardId.push(props.match.params.id);
                      actCompleteCard(maintenanceCardId);
                    }}
                  >
                    <span>Hoàn thành phiếu</span>
                  </Button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
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
            <div style={{ marginBottom: 16, width: "100%", paddingLeft: "5%" }}>
              <Card
                title={renderTitleCard("Thông tin đơn hàng")}
                bordered={true}
                style={{ width: "100%", borderRadius: 3, border: "none" }}
              >
                <MaintenanceCardInfoContainer />
              </Card>
            </div>
            <div style={{ marginBottom: 16, width: "100%", paddingLeft: "5%" }}>
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
