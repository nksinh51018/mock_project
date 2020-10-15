import { CloseOutlined } from '@ant-design/icons';
import { Button, Empty, Pagination, Select, Spin, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as getProductsAction from '../../../actions/products';
import * as getAccessoriesAction from '../../../actions/accessories';
import * as getServicesAction from '../../../actions/services';
import * as deleteProductsAction from '../../../actions/deleteProducts';
import Modal from 'antd/lib/modal/Modal';
import { formatMonney } from '../../../utils/MonneyFormat';

const allDataColumns = [
    {
        title: "Mã sản phẩm",
        dataIndex: "code",
        key: "code",
        render: (code, data) => {
            return (
                <div className="link">
                    <NavLink to={`/admin/product/${data.id}`}>{code.toUpperCase()}</NavLink>
                </div>
            );
        }
    },
    {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "Loại",
        dataIndex: "type",
        key: "type",
        render: (type) => {
            if (type === 1) {
                return "Linh kiện";
            }
            else if (type === 2) {
                return "Dịch vụ";
            }
            else {
                return "Khác"
            }
        }
    },
    {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
        render: (quantity, data) => {
            if (data.type === 2) {
                return "";
            }
            return quantity;
        }
    },
    {
        title: "Đơn vị",
        dataIndex: "unit",
        key: "unit",
        render: (unit, data) => {
            if (data.type === 2) {
                return "";
            }
            return unit;
        }
    },
    {
        title: "Giá mỗi đơn vị",
        dataIndex: "pricePerUnit",
        key: "pricePerUnit",
        render: (pricePerUnit) => {
            return formatMonney(pricePerUnit) + " đ";
        }
    },
]

const servicesDataColumn = [
    {
        title: "Mã sản phẩm",
        dataIndex: "code",
        key: "code",
        render: (code) => {
            return code.toUpperCase();
        }
    },
    {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "Loại",
        dataIndex: "type",
        key: "type",
        render: (type) => {
            if (type === 1) {
                return "Linh kiện";
            }
            else if (type === 2) {
                return "Dịch vụ";
            }
            else {
                return "Khác"
            }
        }
    },
    {
        title: "Giá mỗi đơn vị",
        dataIndex: "pricePerUnit",
        key: "pricePerUnit",
    }
]

const ProductsList = (props) => {
    const history = useHistory();
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [showData, setShowData] = useState("0");
    const [columns, setColumns] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { Option } = Select;
    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
        }
    }
    const handleSearch = (event) => {
        setSearch(event.target.value);
    }
    const handleShowSizeChange = (current, size) => {
        setSize(size);
    }
    const onPageChange = (current) => {
        setPage(current);
    }
    const handleShowDataChange = (value) => {
        setShowData(value);
    }
    const handleConfirmDelete = () => {
        setVisible(true);
    }
    const handleCancel = () => {
        setVisible(false);
    }
    const handleDelete = () => {
        setLoading(true);
        const { actionDeleteProducts } = props.deleteProductsActionCreator;
        let idArray = [];
        selectedRowKeys.map((id) => {
            idArray.push(id);
        });
        actionDeleteProducts(idArray);
        setSelectedRowKeys([]);
        setVisible(false);
        setLoading(false);
    }
    const { actionGetProducts } = props.getProductsActionCreator;
    const { actionGetAccessories } = props.getAccessoriesActionCreator;
    const { actionGetServices } = props.getServicesActionCreator;
    useEffect(() => {
        switch (showData) {
            case "0":
                actionGetProducts(search, page, size);
                break;
            case "1":
                actionGetAccessories(search, page, size);
                break;
            case "2":
                actionGetServices(search, page, size);
                break;
            default:
                break;
        }
    }, [showData, totalItems, search, actionGetServices, actionGetAccessories, actionGetProducts, page, size, visible]);
    useEffect(() => {
        switch (showData) {
            case "0":
                setColumns(allDataColumns);
                setData(props.products);
                setTotalItems(props.totalProducts);
                break;
            case "1":
                setColumns(allDataColumns);
                setData(props.accessories);
                setTotalItems(props.totalAccessories);
                break;
            case "2":
                setColumns(servicesDataColumn);
                setData(props.services);
                setTotalItems(props.totalServices);
                break;
            default:
                break;
        }
    }, [search, size, page, totalItems, props.products, props.services, props.accessories, visible]);
    return (
        <>
            <div style={{ marginTop: "25px" }}>
                <span style={{ marginLeft: 8, fontWeight: "bold", fontSize: 40 }}>
                    Sản phẩm
                </span>
                <div style={{ float: "right", paddingTop: "20px" }}>
                    <Search
                        placeholder="Nhập tên hoặc mã sản phẩm"
                        onChange={handleSearch}
                        style={{ width: 400 }}
                        allowClear={true}
                    />
                    <div style={{ display: "inline", marginLeft: "10px" }}>
                        <Button
                            type="primary"
                            onClick={() => history.push("/admin/products/create")}
                        >
                            <span>Thêm sản phẩm</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <Select style={{ width: 170 }} defaultValue="0" onChange={handleShowDataChange}>
                    <Option value="0">- Lọc sản phẩm -</Option>
                    <Option value="1">Linh kiện</Option>
                    <Option value="2">Dịch vụ</Option>
                </Select>
            </div>
            {hasSelected ? (
                <div style={{marginBottom: "10px"}}>
                    <span style={{ marginRight: 5 }}>
                        Đã chọn {selectedRowKeys.length} sản phẩm
                    </span>
                    <Button onClick={handleConfirmDelete} danger type="primary">Xóa sản phẩm</Button>
                </div>
            ) : (
                    <div></div>
                )}
            <Table
                columns={columns}
                rowSelection={{ ...rowSelection }}
                pagination={false}
                dataSource={data}
                rowKey={(product) => product.id}
                onRow={(r) => ({
                    onClick: () => {
                        history.push(`/admin/product/${r.id}`);
                    }
                })}
                locale={{ emptyText: <Empty description={"Không có dữ liệu"} image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty> }}
            />
            <div style={{ float: "right", marginTop: 10 }}>
                <Pagination
                    current={page}
                    total={totalItems}
                    defaultPageSize={size}
                    onChange={onPageChange}
                    defaultCurrent={page}
                    showSizeChanger={true}
                    pageSizeOptions={[5, 10, 20, 50]}
                    onShowSizeChange={handleShowSizeChange}
                    locale={{ items_per_page: '/ Trang' }}
                />
            </div>
            <Modal
                title="Xác nhận xóa"
                visible={visible}
                onOk={handleDelete}
                onCancel={handleCancel}
                okText='Xóa'
                cancelText='Hủy Bỏ'
            >
                <Spin spinning={loading} delay={500}>
                    Bạn có chắc chắn muốn xóa sản phẩm này?
                </Spin>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        products: state.productsReducer.content,
        accessories: state.accessoriesReducer.content,
        services: state.servicesReducer.content,
        totalProducts: state.productsReducer.totalElements,
        totalAccessories: state.accessoriesReducer.totalElements,
        totalServices: state.servicesReducer.totalElements
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProductsActionCreator: bindActionCreators(getProductsAction, dispatch),
        deleteProductsActionCreator: bindActionCreators(deleteProductsAction, dispatch),
        getAccessoriesActionCreator: bindActionCreators(getAccessoriesAction, dispatch),
        getServicesActionCreator: bindActionCreators(getServicesAction, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);