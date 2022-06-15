export const userColumns = [
  { field: "_id", headerName: "ID", width: 150 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 120,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 120,
  },
];

export const hotelColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
  {
    field: "title",
    headerName: "Title",
    width: 270,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
  },
];

export const roomColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 500,
  },
  {
    field: "price",
    headerName: "Price",
    width: 70,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
