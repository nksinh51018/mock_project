
import React, { useState, useEffect } from 'react';
import { Table, Button, Select, Pagination, Badge, Modal, Spin, message } from 'antd';
import Search from 'antd/lib/input/Search';
import { CloseOutlined, SettingOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as employeeActions from '../../actions/employee';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import history from '../../history'

const columns = [
    {
        title: 'Mã ',
        dataIndex: 'code',
        key: 'code',
        // width: '10%',
        sorter: true,
        render: (text, data) => <Link className="link" to={`/admin/employees/${data.id}`}>{text.toUpperCase()}</Link>
    },

    {
        title: 'Tên nhân viên',
        dataIndex: 'fullName',
        key: 'fullName',
        // width: '20%',
        sorter: true,


    },
    {
        title: 'Email',
        dataIndex: 'email',
        // width: '19%',
        key: 'email',
        sorter: true,
    },
    {
        title: 'SĐT',
        dataIndex: 'phoneNumber',
        // width: '10%',
        key: 'phoneNumber',
        sorter: true,
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        // width: '15%',
        key: 'role',
        sorter: true

    },
    {
        title: 'Số phiếu sửa chữa',
        dataIndex: 'totalMaintenanceCard',
        // width: '15%',
        key: 'totalMaintenanceCard',
        sorter: true
    }
];


const { Option } = Select;

const EmployeeList = (props) => {
    const [refesh, setRefesh] = useState(false);
    const handleOk = e => {
        let data = stateLoadding.selectedRowKeys;
        console.log(data);
        actDeleteEmployee(data);

        setState({
            visible: false,
        });
        setRefesh(true);
    };
    const handleCancel = e => {
        console.log(e);
        setState({
            visible: false,
        });
    };
    const showModal = () => {
        let allow = true;
        let data = stateLoadding.selectedRowKeys;
        let user = users.filter(val => val.role === 3)
        for (let i = 0; i < data.length; i++) {
            user.forEach(element => {
                if (element.id === data[i]) {
                    message.warning("Không được phép xóa người quản lý");
                    allow = false
                }
            });
        }
        if (allow) {
            setState({
                ...state, visible: true,
            });
        }

    };
    const [state, setState] = useState({
        visible: false
    });
    const [current, setCurrent] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [size, setSize] = useState(10);
    const [search, setSearch] = useState('');
    const { employeeActionsCreator } = props;
    console.log(props);
    const { actFetchData } = employeeActionsCreator;
    const { actDeleteEmployee } = employeeActionsCreator;
    const { users, totalPage, totalElement } = props;
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (search !== null && search.length > 0) {
            actFetchData(pageNumber, size, '', '', search);
        } else {
            actFetchData(pageNumber, size, '', '', '');
        }

    }, [actFetchData, search, pageNumber, size, current, loading])

    const pushDataToTable = () => {
        let hasRole = '';
        let data = [];
        if (users !== undefined) {
            data = users.map((val) => {
                if (val.role === 1) {
                    hasRole = "Nhân viên điều phối";
                } else if (val.role === 2) {
                    hasRole = "Nhân viên sửa chữa"
                } else {
                    hasRole = "Nhân viên Quản Lý"
                }
                return {
                    ...val,
                    role: hasRole,
                    key: val.id
                }
            });
        }
        return data;
    }

    const handleTableChange = (pagination, filters, sorter) => {

        let descending = sorter.order === 'ascend' ? 'asc' : 'desc';

        if (sorter && sorter !== undefined) {
            actFetchData(pageNumber, size, sorter.field, descending, search);
        }
    };

    const [stateLoadding, setStateLoadding] = useState({
        selectedRowKeys: [],
        loading: false,
    });

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setStateLoadding({ selectedRowKeys });

    };

    const rowSelection = {
        selectedRowKeys: stateLoadding.selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = stateLoadding.selectedRowKeys.length > 0;

    const onChange = (page) => {
        setCurrent(page)
        setPageNumber(page)
        setStateLoadding({
            selectedRowKeys: [],
            loading: false,
        });
    }
    const changePageSize = (current, size) => {

        setPageNumber(current)
        setSize(size)

    }
    const searchEmployee = (e) => {
        console.log(e);
    }
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
        actFetchData(pageNumber, size, '', '', search);
    }

    const [checkStrictly] = React.useState(false);
    return (

        <>
            <div style={{ marginTop: 25 }}>
                <span style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 40 }}>
                    Danh sách nhân viên
                </span>
                <div style={{ float: 'right' }}>
                    <Search
                        placeholder="Tìm kiếm nhân viên theo Tên, Mã, Email, hoặc SĐT"

                        style={{ width: 400, marginTop: 20, marginRight: 10 }}
                        onChange={handleChangeSearch}
                        value={search}
                        allowClear={true}
                    />


                    <div style={{ display: 'inline', margin: 5 }}>
                        <NavLink to="/admin/employees/create">
                            <Button type="primary">
                                <span>Thêm mới nhân viên</span>
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Đã chọn ${stateLoadding.selectedRowKeys.length} nhân viên` : ''}
                </span>
                <div style={{ display: 'inline', margin: 5 }}>
                    {hasSelected ? <Button onClick={showModal}>Xóa nhân viên</Button> : ''}

                </div>
            </div>
            <Table
                columns={columns}
                rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={pushDataToTable()}
                // rowKey={record => record.login.uuid}
                pagination={false}
                loading={pushDataToTable().length == 0 ? true : false}
                onChange={handleTableChange}
                locale={{
                    filterConfirm: 'Tìm kiếm',
                    filterReset: 'Đặt lại',
                    emptyText: "Không có nhân viên nào",
                    triggerDesc: 'Sắp xếp giảm dần',
                    triggerAsc: 'Sắp xếp giảm dần',
                    cancelSort: 'Hủy sắp xếp',
                }}
                onRow={(r) => ({
                    onClick: () => {
                        history.push(`/admin/employees/${r.id}`)
                    },

                })}
            />
            <div style={{ float: 'right', marginTop: 10 }}>
                <Pagination current={current} total={totalElement} defaultPageSize={size} onChange={onChange} showSizeChanger={true} pageSizeOptions={[5, 10, 20, 50]} onShowSizeChange={changePageSize} locale={{ items_per_page: '/ Trang' }} />
            </div>
            <Modal
                title="Xác nhận xóa "
                visible={state.visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Xóa'
                cancelText='Hủy Bỏ'

            >
                <Spin spinning={false} delay={500}>
                    Bạn có chắc chắn muốn xóa nhân viên này?
                </Spin>
            </Modal>
        </>
    );
}
EmployeeList.propTypes = {
    createEmployee: PropTypes.shape({
        employeeActionsCreator: PropTypes.func,
    })
}

const mapStateToProps = state => {
    return {
        users: state.employeeReducer.users,
        totalElement: state.employeeReducer.totalElement,
        currentPage: state.employeeReducer.currentPage,
        totalPage: state.employeeReducer.totalPage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        employeeActionsCreator: bindActionCreators(employeeActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(EmployeeList));
