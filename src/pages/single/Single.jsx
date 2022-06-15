import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Single = ({ type }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(`/${path}/${id}`);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {loading ? (
          "loading"
        ) : (
          <>
            <div className="top">
              <div className="left">
                <div className="editButton">Edit</div>
                <h1 className="title">Information</h1>
                <div className="item">
                  <img
                    src={type === "hotel" ? data?.photos[0] : data.img}
                    alt=""
                    className="itemImg"
                  />
                  <div className="details">
                    <h1 className="itemTitle">
                      {type === "hotel" ? data.name : data.username}
                    </h1>
                    <div className="detailItem">
                      <span className="itemKey">
                        {type === "hotel" ? "Address: " : "Email: "}
                      </span>
                      <span className="itemValue">
                        {type === "hotel" ? data.address : data.email}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">
                        {type === "hotel" ? "Distance: " : "Phone: "}
                      </span>
                      <span className="itemValue">
                        {type === "hotel" ? data.distance : data.phone}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">City:</span>
                      <span className="itemValue">{data.city}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">
                        {type === "hotel" ? " Title: " : "Country: "}
                      </span>
                      <span className="itemValue">
                        {type === "hotel" ? data.title : data.country}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <Chart
                  aspect={3 / 1}
                  title={`${path} spending ( Last 6 Months)`}
                  months={6}
                  page={path}
                  name={data.name}
                />
              </div>
            </div>
            <div className="bottom">
              <h1 className="title">Last Transactions</h1>
              <List type={type} name={data.name} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Single;
