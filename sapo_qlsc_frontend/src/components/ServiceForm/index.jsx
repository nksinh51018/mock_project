import { Form, Button, Col, Input, Row, InputNumber } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { actionCreateService } from '../../actions/createService';

const formField = (state) => {
    return [
        {
            name: "name",
            value: state.name
        },
        {
            name: "pricePerUnit",
            value: state.pricePerUnit
        },
        {
            name: "description",
            value: state.description
        },
        {
            name: "code",
            value: state.code
        }
    ];
}

const nameRules = [
    {
        required: true,
        message: "Hãy nhập tên dịch vụ"
    }
];

const pricePerUnitRules = [
    {
        required: true,
        message: "Hãy nhập tên dịch vụ"
    }
];

const ServiceForm = (props) => {
    const [id, setId] = useState(props.id);
    const [state, setState] = useState({
        name: "",
        code: "",
        pricePerUnit: 0,
        description: ""
    });
    const history = useHistory();
    const handleNameChange = (event) => {
        setState({ ...state, name: event.target.value });
    }
    const handlePricePerUnitChange = (value) => {
        setState({ ...state, pricePerUnit: value });
    }
    const handleDescriptionChange = (event) => {
        setState({ ...state, description: event.target.value });
    }
    const handleCodeChange = (event) => {
        setState({ ...state, code: event.target.value });
    }
    const handleFinish = () => {
        // Request Body
        const data = new FormData();
        data.append("name", state.name);
        if (state.code !== "") {
            data.append("code", state.code.toLowerCase());
        }
        data.append("pricePerUnit", state.pricePerUnit);
        data.append("description", state.description);
        data.append("type", 2);
        console.log(props);
        if (props.createServiceActionCreator !== undefined) {
            const { actionCreateService } = props.createServiceActionCreator;
            actionCreateService(data);
        }

        if (props.updateServiceActionCreator !== undefined) {
            const { actionUpdateService } = props.updateServiceActionCreator;
            actionUpdateService(id, data);
        }
    }
    const handleFinishFail = () => {

    }
    useEffect(() => {
        if (props.product.id !== undefined) {
            setId(props.id);
            setState(props.product);
        }
    }, [props.product.id, id]);
    return (
        <>
            <Form
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={handleFinish}
                onFinishFailed={handleFinishFail}
                fields={formField(state)}
            >
                <div style={{ background: "#fff", padding: 25 }}>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="Tên dịch vụ:"
                                name="name"
                                rules={nameRules}
                            >
                                <Input onChange={handleNameChange} placeholder="Nhập tên dịch vụ" />
                            </Form.Item>
                        </Col>
                        <Col span={8} style={{ paddingLeft: "2%" }}>
                            <Form.Item
                                label="Giá dịch vụ:"
                                name="pricePerUnit"
                                rules={pricePerUnitRules}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                    min={0}
                                    onChange={handlePricePerUnitChange}
                                    name="pricePerUnit"
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    placeholder="Nhập giá dịch vụ"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8} style={{ paddingLeft: "2%" }}>
                            <Form.Item label="Mã dịch vụ:" name="code">
                                <Input onChange={handleCodeChange} placeholder="Nhập mã dịch vụ" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Mô tả:"
                                name="description"
                            >
                                <TextArea
                                    rows={4}
                                    onChange={handleDescriptionChange}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div style={{ marginTop: "30px" }}>
                    <Form.Item style={{ float: "right" }}>
                        <Button type="primary" htmlType="submit" style={{ width: "150px", height: "40px" }}>
                            Lưu
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
}

export default ServiceForm;