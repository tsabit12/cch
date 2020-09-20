import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import readXlsxFile from 'read-excel-file';
import {
	Card, 
	CardHeader,
	CardContent,
	CardActions,
	Grid,
	Divider,
	Typography,
	Button,
	Collapse
} from '@material-ui/core';
import {
	DataExcel,
	TableXray
} from './components';
import { connect } from 'react-redux';
import Loader from '../Loader';
import Alert from '../Alert';
import api from '../../api';
import { getData } from '../../actions/xray';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    header: {
    	backgroundColor: 'red',
    	color: '#FFF'
    },
    link: {
    	color: 'blue',
    	cursor: 'pointer'
    }
}))

const Xray = props => {
    const classes = useStyles();
    const inputRef = useRef();
    const [dataExcel, setDataExcel] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSucces, setSucces] = useState(false);
    const [isVisibleExport, setVisible] = useState(false);
    const [state, setState] = useState({
    	loading: true,
    	errors: {}
    })

    useEffect(() => {
    	props.getData()
    		.then(() => setState(state => ({ ...state, loading: false })))
    		.catch(err => setState(state => ({
    			...state,
    			loading: false,
    			errors: {
    				global: 'Data tidak ditemukan'
    			}
    		})))
    	//eslint-disable-next-line
    }, []);

    useEffect(() => {
    	if (isSucces) {
    		props.getData();
    		setDataExcel([]);
    		setVisible(false);
    		
    		setTimeout(function() {
    			setSucces(false);
    		}, 3000);
    	}
    	//eslint-disable-next-line
    }, [isSucces])

    useEffect(() => {
    	if (!isVisibleExport) {
    		setTimeout(function() {
    			setDataExcel([]);
    		}, 500);
    	}
    }, [isVisibleExport]);

    useEffect(() => {
    	if (props.dataXray.length > 0 && state.errors.global) {
    		setState(state => ({
    			...state,
    			errors: {}
    		}))
    	}
    }, [props.dataXray, state.errors])

	const handleChange = (e) => {
		readXlsxFile(inputRef.current.files[0]).then((rows) => {
			setDataExcel(rows);
		})
	}

	const handleClickFile = () => {
		inputRef.current.value = null; //reset value 
		inputRef.current.click();
	}

	const handleUpload = (payload) => {
		setLoading(true);

		api.uploadXray(payload)
			.then(res => {
				setLoading(false);
				setSucces(true);
			})
			.catch(err => {
				setLoading(false);
				console.log(err);
			});
	}

	const handleDownload = () => {
		window.open(`${process.env.REACT_APP_IMAGE}/sample_xray.xlsx`, '_blank');
	}

    return(
        <div className={classes.root}>
	        <Loader loading={loading} />
        	<Alert 
        		open={isSucces}
        		message='File berhasil diupload. Refreshing data...'
        		variant='success'
        	/>
        	<Card>
        		<CardHeader 
        			title='GAGAL X-RAY'
        			action={
        				<Button 
        					onClick={() => setVisible(!isVisibleExport)}
        					variant='contained'
        					color='primary'
        				>
			        	 	{isVisibleExport ? 'CLOSE' : 'EXPORT FILE'}	
			        	</Button>}
        		/>
        		<Divider />
		       	<Collapse in={isVisibleExport}>
        			<CardContent>
				    	<Grid container spacing={1}>
				    		<Grid 
				    			item
				    			lg={4}
								md={4}
								xl={4}
								xs={12}
				    		>
				    			<Card>
				    				<CardHeader 
				    					className={classes.header}
				    					title={<Typography style={{color: '#FFF'}} variant='h5'>KETERANGAN *</Typography>}
				    				/>
				    				<CardContent>
				    					<Typography variant='body2'>1. Pastikan file yang akan diupload adalah file excel dengan format xlsx</Typography>
				    					<Typography variant='body2'>2. Download templete excel <span onClick={handleDownload} className={classes.link}>disini</span></Typography>
				    					<Typography variant='body2'>3. Setelah kamu memilih file yang akan diupload, sistem akan menampilkan datanya terlebih dahulu sebelum diupload ke server</Typography>
				    					<Typography variant='body2'>4. Pastikan data sudah valid sesuai dengan kolom yang ditampilkan oleh sistem</Typography>
				    					<Typography variant='body2'>5. Silahkan klik tombol upload dipaling bawah jika data sudah sesuai</Typography>
				    				</CardContent>
				    				<Divider />
				    				<CardActions>
				    					<Button 
				    						variant="outlined" 
				    						color="primary" fullWidth
				    						onClick={handleClickFile}
				    					>
									        Pilih File Excel
									    </Button>
				    				</CardActions>
				    			</Card>
				    		</Grid>
				    		{ dataExcel.length > 0 && 
				    			<Grid 
				        			item
				        			lg={8}
									md={8}
									xl={8}
									xs={12}
				        		>
				        			<DataExcel 
				        				data={dataExcel} 
				        				onUpload={handleUpload} 
				        				email={props.user.email}
				        			/>
				        		</Grid> }
				    	</Grid>
	        		</CardContent>
		        </Collapse>
		        <TableXray 
		        	data={state}
		        	list={props.dataXray}
		        />
        	</Card>

        	<input 
            	type="file" 
            	ref={inputRef}
            	id="input" 
            	hidden
            	onChange={handleChange}
            />
        </div>
    )
}

Xray.propTypes = {
	user: PropTypes.object.isRequired,
	dataXray: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		user: state.auth.user,
		dataXray: state.xray
	}
}

export default connect(mapStateToProps, { getData })(Xray);