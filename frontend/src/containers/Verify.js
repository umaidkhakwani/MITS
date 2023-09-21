import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

function EditDialog({ open, onClose, onEdit}) { // function EditDialog({ open, onClose, onEdit, editedEmail, editedPassword }) {
  const [user_email, setEmail] = useState(""); // Initialize with an empty string
  const [password, setPassword] = useState(""); // Initialize with an empty string

  // useEffect(() => {
  //   setEmail(editedEmail);
  //   setPassword(editedPassword);
  // }, [editedEmail, editedPassword]);

  const handleEdit = () => {
    console.log(user_email);
    console.log(password);
    // Pass the email and password values to the parent component
    onEdit(user_email, password);
    
    setEmail("")
    setPassword("")
    // Close the dialog
    onClose();
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Details</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          value={user_email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          type="password"
        />
        <Button variant="outlined" onClick={handleEdit}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
