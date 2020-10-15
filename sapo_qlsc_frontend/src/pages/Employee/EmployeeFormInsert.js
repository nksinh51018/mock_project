import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router"
import { Button, Row, Col, Card, Tabs, Input, Form } from 'antd';
import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as employeeActions from '../../actions/employee';
import PropTypes from 'prop-types';
import { Select } from 'antd';
const { Option } = Select;



const EmployeeForm = (props) => {
    const history = useHistory();
    const [user, setUser] = useState({
        id: null,
        code: null,
        fullname: null,
        address: null,
        phoneNumber: null,
        email: null,
        password: null,
        role: null
    })
    const { employeeActionsCreator } = props;
    const { userItem } = props;
    const { actCreateEmployee } = employeeActionsCreator;

    const { actCreateEmployeeSuccess } = employeeActionsCreator;
    console.log(props);
    useEffect(()=>{
        console.log(userItem.id);
    })
    const onFinish = (values) => {
        console.log('Success:', values);
        actCreateEmployee(values);
        
    };

    const onFinishFailed = (errorInfo) => {

    };
    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    return (
        <>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                name="basic"
                fields={
                    [

                        {
                            name: "fullName",
                            value: user.fullname
                        },
                        {
                            name: 'code'
                            , value: user.code
                        },
                        {
                            name: 'phoneNumber',
                            value: user.phoneNumber
                        },
                        {
                            name: 'address',
                            value: user.address
                        },
                        {
                            name: 'email',
                            value: user.email
                        },
                        {
                            name: 'password',
                            value: user.password
                        },
                        {
                            name: 'role',
                            value: user.role
                        }
                    ]
                }
            >
                <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                    <div style={{ marginBottom: 16, marginTop: -30 }}>
                        <p>
                            <NavLink to="/admin/employees"><LeftOutlined />Danh sách nhân viên</NavLink>
                        </p>
                        <span style={{ fontWeight: 'bold', fontSize: 28 }}>
                            Thêm nhân viên
                </span>
                        
                    </div>

                    <div className='customerInfo'>
                        <Row >
                            <Col span={18} >
                                <div  >
                                    <Card title='Thông tin nhân viên' style={{ marginBottom: 16, width: '100%' }}>

                                        <Col span={24}>

                                            <Form.Item
                                            style={{ width: '100%' }}
                                                label='Tên nhân viên'
                                                name="fullName"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
                                                validateTrigger={["onBlur"]}
                                            >
                                                <Input name="fullName" placeholder="Nhập tên nhân viên" />
                                            </Form.Item>
                                        </Col>

                                        <Row>
                                        <Col span={12} style={{width:'98%'}}>
                                        <Form.Item style={{width:'95%'}}
                                                
                                                    label='Mã nhân viên'
                                                    name="code"
                                                
                                                >
                                                    <Input name="code" placeholder="Mã nhân viên sẽ được tạo tự động" />
                                                
                                                </Form.Item>
                                            </Col>
                                            
                                            <Col span={12} style={{width:'98%'}}>
                                                <Form.Item
                                                    label='Số điện thoại'
                                                    name="phoneNumber"
                                                    validateTrigger={["onBlur"]}
                                                    rules={
                                                        [
                                                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                                            {
                                                                pattern: '(03|07|08|09|01[2|6|8|9])+([0-9]{8})',
                                                                max: 10,
                                                                message: 'Vui lòng nhập đúng định dạng số điện thoại!',
                                                            }
                                                        ]
                                                    }
                                                >
                                                    <Input name="phoneNumber" placeholder="Nhập số điện thoại" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col span={24}>
                                                <Form.Item
                                                    label='Địa chỉ'
                                                    name="address"
                                                >
                                                    <Input name="address" placeholder="Nhập địa chỉ nhân viên" />
                                                </Form.Item>
                                            </Col>

                                        </Row>


                                    </Card>
                                </div>
                            </Col>
                           
                            <Col span={6}>
                                <Card style={{ marginBottom: 16, width: '100%', marginLeft: '5%' }} title='Tài khoản & mật khẩu'>
                                    {/* <div style={{marginLeft:'30px',marginRight:'30px'}}> */}
                                    <Row>
                                        <Form.Item style={{ width: '100%' }}
                                            label='Email nhân viên'
                                            name="email"
                                            validateTrigger={["onBlur"]}
                                            rules={
                                                [
                                                    { required: true, message: 'Vui lòng nhập Email!' },
                                                    {
                                                        pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                                                        message: "Email phải chứa @"
                                                    }
                                                ]}

                                        >
                                            <Input name="email" placeholder="Nhập email nhân viên" />
                                        </Form.Item>
                                    </Row>
                                    <Row>
                                        <Form.Item style={{ width: '100%' }}
                                            label='Mật khẩu'
                                            name="password"
                                            rules={[
                                                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                                {min:6,message:"Mật khẩu phải nhiều hơn 6 ký tự"}
                                            ]}
                                            validateTrigger={["onBlur"]}
                                        >
                                            <Input.Password name="password" placeholder="Nhập mật khẩu" />
                                        </Form.Item>

                                    </Row>
                                    <Row>

                                        <Col span={24}>
                                            <Form.Item style={{ width: '100%' }}
                                                label='Vai trò nhân viên'
                                                name="role"
                                                rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                                                validateTrigger={["onBlur"]}
                                            >

                                                <Select

                                                    showSearch
                                                    style={{ width: '100%' }}
                                                    placeholder="Chọn vai trò nhân viên"
                                                    optionFilterProp="children"
                                                    onChange={onChange}
                                                    onFocus={onFocus}
                                                    onBlur={onBlur}
                                                    onSearch={onSearch}
                                                    filterOption={(input, option) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    <Option value="3">Người quản lý</Option>
                                                    <Option value="1">Nhân viên điều phối</Option>
                                                    <Option value="2">Nhân viên sửa chữa</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    {/* </div> */}
                                    
                                </Card>
                            </Col>
                            
                        </Row>
             
                    </div>
             
                </div>
              
                <div style={{ float: 'right'}}>
                            <div style={{ display: 'inline' }}>
                                <Button htmlType="submit" style={{ height: 40,width:120,fontWeight:600  }} type="primary" >
                                    <span>Lưu</span>
                                </Button>
                            </div>
                             
                        </div>
            </Form>
        </>
    );
}
EmployeeForm.propTypes = {
    createEmployee: PropTypes.shape({
        employeeActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {
        userItem: state.employeeReducer.userItem
    }
};

const mapDispatchToProps = dispatch => {
    return {
        employeeActionsCreator: bindActionCreators(employeeActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(EmployeeForm));






