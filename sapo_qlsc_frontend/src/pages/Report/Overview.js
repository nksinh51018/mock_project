import React, { useEffect } from 'react';
import { DatePicker, Card, Row, Col, List, Table, Empty } from 'antd';
import { Line } from '@ant-design/charts';
//import { UserOutlined } from '@ant-design/icons';
//import TopService from './TopService';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as statisticActions from '../../actions/statistic';
import moment from 'moment';
import iconTotal from '../../asset/iconfinder_cash.png';
import iconCustomer from '../../asset/customer.png';
import maintenace_card from '../../asset/maintenance_card.png';
import maintenance_card_sc from '../../asset/sc.png';
import paying from '../../asset/paying.png';
import no_money from '../../asset/not_pay.png';
import debt from '../../asset/debt.png';
import {formatMonney} from '../../utils/MonneyFormat';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

const Overview = (props) => {

    const { statisticActionCreators } = props;
    const { actGetTotalToday, actGetTotalMoney, actGetTopRepairman, actGetTopService } = statisticActionCreators;
    const { totalCustomerToday, totalLiabilities, totalMaintenanceCardToday, totalMaintenanceCards, totalMaintenanceCardSuccessToday, totalMaintenanceCardScNotPay, totalMaintenanceCardScPayed, totalMoney, totalDayMoney, topRepairMans, topServices } = props;

    //console.log(topServices);
    //console.log(moment().clone().subtract(0, 'month').startOf('month').format('DD/MM/YYYY'));
    useEffect(() => {
        var startDate = moment().clone().subtract(0, 'month').startOf('month').format('DD/MM/YYYY');
        actGetTotalToday(startDate, moment().format('DD/MM/YYYY'));
        actGetTotalMoney(startDate, moment().format('DD/MM/YYYY'));
        actGetTopRepairman(startDate, moment().format('DD/MM/YYYY'));
        actGetTopService(startDate, moment().format('DD/MM/YYYY'));
    }, [actGetTotalToday, actGetTotalMoney,actGetTopRepairman,actGetTopService]);


    const onChange = (date, dateString) => {
        if (dateString !== undefined) {
            //console.log(dateString[0].format("DD-MM-YYYY"));
            //console.log(dateString[1]);
            actGetTotalMoney(dateString[0], dateString[1]);
            actGetTotalToday(dateString[0], dateString[1]);
            actGetTopRepairman(dateString[0], dateString[1]);
            actGetTopService(dateString[0], dateString[1]);
        }
    }

    const columnsTopService = [
        {
            title: 'Tên dịch vụ',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Số lần sử dụng',
            dataIndex: 'totalMaintenanceCard',
            key: 'totalMaintenanceCard',
            render: (text) =>  (<div style={{paddingLeft: 35}}>{text} lần</div>)

        }
    ]

    const columnsTopRepairMan = [
        {
            title: 'Tên nhân viên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Số phiếu hoàn thành',
            dataIndex: 'totalMaintenanceCard',
            key: 'totalMaintenanceCard',
            render: (text) =>  (<div style={{paddingLeft: 50}}>{text} phiếu</div>)
        }
    ]
    const dataCustomer = [
    
        {
            icon: maintenace_card,
            title: totalMaintenanceCardToday + ' Phiếu đã tạo',
        },
        {
            icon: maintenance_card_sc,
            title: totalMaintenanceCardSuccessToday + ' Phiếu hoàn thành',
        },
        {
            icon: no_money,
            title: totalMaintenanceCardScNotPay + ' Phiếu HT - Chưa thanh toán',
        },
        {
            icon: paying,
            title: totalMaintenanceCardScPayed + ' Phiếu HT - Đã thanh toán',
        },
        
    ];

    const mapTopRepairMan = () => {
        let data = [];
        if (topRepairMans !== undefined) {
            data = topRepairMans.map((topRepairMan, index) => {
                return {
                    ...topRepairMan,
                    key: index
                }
            })
        }
        return data;
    }

    const mapTopService = () => {
        let data = [];
        if (topServices !== undefined) {
            data = topServices.map((topService, index) => {
                return {
                    ...topService,
                    key: index
                }
            })
        }
        return data;
    }

    const mapTotalDayMoney = () => {
        let data = [];
        if (totalDayMoney !== undefined) {
            data = totalDayMoney.map((totalDay, index) => {
                return {
                    ...totalDay,
                    key: totalDay.id,
                    year: totalDay.date,
                    'Doanh thu': totalDay.totalDayMoney
                }
            })
        }
        return data;
    }

    const config = {
        data: mapTotalDayMoney(),
        xField: 'year',
        yField: 'Doanh thu',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa'
            },
        },
        
    };

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <span style={{ fontWeight: 'bold', fontSize: 36 }}>
                    Tổng quan báo cáo
                </span>
                <p>
                    Dữ liệu được tổng hợp đến hết ngày {moment().format('DD/MM/YYYY h:mm') }
                </p>
                <RangePicker allowClear={false} defaultValue={[(moment().clone().subtract(0, 'month').startOf('month')), moment()]}
                    onChange={onChange} picker="week" format={dateFormat}
                    locale={locale}
                    disabledDate={d => !d || d.isAfter(moment())} 
                    style={{cursor: "pointer"}} 
                    />
            </div>
            <div style={{ marginTop: 35 }}>
                <Row>
                    <Col span={16}>
                        <Card title="Tình hình kinh doanh toàn cửa hàng" bordered={false} style={{ width: '100%' }}>
                            <div style={{ height: 250, marginTop: 30 }}>
                                <Line {...config} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={8} style={{ paddingLeft: '2%' }}>
                        <Card title="Thông tin kinh doanh ngày hôm nay" bordered={false} style={{ width: '100%', minHeight: 388 }}>
                            <div style={{ height: 250, marginTop: -15 }}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={dataCustomer}
                                    renderItem={item => (
                                        <List.Item>
                                            <img style={{width: '5%', marginRight: 15}} src={item.icon} alt="total money"/>                                          
                                            <List.Item.Meta style={{ paddingRight: 19 }}
                                                title={item.title}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div style={{ marginTop: 20 }}>
                <Row>
                    <Col span={24}>
                        <Row>
                            <Col span={8} style={{}}>
                                <Card style={{ height: 83}}>
                                    <div style={{ display: "flex" }}>
                                        <div style={{width: 35, height: 25}}>
                                            <img style={{width: '100%'}} src={iconTotal} alt="total money"/>
                                        </div>
                                        <div style={{ float: 'left', margin: -15, marginLeft: 20, marginTop: -12 }}>
                                            <h2 style={{ marginBottom: -3 }}>{formatMonney(totalMoney)} <span >đ</span></h2>
                                        Tổng doanh thu
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8} style={{paddingLeft: '2%' }}>
                            <Card style={{ height: 83}}>
                                    <div style={{ display: "flex" }}>
                                        <div style={{width: 35, height: 25}}>
                                            <img style={{width: '100%'}} src={debt} alt="total money"/>
                                        </div>
                                        <div style={{ float: 'left', margin: -15, marginLeft: 20, marginTop: -12 }}>
                                            <h2 style={{ marginBottom: -3 }}>{formatMonney(totalLiabilities)} <span >đ</span></h2>
                                        Tổng nợ của khách
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8} style={{paddingLeft: '2%' }}>
                            <Card style={{ height: 83}}>
                                    <div style={{ display: "flex" }}>
                                        <div style={{width: 35, height: 25}}>
                                            <img style={{width: '100%'}} src={maintenace_card} alt="total money"/>
                                        </div>
                                        <div style={{ float: 'left', margin: -15, marginLeft: 20, marginTop: -12 }}>
                                            <h2 style={{ marginBottom: -3 }}>{totalMaintenanceCards} <span >phiếu</span></h2>
                                        Tổng số phiếu 
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <div style={{ marginTop: 20 }}>

                <Row >
                    <Col span={11} style={{ backgroundColor: 'white' }}>
                        <Card title="Top dịch vụ được sử dụng " bordered={false} style={{ width: '105%', minHeight: 442 }}>
                            <div>
                                {/* top dịch vụ được sử dụng */}
                                <div>
                                    <Table locale={{ emptyText: <Empty description={"Không có dữ liệu"} image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>}} style={{ marginTop: -15 }} dataSource={mapTopService()} columns={columnsTopService} pagination={false} />
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={11} style={{paddingLeft: 5}}>
                        <Card title="Top nhân viên sửa xe" bordered={false} style={{ width: '109%', minHeight: 442 }}>
                            <div>
                                {/* top nhân viên sửa xe */}
                                <div>
                                    <Table locale={{ emptyText: <Empty description={"Không có dữ liệu"} image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>}} style={{ marginTop: -15 }} dataSource={mapTopRepairMan()} columns={columnsTopRepairMan} pagination={false} />
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        totalCustomerToday: state.statisticReducer.totalCustomer,
        totalMaintenanceCardToday: state.statisticReducer.totalMaintenanceCard,
        totalMaintenanceCards: state.statisticReducer.totalMaintenanceCards,
        totalMaintenanceCardSuccessToday: state.statisticReducer.totalMaintenanceCardSuccess,
        totalMaintenanceCardScNotPay: state.statisticReducer.totalMaintenanceCardScNotPay,
        totalMaintenanceCardScPayed: state.statisticReducer.totalMaintenanceCardScPayed,
        totalMoney: state.statisticReducer.totalMoney,
        totalDayMoney: state.statisticReducer.totalDayMoney,
        topRepairMans : state.statisticReducer.topRepairMans,
        topServices: state.statisticReducer.topServices,
        totalLiabilities: state.statisticReducer.totalLiabilities,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        statisticActionCreators: bindActionCreators(statisticActions, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(Overview));