import { useEffect, useState } from "react";
import ProductItem from "../../Components/ProductItem";
import Sidebar from "../../Components/Sidebar";
import "./style.css";

import { HiMiniBars4 } from "react-icons/hi2";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";

import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { FaFilter } from "react-icons/fa";

const Listing = () => {
  const [productView, setProductView] = useState("three");
  const [productData, setProductData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [filterId, setFilterId] = useState("");
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    setFilterId("");

    let url = window.location.href;
    let apiEndPoint = "";

    if (url.includes("subCat")) {
      apiEndPoint = `/api/products?subCat=${id}&location=${localStorage.getItem(
        "location"
      )}`;
    }
    if (url.includes("category")) {
      apiEndPoint = `/api/products?category=${id}&location=${localStorage.getItem(
        "location"
      )}`;
    }

    setisLoading(true);
    fetchDataFromApi(`${apiEndPoint}`).then((res) => {
      setProductData(res);
      setisLoading(false);
    });
  }, [id]);

  const filterData = (subCatId) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setFilterId(subCatId);
    setisLoading(true);

    fetchDataFromApi(
      `/api/products?subCatId=${subCatId}&location=${localStorage.getItem(
        "location"
      )}`
    ).then((res) => {
      setProductData(res);
      setisLoading(false);
    });
  };

  const filterByPrice = (price, subCatId) => {
    var window_url = window.location.href;
    var api_EndPoint = "";

    if (filterId === "") {
      if (window_url.includes("subCat")) {
        api_EndPoint = `/api/products?minPrice=${price[0]}&maxPrice=${
          price[1]
        }&subCatId=${id}&location=${localStorage.getItem("location")}`;
      }
      if (window_url.includes("category")) {
        api_EndPoint = `/api/products?minPrice=${price[0]}&maxPrice=${
          price[1]
        }&catId=${id}&location=${localStorage.getItem("location")}`;
      }
    }
    if (filterId !== "") {
      api_EndPoint = `/api/products?minPrice=${price[0]}&maxPrice=${
        price[1]
      }&subCatId=${filterId}&location=${localStorage.getItem("location")}`;
    }

    setisLoading(true);

    fetchDataFromApi(api_EndPoint).then((res) => {
      setProductData(res);
      setisLoading(false);
    });
  };

  const filterByRating = (rating, subCatId) => {
    setisLoading(true);

    let url = window.location.href;
    let apiEndPoint = "";

    if (url.includes("subCat")) {
      apiEndPoint = `/api/products?rating=${rating}&subCatId=${id}&location=${localStorage.getItem(
        "location"
      )}`;
    }
    if (url.includes("category")) {
      apiEndPoint = `/api/products?rating=${rating}&category=${id}&location=${localStorage.getItem(
        "location"
      )}`;
    }

    fetchDataFromApi(apiEndPoint).then((res) => {
      setProductData(res);
      setisLoading(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  const openFilters = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  return (
    <>
      <section className="product_Listing_Page pt-5">
        <div className="container">
          <div className="productListing d-flex">
            <Sidebar
              filterData={filterData}
              filterByPrice={filterByPrice}
              filterByRating={filterByRating}
              isOpenFilter={isOpenFilter}
            />

            <div className="content_right">
              <div className="showBy mt-0 mb-3 d-flex align-items-center">
                <div className="d-flex align-items-center btnWrapper">
                  <Button
                    className={productView === "one" && "act"}
                    onClick={() => setProductView("one")}
                  >
                    <HiMiniBars4 />
                  </Button>

                  <Button
                    className={productView === "two" && "act"}
                    onClick={() => setProductView("two")}
                  >
                    <TfiLayoutGrid2Alt />
                  </Button>
                  <Button
                    className={productView === "three" && "act"}
                    onClick={() => setProductView("three")}
                  >
                    <TfiLayoutGrid3Alt />
                  </Button>
                </div>
              </div>

              <div className="productListing">
                {isLoading === true ? (
                  <div className="loading d-flex align-items-center justify-content-center">
                    <CircularProgress color="inherit" />
                  </div>
                ) : (
                  <>
                    {productData?.products?.map((item, index) => {
                      return (
                        <ProductItem
                          key={index}
                          itemView={productView}
                          item={item}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {windowWidth < 992 && (
        <>
          {isOpenNav === false && (
            <div className="fixedBtn row">
              <div className="col">
                <Button
                  className="btn-blue bg-red btn-lg btn-big"
                  onClick={openFilters}
                >
                  <FaFilter />
                  {isOpenFilter === true ? "Close Filters" : "Open Filters"}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Listing;
