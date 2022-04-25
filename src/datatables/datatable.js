import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import lodash from 'lodash';

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
        
        <button className="my-button btn-red">
            Delete
        </button>
      </div>
      )
  }
];



function AllData() {

  const [users, setUsers] = useState({});
  const [page, setPage] = useState(1);
  const countPerPage = 5;

  
  
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

  return (

    
    <div className="App">

    

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