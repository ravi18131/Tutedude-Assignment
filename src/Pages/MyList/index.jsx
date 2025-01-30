import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { IoIosClose } from "react-icons/io";
import Button from "@mui/material/Button";
import { useSnackbar } from "../../context/SnackbarProvider";
import emprtCart from "../../assets/images/myList.png";
import { useEffect, useState } from "react";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./style.css";

const MyList = () => {
  const [myListData, setmyListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { showSnackbar } = useSnackbar();
  const history = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);
    } else {
      history("/signIn");
    }

    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/my-list?userId=${user?.userId}`).then((res) => {
      setmyListData(res);
    }).catch((error) => {
      const msg = error.message || "Internal srever error!!"
      // showSnackbar(msg, "error", "#f1b9b9");
    });
  }, []);

  const removeItem = (id) => {
    setIsLoading(true);
    deleteData(`/api/my-list/${id}`).then((res) => {
      showSnackbar("item removed from My List!", "success", "#aadbaa");

      const user = JSON.parse(localStorage.getItem("user"));
      fetchDataFromApi(`/api/my-list?userId=${user?.userId}`).then((res) => {
        setmyListData(res);
        setIsLoading(false);
      }).catch((error) => {
        const msg = error.message || "Internal srever error!!"
        // showSnackbar(msg, "error", "#f1b9b9");
      });
    }).catch((error) => {
      const msg = error.message || "Internal srever error!!"
      // showSnackbar(msg, "error", "#f1b9b9");
    });
  };

  return (
    <>
      <section className="section cartPage">
        <div className="container">
          <div className="myListTableWrapper">
            <h2 className="hd mb-1">My List</h2>
            <p>
              There are <b className="text-red">{myListData?.length}</b>{" "}
              products in your My List
            </p>
            {myListData?.length !== 0 ? (
              <div className="row">
                <div className="col-md-12 pr-5">
                  <div className="table-responsive myListTable">
                    <table className="table">
                      <thead>
                        <tr>
                          <th width="50%">Product</th>
                          <th width="15%">Unit Price</th>
                          <th width="10%">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myListData?.length !== 0 &&
                          myListData?.map((item, index) => {
                            return (
                              <tr>
                                <td width="50%">
                                  <Link to={`/product/${item?.productId}`}>
                                    <div className="d-flex align-items-center cartItemimgWrapper">
                                      <div className="imgWrapper">
                                        <img
                                          src={item?.image}
                                          className="w-100"
                                          alt={item?.productTitle}
                                        />
                                      </div>

                                      <div className="info px-3">
                                        <h6>{item?.productTitle}</h6>
                                        <Rating
                                          name="read-only"
                                          value={item?.rating}
                                          readOnly
                                          size="small"
                                        />
                                      </div>
                                    </div>
                                  </Link>
                                </td>
                                <td width="15%">Rs {item?.price}</td>

                                <td width="10%">
                                  <span
                                    className="remove"
                                    onClick={() => removeItem(item?._id)}
                                  >
                                    <IoIosClose />
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty d-flex align-items-center justify-content-center flex-column">
                <img src={emprtCart} width="150" />
                <h3>My List is currently empty</h3>
                <br />
                <Link to="/">
                  {" "}
                  <Button className="btn-blue bg-red btn-lg btn-big btn-round">
                    <FaHome /> &nbsp; Continue Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {isLoading === true && <div className="loadingOverlay"></div>}
    </>
  );
};

export default MyList;
