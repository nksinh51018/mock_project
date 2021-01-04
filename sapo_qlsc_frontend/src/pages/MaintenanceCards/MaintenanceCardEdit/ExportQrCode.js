import React from 'react'
import { QRCode } from "react-qr-svg";
class ExportQrCode extends React.Component {

    
    render(){
        console.log(this.props.url);
        return(
            <QRCode value={this.props.url} style={{marginTop:"30px"}} />
        )
    }

}

export default ExportQrCode;