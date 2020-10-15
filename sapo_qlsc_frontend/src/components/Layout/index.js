import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  MenuFoldOutlined,
  MailOutlined,
  UserOutlined, CreditCardFilled, ToolFilled, SmileOutlined, ProfileOutlined, FundFilled, IdcardFilled, IdcardOutlined, ProfileFilled, UnorderedListOutlined, PlusCircleOutlined, AppstoreFilled, SplitCellsOutlined
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import "./index.css";
import history from "../../history";
import { connect } from "react-redux";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;


const Layout1 = (props) => {
  const [state, setState] = useState({
    collapsed: false,
  });
  const [user, setuser] = useState({
    role: 3
  });

  useEffect(() => {
    setuser(props.user)
  }, [props.user]);

  const height = window.innerHeight;

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{ height: "auto", minHeight: height, position: "relative" }}
      >
        <div className="logo" style={{ margin: 10, position: "fixed" }}>
          <NavLink to="/admin">
            <img
              src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg?v=202009161225"
              alt="sapo"
              style={{ width: 100, backgroundSize: "cover" }}
            />
          </NavLink>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          style={{
            width: state.collapsed ? "50px" : "200px",
            minHeight: height,
            position: "fixed",
            top: 60,
          }}
        >
          <SubMenu key="sub1" icon={<CreditCardFilled />} title="Phiếu sửa chữa">
            {
              user.role !== 2 ? (
                <Menu.Item key="1">
                  <NavLink to="/admin/maintenanceCards/create" icon={<PlusCircleOutlined />}>
                    Tạo phiếu sửa chữa
                  </NavLink>
                </Menu.Item>
              ) : <></>
            }

            <Menu.Item key="2" icon={<UnorderedListOutlined />}>
              <NavLink to="/admin/maintenanceCards">
                Danh sách phiếu sửa chữa
              </NavLink>
            </Menu.Item>
          </SubMenu>
          {user.role === 1 || user.role === 3 ? (
            <>
              <SubMenu key="sub2" icon={<SmileOutlined />} title="Khách hàng">
                <Menu.Item key="3" icon={<PlusCircleOutlined />}>
                  <NavLink to="/admin/customers/create">Tạo khách hàng</NavLink>
                </Menu.Item>
                <Menu.Item key="4" icon={<UnorderedListOutlined />}>
                  <NavLink to="/admin/customers">Danh sách khách hàng</NavLink>
                </Menu.Item>
              </SubMenu>
            </>
          ) : <></>}

          {
            user.role === 3 ?
              (<>
                {/* <SubMenu key="sub3" icon={<ToolFilled />} title="Linh kiện">
                  <Menu.Item key="5" icon={<PlusCircleOutlined />}>
                    <NavLink to="/admin/accessories/create">Tạo linh kiện</NavLink>
                  </Menu.Item>
                  <Menu.Item key="6" icon={<UnorderedListOutlined />}>
                    <NavLink to="/admin/accessories">Danh sách linh kiện</NavLink>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" icon={<ProfileFilled />} title="Dịch vụ">
                  <Menu.Item key="7" icon={<PlusCircleOutlined />}>
                    <NavLink to="/admin/services/create">Tạo dịch vụ</NavLink>
                  </Menu.Item>
                  <Menu.Item key="8" icon={<UnorderedListOutlined />}>
                    <NavLink to="/admin/services">Danh sách dịch vụ</NavLink>
                  </Menu.Item>
                </SubMenu> */}
                <SubMenu key="sub4" icon={<ToolFilled />} title="Sản phẩm">
                  <Menu.Item key="7" icon={<PlusCircleOutlined />}>
                    <NavLink to="/admin/products/create">Tạo sản phẩm</NavLink>
                  </Menu.Item>
                  <Menu.Item key="8" icon={<UnorderedListOutlined />}>
                    <NavLink to="/admin/products">Danh sách sản phẩm</NavLink>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" icon={<IdcardOutlined />} title="Nhân viên">
                  <Menu.Item key="9" icon={<PlusCircleOutlined />}>
                    <NavLink to="/admin/employees/create">Tạo nhân viên</NavLink>
                  </Menu.Item>
                  <Menu.Item key="10" icon={<UnorderedListOutlined />}>
                    <NavLink to="/admin/employees">Danh sách nhân viên</NavLink>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub7" icon={<FundFilled />} title="Báo cáo">
                  <Menu.Item key="13">
                    <NavLink to="/admin/analytics/dashboard">Tổng quan</NavLink>
                  </Menu.Item>
                </SubMenu></>
              ) : ""
          }
          <SubMenu
            style={{
              position: "fixed",
              bottom: 0,
              width: state.collapsed ? "80px" : "200px",
            }}
            key="sub6"
            icon={<UserOutlined />}
            title={user.fullName}
          >
            <Menu.Item key="12">
              <div onClick={() => {
                localStorage.clear();
                
                history.push("/login")
                window.location.reload();
              }}>Đăng xuất</div>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            backgroundColor: "#fff",
            position: "fixed",
            width: "100%",
            zIndex: 99
          }}
        >
          {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })} */}
          <MenuFoldOutlined
            className="trigger"
            onClick={toggle}
            style={{ margin: 10, zIndex: 999 }}
          />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "43px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  }
}


export default connect(mapStateToProps, null)(Layout1);
