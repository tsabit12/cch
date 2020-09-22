import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalComponent = props => {
	const { open, filename } = props;
	const [field, setField] = useState({
		title: '',
		description: ''
	})

	const handleChange = (e) => {
		const { value, name } = e.target;
		setField(field => ({
			...field,
			[name]: value
		}))
	}

	const onUpload = () => {
		if (!field.title) {
			alert('Title harap diisi');
		}else if(!field.description){
			alert('Description harap diisi');
		}else{
			props.onUpload(field);
		}
	}

  return (
      <Dialog open={open} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogTitle id="form-dialog-title">File yang dipilih ({filename})</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Harap lengkapi file anda dibawah ini
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            value={field.title}
            label="Title"
            type="text"
            placeholder='Masukan judul file'
            InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            value={field.description}
            name="description"
            label="Description"
            type="text"
            placeholder='Masukan keterangan'
            InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default ModalComponent;