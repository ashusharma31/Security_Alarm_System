import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./DataTableComponent.css";

const columns = [
  { field: 'id', headerName: 'ID', width: 100,
   align: 'center',
  headerAlign: 'center'},
  {
    field: 'towerId',
    headerName: 'Tower ID',
    width: 200,
    editable: true,
    align: 'center',
  headerAlign: 'center'
  },
  {
    field: 'temperature',
    headerName: 'Temperature(Celsius)',
    type: 'number',
    width: 200,
    editable: true,
    align: 'center',
  headerAlign: 'center'
  },
  {
    field: 'fuelStatus',
    headerName: "Fuel(Litre)",
    type: 'number',
    width: 200,
    editable: true,align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'powerSource',
    headerName: "Power Source",
    type: 'string',
    width: 200,
    editable: true,align: 'center',
    headerAlign: 'center'
  }
  // Add more columns as needed
];

const DataTableComponent = ({ rows }) => {
  return (
    <div className="data-grid-container" style={{ height: 400, width: '100%' }}>
      <DataGrid
      className="data-table"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default DataTableComponent;
