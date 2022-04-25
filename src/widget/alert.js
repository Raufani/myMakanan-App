import React, { Component } from 'react'
 
class Alert extends Component {
 
    HideNotif = () => {
        document.getElementById("notif").style.display = "none";
    }
 
    render() {
        const showing = this.props.data.alertShow;
        const actionType = this.props.data.actionType;
        const resCode = this.props.data.responCode;
 
        var style = ""
        var pesan = ""
 
        if (resCode === 201 && actionType === 'created') {
            style = "alert alert-success"
            pesan = " Data Berhasil Di Simpan ..."
        } else {
            if (resCode === 200 && actionType === 'updated') {
                style = "alert alert-info"
                pesan = " Data Berhasil Di Update ..."
            } else {
                if (resCode === 200 && actionType === 'deleted') {
                    style = "alert alert-warning"
                    pesan = " Data Berhasil Di Hapus ..."
                } else {
                    style = "alert alert-error"
                    pesan = " Error Terjadi Kesalahan..."
                }
            }
        }
 
        return (
            <div>
                {showing
                    ?
                    <div id="notif" className={style}>
                        <span className="closebtn" onClick={this.HideNotif}>&times;</span>
                        {pesan}
                    </div>
                    : null
                }
            </div>
        )
    }
}
 
export default Alert;