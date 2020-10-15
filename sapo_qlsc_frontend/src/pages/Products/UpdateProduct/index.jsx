import { LeftOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import AccessoryForm from '../../../components/AccessoryForm';
import ServiceForm from '../../../components/ServiceForm';
import * as getProductAction from '../../../actions/product';
import * as updateAccessoryAction from '../../../actions/updateAccessory';
import * as updateServiceAction from '../../../actions/updateService';
import { connect } from 'react-redux';

const UpdateProduct = (props) => {
    const { id } = useParams();
    const [showData, setShowData] = useState("");
    const { Option } = Select;
    const handleShowDataChange = (value) => {
        setShowData(value);
    }
    const { actionGetProduct } = props.getProductActionCreator;
    useEffect(() => {
        actionGetProduct(id);
        if (props.product.type === 1) {
            setShowData("1");
        }
        else {
            setShowData("2");
        }
    }, [showData, actionGetProduct, id, props.product.id, props.product.image]);
    const renderForm = () => {
        switch (showData) {
            case "1":
                return <AccessoryForm id={id} product={props.product} getProductActionCreator={props.getProductActionCreator} updateAccessoryActionCreator={props.updateAccessoryActionCreator} />
            case "2":
                return <ServiceForm id={id} product={props.product} getProductActionCreator={props.getProductActionCreator} updateServiceActionCreator={props.updateServiceActionCreator} />
        }
    }
    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 16, marginTop: 30 }}>
                    <p><NavLink to='/admin/products'><LeftOutlined /> Danh sách linh kiện</NavLink></p>
                </div>
                <span style={{ marginLeft: 8, fontWeight: "bold", fontSize: 40 }}>
                    Thông tin chi tiết
                </span>
                {renderForm()}
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        product: state.productReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProductActionCreator: bindActionCreators(getProductAction, dispatch),
        updateAccessoryActionCreator: bindActionCreators(updateAccessoryAction, dispatch),
        updateServiceActionCreator: bindActionCreators(updateServiceAction, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);