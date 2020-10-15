import * as  Contraint  from "../constants/employee";
export const actFetchData =(pageNum,pageSize,sortBy,descending,param)=>{
return {
    type: Contraint.FETCH_EMPLOYEE,
    payload:{
        pageNum,pageSize,sortBy,descending,param
    }
}
}
export const actFetchDataFailed =(data)=>{
   return{
    type:Contraint.FETCH_EMPLOYEE_FAILED,
    payload:{
        data
    }
   }
}
export const actFetchDataSuccess =(data)=>{
    return{
     type:Contraint.FETCH_EMPLOYEE_SUCCESS,
     payload:{
         data
     }
    }
 }
export const actCreateEmployee =(data)=>{
    return{
     type:Contraint.CREATE_EMPLOYEE,
     payload:{
         data
     }
    }
 }
 export const actCreateEmployeeFailed =(data)=>{
    return{
     type:Contraint.CREATE_EMPLOYEE_FAILED,
     payload:{
         data
     }
    }
 }
 export const actCreateEmployeeSuccess =(data)=>{
    return{
     type:Contraint.CREATE_EMPLOYEE_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actUpdateEmployee =(data,id)=>{
    return{
     type:Contraint.UPDATE_EMPLOYEE,
     payload:{
         data,id
     }
    }
 }
 export const actUpdateEmployeeSuccess =(data)=>{
    return{
     type:Contraint.UPDATE_EMPLOYEE_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actUpdateEmployeeFailed =(data)=>{
    return{
     type:Contraint.UPDATE_EMPLOYEE_FAILED,
     payload:{
         data
     }
    }
 }
 export const actDeleteEmployee =(data)=>{
     console.log(data);
    return{
     type:Contraint.DELETE_EMPLOYEE,
     payload:{
         data
     }
    }
 }
 export const actDeleteEmployeeSuccess =(data)=>{
    return{
     type:Contraint.DELETE_EMPLOYEE_SUCCESS,
     payload:{
         data
     }
    }
 }
 export const actDeleteEmployeeFailed =(data)=>{
    return{
     type:Contraint.DELETE_EMPLOYEE_FAILED,
     payload:{
         data
     }
    }
 }
 export const actGetEmployee =(id) =>{
     return{
         type:Contraint.GET_ITEM_EMPLOYEE,
         payload:{
             id
         }
     }
 }
 export const actGetEmployeeSuccess = (data) =>{
    return{
        type:Contraint.GET_ITEM_SUCCESS,
        payload:{
            data
        }
    }
 }
 export const actGetEmployeeFailed = (data) =>{
    return{
        type:Contraint.GET_ITEM_FAILED,
        payload:{
            data
        }
    }
 }

 export const changePasswordUser = (data) =>{
    return{
        type:Contraint.CHANGE_PASSWORD_USER,
        payload:{
            data
        }
    }
 }
 export const changePasswordUserSuccess = (data) =>{
    return{
        type:Contraint.CHANGE_PASSWORD_USER_SUCCESS,
        payload:{
            data
        }
    }
 }

export const changePasswordUserFailed = (data) =>{
   return{
       type:Contraint.CHANGE_PASSWORD_USER_FAILED,
       payload:{
           data
       }
   }
}
export const actgetMaintenanceCardByUserId = (id,pageNum,pageSize,sortBy,descending,code,payStatus,workStatus) =>{
     
    return{
        type:Contraint.GET_MAINTENANCECARD_BY_USER_ID,
        payload:{
            id,pageNum,pageSize,sortBy,descending,code,payStatus,workStatus
        }
    }
 }

 export const actgetMaintenanceCardByUserIdSuccess = (data) =>{

    return{
        type:Contraint.GET_MAINTENANCECARD_BY_USER_ID_SUCCESS,
        payload:{
            data
        }
      
    }
 }
 export const actgetMaintenanceCardByUserIdFailed = (data) =>{
    return{
        type:Contraint.GET_MAINTENANCECARD_BY_USER_ID_FAILED,
        payload:{
            data
        }
      
    }
 }
