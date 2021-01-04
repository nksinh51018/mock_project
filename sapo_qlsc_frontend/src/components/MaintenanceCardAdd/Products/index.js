import { CloseOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Empty, Input, Row, Table, Tag, Checkbox, InputNumber } from 'antd';
import React, { useState, useEffect } from 'react';
import {formatMonney} from '../../../utils/MonneyFormat'

const Service = (props) => {


    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'code',
            key: 'code',
            render: (text, data) => {
                if (user.role === 3) {
                    return (
                        <div className='link' style={{color: '#1890ff'}}>
                            <span style={{color: '#1890ff',cursor:'pointer'}} onClick={()=>window.open(`/admin/product/${data.id}`, "_blank")}>{text.toUpperCase()}</span>
                        </div>
                    )
                }
                else {
                    return <span>{text.toUpperCase()}</span>
                }
            }

        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: '20%'
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
            width: '10%',
            render: (amount, data) => {
                if (data.type === 1 && user.role !== 2 && user.role !== 0 && props.maintenanceCardAdd.info.returnDate === null) {
                    return (<Input value={amount} onChange={(e) => changeAmount(data.id, e.target.value)} />)
                }
                else {
                    return (<span>{amount}</span>)
                }
            }
        },
        {
            title: 'Bảo hành',
            dataIndex: 'warranty',
            key: 'warranty',
            render: (warranty, data) => {
                if (warranty === 1) {
                    return (
                        user.role !== 2&& user.role !== 0  && props.maintenanceCardAdd.info.returnDate === null ? <Button onClick={() => warrantyItem(data.id)} type="primary">Bảo hành</Button> : <span>Bảo hành</span>
                    )
                }
                else {
                    return (
                        user.role !== 2 && user.role !== 0 && props.maintenanceCardAdd.info.returnDate === null? <Button onClick={() => warrantyItem(data.id)} >Không bảo hành</Button> : <span>Không bảo hành</span>
                    )
                }
            }
        },
        {
            title: 'Giá',
            dataIndex: 'pricePerUnit',
            key: 'pricePerUnit',
            render: (pricePerUnit, data) => {
                if (data.warranty === 1) {
                    return (
                        <span>0 đ</span>
                    )
                }
                else {
                    return (
                        <span>{formatMonney(pricePerUnit)} đ</span>
                    )
                }
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '20%',
            render: (status, data) => {
                if (data.type === 2) {
                    if (status === 0) {
                        return (
                            <Tag color="warning"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleChangeStatus(data.maintenanceCardDetailId, status)}>Đang chờ</Tag>
                        )
                    }
                    else if (status === 1) {
                        return (
                            <Tag color="processing"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleChangeStatus(data.maintenanceCardDetailId, status)}>Đang sửa</Tag>
                        )
                    }
                    else if (status === 2) {
                        return (

                            <Tag color="success" onClick={() => handleChangeStatus(data.maintenanceCardDetailId, status)}>Hoàn thành</Tag>

                        )
                    }
                }
            }
        },
        {
            title: '',
            dataIndex: 'key',
            key: 'close',
            render: (key, data) => {
                if (user.role !== 2 && user.role !== 0  &&  props.maintenanceCardAdd.info.returnDate === null) {
                    if (data.status === 0) {
                        return (
                            <CloseOutlined onClick={() => { deleteItem(data.id) }} />
                        )
                    }
                    return (
                        <></>
                    )
                }
                else {
                    return (
                        <></>
                    )
                }

            }
        },
    ];


    const [listProduct, setListProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [productPage, setProductPage] = useState(0);
    const [totalProductPage, setTotalProductPage] = useState(0);
    const [search, setSearch] = useState('');
    const [user, setUser] = useState({
        role: 0
    });
    useEffect(() => {
        setProductPage(props.maintenanceCardAdd.productPage)
    }, [props.maintenanceCardAdd.productPage]);
    useEffect(() => {
        setTotalProductPage(props.maintenanceCardAdd.totalProductPage)
    }, [props.maintenanceCardAdd.totalProductPage]);
    useEffect(() => {
        setListProduct(props.maintenanceCardAdd.listProduct)
    }, [props.maintenanceCardAdd.listProduct, props.maintenanceCardAdd.products]);
    useEffect(() => {
        setProducts(props.maintenanceCardAdd.products)
    }, [props.maintenanceCardAdd.products]);
    useEffect(() => {
        setUser(props.user)
    }, [props.user]);
    const handleChangeStatus = (id, status) => {
        if (user.role === 2 && status < 2) {
            const { maintenanceCardAddActionCreators } = props;
            const { actUpdateStatusDetail } = maintenanceCardAddActionCreators;
            actUpdateStatusDetail(id);
        }
    }
    const warrantyItem = (id) => {
        const { maintenanceCardAddActionCreators } = props;
        const { actWarrantyProduct } = maintenanceCardAddActionCreators;
        actWarrantyProduct(id)
    }
    const renderItem = (product) => {
        return {
            value: product.id.toString(),
            label: (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                        <div>{product.code.toUpperCase()}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div>{product.pricePerUnit} đ</div>
                        {product.type === 1 ? <div>Linh kiện</div> : <div>Dịch vụ</div>}
                    </div>
                </div>
            ),
        };
    };

    const renderOptions = () => {
        let result = [];
        result = listProduct.map((item, index) => {
            return (
                renderItem(item)
            )
        })

        return [
            {
                label: <span>Thông tin dịch vụ</span>,
                options: result,
            },
        ]
    }

    const selectItem = (value) => {
        const { maintenanceCardAddActionCreators } = props;
        const { actChooseProduct } = maintenanceCardAddActionCreators;
        actChooseProduct(value)
    }

    const focusInput = () => {
        const { maintenanceCardAddActionCreators } = props;
        const { actSearchProduct } = maintenanceCardAddActionCreators;
        actSearchProduct(search, 1, 5)
    }

    const handleChangeInput = (e) => {
        setSearch(e.target.value)
        const { maintenanceCardAddActionCreators } = props;
        const { actSearchProduct } = maintenanceCardAddActionCreators;
        actSearchProduct(e.target.value, 1, 5)
    }

    const deleteItem = (key) => {
        const { maintenanceCardAddActionCreators } = props;
        const { actRemoveProduct } = maintenanceCardAddActionCreators;
        actRemoveProduct(key)
    }

    const changeAmount = (key, value) => {
        const { maintenanceCardAddActionCreators } = props;
        const { actChangeAmount } = maintenanceCardAddActionCreators;
        if (value === '') {
            value = 0;
        }
        else if (typeof value === 'string') {
            value = parseInt(value)
        }
        actChangeAmount(key, value)
    }

    const handScrollAutoComplete = (e) => {
        const isEndOfList = e.target.scrollTop + e.target.clientHeight;
        if (isEndOfList > e.target.scrollHeight - 50) {
            if (totalProductPage > productPage) {
                const { maintenanceCardAddActionCreators } = props;
                const { actUpdateListProduct } = maintenanceCardAddActionCreators;
                if (search === undefined || search === "") {
                    actUpdateListProduct("")
                }
                else {
                    console.log(search);
                    actUpdateListProduct(search)
                }
            }
        }
    }

    const totalMoney = () => {
        let total = 0;
        for (let i = 0; i < products.length; i++) {
            if (products[i].warranty === 0) {
                total += products[i].pricePerUnit * products[i].amount;
            }
        }
        return total;
    }

    return (
        <>
            <Row>
                {user.role !== 2 && user.role !== 0 && props.maintenanceCardAdd.info.returnDate === null ? <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    style={{ width: '100%' }}
                    options={renderOptions()}
                    allowClear={true}
                    onSelect={selectItem}
                    onFocus={focusInput}
                    value={search}
                    onPopupScroll={handScrollAutoComplete}
                >
                    <Input size="large" placeholder="Tìm kiếm sản phẩm" onChange={handleChangeInput} />
                </AutoComplete> : <></>}

            </Row>
            <Row>
                <Table locale={{ emptyText: <Empty description='Không có sản phẩm' image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty> }}
                    dataSource={products}
                    columns={columns} style={{ width: '100%', minHeight: '240px' }} pagination={false} />
            </Row>
            <Row style={{ textAlign: 'right', marginTop: 30 }}>
                <h4 style={{ width: '100%' }}>Tổng tiền: {formatMonney(totalMoney())} đ</h4>
            </Row>
        </>
    );
}

export default Service;