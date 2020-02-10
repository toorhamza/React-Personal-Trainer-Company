import React, { useState, useEffect, forwardRef } from "react";
import MaterialTable from "material-table";
import { FirstPage, AddBox, ArrowDownward, Search, Clear, Check, ChevronLeft, ChevronRight } from "@material-ui/icons";
import { DeleteOutline, Edit, SaveAlt, FilterList, LastPage, Remove, ViewColumn } from "@material-ui/icons";


const Customers = () => {
  const [data, setData] = useState([]);
  //table data for Material Table
  const [table, setTable] = useState({
    columns: [
      { title: "First Name", field: "firstname" },
      { title: "Last Name", field: "lastname" },
      { title: "Street Address", field: "streetaddress" },
      { title: "PostCode", field: "postcode" },
      { title: "City", field: "city" },
      { title: "Email", field: "email" },
      { title: "Phone", field: "phone" }
    ]
  });

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(res => res.json())
      .then(json => setData(json.content))
      .catch(e => console.error(e));
  };

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)

  };

  return (
    <>
      <h1>Customers</h1>
      <MaterialTable title="All training Customers"
        columns={table.columns}
        data={data}
        icons={tableIcons}
        options={{
          sorting: true,
          search: true,
          pageSize: 15,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
            fontWeight: 'bold'
          }
        }}
        editable={{
          // Adding new User
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  fetch("https://customerrest.herokuapp.com/api/customers", {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                      'Content-Type': 'application/json'
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(newData) // body data type must match "Content-Type" header
                  })
                  .then(res => res.json())
                 .then(json => console.log(json))
                 .then (() => resolve())
                 .then (() => fetchData())
                 .catch(e => console.error(e));
                }
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  fetch(oldData.links[0].href, {
                    method: 'PUT', 
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newData) // body data type must match "Content-Type" header
                  })
                  .then(res => res.json())
                 .then(json => console.log(json))
                 .then (() => resolve())
                 .then (() => fetchData())
                 .catch(e => console.error(e));
                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  console.log(oldData)
                  fetch(oldData.links[0].href, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                  })
                 .then(json => console.log(json))
                 .then (() => resolve())
                 .then (() => fetchData())
                 .catch(e => console.error(e));
                }
                resolve()
              }, 1000)
            }),
        }}
      />
    </>
  );
};

export default Customers;
