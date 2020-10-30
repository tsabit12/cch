import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {
	FormControl,
	TextField
} from '@material-ui/core';
import PropTypes from 'prop-types';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalUpdate = props => {
	const { item } = props;
	const [field, setField] = useState({
		title: '',
		question: '',
		answer: ''
	})
	const [errors, setErrors] = useState({});

	//reset form
	useEffect(() => {
		if (Object.keys(item).length > 0) {
			setField({
				title: item.title,
				question: item.question,
				answer: item.answer
			})
		}
	}, [item]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setField(field => ({
			...field,
			[name]: value
		}))

		setErrors(errors => ({
			...errors,
			[name]: undefined
		}))
	}

	const onSubmit = () => {
		const errors = validate(field);
		setErrors(errors);
		if (Object.keys(errors).length === 0) {
			props.onUpdate(field, item.id);
			props.setLoading(true);
			setTimeout(function() {
				props.handleClose();
			}, 10);
		}
	}

	const validate = (value) => {
		const errors = {};
		if (!value.title) errors.title = 'Judul tidak boleh kosong';
		if (value.title.length > 30) errors.title = 'Judul maksimal 30 karakter';
		if (!value.question) errors.question = 'Pertanyaan tidak boleh kosong';
		if (!value.answer) errors.answer = "Jawaban tidak boleh kosong";
		return errors;
	}

	return(
		<Dialog
	        open={props.open}
	        TransitionComponent={Transition}
	        keepMounted
	        aria-labelledby="alert-dialog-slide-title"
	        aria-describedby="alert-dialog-slide-description"
	        fullWidth={true}
	        width='sm'
	      >
	        <DialogTitle id="alert-dialog-slide-title">UPDATE FAQ</DialogTitle>
	        <DialogContent>
	        	<FormControl fullWidth style={{marginBottom: 20}}>
	        		<TextField 
	        			variant='outlined'
	        			size='small'
	        			label='Judul FAQ'
	        			placeholder='Masukkan judul'
	        			value={field.title}
	        			error={!!errors.title}
	        			name='title'
	        			onChange={handleChange}
	        			autoComplete='off'
	        			helperText={errors.title ? errors.title : null }
	        			InputLabelProps={{ shrink: true }}
	        		/>
	        	</FormControl>
	        	<FormControl fullWidth style={{marginBottom: 20}}>
	        		<TextField 
	        			variant='outlined'
	        			size='small'
	        			label='Pertanyaan'
	        			placeholder='Masukkan pertanyaan'
	        			value={field.question}
	        			name='question'
	        			onChange={handleChange}
	        			autoComplete='off'
	        			InputLabelProps={{ shrink: true }}
	        			helperText={errors.question ? errors.question : null }
	        			error={!!errors.question}
	        		/>
	        	</FormControl>
	        	<FormControl fullWidth style={{marginBottom: 20}}>
	        		<TextField 
	        			variant='outlined'
	        			size='small'
	        			label='Jawaban'
	        			placeholder='Masukkan jawaban'
	        			value={field.answer}
	        			name='answer'
	        			onChange={handleChange}
	        			autoComplete='off'
	        			InputLabelProps={{ shrink: true }}
	        			helperText={errors.answer ? errors.answer : null }
	        			error={!!errors.answer}
	        		/>
	        	</FormControl>
	        </DialogContent>
	        <DialogActions>
	          <Button onClick={props.handleClose} color="primary">
	            BATAL
	          </Button>
	          <Button 
	          	onClick={onSubmit} 
	          	color="primary"
	          >
	            UPDATE
	          </Button>
	        </DialogActions>
		</Dialog>
	);
}

ModalUpdate.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	item: PropTypes.object.isRequired,
	setLoading: PropTypes.func.isRequired,
	onUpdate: PropTypes.func.isRequired
}

export default ModalUpdate;