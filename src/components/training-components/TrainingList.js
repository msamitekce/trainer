import React, { useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, Input } from "@material-ui/core";

function TrainingsList() {
  
  const [gridApi, setGridApi] = useState();

  function onGridReady(params) {
    setGridApi(params.api);
  }

  const filterText = (e) => {
    gridApi.setQuickFilter(e.target.value);
  };

  const [trainings, setTrainings] = useState([]);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(data => setTrainings(data)).catch((error) => console.log(error));
  };

  useEffect(() => { fetchTrainings(); }, []);

  const deleteTraining = id => {
    if (window.confirm("Delete training?")) {
      const url = "https://customerrest.herokuapp.com/api/trainings/" + id;
      fetch(url, { method: "DELETE" })
        .then(response =>
          response.ok ? fetchTrainings() : alert("Error"))
        .catch(error => console.error(error));
    }
  };

  const gridColumns = [
    {
      headerName: "Date",
      field: "date",
      width: "150px",
      cellRendererFramework:
        params => moment(params.value)
          .format("DD.MM.YYYY HH:mm"),
      sortable: true,
      filter: true
    },

    {

      headerName: "Customer",
      field: "customer",
      width: "150px",
      cellRendererFramework: (params) => (
        <div>
          {params.value.firstname} {params.value.lastname}
        </div>
      ),
      sortable: true,
      filter: true
    },

    {
      headerName: "Duration",
      field: "duration",
      width: "100px",
      sortable: true,
      filter: true
    },

    {
      headerName: "Activity",
      field: "activity",
      sortable: true,
      filter: true
    },
    {
      headerName: "",
      width: "30px",
      field: "_links.self.href",
      cellRendererFramework: (params) => (
        <IconButton
          onClick={() => deleteTraining(params.data.id)}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div>
      <div
        className="ag-theme-material"
        style={{ height: "500px", width: "60%", margin: "auto" }}
      >
        <Input onChange={filterText} placeholder="Search"></Input>
        <AgGridReact
          onGridReady={onGridReady}
          columnDefs={gridColumns}
          rowData={trainings}
          pagination={true}
          paginationAutoPageSize={true}
          suppressCellSelection={true}
        />
      </div>
    </div>
  );
}

export default TrainingsList;