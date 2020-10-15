import { CloseOutlined } from '@ant-design/icons';
import { Button, Pagination, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as getServicesAction from '../../../actions/services';
import * as deleteServiceAction from '../../../actions/deleteService';
import * as multipleDeleteServiceAction from '../../../actions/deleteServices';

const columns = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        render: (code, data) => {
            return <Link to={`/admin/services/detail/${data.id}`}>{code}</Link>
        }
    },
    {
        title: "Dịch vụ",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Giá",
        dataIndex: "pricePerUnit",
        key: "pricePerUnit",
    }
];

const ServicesList = (props) => {
    const history = useHistory();
    const [state, setState] = useState({
        data: [],
        pagination: {
            current: 1,
            size: 5
        },
        loading: false,
        selectedRowKeys: []
    });
    const [search, setSearch] = useState("");
    const [reset, setReset] = useState(0);
    const rowSelection = {
        selectedRowKeys: state.selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setState({ ...state, selectedRowKeys })
        },
    };

    const handleTableChange = () => {

    }

    const onPageChange = (pageNumber) => {
        setState({ ...state, pagination: { ...state.pagination, current: pageNumber } });
    };

    const handleShowSizeChange = (current, size) => {
        actionGetServices(search, current, size);
        setState({ ...state, pagination: { ...state.pagination, size } });
    }

    const { productDeleteActionCreator } = props;
    const { actionDeleteService } = productDeleteActionCreator;

    const { multipleDeleteActionCreator } = props;
    const { actionDeleteServices } = multipleDeleteActionCreator;
    const handleDelete = () => {
        state.selectedRowKeys.map((key) => {
            actionDeleteService(key);
        });
        setState({ ...state, selectedRowKeys: [] });
    }

    const { productsActionCreator } = props;
    const { actionGetServices } = productsActionCreator;
    const hasSelected = state.selectedRowKeys.length > 0;
    useEffect(() => {
        actionGetServices(search, state.pagination.current, state.pagination.size);
    }, [search, actionGetServices, state.pagination, reset]);
    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8, fontWeight: "bold", fontSize: 40 }}>
                    Dịch vụ
                </span>
                <div style={{ float: "right", paddingTop: "20px" }}>
                    <Search
                        placeholder="Nhập tên hoặc mã linh kiện"
                        onChange={(event) => { setSearch(event.target.value) }}
                        style={{ width: 250 }}
                    />
                    <div style={{ display: "inline", margin: 5 }}>
                        <Button type="primary" shape="circle">
                            <CloseOutlined />
                        </Button>
                    </div>
                    <div style={{ display: "inline", margin: 5 }}>
                        <Button type="primary" onClick={() => history.push("/admin/services/create")}>
                            <span>Thêm dịch vụ</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                {(hasSelected) ?
                    (
                        <div style={{ marginBottom: 16 }}>
                            <span>
                                {hasSelected ? `Đã chọn ${state.selectedRowKeys.length} linh kiện` : ''}
                            </span>
                            <Button onClick={handleDelete} disabled={!hasSelected} loading={state.loading} style={{ display: 'inline', marginLeft: 8 }} type="primary" danger>
                                Xóa
                            </Button>
                        </div>
                    ) : (
                        <div style={{ marginBottom: 16, height: "32px" }}>

                        </div>
                    )}
            </div>
            <Table
                columns={columns}
                rowSelection={{ ...rowSelection }}
                dataSource={props.services}
                rowKey={service => service.id}
                pagination={false}
                onChange={handleTableChange}
            />
            <div style={{ float: "right", marginTop: 10 }}>
                <Pagination
                    current={state.pagination.current}
                    total={props.totalItems}
                    onChange={onPageChange}
                    defaultPageSize={state.pagination.size}
                    defaultCurrent={state.pagination.current}
                // showSizeChanger={true}
                // pageSizeOptions={[1, 2, 3]}
                // onShowSizeChange={handleShowSizeChange}
                />
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        services: state.servicesReducer.content,
        totalItems: state.servicesReducer.totalElements
    };
}

const mapDispatchToProps = dispatch => {
    return {
        productsActionCreator: bindActionCreators(getServicesAction, dispatch),
        productDeleteActionCreator: bindActionCreators(deleteServiceAction, dispatch),
        multipleDeleteActionCreator: bindActionCreators(multipleDeleteServiceAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);