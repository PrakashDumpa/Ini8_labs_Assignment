import React, { useState } from "react";
import "./index.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const formList = [
  {
    id: 1,
    type: "text",
    label: "Name",
    apiKey: "name",
  },
  {
    id: 2,
    type: "email",
    label: "Email",
    apiKey: "email",
  },
  {
    id: 3,
    type: "date",
    label: "Dob",
    apiKey: "date_of_birth",
  },
];

const UserForm = ({ handleClose, editData, handleRequest }) => {
  const [formData, setFormData] = useState({ ...editData });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    handleRequest(formData);
    Object.keys(formData).forEach((e) => (formData[e] = ""));
    // console.log("+,,,,,,,,,", formData);
    setFormData(formData);
  };

  console.log(formData);
  return (
    <div className="">
      <DialogTitle sx={{ m: 0, px: 4 }} id="customized-dialog-title">
        Create UserName
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <form className="textfield px-3" onSubmit={handleSubmit}>
          {formList.map((eachItem) => (
            <div key={eachItem.id}>
              <div className="form-group">
                <label htmlFor={eachItem.label}>{eachItem.label}</label>
                <input
                  required
                  type={eachItem.type}
                  className="form-control"
                  id={eachItem.label}
                  value={formData[eachItem.apiKey] || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [eachItem.apiKey]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          ))}
          <div className="text-right mt-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </div>
  );
};

export default UserForm;
