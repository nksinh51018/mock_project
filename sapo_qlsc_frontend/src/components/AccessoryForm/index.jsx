import { UploadOutlined } from '@ant-design/icons';
import { Form, Button, Col, Input, InputNumber, Row, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { actionUpdateAccessory } from '../../actions/updateAccessory';

const nameRules = [
    {
        required: true,
        message: "Hãy nhập tên linh kiện!",
    },
];
const unitRules = [
    {
        required: true,
        message: "Hãy nhập đơn vị!",
    },
];
const quantityRules = [
    {
        required: true,
        message: "Hãy nhập số lượng linh kiện!"
    }
]
const pricePerUnitRules = [
    {
        required: true,
        message: "Hãy nhập giá mỗi đơn vị!",
    },
];

const formField = (state) => {
    return [
        {
            name: "code",
            value: state.code
        },
        {
            name: "name",
            value: state.name,
        },
        {
            name: "quantity",
            value: state.quantity,
        },
        {
            name: "unit",
            value: state.unit,
        },
        {
            name: "pricePerUnit",
            value: state.pricePerUnit,
        },
        {
            name: "image"
        },
        {
            name: "description",
            value: state.description
        }
    ]
};

const AccessoryForm = (props) => {
    const [id, setId] = useState(props.id);
    const [state, setState] = useState({
        name: "",
        code: "",
        quantity: 0,
        image: null,
        unit: "",
        pricePerUnit: 0,
        description: ""
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [isImageSet, setIsImageSet] = useState(false);
    const history = useHistory();
    const handleCodeChange = (event) => {
        setState({ ...state, code: event.target.value });
    }
    const handleNameChange = (event) => {
        setState({ ...state, name: event.target.value });
    };
    const handleQuantityChange = (value) => {
        setState({ ...state, quantity: value });
    };
    const handleUnitChange = (event) => {
        setState({ ...state, unit: event.target.value });
    };
    const handlePricePerUnitChange = (value) => {
        setState({ ...state, pricePerUnit: value });
    };
    const onDescriptionChange = (event) => {
        setState({ ...state, description: event.target.value });
    };

    const handleFinish = () => {
        // Request body
        const data = new FormData();
        data.append("image", state.image);
        if (state.code !== "") {
            data.append("code", state.code.toLowerCase());
        }
        data.append("name", state.name);
        data.append("unit", state.unit);
        data.append("pricePerUnit", state.pricePerUnit);
        data.append("description", state.description);
        data.append("quantity", state.quantity);
        data.append("type", 1);

        console.log(props);
        // Call a request
        if (props.createAccessoryActionCreator !== undefined) {
            const { actionCreateAccessory } = props.createAccessoryActionCreator;
            actionCreateAccessory(data);
        }
        if (props.updateAccessoryActionCreator !== undefined) {
            const { actionUpdateAccessory } = props.updateAccessoryActionCreator;
            actionUpdateAccessory(id, data);
        }
    };
    const handleFinishFail = () => { };
    const handleImageChange = {
        beforeUpload: file => {
            setState({ ...state, image: file });
            setPreviewImage(URL.createObjectURL(file));
            setIsImageSet(true);
            return false;
        },
        transformFile: () => {
            return false;
        },
        showUploadList: false,
        accept: "image/*"
    }
    useEffect(() => {
        if (props.product.id !== undefined) {
            setState(props.product);
            setPreviewImage(`http://localhost:8080/admin/products/image/${props.product.image}`);
            if (props.product.image !== null) {
                setIsImageSet(true);
            }
            else {
                setIsImageSet(false);
            }
        }
    }, [props.product]);
    return (
        <>
            <Form
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={handleFinish}
                onFinishFailed={handleFinishFail}
                encType="multipart/form-data"
                fields={formField(state)}
            >
                <Row>
                    <Col span={18}>
                        <div style={{ background: "#fff", padding: 25 }}>
                            <Row>
                                <Col span={12}>
                                    <Form.Item label="Tên linh kiện:" name="name" rules={nameRules}>
                                        <Input onChange={handleNameChange} placeholder="Nhập tên linh kiện" />
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={{ paddingLeft: '2%' }}>
                                    <Form.Item
                                        label="Giá (VNĐ):"
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
                                            placeholder="Nhập giá mỗi đơn vị"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Form.Item label="Số lượng:" name="quantity" rules={quantityRules}>
                                        <InputNumber min={0} onChange={handleQuantityChange} style={{ width: "100%" }} placeholder="Nhập số lượng linh kiện" />
                                    </Form.Item>
                                </Col>
                                <Col span={8} style={{ paddingLeft: '2%' }}>
                                    <Form.Item
                                        label="Đơn vị"
                                        name="unit"
                                        rules={unitRules}
                                    >
                                        <Input onChange={handleUnitChange} placeholder="Nhập đơn vị" />
                                    </Form.Item>
                                </Col>
                                <Col span={8} style={{ paddingLeft: '2%' }}>
                                    <Form.Item label="Mã linh kiện:" name="code">
                                        <Input onChange={handleCodeChange} placeholder="Nhập mã sản phẩm" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item label="Mô tả:" name="description">
                                        <TextArea
                                            rows={3}
                                            onChange={onDescriptionChange}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{ background: "#fff", padding: 25, marginLeft: "5%" }}>
                            <Row>
                                <Col span={24}>
                                    <Form.Item label="Ảnh:">
                                        {isImageSet ? (
                                            <img src={previewImage} width="100%" />
                                        ) : (
                                                <div style={{ textAlign: "center", borderRadius: "2px", background: "rgb(245 245 245)", padding: "4px 11px" }}>Không có ảnh</div>
                                            )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} style={{ textAlign: "left" }}>
                                    <Form.Item label={(props.product.id !== undefined) ? "Thay đổi ảnh linh kiện:" : "Ảnh sản phẩm"} name="image">
                                        <Upload {...handleImageChange}>
                                            <Button icon={<UploadOutlined />} type="button">Chọn ảnh</Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
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

export default AccessoryForm;