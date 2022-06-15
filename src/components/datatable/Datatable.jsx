import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import axios from "axios";

const Datatable = ({ columns, type }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, err } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id, hotelId) => {
    try {
      if (type === "room") {
        await axios.delete(`/${path}/${id}/${hotelId}`);
      } else {
        await axios.delete(`/${path}/${id}`);
      }
      setList(list.filter((item) => item._id !== id));
    } catch (error) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {type !== "room" && (
              <Link
                to={`/${path}/${params.row._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">View</div>
              </Link>
            )}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id, params.row.hotelId)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle" style={{ textTransform: "capitalize" }}>
        {path}
        <Link
          to={`/${path}/new`}
          className="link"
          style={{ textTransform: "capitalize" }}
        >
          Add New {path}
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
