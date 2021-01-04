import React, { useEffect, useState } from 'react';
import { Table, Button, Select, Pagination, Tag } from 'antd';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as historyActions from '../../../actions/history';
import { formatDate } from '../../../utils/DateFormat'
import history from '../../../history'
import { formatMonney } from '../../../utils/MonneyFormat'
import { formatPlate } from '../../../utils/PlatesNumberFormat'
const columns = [
    {
        title: 'Thời gian',
        dataIndex: 'createdDate',
        key: 'createdDate',
        sorter: true,
        render: (text, data) => {
            return (<div>{formatDate(text)}</div>)
        },
    },
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
        render: (name) => {
            return (<div>{name}</div>)
        },
    },
    {
        title: 'Ghi chú',
        dataIndex: 'note',
        key: 'note',
        render: (note) => {
            return (<div>{note}</div>)
        },
    },
    {
        title: 'Thay đổi',
        dataIndex: 'amountChargeInUnit',
        key: 'amountChargeInUnit',
        render: (amountChargeInUnit) => {
            return (<div>{amountChargeInUnit}</div>)
        }
    },
    {
        title: 'Còn lại',
        dataIndex: 'stockRemain',
        key: 'stockRemain',
        render: (stockRemain) => {
            return (<div>{stockRemain}</div>)
        }
    },

];

const { Option } = Select;

const ProductHistory = (props) => {

    const [pageNumber, setPageNumber] = useState(0);
    const [size, setSize] = useState(10);
    const [listProductHistory, setListProductHistory] = useState([]);

    const {historyActionCreators} = props;
    const {actFetchData} = historyActionCreators;

    useEffect(() => {
        actFetchData(pageNumber,size)
    }, [pageNumber, size,actFetchData]);

    useEffect(() => {
        setListProductHistory(props.listhistory.content)

    }, [props.listhistory]);

    const changePageSize = (current,value)=>{
        setSize(value)
    }

    const onChange = (value)=>{
        setPageNumber(value-1)
    }

    return (
        <>
            <div style={{ marginTop: 25 }}>
                <span style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 40 }}>
                    Lịch sử
                </span>
            </div>
            <Table
                columns={columns}
                // rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={listProductHistory}
                // showSorterTooltip={false}
                // rowKey={record => record.login.uuid}
                pagination={false}
                // onChange={handleTableChange}
                locale={{
                    filterConfirm: 'Tìm kiếm',
                    filterReset: 'Đặt lại',
                    emptyText: "Không có phiếu sửa chữa nào",
                    triggerDesc: 'Sắp xếp giảm dần',
                    triggerAsc: 'Sắp xếp giảm dần',
                    cancelSort: 'Hủy sắp xếp',
                }}

                onRow={(r) => ({
                    onClick: () => {
                        history.push(`/admin/product/${r.productId}`)
                    },

                })}
            />
            <div style={{ float: 'right', marginTop: 10 }}>
                <Pagination current={props.listhistory.number+1} total={props.listhistory.totalElements} defaultPageSize={size} showSizeChanger={true} pageSizeOptions={[5, 10, 20, 50]}
                    onShowSizeChange={changePageSize}  onChange={onChange}
                    locale={{ items_per_page: '/ Trang' }}
                    />
            </div>

        </>
    );
}

const mapStateToProps = state => {
    return {
        listhistory: state.historyReducer,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        historyActionCreators: bindActionCreators(historyActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductHistory);