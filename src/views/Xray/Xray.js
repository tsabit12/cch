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
	Collapse,
	TextField
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
    const [query, setQuery] = useState('');
    const [state, setState] = useState({
    	loading: true,
    	errors: {}
    })
    const [totalInsert, setTotalInsert] = useState(0); 

    useEffect(() => {
    	if (query) {
    		const timeid = setTimeout(function() {
    			getXray(query);
    		}, 300);

    		return () => clearTimeout(timeid);
    	}else{
    		getXray();
    	}
    	//eslint-disable-next-line
    }, [query]);

    useEffect(() => {
    	if (isSucces) {
    		props.getData();
    		setDataExcel([]);
    		setVisible(false);
    		
    		setTimeout(function() {
    			setSucces(false);
    			setTotalInsert(0);
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
    	if (props.dataXray.length > 0 && state.errors.global && !query) {
    		setState(state => ({
    			...state,
    			errors: {}
    		}))
    	}
    }, [props.dataXray, state.errors, query])

    const getXray = (id=null) => {
    	props.getData(id)
    		.then(() => setState(state => ({ ...state, loading: false, errors: {} })))
    		.catch(err => setState(state => ({
    			...state,
    			loading: false,
    			errors: {
    				global: 'Data tidak ditemukan'
    			}
    		})))
    }

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
				setTotalInsert(res.jumlah);
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
        		message={`Sukses! Jumlah data berhasil diupload (${totalInsert})`}
        		variant='success'
        	/>
        	<Card>
        		<CardHeader 
        			title='GAGAL X-RAY'
        			action={
        				<div style={{display: 'flex', alignItems: 'center', jistifyContent: 'center', width: 500}}>
        					<TextField 
								placeholder='Cari ID kiriman disini..'
								variant='outlined'
								size='small'
								style={{backgroundColor: "#FFF"}}
								fullWidth
								value={query}
								onChange={(e) => setQuery(e.target.value)}
							/> 
	        				<Button 
	        					onClick={() => setVisible(!isVisibleExport)}
	        					variant='contained'
	        					style={{width: 200, marginLeft: 5}}
	        					color='primary'
	        				>
				        	 	{isVisibleExport ? 'CLOSE' : 'EXPORT FILE'}	
				        	</Button>
			        	</div>}
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
				    					<Typography variant='body2'>4. Sistem hanya akan menyimpan data xray yang ID Kiriman-nya belum terdaftar dalam sistem</Typography>
				    					<Typography variant='body2'>5. Pastikan data sudah valid sesuai dengan kolom yang ditampilkan oleh sistem</Typography>
				    					<Typography variant='body2'>6. Maksimum baris yang akan diupload adalah 5.000</Typography>
				    					<Typography variant='body2'>7. Silahkan klik tombol upload dipaling bawah jika data sudah sesuai</Typography>
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