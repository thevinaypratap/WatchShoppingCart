import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AuthGuard from "./AuthGuard";

const ListCustomer = () => {
  const [customerlist, listupdate] = useState(null);

  useEffect(() => {
    let jwttoken = sessionStorage.getItem("token");

    fetch("https://localhost:7257/api/User", {
      headers: {
        Authorization: "bearer " + jwttoken,
      },
    })
      .then((res) => {
        if (!res.ok) {
          alert("Failed to fetch customer list");
        }
        return res.json();
      })
      .then((resp) => {
        listupdate(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <AdminHeader />

      <h1 className="text-center mb-5 text-primary" style={{ color: "black" }}>
        List Of Customers
      </h1>
      <div style={{ width: "80%", marginLeft: 120 }}>
        <table className="table table-bordered table-hover mb-0 table-light">
          <thead className="thead-light">
            <tr>
              <th>User Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customerlist &&
              customerlist.map((item) => (
                <tr key={item.id}>
                  <td>{item.userId}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <AuthGuard />
    </div>
  );
};

export default ListCustomer;
