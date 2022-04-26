import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import lodash from 'lodash';
import Alert from '../page/alert/Alert'
import '../App.css'
import '../assets/style.css'
import '../assets/background.css'



function AllData() {

  const [users, setUsers] = useState({});
  const [page, setPage] = useState(1);
  const countPerPage = 5;
  const dataUser= [];       
  const totalData= 0;       
  const [isUpdate, setIsUpdate]= useState(false); 
  const [DataUserNew, setDataUserNew]= useState({
    _id:'',      
    nama_makanan: '',
    foto: '',
    id_restorant: '',
  });
  const [Notif, setNotif]= useState({            
    alertShow: false,
    actionType: '',
    responCode: 0,
  })

  
  const columns = [
    {
      name: '#',
      selector: '_id',
    },
    {
      name: 'Foto',
      selector: 'foto',
      cell: row => <img height="30px" width="30px" src={'./upload_image/'+row.foto} />
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

        cell: row => (
          <div>
          <button className='my-button btn-blue' onClick={()=>HendelUpdate(user)}>
              Edit
          </button>
          
          <button className="my-button btn-red" onClick={()=>HendelDelete(row._id)}
          //onClick={axios.delete(`/makanan/`+columns[0].selector)}
          >
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
    fetch('/makanan').then(res => {
      if (res.status === 200)
          return res.json()
      else
          return <p>No data Found</p>
    }).then(resdata => {
      setUsers(resdata)
    })
  }

  useEffect(() => {
    getUserList();
  }, [page]);



  const SaveNewDataUSer = () => {
    const Newdata = setDataUserNew;

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
        
        setNotif({
              alertShow: true,
              actionType: 'created',
              responCode: res.status,
        })
        

        getUserList()
        ClearForm()
        
    });
  }

  const UpdateDataUser = (data) => {
    const dataUpdate = DataUserNew;
    const id = dataUpdate._id;

    fetch('/makanan/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataUpdate)
    }).then((res) => {
        console.log(res)
        console.log("Status Update", res.status)

        setNotif = ({
            alertShow: true,
            actionType: 'updated',
            responCode: res.status,
        })


        getUserList()
        ClearForm()
    });
  }

  const DeleteDataUser = (data) => {
    const id = data;
    
    fetch('/makanan/' + id, {
        method: 'DELETE',
    }).then((res) => {
        setNotif({
            alertShow: true,
            actionType: 'deleted',
            responCode: res.status,
        })
        

        getUserList()
        ClearForm()
    });

  }


  const HandleSave = () => {
    if (isUpdate) {
        UpdateDataUser();
    } else {
        SaveNewDataUSer();
    } 
  }

  const HendelUpdate = (data) => {
      const id = data;
      setDataUserNew(data);
      setIsUpdate(true);    
  }

  const HendelDelete = (data) => {
    const id = data;

    if (window.confirm('Apakah anda akan menghapus data ' + id + ' ?')) {
        DeleteDataUser(id)
    }
  }

  const HendelOnchange = (event) => {
    let prmInputUser = { ...DataUserNew }; 
    prmInputUser[event.target.name] = event.target.value;
    setDataUserNew({
        DataUserNew: prmInputUser
    })

  }

  const ClearForm = () => {

        setIsUpdate(false);
        setDataUserNew({
            _id:'',
            nama_makanan: '',
            foto:'',
            id_restorant: ''
            
        })
  }

  return ( 
    
    
      <div className='img-bg-dt'>
      <div className="container">
          <div className="titel">
            <Alert data={Notif} />
              <div className="form-inline" >
                  <label htmlFor="nama_guru">Nama Makanan:</label>
                  <input type="text" id="nama_makanan" placeholder="Nama" name="nama_makanan" onChange={HendelOnchange} value={DataUserNew.nama_makanan} />
                  
                  <label htmlFor="">Foto:</label>
                  <input type="text" id="foto" placeholder="Foto" name="foto"  onChange={HendelOnchange} value={DataUserNew.foto}/>
                  <label htmlFor="alamat">ID Lokasi:</label>
                  <input type="text" id="id_restorant" placeholder="ID Restorant" name="id_restorant"  onChange={HendelOnchange} value={DataUserNew.id_restorant}/>
   
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