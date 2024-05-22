import { createURL } from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
 
const Search = () => {
  const navigate = useNavigate();
  const [searchitem, setSearch] = useState("");
  const [items, setItems] = useState("");
 

  const loadBlogs = () => {
    const url = createURL(`api/Products/search=${searchitem}`);
 
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const result = response;
        if (result.status === 200 || result.status===204) {
          const data = result.data;
          setItems(data);
        } else {
          alert("error while Searching your blogs");
          navigate("/home");
        }
      })
      .catch((error) => {
        toast.error("error while Searching your blogs try later");
        navigate("/home");
      });
  };
 
  useEffect(() => {
    loadBlogs();
  }, [searchitem]);
  return (
    <div>
      
    </div>
  );
};
export default Search;