import Button from "@mui/material/Button";
import { IoIosSearch } from "react-icons/io";
import { fetchDataFromApi, fetchAllProductData } from "../../../utils/api";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "../style.css";
import { List, ListItem, ListItemText, Paper } from "@mui/material";

const SearchBox = (props) => {
  const [searchFields, setSearchFields] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1); // To track active suggestion
  const [showSuggestions, setShowSuggestions] = useState(false); // To control suggestions display
  const [searchData, setSearchData] = useState([]);
  const history = useNavigate();
  const searchBoxRef = useRef(null); // To handle clicks inside the search box
  const inputRef = useRef(null); // To remove focus from the input field



  const ResetSearchField = () => {
    setSearchFields("");
    setSuggestions([]);
    setActiveIndex(-1);
    setShowSuggestions(false);
  };

  const onChangeValue = (e) => {
    setSearchFields(e.target.value);
  };

  const searchProducts = () => {
    if (searchFields !== "") {
      setIsLoading(true);
      fetchDataFromApi(`/api/search?q=${searchFields}`).then((res) => {
        setSearchData(res);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        props.closeSearch();
        history("/search");
      });
    }
  };

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    onChangeValue(event);

    if (value.length === 0) {
      setSuggestions(allProduct);
    } else {
      const result = allProduct.filter((obj) =>
        obj.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(result);
    }
  };

  // Handle arrow key navigation and scroll to selected item
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions.length > 0) {
        const selectedProduct = suggestions[activeIndex];
        history(`/product/${selectedProduct._id}`);
        ResetSearchField();
        inputRef.current.blur(); // Remove focus after selecting with "Enter"
      }
    }

    // Scroll into view
    const activeItem = document.getElementById(`suggestion-${activeIndex}`);
    if (activeItem) {
      activeItem.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  };

  const handleItemClick = (product) => {
    history(`/product/${product._id}`);
    ResetSearchField();
    inputRef.current.blur(); // Remove focus after clicking a product
  };

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="headerSearch ml-3 mr-3"
      style={{ position: "relative" }}
      ref={searchBoxRef}
    >
      <input
        type="text"
        placeholder="Search for products..."
        onChange={handleSearchChange}
        value={searchFields}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setShowSuggestions(true); // Show suggestions on focus
          setSuggestions(allProduct); // Populate with all products initially
          setActiveIndex(0); // Initially select the first item
        }}
        onClick={() => setShowSuggestions(true)} // Ensure suggestions remain visible on repeated clicks
        ref={inputRef} // Attach ref to input field
      />
      {showSuggestions && suggestions.length > 0 && (
        <Paper
          style={{
            position: "absolute",
            top: "50px",
            width: "100%",
            overflow: "scroll",
            maxHeight: "50vh",
            zIndex: 1000000,
            backgroundColor: "white",
          }}
          className="custom-scrollbar"
        >
          <List>
            {suggestions.map((suggestion, index) => (
              <ListItem
                id={`suggestion-${index}`} // Assign an ID for scrolling
                key={suggestion._id}
                onClick={() => handleItemClick(suggestion)}
                selected={index === activeIndex}
                style={{
                  color:
                    index === activeIndex
                      ? "var(--primaryColor)"
                      : "var(--textLight)",
                  cursor: "pointer",
                }}
              >
                <ListItemText primary={suggestion?.name} />
                <img alt="product" src={suggestion?.images[0]} width={55}></img>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      <Button onClick={searchProducts}>
        {isLoading ? <CircularProgress /> : <IoIosSearch />}
      </Button>
    </div>
  );
};

export default SearchBox;
