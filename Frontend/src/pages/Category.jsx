import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckUser from "./CheckUser";
import { createURL } from "./constant";
import axios from "axios";
import AdminHeader from "./AdminHeader";

export default function Category() {
  const [category, setCategory] = useState("");
  const [additem, setAdditem] = useState("");
  const [addUpdateFlag, setAddUpdateFlag] = useState(true);
  const [Id, setId] = useState(0);
  const nevigate = useNavigate();
  const token = sessionStorage["token"];

  useEffect(() => {
    getAllCategory();
  }, []);

  if (token === undefined) {
    nevigate("/PageNotFound");
    return;
  } else {
    var role = CheckUser(token);
    if (role !== "Admin") {
      nevigate("/PageNotFound");
      //alert("please login")
      return;
    }
  }
  const getAllCategory = () => {
    const url = createURL("api/Categories");
    axios.get(url).then((response) => {
      setCategory(response.data);
      console.log(response.data);
    });
  };

  const deleteCategory = (id) => {
    const url = createURL(`api/Categories/${id}`);
    axios
      .delete(url)
      .then((result) => {
        console.log(result);
        // const data = result.data;
        if (result.status === 200) {
          getAllCategory();
          alert("Category deleted successfully");
        }
      })
      .catch((error) => {
        alert("Error fetching the data from the resource");
      });
  };

  const updateItem = () => {
    const data = {
      categoryId: Id,
      categoryName: additem,
    };
    console.log(data);
    const url = createURL(`api/Categories/${Id}`);
    axios
      .put(url, data)
      .then((result) => {
        const dt = result.data;
        setAdditem(data.categoryName);

        console.log(dt);
        if (result.status === 204) {
          alert("Category updated successfully");
          setAddUpdateFlag(true);
          getAllCategory();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditCategory = (uid) => {
    setAddUpdateFlag(false);
    const url = createURL(`api/Categories/${uid}`);
    axios
      .get(url)
      .then((result) => {
        console.log(result.data);
        setId(result.data.categoryId);
        setAdditem(result.data.categoryName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addCategory = () => {
    const data = { categoryName: additem };
    const url = createURL("api/Categories");
    axios
      .post(url, data)
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          alert("Category added successfully!");
          setAdditem("");
          getAllCategory();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function Cancel() {
    setAdditem("");
    setAddUpdateFlag(true);
  }

  return (
    <Fragment>
      <AdminHeader />

      <div
        className="form-row"
        style={{ width: "80%", backgroundColor: "white", margin: " auto" }}
      >
        <div className="form-group col-md-12">
          <h3>Watch Categories</h3>
        </div>
        <div className="form-group col-md-6">
          <input
            type="text"
            onChange={(e) => setAdditem(e.target.value)}
            placeholder="Category Name"
            className="form-control"
            value={additem}
          />
        </div>
      </div>

      <div className="form-group col-md-6">
        {addUpdateFlag ? (
          <button
            className="btn btn-primary"
            style={{
              width: "150px",
              float: "left",
              marginLeft: 110,
              marginRight: 50,
              marginBottom: 20,
            }}
            onClick={addCategory}
          >
            Add
          </button>
        ) : (
          <div>
            <div>
              <button
                className="btn btn-primary"
                style={{
                  width: "150px",
                  float: "left",
                  marginLeft: 110,
                  marginRight: 50,
                  marginBottom: 20,
                }}
                onClick={(e) => updateItem(e.categoryId)}
              >
                Update
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary"
                style={{ width: "150px", float: "left", marginBottom: 20 }}
                onClick={Cancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {category ? (
        <table
          className="table stripped table-hover mt-4"
          style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}
        >
          <thead className="thead-light" style={{ marginLeft: 150 }}>
            <tr>
              <th scope="col">S.N.</th>
              <th scope="col">Category Id</th>
              <th scope="col">Category Name</th>
              <th scope="col"> Action </th>
            </tr>
          </thead>
          <tbody>
            {category.map((val, index) => {
              return (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{val.categoryId}</td>
                  <td>{val.categoryName}</td>

                  <td>
                    <button
                      style={{ marginRight: 20 }}
                      onClick={(e) => EditCategory(val.categoryId)}
                    >
                      Edit
                    </button>{" "}
                    <button onClick={(e) => deleteCategory(val.categoryId)}>
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "No data found"
      )}
    </Fragment>
  );
}
