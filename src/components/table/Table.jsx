import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const List = ({ type, name }) => {
  const [data, setData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res =
          type === "hotel"
            ? await axios.get(`/transactions/hotel?hotelName=${name}`)
            : type === "user"
            ? await axios.get(`/transactions/${type}/${path}`)
            : await axios.get(`/transactions`);
        res.data.reverse();
        setTransactions(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTransactions();
  }, [path, type, name]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await Promise.all(
          transactions.map(async (item) => {
            const { data } = await axios.get(`/users/${item.customerId}`);
            item.username = data.username;
            item.img = data.img;
            return item;
          })
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [transactions]);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">User</TableCell>
            <TableCell className="tableCell">Room</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Hotel</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="tableCell">{item._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={item.img} alt="" className="image" />
                  {item.username}
                </div>
              </TableCell>
              <TableCell className="tableCell">
                {item.roomName.map((item) => `${item} `)}
              </TableCell>
              <TableCell className="tableCell">date</TableCell>
              <TableCell className="tableCell">{item.amount}</TableCell>
              <TableCell className="tableCell">{item.hotelName}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${item.status}`}>{item.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
