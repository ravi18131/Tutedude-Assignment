import React, { useContext, useEffect, useState } from "react";
import { useSnackbar } from "../../context/SnackbarProvider";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { IoMdCloudUpload } from "react-icons/io";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  deleteData,
  deleteImages,
  editData,
  fetchDataFromApi,
  postData,
  uploadImage,
} from "../../utils/api";

import { MyContext } from "../../App";

import "./style.css";

import NoUserImg from "../../assets/images/no-user.jpg";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MyAccount = () => {
  const [isLogin, setIsLogin] = useState(false);
  const history = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [value, setValue] = React.useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.userId;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const formdata = new FormData();

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [fields, setFields] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    if (token !== "" && token !== undefined && token !== null) {
      setIsLogin(true);
    } else {
      history("/signIn");
    }

    deleteData("/api/imageUpload/deleteAllImages");
    const user = JSON.parse(localStorage.getItem("user"));

    fetchDataFromApi(`/api/user/${user?.userId}`).then((res) => {
      setFormFields({
        name: res.name,
        email: res.email,
        phone: res.phone,
        avatar: res.avatar,
      });
    }).catch((error) => {
      const msg = error.message || "Internal srever error!!"
      // showSnackbar(msg, "error", "#f1b9b9");
    });
  }, []);

  const changeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const changeInput2 = (e) => {
    setFields(() => ({
      ...fields,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      const file = e.target.files ? e.target.files[0] : null;
      setUploading(true);

      if (
        file &&
        (file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png" ||
          file.type === "image/webp")
      ) {
        formdata.append('avatar', file);

      } else {
        showSnackbar("Please select a valid JPG or PNG image file.", "error", "#f1b9b9");
        return false;
      }
    } catch (error) {
      showSnackbar("Internal server error!!.", "error", "#f1b9b9");
    }

    uploadImage(apiEndPoint, formdata).then((res) => {

      const user = JSON.parse(localStorage.getItem("user"));

      const newUser = {
        name: user.name,
        email: user.email,
        userId: user.id,
        role: user.role,
        avatar: res.imageUrl || "",
      };

      localStorage.setItem("user", JSON.stringify(newUser));

      setUploading(false);
      setFormFields({
        avatar: res.imageUrl
      });
      showSnackbar("Avatar Updated", "success", "#aadbaa");
    }).catch((error) => {
      const msg = error.message || "Internal srever error!!"
      // showSnackbar(msg, "error", "#f1b9b9");
    });
  };

  const edituser = (e) => {
    e.preventDefault();

    formdata.append("name", formFields.name);
    formdata.append("email", formFields.email);
    formdata.append("phone", formFields.phone);

    if (
      formFields.name !== "" &&
      formFields.email !== "" &&
      formFields.phone !== ""
    ) {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      editData(`/api/user/${user?.userId}`, formFields).then((res) => {
        setIsLoading(false);
        showSnackbar("user updated", "success", "#aadbaa");
      }).catch((error) => {
        const msg = error.message || "Internal srever error!!"
        // showSnackbar(msg, "error", "#f1b9b9");
      });
    } else {
      showSnackbar("Please fill all the details", "error", "#f1b9b9");
      return false;
    }
  };

  const changePassword = (e) => {
    e.preventDefault();

    if (
      fields.oldPassword !== "" &&
      fields.password !== "" &&
      fields.confirmPassword !== ""
    ) {
      if (fields.password !== fields.confirmPassword) {
        showSnackbar("Password and confirm password do not match", "error", "#f1b9b9");
      } else {
        const user = JSON.parse(localStorage.getItem("user"));

        const data = {
          name: user?.name,
          email: user?.email,
          password: fields.oldPassword,
          newPass: fields.password,
          phone: formFields.phone,
          avatar: formFields.avatar,
        };

        editData(`/api/user/changePassword/${user.userId}`, data)
          .then((res) => {
            showSnackbar("Password updated successfully!!", "success", "#aadbaa");
          })
          .catch((error) => {
            const msg = error.message || "Internal srever error!!"
            // showSnackbar(msg, "error", "#f1b9b9");
          });
      }
    } else {
      showSnackbar("Please fill in all the required details.", "error", "#f1b9b9");
    }
  };


  return (
    <section className="section myAccountPage">
      <div className="container">
        <h2 className="hd">My Account</h2>

        <Box sx={{ width: "100%" }} className="myAccBox card border-0">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Edit Profile" {...a11yProps(0)} />
              <Tab label="Change Password" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <form onSubmit={edituser}>
              <div className="row">
                <div className="col-md-4">
                  <div className="userImage">
                    {
                      formFields.avatar ? (
                        <img src={formFields.avatar} alt="" />
                      ) : (
                        <img src={NoUserImg} />
                      )
                    }
                    <div className="overlay d-flex align-items-center justify-content-center">
                      <IoMdCloudUpload />
                      <input
                        type="file"
                        multiple
                        onChange={(e) =>
                          onChangeFile(e, `/api/user/upload/${id}`)
                        }
                        name="images"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <TextField
                          label="Name"
                          variant="outlined"
                          className="w-100"
                          name="name"
                          onChange={changeInput}
                          value={formFields.name}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <TextField
                          label="Email"
                          disabled
                          variant="outlined"
                          className="w-100"
                          name="email"
                          onChange={changeInput}
                          value={formFields.email}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <TextField
                          label="Phone"
                          variant="outlined"
                          className="w-100"
                          name="phone"
                          onChange={changeInput}
                          value={formFields.phone}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <Button
                      type="submit"
                      className="btn-blue bg-red btn-lg btn-big"
                    >
                      {" "}
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <form onSubmit={changePassword}>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <TextField
                          label="Old Password"
                          variant="outlined"
                          className="w-100"
                          name="oldPassword"
                          onChange={changeInput2}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <TextField
                          label="New password"
                          variant="outlined"
                          className="w-100"
                          name="password"
                          onChange={changeInput2}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <TextField
                          label="Confirm Password"
                          variant="outlined"
                          className="w-100"
                          name="confirmPassword"
                          onChange={changeInput2}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <Button
                      type="submit"
                      className="btn-blue bg-red btn-lg btn-big"
                    >
                      {" "}
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CustomTabPanel>
        </Box>
      </div>
    </section>
  );
};

export default MyAccount;
