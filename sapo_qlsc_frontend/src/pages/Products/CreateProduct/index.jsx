import { LeftOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as createAccessoryAction from '../../../actions/createAccessory';
import * as createServiceAction from '../../../actions/createService';
import AccessoryForm from '../../../components/AccessoryForm';
import ServiceForm from '../../../components/ServiceForm';

const CreateProduct = (props) => {
    const [showData, setShowData] = useState("1");
    const { Option } = Select;
    const handleShowDataChange = (value) => {
        setShowData(value);
    }
    const renderForm = () => {
        switch (showData) {
            case "1":
                return <AccessoryForm product={{}} createAccessoryActionCreator={props.createAccessoryActionCreator} />
            case "2":
                return <ServiceForm product={{}} createServiceActionCreator={props.createServiceActionCreator} />
        }
    }
    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 16, marginTop: 30 }}>
                    <p><NavLink to='/admin/products'><LeftOutlined /> Danh sách sản phẩm</NavLink></p>
                </div>
                <span style={{ marginLeft: 8, fontWeight: "bold", fontSize: 40 }}>
                    Thêm sản phẩm
                </span>
                <div style={{ marginBottom: "10px", marginTop: "20px" }}>
                    <span style={{ marginRight: 10 }}>Loại sản phẩm</span>
                    <Select style={{ width: 131 }} defaultValue="1" onChange={handleShowDataChange}>
                        <Option value="1">Linh kiện</Option>
                        <Option value="2">Dịch vụ</Option>
                    </Select>
                </div>
                {renderForm()}
            </div>
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        createAccessoryActionCreator: bindActionCreators(createAccessoryAction, dispatch),
        createServiceActionCreator: bindActionCreators(createServiceAction, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(CreateProduct);