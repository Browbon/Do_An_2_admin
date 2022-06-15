import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MonthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Chart = ({ aspect, title, months, page, name }) => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const getList = () => {
    const list = [];
    for (let index = 0; index < months; index++) {
      var monthIndex = new Date().getMonth() - index;
      if (monthIndex < 0) monthIndex = 11;
      list.unshift(MonthList[monthIndex]);
    }
    return list;
  };

  const monthsNow = getList();

  useEffect(() => {
    const fillData = async () => {
      try {
        const list = await Promise.all(
          monthsNow.map(async (month) => {
            const res =
              page === "users"
                ? await axios.get(`/transactions/${userId}/${month}`)
                : page === "hotels"
                ? await axios.get(`/transactions/hotel/${name}/${month}`)
                : await axios.get(`/transactions/month/${month}`);
            return { name: month, Total: res.data };
          })
        );
        setData(list);
      } catch (error) {
        console.log(error);
      }
    };
    fillData();
  }, [monthsNow, page, userId, name]);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
