import  React from 'react';
import MessageItem from '../MessageItem';

const data = [
    {
        id: 1,
        title: "test 1",
        content: "content 1 dsadd dddddddddddddddddddddddddddddddda",
        url:"/admin/maintenanceCards/73",
        status: 1,
        createdDate: "2020/08/08 12:09"
    },
    {
        id: 2,
        title: "test 1",
        content: "content 1",
        url:"/admin/maintenanceCards/73",
        status: 0,
        createdDate: "2020/08/08 12:09"
    },
]

const Message = (props)=>{

    const renderItem = ()=>{
        let result = [];

        result = data.map((item,index)=>{
            return <MessageItem item={item} key={item.id} />
        })

        return result;
    }

    return(
        <>
            {renderItem()}
        </>
    )

}

export default Message;