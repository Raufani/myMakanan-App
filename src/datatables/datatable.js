import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import lodash from 'lodash';
import Alert from '../page/alert/Alert'







function AllData() {

  const [users, setUsers] = useState({});
  const [page, setPage] = useState(1);
  const countPerPage = 5;
  const dataUser= [];       
  const totalData= 0;       
  const isUpdate= false; 
  const DataUserNew= {      
    nama_makanan: '',
    foto: '',
    id_wilayah: '',
  };
  const Notif= {            
    alertShow: false,
    actionType: '',
    responCode: 0,
  }

  
  const columns = [
    {
      name: '#',
      selector: '_id',
    },
    {
      name: 'Foto',
      selector: 'foto',
      cell: row => <img height="30px" width="30px" src={'../assets/upload_image/'+columns[0].selector} />
    },
    {
      name: 'Nama Makanan',
      selector: 'nama_makanan',
      sortable: true,
    right: true,
      reorder: true
    },
    {
      name: 'Nama Restorant',
      selector: 'id_restorant.nama_restorant',
      sortable: true,
    right: true,
      reorder: true
    },
    {
      name: 'Lokasi',
      selector: 'id_restorant.id_wilayah.nama_wilayah',
      sortable: true,
    right: true,
      reorder: true
    },
    {
      name: 'Kode Postal',
      selector: 'id_restorant.id_wilayah.kode_pos',
      sortable: true,
    right: true,
      reorder: true
    },
    {
        name: 'Action',
        button: true,
        cell: () => (
          <div>
          <button className='my-button btn-blue' type="button">
              Edit
          </button>
          
          <button className="my-button btn-red" onClick={
           
              axios.delete(`/makanan/`+columns[0].selector)
            
          }>
              Delete
          </button>
        </div>
        )
    }
  ];

  
  
  const customSort = (rows, selector, direction) => {
    return lodash.sortBy(rows, selector, direction);
  };
  
  const getUserList = () => {
    axios.get(`/makanan`).then(res => {
      setUsers(res.data);
    }).catch(err => {
      setUsers({});
    });
  }

  useEffect(() => {
    getUserList();
  }, [page]);



  const SaveNewDataUSer = () => {
    const Newdata = DataUserNew;

    fetch('/makanan', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Newdata)
    }).then((res) => {
        console.log(res)
        console.log("Status Create", res.status)
        this.setState({
          Notif: {
              alertShow: true,
              actionType: 'created',
              responCode: res.status,
          }
        })

        this.getUserList()
        this.ClearForm()
        
    });
  }

  


  const HandleSave = () => {
    SaveNewDataUSer();  
  }

  const HendelOnchange = (event) => {
    let prmInputUser = { ...DataUserNew }; 
    prmInputUser[event.target.name] = event.target.value;
    this.setState({
        DataUserNew: prmInputUser
    })

  }

  const ClearForm = () => {
    this.setState({
        isUpdate: false,
        DataUserNew: {
            _id:'',
            nama_makanan: '',
            foto:'',
            nama_wilayah: ''
            
        }
    })
  }

  return ( 
    
    <div className="App">
      <div className="container">
          <div className="titel">
            <Alert data={Notif} />
              <div className="form-inline" >
                  <label htmlFor="nama_guru">Nama Makanan:</label>
                  <input type="text" id="nama_makanan" placeholder="Nama" name="nama_makanan" onChange={HendelOnchange} value={DataUserNew.nama_makanan} />
                  
                  <label htmlFor="">Foto:</label>
                  <input type="text" id="foto" placeholder="Alamat" name="foto"  onChange={HendelOnchange} value={DataUserNew.foto}/>
                  <label htmlFor="alamat">Lokasi:</label>
                  <input type="text" id="id_wilayah" placeholder="Lokasi" name="id_wilayah"  onChange={HendelOnchange} value={DataUserNew.id_wilayah}/>
   
                  <button className="my-button btn-blue" onClick={HandleSave} >Simpan</button>
              </div>
          </div>
      </div>
    

      <h3>Daftar Makanan dan Lokasi Rumah Makan/Restorant</h3>
      <DataTable
        title="Makananku Rumahku"
        columns={columns}
        data={users}
        highlightOnHover
        pagination
        onColumnOrderChange={cols => console.log(cols)}
        //paginationServer
        sortFunction={customSort}
        paginationTotalRows={users.total}
        paginationPerPage={countPerPage}
        paginationComponentOptions={{
          noRowsPerPage: true
        }}
        onChangePage={page => setPage(page)}
      />
    </div>
  );
}

export default AllData;