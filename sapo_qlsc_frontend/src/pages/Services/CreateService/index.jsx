import { LeftOutlined } from '@ant-design/icons';
import { Form, Col, Input, Row, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ServiceForm from '../../../components/ServiceForm';
import * as createServiceAction from '../../../actions/createService';
import { connect } from 'react-redux';

const CreateService = (props) => {
    const { productCreateActionCreator } = props;
    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 16, marginTop: 30 }}>
                    <p><NavLink to='/admin/services'><LeftOutlined /> Danh sách dịch vụ</NavLink></p>
                </div>
                <span style={{ marginLeft: 8, fontWeight: "bold", fontSize: 40 }}>
                    Thêm dịch vụ
                </span>
                <ServiceForm product={{}} productCreateActionCreator={productCreateActionCreator} />
            </div>
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return { productCreateActionCreator: bindActionCreators(createServiceAction, dispatch) };
}

export default connect(null, mapDispatchToProps)(CreateService);