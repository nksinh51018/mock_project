import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'antd';
import Search from 'antd/lib/input/Search';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PaymentHistoriesActions from '../../actions/paymentHistories';
import { formatDate } from '../../utils/DateFormat';
import {formatMonney} from '../../utils/MonneyFormat';
import history from '../../history';

const columns = [
    {
        title: 'Mã phiếu',
        dataIndex: 'code',
        key: 'code',
        render: (text, data) => {
            return (<div className="link"> <NavLink to={`/admin/maintenanceCards/${data.id}`}>{data.maintenanceCard.code.toUpperCase()}</NavLink></div>)
        },
    },
    {
        title: 'Ngày thanh toán',
        dataIndex: 'createdDate',
        key: 'createdDate',
        render: (createdDate) => {
            if (createdDate !== null) {
                return (
                    <span>{formatDate(createdDate)}</span>
                )
            }
            return (
                <></>
            )
        }
    },
    {
        title: 'Số tiền',
        dataIndex: 'money',
        key: 'money',
        render: (money) => {
            if(money !== null) {
                return (
                <span>{formatMonney(money)} đ</span>
                )
            }
        }
    },
    {
        title: 'Phương thức',
        dataIndex: 'paymentMethod',
        key: 'paymentMethod',
        filters: [
            { text: 'Tiền mặt', value: '1' },
            { text: 'Chuyển khoản', value: '2' },
        ],
        render: (text, data) => {
            return (<div style={{paddingLeft: 15}}>{data.paymentMethod.id === 1 ? 'Tiền mặt' : 'Chuyển khoản'}</div>)
        },
    },

];

const PaymentHistories = (props) => {

    const [pageNumber, setPageNumber] = useState(1);
    const [size, setSize] = useState(5);
    const [search, setSearch] = useState('');
    const [current, setCurrent] = useState(1);
    const [filter, setFilter] = useState([1, 2]);

    const { paymentHistoriseActionCreators } = props;
    const { actGetPaymentHistoriesCustomer } = paymentHistoriseActionCreators;
    const { paymentHistories, totalPaymentHistories } = props;
    console.log(paymentHistories);

    //console.log(listMaintenanceCard);
    useEffect(() => {
        if (search === null && search.length === 0) {
            actGetPaymentHistoriesCustomer('', pageNumber, size, props.id, filter)
        } else {
            actGetPaymentHistoriesCustomer(search, pageNumber, size, props.id, filter)
        }
    }, [actGetPaymentHistoriesCustomer, search, pageNumber, size, props.id, filter]);


    const mapPaymentHistories = () => {
        let data = [];
        if (paymentHistories !== undefined) {
            data = paymentHistories.map((paymentHistory, _index) => {
                return {
                    key: _index,
                    ...paymentHistory,
                }
            })
        }
        return data;
    }

    const handleTableChange = (_pagination, _filters, sorter) => {

        if (_filters !== undefined && _filters !== null) {
            if (_filters.paymentMethod !== null) {
                if (_filters.paymentMethod.length === 1) {
                    if (_filters.paymentMethod[0] === "1") {
                        setFilter([1])
                    } else {
                        setFilter([2])
                    }
                } else {
                    setFilter([1, 2])
                }
            }else{
                setFilter([1,2])
            }
        }

    };

    const onChange = (pageNumber) => {
        setCurrent(pageNumber)
        setPageNumber(pageNumber)
    }

    const changePageSize = (current, size) => {
        setPageNumber(current)
        setSize(size)
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const searchMaintenanceCard = (value) => {
        setSearch(value)
    }

    return (
        <>
            <div>
                <div style={{ float: 'right' }}>
                    <Search
                        placeholder="Tìm kiếm theo mã, ngày thanh toán"
                        onSearch={searchMaintenanceCard}
                        style={{ width: 400, marginTop: 10 }}
                        onChange={handleChangeSearch}
                        value={search}
                        allowClear={true}
                    />
                    {/* <div style={{ display: 'inline', margin: 5 }}>
                        <Button type="primary" shape="circle" onClick={handleCancel}>
                            <CloseOutlined />
                        </Button>
                    </div> */}

                </div>
            </div>
            <div style={{ marginBottom: 16 }}>
            </div>
            <Table
                columns={columns}
                dataSource={mapPaymentHistories()}
                // showSorterTooltip={false}
                // rowKey={record => record.login.uuid}
                pagination={false}
                onChange={handleTableChange}
                locale={{
                    filterConfirm: 'Tìm kiếm',
                    filterReset: 'Đặt lại',
                    emptyText: "Không có lịch sử thanh toán",
                    triggerDesc: 'Sắp xếp giảm dần',
                    triggerAsc: 'Sắp xếp giảm dần',
                    cancelSort: 'Hủy sắp xếp',
                }}
                onRow={(r) => ({
                    onClick: () => {
                        history.push(`/admin/maintenanceCards/${r.id}`)
                    },

                })}
            />
            <div style={{ float: 'right', marginTop: 10 }}>
                <Pagination current={current} total={totalPaymentHistories} defaultPageSize={size} onChange={onChange} showSizeChanger={true} pageSizeOptions={[5, 10, 20, 50]}
                    onShowSizeChange={changePageSize} locale={{ items_per_page: '/ Trang' }} />
            </div>

        </>
    );
};

const mapStateToProps = state => {
    return {
        paymentHistories: state.paymentReducer.paymentHistories,
        totalPaymentHistories: state.paymentReducer.totalItems
    }
};

const mapDispatchToProps = dispatch => {
    return {
        paymentHistoriseActionCreators: bindActionCreators(PaymentHistoriesActions, dispatch)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(PaymentHistories);