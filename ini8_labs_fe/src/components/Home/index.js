import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import "./index.css";
import {
  getData,
  addUserData,
  updateUserData,
  deleteUserData,
} from "../../services";
import UserListItem from "../UserListItem";
import { DeleteIcon, EditIcon } from "../../icons";
import UserForm from "../UserForm";

const Home = () => {
  const [usersData, setUsersData] = useState([]);
  const [activeItem, setActiveItem] = useState({});
  const [pageLoad, setPageLoad] = useState(false);
  const [popup, setPopUp] = useState({
    isEdit: false,
    isDelete: false,
    isCreate: false,
  });
  const [loader, setLoader] = useState(false);

  const getUsersList = async () => {
    setLoader(true);
    try {
      const res = await getData();
      //   console.log("------------", res.data);
      let result = transformRows(res.data);
      setLoader(false);
      setUsersData(result);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  function transformRows(response) {
    console.log("response", response);
    response?.forEach((res) => {
      res.edit = getEditComponent(res);
      res.delete = getDeleteComponent(res);
    });
    // console.log("response", response);
    return response;
  }

  function getEditComponent(item) {
    // console.log("----------------", item);
    return (
      <div>
        <EditIcon onClick={() => handleEditButton(item)} />
      </div>
    );
  }

  function handleEditButton(item) {
    // console.log("Radhe Radhe", item);

    setActiveItem(item);
    setPopUp((prev) => ({ ...prev, isEdit: true }));
  }

  const handleEditCloseButton = () =>
    setPopUp((prev) => ({ ...prev, isEdit: false }));

  function getDeleteComponent(item) {
    return (
      <div>
        <DeleteIcon onClick={() => handleDeleteButton(item)} />
      </div>
    );
  }

  const handleDeleteButton = async (item) => {
    // console.log("Response", item);
    setLoader(true);
    // setActiveItem(item);
    // setPopUp((prev) => ({ ...prev, isDelete: true }));
    try {
      await deleteUserData(item.id);
      setPageLoad((prev) => !prev);
      setLoader(false);
    } catch (error) {
      setPageLoad((prev) => !prev);
      setLoader(false);
      console.log(error);
    }
  };

  const handleCreateButton = () =>
    setPopUp((prev) => ({ ...prev, isCreate: true }));

  const handleCreateCloseButton = () =>
    setPopUp((prev) => ({ ...prev, isCreate: false }));

  useEffect(() => {
    getUsersList();
  }, [pageLoad]);

  const handlePostRequest = async (formData) => {
    // console.log("handlePostRequest", formData);
    setLoader(true);
    try {
      await addUserData(formData);
      setPageLoad((prev) => !prev);
      setLoader(false);
    } catch (error) {
      setPageLoad((prev) => !prev);
      setLoader(false);
      console.log(error);
    }
  };

  const handlePutRequest = async (formData) => {
    console.log("handlePutRequest", formData);
    setLoader(true);
    try {
      const id = formData.id;
      delete formData.id;
      await updateUserData(id, formData);
      setPageLoad((prev) => !prev);
      setLoader(false);
    } catch (error) {
      setPageLoad((prev) => !prev);
      setLoader(false);
      console.log(error);
    }
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(3),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(2),
    },
  }));

  //   console.log("active Item", activeItem);
  return (
    <>
      <div className="parent_container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>INI8 LABS</h2>
          <button
            onClick={handleCreateButton}
            type="button"
            className="btn btn-primary"
          >
            Add User
          </button>
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="table_body">
            {usersData?.map((each) => (
              <UserListItem key={each.id} eachUser={each} />
            ))}
          </tbody>
        </table>

        {popup.isCreate && (
          <BootstrapDialog
            onClose={handleCreateCloseButton}
            aria-labelledby="customized-dialog-title"
            open={popup.isCreate}
          >
            <UserForm
              handleClose={handleCreateCloseButton}
              editData={{ name: "", email: "", date_of_birth: "" }}
              handleRequest={handlePostRequest}
            />
          </BootstrapDialog>
        )}

        {popup.isEdit && (
          <BootstrapDialog
            onClose={handleEditCloseButton}
            aria-labelledby="customized-dialog-title"
            open={popup.isEdit}
          >
            <UserForm
              handleClose={handleEditCloseButton}
              handleRequest={handlePutRequest}
              editData={{
                id: activeItem.id,
                name: activeItem.name,
                email: activeItem.email,
                date_of_birth: activeItem.date_of_birth,
              }}
            />
          </BootstrapDialog>
        )}
      </div>
      {loader && (
        <div className="loader d-flex justify-content-center align-items-center w-100">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
