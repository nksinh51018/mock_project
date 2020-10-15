import React,{useEffect} from 'react';
import { Button, Row, Col, Card } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as maintenanceCardAddActions from '../../../actions/maintenanceCardAdd'
import CustomerContainer from '../../../container/MaintenanceCardAdd/CustomerContainer';
import WarrantyCardInfo from '../../../container/MaintenanceCardAdd/MaintenanceCardInfoContainer';
import ProductContainer from '../../../container/MaintenanceCardAdd/ProductContainer';
import history from '../../../history'
const AddMaintenanceCards = (props) => {

    useEffect(() => {
        const {maintenanceCardAddActionCreators} = props;
        const {actResetStore} = maintenanceCardAddActionCreators;
        actResetStore()
    }, []);

    useEffect(() => {
        if(!props.maintenanceCardAdd.check){
            if(props.maintenanceCardAdd.id !== 0){
                history.push("/admin/maintenanceCards/"+props.maintenanceCardAdd.id)
            }
        }
    }, [props.maintenanceCardAdd.id,props.maintenanceCardAdd.check]);

    const renderTitleCard = (text) => {
        return (
            <>
                <div>{text}</div>
            </>
        )
    }

    return (
        <>
            <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                <div style={{ marginBottom: 16, marginTop: 30 }}>
                    <p><NavLink to='/admin/maintenanceCards'><LeftOutlined /> Danh sách phiếu sửa chữa</NavLink></p>
                    <span style={{ fontWeight: 'bold', fontSize: 35 }}>
                        Tạo phiếu sửa chữa
                    </span>
                    <div style={{ float: 'right' }}>
                        <div style={{ display: 'inline' }}>
                            <Button style={{ height: 37}} type="primary" form="maintenanceCardInfo" key="submit" htmlType="submit" >
                                <span>Tạo phiếu sửa chữa</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <Row>
                    <Col span={18}>
                        <div style={{ marginBottom: 16, width: '100%' }}>
                            <Card title={renderTitleCard("Thông tin khách hàng")} bordered={false} style={{ width: '100%', borderRadius: 3 }}>
                                <CustomerContainer close={true} />
                            </Card>
                        </div>
                        <div style={{ marginBottom: 16, width: '100%' }}>
                            <Card title={renderTitleCard("Thông tin sản phẩm")} bordered={false} style={{ width: '100%', borderRadius: 3 }}>
                                <ProductContainer />
                            </Card>

                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ marginBottom: 16, width: '100%',paddingLeft: '5%'}}>
                            <Card title={renderTitleCard("Thông tin đơn hàng")} bordered={true} style={{ width: '100%', borderRadius: 3, border: 'none' }}>
                                <WarrantyCardInfo />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}


const mapStateToProps = (state) => {
    return {
        maintenanceCardAdd: state.maintenanceCardAdd,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        maintenanceCardAddActionCreators: bindActionCreators(maintenanceCardAddActions, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddMaintenanceCards);