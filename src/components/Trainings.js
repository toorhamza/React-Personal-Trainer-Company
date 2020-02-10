import React, { useState, useEffect, forwardRef } from "react";
import MaterialTable from "material-table";
import {
  FirstPage,
  AddBox,
  ArrowDownward,
  Search,
  Clear,
  Check,
  ChevronLeft,
  ChevronRight
} from "@material-ui/icons";
import {
  DeleteOutline,
  Edit,
  SaveAlt,
  FilterList,
  LastPage,
  Remove,
  ViewColumn
} from "@material-ui/icons";
import moment from "moment";

const Trainings = () => {
  const [trainings, setTrainings] = useState([]);
  //table data for Material Table
  const [table, setTable] = useState({
    columns: [
      { title: "Activity", field: "activity" },
      { title: "Duration", field: "duration" },
      { title: "Date", field: "date" }
    ]
  });

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then(res => res.json())
      .then(json => setTrainings(json.content))
   //   .then(() => formatDate())
      .catch(e => console.error(e));
  };

  // Needed to format date using MomentJs. It only works with the format Date button. Not sure why!
  const formatDate = () => {
    var newData = [];
    for (let i = 0; i < trainings.length; i++) {
      let training = {
        date: moment(trainings[i].date).format("MMMM Do YYYY, h:mm:ss a"),
        duration: trainings[i].duration + " minutes",
        activity: trainings[i].activity
      };

      newData.push(training);
    }

    setTrainings(newData);
  };

  // Icons for the Table
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  return (
    <>
      <h1>Trainings</h1>
      <p>Please use the button below to format date. It does not works without the button. Don't know why</p>
      <button onClick={formatDate}>Format The Date</button>
      <MaterialTable
        title="All Trainings"
        columns={table.columns}
        data={trainings}
        icons={tableIcons}
        options={{
          sorting: true,
          search: true,
          pageSize: 10,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
            fontWeight: "bold"
          }
        }}
        editable={{
          // Adding new Training
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  fetch("https://customerrest.herokuapp.com/api/trainings", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newData)
                  })
                    .then(res => res.json())
                    .then(json => console.log(json))
                    .then(() => resolve())
                    .then(() => fetchData())
                    .catch(e => console.error(e));
                }
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  fetch(oldData.links[0].href, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newData) // body data type must match "Content-Type" header
                  })
                    .then(res => res.json())
                    .then(json => console.log(json))
                    .then(() => resolve())
                    .then(() => fetchData())
                    .catch(e => console.error(e));
                }
                resolve();
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  fetch(oldData.links[0].href, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json"
                    }
                  })
                    .then(json => console.log(json))
                    .then(() => resolve())
                    .then(() => fetchData())
                    .catch(e => console.error(e));
                }
                resolve();
              }, 1000);
            })
        }}
      />
    </>
  );
};

export default Trainings;
