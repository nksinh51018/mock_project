
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Timeline, Card, Button, Input, Form, Modal, Select, InputNumber, Row, Col, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { formatDate } from '../../../utils/DateFormat'
import { formatMonney } from '../../../utils/MonneyFormat'
const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 12 },
};

const { Option } = Select;
const PaymentHistory = (props) => {

    const [paymentHistories, setPaymentHistories] = useState([]);
    const [price, setPrice] = useState(0);
    const [user, setUser] = useState({
        role: 0
    });
    const [payment, setPayment] = useState({
        txtPaymentMethod: "1",
        txtPaymentMethod2: "2",
        txtMoney: 0,
        txtMoney2: 0,
    })
    const formRef = React.createRef()
    const [add, setAdd] = useState(0);
    const [isShowAdd, setIsShowAdd] = useState(false);
    useEffect(() => {
        setPrice(props.maintenanceCardAdd.price)
        setPaymentHistories(props.maintenanceCardAdd.paymentHistories)
        let total = 0;
        let n = props.maintenanceCardAdd.paymentHistories.length;
        if (n > 0) {
            for (let i = 0; i < n; i++) {
                total += props.maintenanceCardAdd.paymentHistories[i].money;
            }
        }
        setPayment({
            txtPaymentMethod: "1",
            txtPaymentMethod2: "2",
            txtMoney: props.maintenanceCardAdd.price - total,
            txtMoney2: 0,
        })
    }, [props.maintenanceCardAdd.paymentHistories, props.maintenanceCardAdd.price]);


    useEffect(() => {
        setUser(props.user)
    }, [props.user]);

    // useEffect(() => {
    //     setPrice(props.maintenanceCardAdd.price)
    // }, [props.maintenanceCardAdd.price]);

    useEffect(() => {
        setIsShowAdd(props.maintenanceCardAdd.ui.paymentModal)
        setAdd(0)
        // setPayment({
        //     txtPaymentMethod: "1",
        //     txtPaymentMethod2: "2",
        //     txtMoney: 0,
        //     txtMoney2: 0,
        // })
    }, [props.maintenanceCardAdd.ui]);

    const showTimeLine = () => {
        let result = [];
        let n = paymentHistories.length;
        if (n > 0) {
            result.push(<div style={{ marginBottom: 30 }} key={10000}>Lịch sử thanh toán</div>)
            for (let i = 0; i < n - 1; i++) {
                if (paymentHistories[i].createdDate !== undefined) {
                    let date1 = new Date(paymentHistories[i].createdDate);
                    let date2 = new Date(paymentHistories[i + 1].createdDate);
                    if (Math.abs((date2.getTime() - date1.getTime()) / 1000) <= 5) {
                        result.push(<Timeline.Item color="blue" key={i} >
                            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontWeight: "bold" }}>Đã thanh toán: {formatMonney(paymentHistories[i].money + paymentHistories[i + 1].money)} đ</div>
                                    <div>{paymentHistories[i].paymentMethod.name}</div>
                                    <div>{paymentHistories[i + 1].paymentMethod.name}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ fontWeight: "bold" }}>{formatDate(paymentHistories[i].createdDate)}</span>
                                    <div>{formatMonney(paymentHistories[i].money)} đ</div>
                                    <div>{formatMonney(paymentHistories[i + 1].money)} đ</div>
                                </div>

                            </div>
                        </Timeline.Item>)
                        i++
                    }
                    else {
                        result.push(<Timeline.Item color="blue" key={i}>
                            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontWeight: "bold" }}>Đã thanh toán: {formatMonney(paymentHistories[i].money)} đ</div>
                                    <div>{paymentHistories[i].paymentMethod.name}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ fontWeight: "bold" }}>{formatDate(paymentHistories[i].createdDate)}</span>
                                    <div>{formatMonney(paymentHistories[i].money)} đ</div>
                                </div>
                            </div>
                        </Timeline.Item>)
                    }
                }

            }
            if (n > 1) {
                let date1 = new Date(paymentHistories[n - 2].createdDate);
                let date2 = new Date(paymentHistories[n - 1].createdDate);
                if (Math.abs((date2.getTime() - date1.getTime()) / 1000) > 5) {
                    result.push(<Timeline.Item color="blue" key={n - 1} >
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontWeight: "bold" }}>Đã thanh toán: {formatMonney(paymentHistories[n - 1].money)} đ</div>
                                <div>{paymentHistories[n - 1].paymentMethod.name}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontWeight: "bold" }}>{formatDate(paymentHistories[n - 1].createdDate)}</span>
                                <div>{formatMonney(paymentHistories[n - 1].money)} đ</div>
                            </div>

                        </div>
                    </Timeline.Item>)
                }
            }
            else {

                result.push(<Timeline.Item color="blue" key={n - 1} >
                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontWeight: "bold" }}>Đã thanh toán: {formatMonney(paymentHistories[n - 1].money)} đ</div>
                            <div>{paymentHistories[n - 1].paymentMethod.name}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ fontWeight: "bold" }}>{formatDate(paymentHistories[n - 1].createdDate)}</span>
                            <div>{formatMonney(paymentHistories[n - 1].money)} đ</div>
                        </div>

                    </div>
                </Timeline.Item>)
            }

        }

        return result;
    }

    const showTotalMoney = () => {
        let result = 0;
        let n = paymentHistories.length;
        if (n > 0) {
            for (let i = 0; i < n; i++) {
                result += paymentHistories[i].money;
            }
        }

        return result;
    }

    const totalPayment = showTotalMoney();

    const showModel = () => {
        setIsShowAdd(true)
    }

    const toggleAddModal = () => {
        formRef.current.resetFields()
        setAdd(0)
        setIsShowAdd(!isShowAdd)
        // setPayment({
        //     txtPaymentMethod: "1",
        //     txtPaymentMethod2: "2",
        //     txtMoney: 0,
        //     txtMoney2: 0,
        // })
    }

    const renderTitlePaymentCard = (text) => {
        return (
            <>
                <div>
                    <span>{text}</span>
                    {user.role === 3 && price - totalPayment > 0 ? <Button style={{ float: 'right' }} type="primary"
                        onClick={showModel}>Thanh toán</Button> : ""}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'normal', marginTop: 10 }}>
                    <span>Đã thanh toán: {formatMonney(totalPayment)} đ</span>
                    {price - totalPayment === 0 ? <span>Hoàn tất thanh toán</span> : <span>Còn phải trả: {formatMonney(price - totalPayment)} đ</span>}
                </div>
            </>
        )
    }

    const onFinish = (values) => {
        if (add === 1) {
            if (values.txtPaymentMethod === values.txtPaymentMethod2) {
                if (values.txtPaymentMethod.toString() === '1') {
                    message.error("Vui lòng xóa hoặc thay đổi phương thức thanh toán TIỀN MẶT ")
                    return;
                }
                else {
                    message.error("Vui lòng xóa hoặc thay đổi phương thức thanh toán CHUYỂN KHOẢN ")
                    return;
                }

            }

            if (values.txtMoney === 0 || values.txtMoney2 === 0) {
                message.error("Vui lòng nhập số tiền cần thanh toán")
                return;
            }

            if (values.txtMoney + values.txtMoney2 > price - totalPayment) {
                message.error("Số tiền thanh toán lớn hơn số tiền cần thanh toán")
                return;
            }
        }
        else {
            if (values.txtMoney === 0) {
                message.error("Vui lòng nhập số tiền cần thanh toán")
                return;
            }
        }
        const { maintenanceCardAddActionCreators } = props;
        const { actCreatePaymentHistory } = maintenanceCardAddActionCreators;
        actCreatePaymentHistory(values)

    }

    const handleChange = (key, value) => {
        setPayment({ ...payment, [key]: value });
    }

    return (
        <>
            <Card title={renderTitlePaymentCard("Thanh toán")} bordered={true} style={{ width: '100%', borderRadius: 3 }}>
                <Timeline>
                    {showTimeLine()}
                </Timeline>
            </Card>
            <Modal
                title="Thanh toán"
                centered
                visible={isShowAdd}
                onOk={toggleAddModal}
                onCancel={toggleAddModal}
                footer={[
                    <Button key={1} onClick={toggleAddModal}>
                        Quay lại
                                        </Button>,
                    <Button form="payment" key="submit" htmlType="submit" type="primary" >
                        Thanh toán
                    </Button>
                ]}
                width={1000}
            >
                <Form
                    {...layout}
                    name="payment"
                    onFinish={onFinish}
                    ref={formRef}
                    fields={
                        [
                            {
                                name: "txtPaymentMethod",
                                value: payment.txtPaymentMethod
                            },
                            {
                                name: "txtMoney",
                                value: payment.txtMoney
                            },
                            {
                                name: "txtPaymentMethod2",
                                value: payment.txtPaymentMethod2
                            },
                            {
                                name: "txtMoney2",
                                value: payment.txtMoney2
                            },
                        ]
                    }
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Phương thức thanh toán: "
                                name='txtPaymentMethod'
                            >
                                <Select initialvalues="1" onChange={(e) => handleChange("txtPaymentMethod", e)} name="txtPaymentMethod" >
                                    <Option value="1">Tiền mặt</Option>
                                    <Option value="2">Chuyển khoản</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                label="Số tiền thanh toán: "
                                name='txtMoney'
                            >
                                <InputNumber min={0} max={price - totalPayment} style={{ width: '100%' }} onChange={(e) => handleChange("txtMoney", e)}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {add === 0 ? <Row>
                        <Button
                            type="dashed"
                            onClick={() => {
                                setAdd(1)
                                console.log(price)
                                console.log(price - payment.txtMoney)
                                setPayment({
                                    txtPaymentMethod: payment.txtPaymentMethod,
                                    txtPaymentMethod2: "2",
                                    txtMoney: payment.txtMoney,
                                    txtMoney2: price - totalPayment - payment.txtMoney,
                                })
                            }}
                            style={{ width: '100%' }}
                        >
                            <PlusOutlined /> Thêm phương thức thanh toán
                </Button>
                    </Row> : <>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="Phương thức thanh toán: "
                                        name='txtPaymentMethod2'
                                    >
                                        <Select initialvalues="1" onChange={(e) => handleChange("txtPaymentMethod2", e)} >
                                            <Option value="1">Tiền mặt</Option>
                                            <Option value="2">Chuyển khoản</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item
                                        label="Số tiền thanh toán: "
                                        name='txtMoney2'
                                    >
                                        <InputNumber min={0} max={price - totalPayment} style={{ width: '100%' }} onChange={(e) => handleChange("txtMoney2", e)}
                                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={1}>
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        style={{ margin: '0 8px' }}
                                        onClick={() => {
                                            setAdd(0)
                                        }}
                                    />
                                </Col>
                            </Row>

                        </>}
                </Form>
            </Modal>
        </>

    );
}

export default PaymentHistory;