import React, { useRef, useState } from 'react';
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
} from '@material-ui/core';
import { DataExcel } from './components';
import { connect } from 'react-redux';
import Loader from '../Loader';
import api from '../../api';
import { addMessage } from '../../actions/message';
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

	const handleChange = (e) => {
		readXlsxFile(inputRef.current.files[0]).then((rows) => {
			setDataExcel(rows.filter((row, index) => index !== 0));
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
				setTimeout(function() {
					props.addMessage(`Proses upload berhasil, jumlah berhasil upload (${res.jumlah})`, 'uploadXray');
					props.history.push('/x-ray');
				}, 10);
				// setTotalInsert(res.jumlah);
			})
			.catch(err => {
				setLoading(false);
			});
	}

	const handleDownload = () => {
		window.open(`${process.env.REACT_APP_IMAGE}/sample_xray.xlsx`, '_blank');
	}

    return(
        <div className={classes.root}>
	        <Loader loading={loading} />
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
	addMessage: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		user: state.auth.user
	}
}

export default connect(mapStateToProps, { addMessage })(Xray);