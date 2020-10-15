import { LeftOutlined } from '@ant-design/icons';
import { Form, Button, Col, Input, InputNumber, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Axios from 'axios';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as getAccessoryAction from '../../../actions/accessory';
import * as updateAccessoryAction from '../../../actions/updateAccessory';
import { updateAccessory } from '../../../apis/accessory';
import AccessoryForm from '../../../components/AccessoryForm';
import { formatDate } from '../../../utils/DateFormat';

const UpdateAccessory = (props) => {
    const { id } = useParams("id");
    const [rendering, setRendering] = useState(0);
    const [product, setProduct] = useState({
        name: "",
        quantity: 0,
        image: null,
        unit: "",
        pricePerUnit: 0,
        description: ""
    });
    const { productActionCreator } = props;
    const { actionGetAccessory } = productActionCreator;
    useEffect(() => {
        actionGetAccessory(id);
    }, [actionGetAccessory, id]);
    useEffect(() => {
        setProduct(props.accessory);
    }, [props.accessory]);
    const { productUpdateActionCreator } = props;

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 16, marginTop: 30 }}>
                    <p><NavLink to='/admin/accessories'><LeftOutlined /> Danh sách linh kiện</NavLink></p>
                </div>
                <span style={{ marginLeft: 8, fontWeight: "bold", fontSize: 40 }}>
                    Thông tin chi tiết
                </span>
                <div style={{ background: "#fff", marginBottom: "16px", padding: "25px" }}>
                    <Row>
                        <Col span={2}>
                            Ngày tạo:
                        </Col>
                        <Col span={4}>
                            {formatDate(product.createdDate)}
                        </Col>
                        <Col span={2}>
                            Ngày sửa:
                        </Col>
                        <Col span={4}>
                            {formatDate(product.modifiedDate)}
                        </Col>
                    </Row>
                </div>
                <AccessoryForm product={product} id={id} productUpdateActionCreator={productUpdateActionCreator} />
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        accessory: state.accessoryReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        productActionCreator: bindActionCreators(getAccessoryAction, dispatch),
        productUpdateActionCreator: bindActionCreators(updateAccessoryAction, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccessory);