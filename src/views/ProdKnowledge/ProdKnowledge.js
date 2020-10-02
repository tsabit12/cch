import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import {
	Fab,
	Typography,
	TextField,
	Divider,
	Grid
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
	CardComponent,
	ModalComponent
} from './components';
import { connect } from 'react-redux';
import { getData, onAddNewFile, onDelete } from '../../actions/knowledge';
import Loader from '../Loader';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	btnupload: {
		position: 'fixed',
		bottom: 0,
		right: 0,
		margin: theme.spacing(3)
	},
	iconBack: {
		fontSize: 26,
		color: '#B8B6B6',
		cursor: 'pointer',
		marginRight: 5
	},
	breadcumb: {
		display: 'flex',
		alignItems: 'center',
		width: '160%'
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 5
	},
	container: {
		marginTop: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
}))


const EmptyMessage = () => {
	return(
		<div style={{
			height: '75vh',
			alignItems: 'center',
			display: 'flex',
			justifyContent: 'center'
		}}>
			<center>
				<Typography variant='body1'>Tidak ditemukan hasil</Typography>
			</center>
		</div>
	);
}

const ProdKnowledge = props => {
	const { list, user } = props;
	const classes = useStyles();
	const inputFileref = useRef();
	const [query, setQuery] = useState('');
	const [choosedFile, setFile] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (query) {
			const timeId = setTimeout(function() {
				props.getData(query);
			}, 500);

			return () => clearTimeout(timeId);
		}else{
			props.getData();
		}
		//eslint-disable-next-line
	}, [query])

	const handleClickUpload = () => {
		inputFileref.current.value = null; //reset value 
		inputFileref.current.click();
	}

	const handleChangeFile = (e) => {
		setFile(inputFileref.current.files[0].name);
	}

	const onCancelUpload = () => {
		inputFileref.current.value = null; //reset value 
		setFile('');
	}

	const handleUpload = (field) => {
		setFile(''); //remove modal
		const formData = new FormData();
		formData.append('file', inputFileref.current.files[0]);
		formData.append('title', field.title);
		formData.append('description', field.description);

		setTimeout(function() {
			setLoading(true);
			props.onAddNewFile(formData)
				.then(() => setLoading(false))
				.catch(err => {
					setLoading(false);
					alert('Gagal upload');
				}) 	

		}, 10);
	}

	return(
		<div className={classes.root}>
			<Loader loading={loading} />
			{ choosedFile && 
				<ModalComponent 
					open={true} 
					handleClose={onCancelUpload}
					filename={choosedFile}
					onUpload={handleUpload}
				/>}
			<div className={classes.header}>
				<div className={classes.breadcumb}>
					<Typography variant='h5'>PRODUCT KNOWLEDGE</Typography>
				</div>
				<TextField 
					placeholder='Cari file'
					variant='outlined'
					size='small'
					style={{backgroundColor: "#FFF"}}
					fullWidth
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/> 
			</div>
			<Divider />
			
			<div className={classes.container}>
				{ list.length === 0 ? <EmptyMessage /> : <Grid container spacing={4}>
					{ list.map((row, index) => 
						<CardComponent 
							title={row.title} 
							description={row.description} 
							filename={row.file_name}
							key={index} 
							onDelete={(file) => props.onDelete(file)}
							jabatan={user.jabatan}
						/>)}
				</Grid> }
			</div>
			{ user.jabatan === 'Administrator' && <div className={classes.btnupload}>
				<Fab 
					color="secondary" 
					variant="extended" 
					aria-label="add" 
					className={classes.margin}
					onClick={handleClickUpload}
				>
		          <AddIcon /> Upload File
		        </Fab>
	        </div> }
	        <input 
	        	type='file'
	        	hidden
	        	ref={inputFileref}
	        	onChange={handleChangeFile}
	        />
		</div>
	);
}

function mapStateToProps(state) {
	return{
		list: state.knowledge,
		user: state.auth.user
	}
}

export default connect(mapStateToProps, { getData, onAddNewFile, onDelete })(ProdKnowledge);