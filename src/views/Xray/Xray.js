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
	Button
} from '@material-ui/core';
import {
	DataExcel
} from './components';
import { connect } from 'react-redux';
import Loader from '../Loader';
import Alert from '../Alert';
import api from '../../api';

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

    useEffect(() => {
    	if (isSucces) {
    		setDataExcel([]);
    		setTimeout(function() {
    			setSucces(false);
    		}, 3000);
    	}
    }, [isSucces])

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
        		message='File berhasil diupload'
        		variant='success'
        	/>
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

function mapStateToProps(state) {
	return{
		user: state.auth.user
	}
}

export default connect(mapStateToProps, null)(Xray);