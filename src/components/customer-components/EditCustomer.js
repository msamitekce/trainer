import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

function EditCustomer(props) {
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
    setCustomer({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city,
      email: props.customer.email,
      phone: props.customer.phone,
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.edit(props.link, customer);
    handleClose();
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <EditIcon fontSize="small" />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}>
        <DialogContent>
          <TextField
            label="Firstname"
            value={customer.firstname}
            name="firstname"
            onChange={inputChanged} />
          <TextField
            label="Lastname"
            value={customer.lastname}
            name="lastname"
            onChange={inputChanged} />
          <TextField
            label="Street Address"
            value={customer.streetaddress}
            name="streetaddress"
            onChange={inputChanged} />
          <TextField
            label="Post Code"
            value={customer.postcode}
            name="postcode"
            onChange={inputChanged} />
          <TextField
            label="City"
            value={customer.city}
            name="city"
            onChange={inputChanged} />
          <TextField
            label="Email"
            value={customer.email}
            name="email"
            onChange={inputChanged} />
          <TextField
            label="Phone"
            value={customer.phone}
            name="phone"
            onChange={inputChanged} />
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
export default EditCustomer;