import React, { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, Row, Col } from "antd";
import "./style.css";
import TextArea from "antd/lib/input/TextArea";
import { LeftOutlined } from "@ant-design/icons";
import Axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as createAccessoryAction from '../../../actions/createAccessory';
import { connect } from "react-redux";
import AccessoryForm from "../../../components/AccessoryForm";

const CreateAccessory = (props) => {
    const [accessory, setAccessory] = useState({
        name: "",
        quantity: 0,
        image: null,
        unit: "",
        pricePerUnit: 0,
        description: ""
    });
    const { productCreateActionCreator } = props;
    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 16, marginTop: 30 }}>
                    <p><NavLink to='/admin/accessories'><LeftOutlined /> Danh sách linh kiện</NavLink></p>
                </div>
                <span style={{ marginLeft: 8, fontWeight: "bold", fontSize: 40 }}>
                    Thêm linh kiện
                </span>
                <AccessoryForm product={{}} productCreateActionCreator={productCreateActionCreator} />
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        productCreateActionCreator: bindActionCreators(createAccessoryAction, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(CreateAccessory);
