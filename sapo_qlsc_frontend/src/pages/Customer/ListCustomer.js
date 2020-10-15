import React, { useEffect, useState } from 'react';
import { Table, Button, Pagination, Modal, Empty, Tag } from 'antd';
import Search from 'antd/lib/input/Search';
//import { CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as customerActions from '../../actions/customer';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import history from '../../history';
import './customer.css';

const Customer = (props) => {

    const [pageNumber, setPageNumber] = useState(1);
    const [size, setSize] = useState(10);
    const [search, setSearch] = useState('');
    const [nameField] = useState();
    const [order] = useState();
    const [current, setCurrent] = useState(1);
    const [ids, setIds] = useState([]);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    //const [filterCustomer, setFilterCustomer] = useState(null);

    const { customerActionCreators } = props;
    const { actGetListCustomer, actUpdateMultipleStatusCustomer } = customerActionCreators;
    const { listCustomer, totalCustomer } = props;

    useEffect(() => {

        if (search === null && search.length === 0) {
            actGetListCustomer('', pageNumber, size);
        }
        // else if(filterCustomer === null){
        //     actGetListCustomer(search, pageNumber, size, nameField, order)
        // }
        else {
            actGetListCustomer(search, pageNumber, size, nameField, order)
        }

    }, [actGetListCustomer, search, pageNumber, size, nameField, order]);

    const columns = [
        {
            title: 'Mã khách hàng',
            dataIndex: 'code',
            key: 'code',
            sorter: true,
            render: (text, data) => (<div className="link"> <NavLink to={`/admin/customers/${data.id}`}>{text.toUpperCase()}</NavLink></div>)
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            key: 'name',
            sorter: true
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        // {
        //     title: 'Trạng thái',
        //     dataIndex: 'pay_status',
        //     key: 'pay_status',

        //     //dang bi loi
        //     // filters: [
        //     //     { text: 'Đã thanh toán', value: '1' },
        //     //     { text: 'Chưa thanh toán', value: '0' }
        //     // ],
        //     render: pay_status => (
        //         <>
        //             {pay_status === "1" ? <Tag color='success'>Đã thanh toán</Tag> : pay_status === "2" ? <Tag color='magenta'>Chưa tạo phiếu</Tag> : <Tag color='warning'>Chưa thanh toán</Tag>}
        //         </>
        //     ),
        //     ellipsis: true
        // },
        {
            title: 'Phiếu chưa thanh toán',
            dataIndex: 'totalNotPay',
            key: 'totalNotPay',

            //dang bi loi
            // filters: [
            //     { text: 'Đã thanh toán', value: '1' },
            //     { text: 'Chưa thanh toán', value: '0' }
            // ],
            render: totalNotPay => (
                <>
                <div style={{paddingLeft: 47}}>{totalNotPay} phiếu</div>                
                </>
            ),
            ellipsis: true
        },
        // {
        //     title: "Hành động",
        //     dataIndex: 'action',
        //     key: 'action',
        //     render: (text, data) => <NavLink to={`/admin/maintenanceCards/create`}><Tag style={{cursor: "pointer"}} color='gold'>Tạo phiếu sửa xe</Tag></NavLink>
        // }
    ];

    const mapCustomer = () => {
        let data = [];
        data = listCustomer.map((customer, index) => {
            return {
                ...customer,
                key: customer.id
            }
        })
        return data;
    }

    const handleTableChange = (pagination, filters, sorter) => {

        // if(filters && filters !== undefined){
        //     actFilterPayStatusOfCustomer(pageNumber, size, filters)
        //     setFilterCustomer(1)
        // }
        // if(filters.pay_status === null){
        //     setFilterCustomer(null)
        // }
        if (sorter && sorter !== undefined) {
            actGetListCustomer(search, pageNumber, size, sorter.field, sorter.order)
        }
    };

    const [stateLoadding, setStateLoadding] = useState({
        selectedRowKeys: [],
        loading: false,
    });

    const onSelectChange = selectedRowKeys => {
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
        setIds(selectedRowKeys);
        setStateLoadding({ selectedRowKeys });
    };

    const rowSelection = {
        selectedRowKeys: stateLoadding.selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = stateLoadding.selectedRowKeys.length > 0;

    const onChange = (pageNumber) => {
        setCurrent(pageNumber)
        setPageNumber(pageNumber)
        setStateLoadding({
            selectedRowKeys: [],
            loading: false,
        }
        )
    }

    const changePageSize = (current, size) => {
        setPageNumber(current)
        setSize(size)
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
        actGetListCustomer(e.target.value, pageNumber, size)
    }

    // const handleCancel = (e) => {
    //     setSearch('')
    //     actGetListCustomer(search, pageNumber, size, nameField, order)
    // }

    const searchCustomer = (value) => {
        setSearch(value)
    }

    // const handleChange = (value) => {
    //     if (value === 'delete') {
    //         //window.confirm("Bạn có chắc chắn muốn xóa khách hàng?");
    //         //actDeleteCustomer(ids);
    //         //history.push('/admin/customers/create')
    //         //actGetListCustomer(search, pageNumber, size, nameField, order)
    //         setVisible(true)
    //     }
    //     if (value === 'update') {
    //         console.log(ids);
    //         if (ids.length > 1) {
    //             alert(`Không thể cập nhật ${ids.length} khách hàng`)
    //         } else {
    //             //history.push(`/admin/customers/update/5`)
    //         }
    //     }
    // }

    const deleteCustomer = () => {
        setVisible(true)
    }

    //model delete
    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            actUpdateMultipleStatusCustomer(ids);
            setConfirmLoading(false)
            setVisible(false)
            setStateLoadding({
                selectedRowKeys: [],
                loading: false,
            })
            actGetListCustomer(search, pageNumber, size, nameField, order);
        }, 0);
    };

    const handleModalCancel = () => {
        setVisible(false)
    };

    const [checkStrictly] = React.useState(false);

    return (

        <>
            <div>
                <Modal
                    visible={visible}
                    title="Xóa khách hàng"
                    onCancel={handleModalCancel}
                    //onOk={handleOk}
                    cancelText={"Thoát"}
                    okText={"Xóa"}
                    confirmLoading={confirmLoading}
                    footer={[
                        <Button key={1} onClick={() => {
                        setVisible(false)
                    }}>
                            Thoát
                                            </Button>,
                        <Button danger type="primary" onClick={handleOk} >
                            Xóa
                                            </Button>
                    ]}
                >
                    <p>Bạn có chắc chắn muốn xóa {stateLoadding.selectedRowKeys.length} khách hàng?</p>
                </Modal>
            </div>
            <div style={{ marginTop: 25 }}>
                <span style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 40 }}>
                    Khách hàng
                </span>
                <div style={{ float: 'right', marginTop: 20 }}>
                    <Search
                        placeholder="Tìm kiếm theo mã, tên, số điện thoại, email"
                        onSearch={searchCustomer}
                        style={{ width: 400, marginRight: 10 }}
                        value={search}
                        onChange={handleChangeSearch}
                        allowClear={true}
                    />
                    {/* <div style={{ display: 'inline', margin: 5 }}>
                        <Button type="primary" shape="circle" onClick={handleCancel}>
                            <CloseOutlined />
                        </Button>
                    </div> */}
                    <div style={{ display: 'inline' }}>
                        <Button type="primary" onClick={() => history.push(`/admin/customers/create`)}>
                            <span style={{ color: "white" }}>Thêm khách hàng</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Đã chọn ${stateLoadding.selectedRowKeys.length} khách hàng` : ''}
                </span>
                <div style={{ display: 'inline', margin: 5 }}>

                    {/* {hasSelected ? <Select value="Chọn chức năng " style={{ width: 160 }} onChange={handleChange} >
                        <Option value="update">Cập nhật khách hàng</Option>
                        <Option value="delete">Xóa khách hàng</Option>
                    </Select> : ''} */}

                    {hasSelected && props.user.role === 3 ? <Button onClick={deleteCustomer} type="primary" danger>Xóa khách hàng</Button> : <></>}
                </div>
            </div>
            <Table
                columns={columns}
                //onRow={(record, index) => {return {onClick: event => {history.push(`/admin/customers/${record.id}/histories`);}}}}
                rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={mapCustomer()}
                locale={{
                    emptyText: <Empty description={"Không có khách hàng nào"} image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>, triggerDesc: 'Sắp xếp giảm dần', triggerAsc: 'Sắp xếp tăng dần', cancelSort: 'Bỏ sắp xếp', filterConfirm: 'Tìm kiếm',
                    filterReset: 'Đặt lại',
                }}
                // rowKey={record => record.login.uuid}
                pagination={false}
                //loading={state.loading}
                onChange={handleTableChange}
                onRow={(r) => ({
                    onClick: () => {
                        history.push(`/admin/customers/${r.id}`)
                    },

                })}
            />
            <div style={{ float: 'right', marginTop: 10 }}>
                <Pagination locale={{ items_per_page: '/ Trang' }} current={current} total={totalCustomer} defaultPageSize={size} onChange={onChange} showSizeChanger={true} pageSizeOptions={[5, 10, 20, 50]} onShowSizeChange={changePageSize} />
            </div>
        </>
    );
}

Customer.propTypes = {
    customerAction: PropTypes.shape({
        customerActionCreators: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {
        user: state.userReducer,
        listCustomer: state.customerReducer.customers,
        totalCustomer: state.customerReducer.totalItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        customerActionCreators: bindActionCreators(customerActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(Customer));