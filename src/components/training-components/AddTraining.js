import React from "react";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

function AddTraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    date: "",
    activity: "",
    duration: "",
    customer: "",
  });
  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleOpen = () => {
    setTraining({ ...training, customer: props.customerLink });
    setOpen(true);
  };

  const handleSave = () => {
    props.addTraining(training);
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleOpen} >
        Add Training
      </Button>

      <Dialog
        open={open}
        onClose={handleClose} >
        <DialogContent>
          <TextField
            value={training.activity}
            name="activity"
            onChange={inputChanged} />
          <TextField
            value={training.duration}
            name="duration"
            onChange={inputChanged} />
          <TextField
            type="datetime-local"
            name="date"
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

export default AddTraining;