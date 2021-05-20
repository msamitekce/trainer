import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function AddCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const inputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    props.addCustomer(customer);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleOpen}
      >
        Add customer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            label="Firstname"
            value={customer.firstname}
            name="firstname"
            onChange={inputChanged}
          />
          <TextField
            label="Lastname"
            value={customer.lastname}
            name="lastname"
            onChange={inputChanged}
          />
          <TextField
            label="Email"
            value={customer.email}
            name="email"
            onChange={inputChanged}
          />
          <TextField
            label="Street Address"
            value={customer.streetaddress}
            name="streetaddress"
            onChange={inputChanged}
          />
          <TextField
            label="City"
            value={customer.city}
            name="city"
            onChange={inputChanged}
          />
          <TextField
            label="Post Code"
            value={customer.postcode}
            name="postcode"
            onChange={inputChanged}
          />
          <TextField
            label="Phone"
            value={customer.phone}
            name="phone"
            onChange={inputChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddCustomer;