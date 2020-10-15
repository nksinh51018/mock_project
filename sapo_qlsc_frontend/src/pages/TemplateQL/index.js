import React, { useState } from 'react';
import { Table,  Button, Select, Pagination } from 'antd';
import Search from 'antd/lib/input/Search';
import { CloseOutlined, SettingOutlined, SortAscendingOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '12%',
        sorter: true,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        width: '30%',
        key: 'address',
    },
];

const data = [
    {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];

const { Option } = Select;

const TestTable = () => {

    const [state, setState] = useState({
        data: [],
        pagination: {
            current: 3,
            pageSize: 10,
        },
        loading: false,
    });

    const handleTableChange = (pagination, filters, sorter) => {
        console.log(sorter);
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

    const renderSelect = (hasSelected1) => {
        console.log(12);
        if (hasSelected1) {
            return (
                <Select defaultValue="lucy" style={{ width: 120 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            )
        }
        else {
            return (<></>)
        }
    }

    const onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
    }

    const [checkStrictly] = React.useState(false);
    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 40 }}>
                    Title
                </span>
                <div style={{ float: 'right' }}>
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                    />
                    <div style={{ display: 'inline', margin: 5 }}>
                        <Button type="primary" shape="circle">
                            <CloseOutlined />
                        </Button>
                    </div>
                    <div style={{ display: 'inline', margin: 5 }}>
                        <Button type="primary" >
                            <SortAscendingOutlined />
                            <span>Sắp xếp</span>
                        </Button>
                    </div>
                    <div style={{ display: 'inline', margin: 5 }}>
                        <Button type="primary" >
                            <SettingOutlined />
                            <span>Tùy chỉnh</span>
                        </Button>
                    </div>

                </div>
            </div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Đã chọn ${stateLoadding.selectedRowKeys.length} items` : ''}
                </span>
                <div style={{ display: 'inline', margin: 5 }}>
                    {hasSelected ? <Select defaultValue="lucy" style={{ width: 120 }} >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                            Disabled
                    </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select> : ''}
                </div>
            </div>
            <Table
                columns={columns}
                rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={data}
                // rowKey={record => record.login.uuid}
                pagination={false}
                loading={state.loading}
                onChange={handleTableChange}
            />
            <div style={{float:'right',marginTop: 10}}>
                <Pagination defaultCurrent={2} total={50} defaultPageSize={3} onChange={onChange} showSizeChanger={true} pageSizeOptions={[5, 10, 20, 50]} />
            </div>
        </>
    );
}

export default TestTable;