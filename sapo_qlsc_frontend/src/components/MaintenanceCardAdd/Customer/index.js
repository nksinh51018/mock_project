import { CloseOutlined, CodeOutlined, PhoneOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Col, Input, Row, Form, Modal, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Customer = (props) => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 },
    };
    // const [state, setstate] = useState({
    //     customer:{},
    //     dataAutocomplete:[],
    //     customerPage:0,
    //     totalCustomerPage: 0,
    //     isShowAuto: false,
    //     isShowAdd: false,
    //     error: false,
    // });
    const [customer, setCustomer] = useState({});
    const [dataAutocomplete, setDataAutocomplete] = useState([]);
    const [customerPage, setCustomerPage] = useState(0);
    const [totalCustomerPage, setTotalCustomerPage] = useState(0);
    const [isShowAuto, setIsShowAuto] = useState(false);
    const [isShowAdd, setIsShowAdd] = useState(false);
    const [error, setError] = useState(false);
    let search = React.createRef();
    useEffect(() => {
        setIsShowAdd(props.maintenanceCardAdd.ui.customerModal)
    }, [props.maintenanceCardAdd.ui]);
    useEffect(() => {
        setDataAutocomplete(props.maintenanceCardAdd.customers)
    }, [props.maintenanceCardAdd.customers]);
    useEffect(() => {
        setCustomerPage(props.maintenanceCardAdd.customerPage)
    }, [props.maintenanceCardAdd.customerPage]);
    useEffect(() => {
        setTotalCustomerPage(props.maintenanceCardAdd.totalCustomerPage)
    }, [props.maintenanceCardAdd.totalCustomerPage]);
    useEffect(() => {
        setError(props.maintenanceCardAdd.error.customerError)
    }, [props.maintenanceCardAdd.error.customerError]);
    useEffect(() => {
        setCustomer(props.maintenanceCardAdd.customerItem)
    }, [props.maintenanceCardAdd.customerItem]);

    const onFinish = (values) => {
        setIsShowAuto(false)
        const { maintenanceCardAddActionCreators } = props;
        const { actCreateCustomer } = maintenanceCardAddActionCreators;
        let tmp = {
            "name": values.txtName,
            "phoneNumber": values.txtPhone,
            "platesNumber": values.txtPlates,
            "code": values.txtMa,
        }
        actCreateCustomer(tmp)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const toggleAddModal = () => {
        setIsShowAuto(false)
        setIsShowAdd(!isShowAdd);
    }

    const renderOptions = () => {
        let result = [];
        result = dataAutocomplete.map((item, index) => {
            return (
                renderItem(item)
            )
        })
        result.unshift({
            value: '',
            label: (
                <div>
                    <PlusOutlined />
                    <span>Thêm khách hàng</span>
                </div>
            ),
        })
        return [
            {
                label: <span>Thông tin khách hàng</span>,
                options: result,
            },
        ]
    }

    const renderItem = (customer) => {
        return {
            value: customer.id.toString(),
            label: (
                <div>
                    <div>
                        <span>{customer.name}</span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <CodeOutlined />
                            <span style={{ paddingLeft: 5 }}>{customer.code.toUpperCase()}</span>
                        </div>
                        <div>
                            <PhoneOutlined />
                            <span style={{ paddingLeft: 5 }}>{customer.phoneNumber}</span>
                        </div>
                    </div>


                </div>
            ),
        };
    };

    const selectItem = (value) => {
        if (value === '') {
            console.log(123);
            toggleAddModal();
        }
        else {
            const { maintenanceCardAddActionCreators } = props;
            const { actChooseCustomer } = maintenanceCardAddActionCreators;
            actChooseCustomer(value)
        }
    }

    const closeItem = () => {
        const { maintenanceCardAddActionCreators } = props;
        const { actClearCustomer } = maintenanceCardAddActionCreators;
        actClearCustomer()
        setIsShowAuto(false)
    }

    const focusInput = () => {
        setIsShowAuto(true)
        const { maintenanceCardAddActionCreators } = props;
        const { actSearchCustomer } = maintenanceCardAddActionCreators;
        if (search.current.value === undefined) {
            search.current.value = ''
        }
        actSearchCustomer(search.current.value, 1, 5)
    }
    const blurInput = () => {
        setIsShowAuto(false)
    }

    const handScrollAutoComplete = (e) => {
        const isEndOfList = e.target.scrollTop + e.target.clientHeight;
        if (isEndOfList > e.target.scrollHeight - 50) {
            if (totalCustomerPage > customerPage) {
                const { maintenanceCardAddActionCreators } = props;
                const { actUpdateListCustomer } = maintenanceCardAddActionCreators;
                actUpdateListCustomer(search.current.value)
            }
        }
    }

    const handleChangeSearch = (e) => {
        const { maintenanceCardAddActionCreators } = props;
        const { actSearchCustomer } = maintenanceCardAddActionCreators;
        search.current.value = e.target.value
        actSearchCustomer(e.target.value, 1, 5)
    }

    return (
        <>
            <Row style={{ minHeight: 50 }}>
                {customer === undefined || customer.id === undefined ? (
                    <AutoComplete
                        dropdownClassName="certain-category-search-dropdown"
                        dropdownMatchSelectWidth={500}
                        style={{ width: '100%' }}
                        options={renderOptions()}
                        allowClear={true}
                        onSelect={selectItem}
                        onBlur={blurInput}
                        onFocus={focusInput}
                        open={isShowAuto}
                        onPopupScroll={handScrollAutoComplete}
                        ref={search}
                        className={error ? 'ant-form-item-has-error' : ''}
                    >
                        <Input size="large" placeholder="Tìm kiếm khách hàng" onChange={handleChangeSearch} />
                    </AutoComplete>
                ) : <Row style={{ width: '100%' }}>
                        <Col span={1}>
                            <UserOutlined style={{ fontSize: 35, paddingTop: 5 }} />
                        </Col>
                        <Col span={23}>
                            {props.user.role !== 2 ?
                                (<><span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => window.open(`/admin/customers/${customer.id}`, "_blank")}>{customer.name}</span></>)
                                : <><span>{customer.name}</span></>
                            }
                            {props.close === true ? (
                                <CloseOutlined style={{marginLeft: 50}} onClick={closeItem} />
                            ) : (<></>)}
                            <br />
                            <span>{customer.phoneNumber}</span>
                            
                        </Col>
                    </Row>}
                <Modal
                    title="Thêm mới khách hàng"
                    centered
                    visible={isShowAdd}
                    onOk={toggleAddModal}
                    onCancel={toggleAddModal}
                    footer={[
                        <Button key={1} onClick={toggleAddModal}>
                            Quay lại
                                        </Button>,
                        <Button form="customer" key="submit" htmlType="submit" type="primary" >
                            Lưu
                                        </Button>
                    ]}
                >
                    <Form
                        {...layout}
                        name="customer"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Tên khách hàng: "
                            name='txtName'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên khách hàng!',
                                },
                                {
                                    max: 99,
                                    message: 'Tên khách hàng quá dài',
                                },
                            ]}
                            validateTrigger={["onBlur"]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại: "
                            name='txtPhone'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên khách hàng!',
                                },
                                {
                                    pattern: '(03|07|08|09|01[2|6|8|9])+([0-9]{8})',
                                    max: 10,
                                    message: 'Vui lòng nhập đúng định dạng số điện thoại!',
                                },
                            ]}
                            validateTrigger={["onBlur"]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Mã khách hàng: "
                            name='txtMa'
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Row>

        </>
    );
}

export default Customer;