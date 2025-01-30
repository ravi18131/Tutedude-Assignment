import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { IoIosSearch } from "react-icons/io";
import { fetchDataFromApi } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import user from "../../../assets/images/user.png"
import "../style.css";

const SearchBox = (props) => {
  const [searchFields, setSearchFields] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const history = useNavigate();
  const searchBoxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setSearchFields("");
    fetchFriends();
  }, []);

  useEffect(() => {
    console.log("Updated All Friends: ", allFriends);
  }, [allFriends]);

  const fetchFriends = async () => {
    try {
      const data = await fetchDataFromApi(`/api/user`);
      if (data) {
        setAllFriends(data);
      } else {
        console.log("User not found!");
      }
    } catch (e) {
      console.log("An error occurred!");
    }
  };

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
        history("/secarch");
      });
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    onChangeValue(event);

    if (value.length === 0) {
      setSuggestions(allFriends);
    } else {
      const result = allFriends.filter((obj) =>
        obj.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(result);
    }
  };

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
        inputRef.current.blur();
      }
    }

    const activeItem = document.getElementById(`suggestion-${activeIndex}`);
    if (activeItem) {
      activeItem.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  };

  const handleItemClick = (user) => {
    history(`/user/${user.username}`);
    ResetSearchField();
    inputRef.current.blur();
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
        placeholder="Search friends by username..."
        onChange={handleSearchChange}
        value={searchFields}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setShowSuggestions(true);
          setSuggestions(allFriends);
          setActiveIndex(0);
        }}
        onClick={() => setShowSuggestions(true)}
        ref={inputRef}
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
                id={`suggestion-${index}`}
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
                <ListItemText primary={suggestion?.username} />
                <img alt="product" src={suggestion?.profileDetails.avatar ? suggestion?.profileDetails.avatar : user} width={55} />
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
