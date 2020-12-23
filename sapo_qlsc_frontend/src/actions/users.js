import * as Contraint from '../constants/users'
import { getUserByToken } from '../apis/users'
import { notification } from 'antd'
import history from '../history'
import { actFetchMaintenanceCardById } from './maintenanceCardAdd'
import { actFetchListMaintenanceCard } from './MaintenanceCard'
export const actlogin = (data) => {
    return {
        type: Contraint.LOGIN,
        payload: {
            data
        }

    }
}
export const actloginSuccess = (data) => {
    return {
        type: Contraint.LOGIN_SUCCESS,
        payload: {
            data
        }

    }
}
export const actloginFailed = (data) => {
    return {
        type: Contraint.LOGIN_FAILED,
        payload: {
            data
        }
    }
}

export const actCheckUser = (data) => {

    return (dispatch) => {
        getUserByToken(data).then((res) => {
            console.log("connecting to chat...")
            // eslint-disable-next-line no-undef
            let socket = new SockJS("http://localhost:8085" + '/chat');
            // eslint-disable-next-line no-undef
            let stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                stompClient.subscribe("/topic/messages/" + res.data.id, function (response) {
                    let data = JSON.parse(response.body);
                    console.log(data);
                    if (data.type.toString() === "1") {
                        const key = `open${Date.now()}`;
                        notification.open({
                            message: 'Đã nhận được phiếu sửa chữa mới',
                            onClick: () => {
                                notification.close(key)
                                history.push("/admin/maintenanceCards/" + data.message)
                                dispatch(actFetchMaintenanceCardById(data.message))
                            },
                            duration: 5,
                            style: {
                                cursor: "pointer"
                            },
                            key
                        });
                    }
                    else if (data.type.toString() === "2") {
                        const key = `open${Date.now()}`;
                        notification.open({
                            message: 'Một phiếu mới chờ thanh toán',
                            onClick: () => {
                                notification.close(key)
                                history.push("/admin/maintenanceCards/" + data.message)
                            },
                            duration: 5,
                            style: {
                                cursor: "pointer"
                            },
                            key
                        });
                        if (window.location.pathname === `/admin/maintenanceCards/${data.message}`) {
                            dispatch(actFetchMaintenanceCardById(data.message))
                        }
                    }
                    else if (data.type.toString() === "3") {
                        if (window.location.pathname === `/admin/maintenanceCards/${data.message}`) {

                            dispatch(actFetchMaintenanceCardById(data.message))
                        }

                        const key = `open${Date.now()}`;
                        notification.open({
                            message: `Phiếu ${data.code} đã được cập nhật`,
                            onClick: () => {
                                notification.close(key)
                                history.push("/admin/maintenanceCards/" + data.message)
                            },
                            duration: 10,
                            style: {
                                cursor: "pointer"
                            },
                            key
                        });

                    }

                });
            });
            // if(res.data.role === 3){
            //     history.push("/admin/analytics/dashboard")
            // }
            dispatch(actCheckUserSuccess(res.data))
        })
            .catch((e) => {
                console.log(e);
                history.push("/login")
            })
    }

    // return{
    //     type:Contraint.CHECK_USER,
    //     payload:{
    //         data
    //     }

    // }
}
export const actCheckUserSuccess = (data) => {
    return {
        type: Contraint.CHECK_USER_SUCCESS,
        payload: {
            data
        }

    }
}
export const actCheckUserFailed = (data) => {
    return {
        type: Contraint.CHECK_USER_FAILED,
        payload: {
            data
        }
    }
}