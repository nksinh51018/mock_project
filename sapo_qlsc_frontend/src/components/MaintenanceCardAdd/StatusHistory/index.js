import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Tag, Timeline } from 'antd';
import React, { useState, useEffect } from 'react';
import { formatDate } from '../../../utils/DateFormat';

const StatusHistory = (props) => {

    const [maintenanceCardDetailStatusHistories, setMaintenanceCardDetailStatusHistories] = useState([]);

    useEffect(() => {
        setMaintenanceCardDetailStatusHistories(props.maintenanceCardAdd.maintenanceCardDetailStatusHistories)
    }, [props.maintenanceCardAdd.maintenanceCardDetailStatusHistories]);

    const showStatusHistory = () => {
        let result = [];
        if (maintenanceCardDetailStatusHistories !== undefined) {
            const maintenanceCardDetailStatusHistories1 = maintenanceCardDetailStatusHistories.sort(function (a, b) {
                return new Date(a.createdDate) - new Date(b.createdDate);
            });
            result = maintenanceCardDetailStatusHistories1.map((maintenanceCardDetailStatusHistory, index) => {
                let title = "";
                let status = null;
                let color = ""
                if (maintenanceCardDetailStatusHistory.status === 0) {
                    title = "Thêm mới dịch vụ"
                    status = <Tag icon={<ExclamationCircleOutlined />} color="warning">
                        Đang chờ
                                    </Tag>
                    color = "orange"
                }
                else if (maintenanceCardDetailStatusHistory.status === 1) {
                    title = "Bắt đầu sửa"
                    status = <Tag icon={<SyncOutlined spin />} color="processing">
                        Bắt đầu sửa
                  </Tag>
                    color = "blue"
                }
                else if (maintenanceCardDetailStatusHistory.status === 2) {
                    title = "Hoàn thành"
                    status = <Tag icon={<CheckCircleOutlined />} color="success">
                        Hoàn thành
                  </Tag>
                    color = "green"
                }
                else if (maintenanceCardDetailStatusHistory.status === -1) {
                    title = "Đã xóa"
                    status = <Tag icon={<CloseCircleOutlined />} color="error">
                        Đã xóa
                  </Tag>
                    color = "red"
                }

                return (
                    <Timeline.Item color={color} key={index}>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                            <div>
                                <span style={{ fontWeight: 'bold' }}>{title}</span>
                                <p>{maintenanceCardDetailStatusHistory.name}</p>
                            </div>
                            <div>
                                <span style={{ fontWeight: 'bold' }}>{formatDate(maintenanceCardDetailStatusHistory.createdDate)}</span>
                                {/* <p>
                                    {status}
                                </p> */}
                            </div>
                        </div>
                    </Timeline.Item>

                )
            })
        }

        return result
    }

    return (
        <Timeline>
            {showStatusHistory()}
            {/* <Timeline.Item color="red">
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Tạo phiếu</span>
                        <p>- Thay săm</p>
                        <p>- Thay dầu</p>
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>12:00 24/09/2020</span>
                        <p>
                            <Tag icon={<ExclamationCircleOutlined />} color="warning">
                                Đang chờ
                                                    </Tag>
                        </p>
                        <p>
                            <Tag icon={<ExclamationCircleOutlined />} color="warning">
                                Đang chờ
                                                    </Tag>
                        </p>
                    </div>
                </div>
            </Timeline.Item>
            <Timeline.Item color="blue">
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Cập nhật dịch vụ</span>
                        <p>- Thay săm</p>
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>12:10 24/09/2020</span>
                        <p>
                            <Tag icon={<CheckCircleOutlined />} color="success">
                                Hoàn thành
                                                    </Tag>
                        </p>

                    </div>
                </div>
            </Timeline.Item>
            <Timeline.Item color="blue">
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Cập nhật dịch vụ</span>
                        <p>- Thay dầu</p>
                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>12:10 24/09/2020</span>
                        <p>
                            <Tag icon={<CheckCircleOutlined />} color="success">
                                Hoàn thành
                                                    </Tag>
                        </p>

                    </div>
                </div>
            </Timeline.Item>
            <Timeline.Item color="green">
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>Hoàn thành phiếu sửa chữa</span>

                    </div>
                    <div>
                        <span style={{ fontWeight: 'bold' }}>12:10 24/09/2020</span>
                        <p>
                            <Tag icon={<CheckCircleOutlined />} color="success">
                                Hoàn thành
                                                    </Tag>
                        </p>

                    </div>
                </div>
            </Timeline.Item> */}
        </Timeline>
    );
}

export default StatusHistory;