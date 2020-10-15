import { CloseOutlined } from "@ant-design/icons";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import { Button, Pagination, Table } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as getAccessoriesAction from "../../../actions/accessories";
import * as deleteAccessoryAction from "../../../actions/deleteAccessory";
import { deleteAccessory } from "../../../apis/accessory";

const columns = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    render: (code, data) => {
      return <Link to={`/admin/accessories/detail/${data.id}`}>{code}</Link>;
    },
  },
  {
    title: "Linh kiện",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Đơn vị",
    dataIndex: "unit",
    key: "unit",
  },
  {
    title: "Giá mỗi đơn vị",
    dataIndex: "pricePerUnit",
    key: "pricePerUnit",
  },
];

const ProductList = (props) => {
  const history = useHistory();
  const [state, setState] = useState({
    data: [],
    pagination: {
      current: 1,
      size: 8
    },
    selectedRowKeys: [],
    loading: false
  });
  const [pagination, setPagination] = useState({
    current: 1,
    size: 8
  })
  const [stateLoading, setStateLoading] = useState({
    selectedRowKeys: [],
    loading: false,
  });
  const [search, setSearch] = useState("");
  const handleTableChange = (pagination, filters, sorter) => {
    console.log(sorter);
  };

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRowKeys });
    }
  };
  const onPageChange = (pageNumber) => {
    // setState({ ...state, pagination: { ...state.pagination, current: pageNumber } });
    setPagination({ ...pagination, current: pageNumber });
  };
  const handleShowSizeChange = (current, pageSize) => {
    setPagination({ ...pagination, size: pageSize });
  }
  const hasSelected = state.selectedRowKeys.length > 0;
  const { productsActionCreator } = props;
  const { productDeleteActionCreator } = props;
  const { actionGetAccessories } = productsActionCreator;
  const { actionDeleteAccessory } = productDeleteActionCreator;
  const [reset, setReset] = useState(false);
  const handleDelete = () => {
    state.selectedRowKeys.map((id) => {
      actionDeleteAccessory(id);
    });
    setState({ ...state, selectedRowKeys: [] });
    setReset(!reset);
  }
  useEffect(() => {
    actionGetAccessories(search, pagination.current, pagination.size);
  }, [reset, search, actionGetAccessories, pagination]);
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8, fontWeight: "bold", fontSize: 40 }}>
          Linh kiện
        </span>
        <div style={{ float: "right", paddingTop: "20px" }}>
          <Search
            placeholder="Nhập tên hoặc mã linh kiện"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            style={{ width: 250 }}
          />
          <div style={{ display: "inline", margin: 5 }}>
            <Button type="primary" shape="circle">
              <CloseOutlined />
            </Button>
          </div>
          <div style={{ display: "inline", margin: 5 }}>
            <Button
              type="primary"
              onClick={() => history.push("/admin/accessories/create")}
            >
              <span>Thêm linh kiện</span>
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
              <Button onClick={handleDelete} type="danger" disabled={!hasSelected} loading={state.loading} style={{ display: 'inline', marginLeft: 8 }}>
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
        dataSource={props.accessories}
        rowKey={(accessories) => accessories.id}
        pagination={false}
        onChange={handleTableChange}
      />
      <div style={{ float: "right", marginTop: 10 }}>
        <Pagination
          current={pagination.current}
          total={props.totalItems}
          defaultPageSize={5}
          onChange={onPageChange}
          // showSizeChanger={true}
          pageSizeOptions={[5, 10, 15, 20]}
          onShowSizeChange={handleShowSizeChange}
          defaultCurrent={pagination.current}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    accessories: state.accessoriesReducer.content,
    totalItems: state.accessoriesReducer.totalElements,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    productsActionCreator: bindActionCreators(getAccessoriesAction, dispatch),
    productDeleteActionCreator: bindActionCreators(deleteAccessoryAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
