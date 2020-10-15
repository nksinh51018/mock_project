import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Input, Form, Button, Cascader, Empty } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import * as customerActions from '../../actions/customer';
import * as addressActions from '../../actions/address';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

const UpdateCustomer = (props) => {

    const [loadDistrict, setLoadDistrict] = useState(false);
    const [loadWard, setLoadWard] = useState(false);
    const [valueWard, setValueWard] = useState(null);
    const [valueDistrict, setValueDistrict] = useState(null);
    const [valueProvine, setValueProvine] = useState(null);
    const [loadData, setLoadData] = useState(true);
    const [load, setLoad] = useState(true);
    const [requiredWard, setRequiredWard] = useState(false);
    const [sizeDistrict, setSizeDistrict] = useState(0);

    const [formRef] = Form.useForm();

    const { TextArea } = Input;

    const { addressActionsCreators, customerActionCreators } = props;
    const { actUpdateCustomer, actGetCustomerById } = customerActionCreators;
    const { actGetListProvinces, actGetWardOfDistrict } = addressActionsCreators;
    const { listProvinces, listWards, customerItem } = props;

    const { txtcode, txtName, txtphoneNumber, txtemail, txtaddress, txtdescription, txtProvineName, txtDistrictName, txtDistrictCode, txtWardName, txtWardCode } = customerItem

    useEffect(() => {
        if (load) {
            if (txtDistrictName !== undefined) {
                setValueDistrict(txtDistrictName)
                setValueProvine(txtProvineName)
                setValueWard(txtWardName)
                if (txtDistrictCode !== null) {
                    actGetWardOfDistrict(txtDistrictCode);
                    setLoadWard(true)
                    setRequiredWard(true)
                }
                //console.log(valueDistrict);
            } else {
                setValueDistrict(null)
                setValueProvine(null)
                setValueWard(null)
            }
        }
        if (loadData) {
            if (txtDistrictName !== undefined) {
                setValueDistrict(txtDistrictName)
                setValueProvine(txtProvineName)
                setValueWard(txtWardName)
                setLoad(true)
                // if (txtDistrictCode !== null) {
                //     actGetWardOfDistrict(txtDistrictCode);
                //     setLoadWard(true)
                //     setRequiredWard(true)
                // }
            }
            actGetCustomerById(props.match.params.id);
            setLoadData(false)
        }

    }, [txtDistrictCode, actGetWardOfDistrict, txtProvineName, valueDistrict, valueProvine, valueWard, txtWardName, actGetCustomerById, loadData, props.match.params.id, txtDistrictName, load]);

    const getAddress = () => {

        actGetListProvinces();
        setLoadDistrict(true);

    }

    const mapDistrict = () => {
        let data = [];
        if (loadDistrict) {
            if (listProvinces.length > 0) {
                data = listProvinces.map((provinces, index) => {
                    return {
                        ...provinces,
                        value: provinces.code,
                        label: provinces.province.name + ' - ' + provinces.name,
                        //key: index
                    }
                })
            }
        }

        return data;
    }

    const onFinish = values => {

        //console.log(values.ward.length);
        //console.log(values);
        //TH k chon ward
        if (values.ward.length === 0) {
            actUpdateCustomer(props.match.params.id, values)
        }
        if (values.ward.length === 1) {
            if (values.ward[0] === txtWardName) {
                values.ward[0] = txtWardCode;
                actUpdateCustomer(props.match.params.id, values)
            } else {
                actUpdateCustomer(props.match.params.id, values)
            }
            //actUpdateCustomer(props.match.params.id, values)
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const onChangeOptions = (value, selectedOptions) => {
        setLoad(false)
        //console.log(value.length);
        //console.log(selectedOptions[0].province.name);
        if (value.length === 0) {
            setRequiredWard(false)
            setLoad(false)
            setValueDistrict(null)
            setValueProvine(null)
            setValueWard(null)
        }
        if (value.length > 0) {
            setSizeDistrict(1)
            setValueProvine(selectedOptions[0].province.name)
            //setValueProvine(value)
            setValueDistrict(selectedOptions[0].name)
            setRequiredWard(true)
        } else {
            setRequiredWard(false);
        }

        if (value !== undefined && value.length > 0) {
            actGetWardOfDistrict(value);
            setLoadWard(true)
            setValueWard(null)
        } else {
            //console.log('stsrf');
            setValueWard(null)
        }

    }

    //console.log(valueWard);
    const onChangeOptionWards = (value, selectedOptions) => {
        //console.log(value.length);
        console.log(value);
        if(selectedOptions !== null){
            //setValueWard(selectedOptions[0].name)
        }
        if (value.length === 0) {
            console.log('sdsd');
            setLoad(false)
            setValueWard(null)
        }
        if (sizeDistrict === 0) {
            setRequiredWard(true)
        }
    }

    const mapWards = () => {
        //console.log(txtDistrictCode);
        // if (txtDistrictCode !== undefined && txtDistrictCode !== null) {
        //     if (firstLoadWard === true) {
        //         actGetWardOfDistrict(txtDistrictCode);
        //         setFirstLoadWard(false)
        //     }
        // }
        //console.log(listWards);
        let data = [];
        if (loadWard) {
            if (listWards.length > 0) {
                data = listWards.map((ward, index) => {
                    return {
                        ...ward,
                        value: ward.code,
                        label: ward.name
                    }
                })
            }
        }
        return data;
    }

    return (
        <>
            <div style={{ width: '98%', marginRight: '1%', marginLeft: '1%' }}>
                <div style={{ marginBottom: 16 }}>
                    <p style={{ marginTop: 15, marginBottom: 8 }}><NavLink to='/admin/customers'><LeftOutlined /> Danh sách khách hàng</NavLink></p>
                    <span style={{ fontWeight: 'bold', fontSize: 28 }}>
                        Cập nhật khách hàng
                    </span>
                </div>
                <div className='customerInfo'>
                    <Form
                        //ref={formRef}
                        name={'addCustomer'}
                        form={formRef}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        fields={
                            [
                                {
                                    name: "txtcode",
                                    value: txtcode
                                },
                                {
                                    name: "txtName",
                                    value: txtName
                                },
                                {
                                    name: "txtphoneNumber",
                                    value: txtphoneNumber
                                },
                                {
                                    name: "txtemail",
                                    value: txtemail
                                },
                                {
                                    name: "txtaddress",
                                    value: txtaddress
                                },
                                {
                                    name: "txtdescription",
                                    value: txtdescription
                                },
                                {
                                    name: "ward",
                                    value: (valueWard === null) ? [] : [valueWard]
                                },
                                {
                                    name: "district",
                                    value: (valueDistrict === null) ? [] : [valueProvine + ' - ' + valueDistrict]
                                }
                            ]
                        }
                    >

                        <Row>
                            <Col span={16}>
                                <div>
                                    <Card>
                                        <Row>
                                            <Col span={12}>
                                                <Form.Item
                                                    label='Tên khách hàng'
                                                    name="txtName"
                                                    rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
                                                >
                                                    <Input name="txtName" placeholder="Nhập tên khách hàng" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12} style={{ paddingLeft: '2%' }}>
                                                <Form.Item
                                                    label='Mã khách hàng'
                                                    name="txtcode"
                                                >
                                                    <Input name="txtCode" placeholder="Nhập mã khách hàng" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                                <Form.Item
                                                    label='Số điện thoại'
                                                    name="txtphoneNumber"
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
                                                    validateTrigger={["onBlur"]}
                                                >
                                                    <Input name="txtphoneNumber" placeholder="Nhập số điện thoại khách hàng" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12} style={{ paddingLeft: '2%' }}>
                                                <Form.Item
                                                    label='Email'
                                                    name="txtemail"
                                                    rules={
                                                        [                  
                                                            {
                                                                pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                                                                message: "Email không được phép chứa ký tự đặc biệt"
                                                            }
                                                        ]}
                                                        validateTrigger={["onBlur"]}
                                                >
                                                    <Input name="txtemail" placeholder="Nhập địa chỉ email" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Card>
                                    <Card style={{ marginTop: '3%' }}>
                                        <h3>Thông tin địa chỉ</h3>
                                        <Row>
                                            <Col span={12}>
                                                <Form.Item
                                                    label='Địa chỉ'
                                                    name="txtaddress"
                                                    rules={[{ required: false, message: 'Vui lòng nhập địa chỉ!' }]}
                                                >
                                                    <Input name="txtaddress" placeholder="Nhập địa chỉ" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12} style={{ paddingLeft: '2%' }}>
                                                <Form.Item
                                                    label='Khu vực'
                                                    name="district"
                                                    rules={[{ required: false, message: 'Vui lòng chọn Tỉnh thành - quận huyện!' }]}
                                                >
                                                    <Cascader notFoundContent={"Không có dữ liệu"} locale={{ emptyText: <Empty description="Không có dữ liệu" image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty> }} showSearch={true} style={{ width: '100%' }} onClick={() => getAddress()} options={mapDistrict()} onChange={onChangeOptions} placeholder={valueDistrict === null ? "Chọn Tỉnh thành - quận huyện" : ''} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                            </Col>
                                            <Col span={12} style={{ paddingLeft: '2%' }}>
                                                <Form.Item
                                                    label='Phường xã'
                                                    name="ward"
                                                    rules={[{ required: requiredWard, message: 'Vui lòng chọn phường xã!' }]}
                                                >
                                                    <Cascader notFoundContent={"Không có dữ liệu"} locale={{ emptyText: <Empty description="Không có dữ liệu" image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty> }} style={{ width: '100%' }} options={valueWard === null ? requiredWard === false ? '' : mapWards() : mapWards()} onChange={onChangeOptionWards} placeholder={(valueWard === undefined || valueWard === null) ? "Chọn Phường xã" : ''} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            </Col>
                            <Col style={{ paddingLeft: '2%' }} span={8}>
                                <Card style={{ minHeight: 231 }}>
                                    <h4>Thông tin khác</h4>
                                    <Form.Item
                                        label='Mô tả'
                                        name="txtdescription"
                                        rules={[{ required: false, message: 'Vui lòng nhập mô tả!' }]}
                                    >
                                        <TextArea rows={3} name="txtdescription" />
                                    </Form.Item>
                                </Card>
                            </Col>
                        </Row>
                        <div style={{ marginTop: 30 }}>
                            {/* <hr /> */}
                            <Form.Item style={{ float: "right" }}>
                                <Button type="primary" htmlType="submit" style={{ width: 120, height: 40 }}>
                                    Lưu
                                </Button>
                                {/* <Button htmlType="button" onClick={onReset} style={{}}>
                                    Đặt lại
                                </Button> */}
                            </Form.Item>
                        </div>
                    </Form>
                </div>

            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        listCustomer: state.customerReducer.customers,
        customerItem: state.customerReducer.customerItem,
        listProvinces: state.addressReducer.provinces,
        listWards: state.addressReducer.wards
    }
};

const mapDispatchToProps = dispatch => {
    return {
        customerActionCreators: bindActionCreators(customerActions, dispatch),
        addressActionsCreators: bindActionCreators(addressActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCustomer);