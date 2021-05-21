import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, Input } from "@material-ui/core";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "../training-components/AddTraining";

function CustomerList() {

  const [gridApi, setGridApi] = useState(null);

  function onGridReady(params) {
    setGridApi(params.api);
  }

  const [customers, setCustomers] = useState([]);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(error => console.log(error));
  };

  const filterText = (e) => {
    console.log(e.target.value);
    gridApi.setQuickFilter(e.target.value);
  };

  const addCustomer = (newCustomer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      body: JSON.stringify(newCustomer),
      headers: { "Content-type": "application/json" },
    })
      .then(response => {
        if (response.ok) {
          fetchCustomers();
          alert("Customer added!");
        } else {
          alert("Error");
        }
      })
      .catch(error => console.error(error));
  };

  const addTraining = (newTraining) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      body: JSON.stringify(newTraining),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          fetchCustomers();
          alert("Training added!");
        } else {
          alert("Error");
        }
      })
      .catch(error => console.error(error));
  };

  const editCustomer = (url, customerData) => {
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(customerData),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          fetchCustomers();
          alert("Edited!");
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Do you want to delete")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchCustomers();
            alert("Deleted!");
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.error(err));
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  const gridColumns = [
    {
      headerName: "",
      field: "links",
      cellRendererFramework: (params) => (
        <div>
          <AddTraining
            addTraining={addTraining}
            customerLink={params.value[0].href}
            customerData={params.data}
          />
        </div>
      ),
    },

    { field: "firstname", sortable: true, width: "140px" },
    { field: "lastname", sortable: true, width: "120px" },

    {
      headerName: "",
      width: "60px",
      field: "links",
      cellRendererFramework: (params) => (
        <div>
          <EditCustomer
            customer={params.data}
            link={params.value[0].href}
            edit={editCustomer}
          />
        </div>
      ),
    },
    {
      headerName: "",
      width: "60px",
      field: "links",
      cellRendererFramework: (params) => (
        <div>
          <IconButton
            onClick={() => deleteCustomer(params.value[0].href)}
            size="small">
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
    { field: "email", sortable: true, width: "150px" },
    { field: "streetaddress", sortable: true },
    { field: "city", sortable: true, width: "120px" },
    { field: "postcode", sortable: true, width: "100px" },
    { field: "phone", sortable: true },
  ];

  return (
    <div>
      <div
        className="ag-theme-material"
        style={{ height: "450px", width: "90%", margin: "auto" }}
      >
        <Input onChange={filterText} placeholder="Search"></Input>

        <AddCustomer addCustomer={addCustomer} />

        <AgGridReact
          onGridReady={onGridReady}
          rowData={customers}
          columnDefs={gridColumns}
          pagination={true}
          paginationAutoPageSize={true}

        />
      </div>
    </div>
  );
}

export default CustomerList;