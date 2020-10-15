import { Col, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as maintenanceCardAddActions from '../../../actions/maintenanceCardAdd';
import { formatMonney } from '../../../utils/MonneyFormat';
import { formatPlate } from '../../../utils/PlatesNumberFormat';
import { formatDate } from '../../../utils/DateFormat';

class ExportMaintenanceCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: null,
            month: null,
            year: null
        }
    }
    isRender = () => {
        if (
            this.props.data !== undefined &&
            this.props.data.info.code !== null
        ) {
            return true;
        }
        else {
            return false;
        }
    }
    componentDidMount = () => {
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();
        this.setState({day});
        this.setState({month});
        this.setState({year});
    }

    // formatDate = (dateStr)=>{
    //     let date = new Date(dateStr);
    //     console.log(date);
    //     return dateStr;
    // }

    render() {
        console.log(this.props);
        return (
            <div style={{ marginTop: 30 }}>
                <h1 style={{ textAlign: "center" }}>Hóa đơn sửa chữa</h1>
                <Row style={{ marginTop: 30 }}>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <h2>Thông tin phiếu sửa chữa</h2>
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>Mã phiếu sửa chữa: </td>
                                    <td>{this.isRender() ? this.props.data.info.code.toUpperCase() : ""}</td>
                                </tr>
                                <tr>
                                    <td>Ngày tạo phiếu: </td>
                                    <td>{this.isRender() ? formatDate(this.props.data.createdDate) : ""}</td>
                                </tr>
                                <tr>
                                    <td>Ngày trả xe: </td>
                                    <td>{this.isRender() ? formatDate(this.props.data.info.returnDate) : ""}</td>
                                </tr>
                                <tr>
                                    <td>Bảo hành đến hết ngày:</td>
                                    <td style={{paddingLeft: "10px"}}> ...... / ...... / ............</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col span={3}></Col>
                </Row>
                <Row style={{ marginTop: 30 }}>
                    <Col span={3}></Col>
                    <Col span={11}>
                        <h2>Thông tin khách hàng</h2>
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>Mã khách hàng: </td>
                                    <td style={{paddingLeft: 10}}>{this.isRender() ? this.props.data.customerItem.code.toUpperCase() : ""}</td>
                                </tr>
                                <tr>
                                    <td>Họ và tên: </td>
                                    <td style={{paddingLeft: 10}}>{this.isRender() ? this.props.data.customerItem.name : ""}</td>
                                </tr>
                                <tr>
                                    <td>Số điện thoại: </td>
                                    <td style={{paddingLeft: 10}}>{this.isRender() ? this.props.data.customerItem.phoneNumber : ""}</td>
                                </tr>
                                <tr>
                                    <td>Email: </td>
                                    <td style={{paddingLeft: 10}}>{this.isRender() ? this.props.data.customerItem.email : ""}</td>
                                </tr>
                                <tr>
                                    <td>Địa chỉ: </td>
                                    <td style={{paddingLeft: 10}}>{this.isRender() && this.props.data.customerItem !== undefined ? this.props.data.customerItem.address : null}
                                - {this.isRender() && this.props.data.customerItem !== undefined && this.props.data.customerItem.ward !== undefined && this.props.data.customerItem.ward !== null ? this.props.data.customerItem.ward.name : null}
                                - {this.isRender() && this.props.data.customerItem !== undefined && this.props.data.customerItem.ward !== undefined && this.props.data.customerItem.ward !== null && this.props.data.customerItem.ward.district !== null ? this.props.data.customerItem.ward.district.name : null}
                                - {this.props.data.customerItem !== undefined && this.props.data.customerItem.ward !== undefined && this.props.data.customerItem.ward !== null && this.props.data.customerItem.ward.district !== null && this.props.data.customerItem.ward.district.province !== null ? this.props.data.customerItem.ward.district.province.name : null}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col span={7}>
                        <h2>Thông tin xe:</h2>
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td >Biển số xe: </td>
                                    <td style={{paddingLeft: 10}}>{this.isRender() ? formatPlate(this.props.data.info.platesNumber) : ""}</td>
                                </tr>
                                <tr>
                                    <td>Loại xe: </td>
                                    <td style={{paddingLeft: 10}}>{this.isRender() ? this.props.data.info.model : ""}</td>
                                </tr>
                                <tr>
                                    <td>Màu xe: </td>
                                    <td style={{paddingLeft: 10}}>{this.isRender() ? this.props.data.info.color : ""}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col span={3}></Col>
                </Row>
                <Row style={{ marginTop: 30 }}>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <h2>Sản phẩm</h2>
                        <table width="100%" border="1">
                            <thead>
                                <tr>
                                    <td style={{textAlign: "center", fontWeight: "bold"}}>Mã sản phẩm</td>
                                    <td style={{textAlign: "center", fontWeight: "bold"}}>Tên sản phẩm</td>
                                    <td style={{textAlign: "center", fontWeight: "bold"}}>Số lượng</td>
                                    <td style={{textAlign: "center", fontWeight: "bold"}}>Giá</td>
                                    <td style={{textAlign: "center", fontWeight: "bold"}}>Thành tiền</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.isRender() ? this.props.data.products.map((product,index) => (
                                    <tr key={index}>
                                        <td style={{textAlign: "center"}}>{product.code.toUpperCase()}</td>
                                        <td style={{textAlign: "center"}}>{product.name}</td>
                                        <td style={{textAlign: "center"}}>{product.amount}</td>
                                        <td style={{textAlign: "center"}}>{formatMonney(product.pricePerUnit)} đ</td>
                                        <td style={{textAlign: "center"}}>{formatMonney(product.pricePerUnit * product.amount)} đ</td>
                                    </tr>
                                )) : ""}
                            </tbody>
                        </table>
                        <div style={{ textAlign: "right" }}>Tổng tiền: {this.isRender() ? formatMonney(this.props.data.price) + " đ" : ""}</div>
                    </Col>
                    <Col span={3}></Col>
                </Row>
                <Row>
                    <Col span={3}></Col>
                    <Col span={9}>
                        <h2>Thông tin nhân viên</h2>
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>Nhân viên sửa chữa: </td>
                                    <td>{this.isRender() && this.props.data.repairman.user !== null && this.props.data.repairman.user !== undefined ? this.props.data.repairman.user.fullName : ""}</td>
                                </tr>
                                <tr>
                                    <td>Nhân viên điều phối: </td>
                                    <td>{this.isRender() ? this.props.data.coordinator.fullName : ""}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                    <Col span={3}></Col>
                </Row>
                <Row style={{ marginTop: 30 }}>
                    <Col span={3}></Col>
                    <Col span={9}>
                        <h2>Ký xác nhận</h2>
                    </Col>
                    <Col span={9}>
                        <div>Hà Nội, ngày {this.state.day}, tháng {this.state.month}, năm {this.state.year}</div>
                    </Col>
                    <Col span={3}></Col>
                </Row>
                <Row>
                    <Col span={3}></Col>
                    <Col span={9}>
                        <b>Người tạo phiếu</b>
                    </Col>
                    <Col span={9}>
                        <b>Chủ xe</b>
                    </Col>
                    <Col span={3}></Col>
                </Row>
            </div>
        );
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(ExportMaintenanceCards);

export default ExportMaintenanceCards;