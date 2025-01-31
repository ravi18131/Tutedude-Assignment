import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { FiUser } from "react-icons/fi";
import SearchBox from "./SearchBox";
import { useSnackbar } from "../../context/SnackbarProvider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { FaClipboardCheck } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa6";

import "./style.css";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const open = Boolean(anchorEl);

  const headerRef = useRef();
  const { showSnackbar } = useSnackbar();
  const history = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAnchorEl(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
    history("/signIn");
  };

  const openSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };

  const closeSearch = () => {
    setIsOpenSearch(false);
  };

  const jsonUser = localStorage.getItem("user");
  const user = JSON.parse(jsonUser);

  const renderAvatar = (avatar) =>
    avatar ? (
      <Avatar src={avatar} alt="Profile" sx={{
        width: { xs: 35, sm: 35, md: 45, lg: 45 },
        height: { xs: 35, sm: 35, md: 45, lg: 45 },
      }} />
    ) : (
      <FiUser />
    );

  return (
    <>
      <div className="headerWrapperFixed" ref={headerRef}>
        <div className="headerWrapper">
          <header className="header">
            <div className="container">
              <div className="row">
                <div className="logoWrapper d-flex align-items-center col-sm-6">
                  <Link to={"/"} className="nav-logo">
                    <img src={Logo} alt="Logo" />
                    <small>FriendHive</small>
                  </Link>
                </div>

                <div className="col-sm-6 d-flex align-items-center part2">
                  <div
                    className={`headerSearchWrapper ${isOpenSearch === true && "open"}`}
                  >
                    <div className="d-flex align-items-center">
                      <span
                        className="closeSearch mr-3"
                        onClick={() => setIsOpenSearch(false)}
                      >
                        <FaAngleLeft />
                      </span>
                      <SearchBox closeSearch={closeSearch} />
                    </div>
                  </div>

                  <div className="part3 d-flex align-items-center ml-auto">
                    {windowWidth < 992 && (
                      <Button
                        className="circle toggleNav"
                        onClick={openSearch}
                        sx={{ mr: { xs: 2, md: 3 } }}
                      >
                        <IoIosSearch />
                      </Button>
                    )}

                    {user ? (
                      <>
                        <Button className="circle" onClick={handleClick}>
                          {renderAvatar(user.avatar)}
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          id="accDrop"
                          open={open}
                          onClose={handleClose}
                          onClick={handleClose}
                          transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                          }}
                        >
                          <Link to="/my-account">
                            <MenuItem onClick={handleClose}>
                              <ListItemIcon>
                                <FaUserAlt fontSize="small" />
                              </ListItemIcon>
                              My Account
                            </MenuItem>
                          </Link>
                          <Link to="/friends">
                            <MenuItem onClick={handleClose}>
                              <ListItemIcon>
                                <FaHeart fontSize="small" />
                              </ListItemIcon>
                              Friends List
                            </MenuItem>
                          </Link>
                          <Link to="/friend-requests">
                            <MenuItem onClick={handleClose}>
                              <ListItemIcon>
                                <FaClipboardCheck fontSize="small" />
                              </ListItemIcon>
                              Friend Requests
                            </MenuItem>
                          </Link>
                          {/* <Link to="/my-list">
                            <MenuItem onClick={handleClose}>
                              <ListItemIcon>
                                <FaHeart fontSize="small" />
                              </ListItemIcon>
                              Friend Recommendations
                            </MenuItem>
                          </Link> */}
                          <MenuItem onClick={logout}>
                            <ListItemIcon>
                              <RiLogoutCircleRFill fontSize="small" />
                            </ListItemIcon>
                            Logout
                          </MenuItem>
                        </Menu>
                      </>
                    ) : (
                      <div>
                        <li className="list-inline-item pl-3">
                          <Link
                            to="/signIn"
                            style={{
                              color: "#2f2d47",
                              fontWeight: "600",
                              textTransform: "uppercase",
                              textDecoration: "none",
                              fontSize: "15px",
                            }}
                          >
                            Login
                          </Link>
                        </li>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
