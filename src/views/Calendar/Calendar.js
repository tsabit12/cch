import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Grid,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	IconButton,
	CircularProgress,
	Backdrop,
	TextField,
	Paper,
	Button,
	Divider
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import api from '../../api';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	container: {
	    height: 450,
	},
	row: {
		whiteSpace: 'nowrap'
	},
	margin: {
		padding: 0
	},
	 loadingBackdrop: {
	    zIndex: theme.zIndex.drawer + 1,
	    color: '#fff',
	},
	progress: {
	    zIndex: theme.zIndex.drawer + 2,
	    position: 'absolute',
	    margin: '0 0 0 0',
	    left: '50%',
	    top: '50%',
	    color: 'white'
	},
}))

const numberTwodigit = (n) => {
	return n > 9 ? "" + n: "0" + n;
}

const CalendarComponent = props => {
	const classes = useStyles();
	const [selectedDays, setSelectedDays] = useState([]);
	const [loading, setLoading] = useState(false);

	const onRemove = (index) => {
		var array = [...selectedDays];
		array.splice(index, 1);
		setSelectedDays(array);
	}

	const validateWeekday = (date) => {
		const dayNames = new Date(date).toLocaleString('en-us', {  weekday: 'long' });
		if (dayNames === 'Sunday') {
			return false;
		}else{
			return true;
		}
	}


	const onChooseDate = (valueArr) => {		//how valiadte day if holiday
		//validate last array	
		var lastData = valueArr.length - 1;
		lastData 	 = valueArr[lastData];
		
		const dateValue 	= `${lastData.year}-${numberTwodigit(lastData.month)}-${numberTwodigit(lastData.day)}`;
		const isValidDate 	= validateWeekday(dateValue);
		if (isValidDate) {
			const newArr2 = valueArr.map(v => Object.assign(v, {keterangan: v.keterangan ? v.keterangan : ''}));
			setSelectedDays(newArr2);
		}
	}

	const handleChangeDesc = (e, choosedIndex) => {
		const { value } = e.target;
		let currentInput = selectedDays[choosedIndex];
		
		setSelectedDays(days => 
			days.map((row, index) => index === choosedIndex ? { ...currentInput, keterangan: value } : row)
		)
	}

	const onSubmit = () => {
		setLoading(true);

		const payload = [];

		selectedDays.forEach(row => {
			payload.push({
				date_start: `${row.year}-${numberTwodigit(row.month)}-${numberTwodigit(row.day)}`,
				description: row.keterangan,
				username: props.user.email
			})
		})

		api.cch.addLibur(payload)
			.then(res => {
				setSelectedDays([]);
				setTimeout(function() {
					setLoading(false);
					props.history.push(`/setting`);
				}, 10);
			})
			.catch(err => {
				console.log(err);
				alert('Terdapat kesalahan');
				setTimeout(function() {
					setLoading(false);
				}, 10);
			})
	}

	return(
		<div className={classes.root}>
			<Card>
				<Backdrop className={classes.loadingBackdrop} open={loading} />
        		{ loading && <CircularProgress className={classes.progress} /> }				
				<CardHeader 
					title='TAMBAH HARI LIBUR'
				/>
				<Divider />
				<CardContent>
					<Grid container>
				      	<Grid
				          item
				          lg={4}
				          sm={4}
				          xl={4}
				          xs={12}
				        >
							<Calendar
					            value={selectedDays}
					            onChange={(val) => onChooseDate(val)}
					            shouldHighlightWeekends
					        />
				        </Grid>
				        <Grid
				          item
				          lg={8}
				          sm={8}
				          xl={8}
				          xs={12}
				        >
				        	<Paper>
					        	<TableContainer className={classes.container}>
						        	<Table stickyHeader aria-label="sticky table" size='small'>
						        		<TableHead>
						        			<TableRow>
						        				<TableCell className={classes.row}>TANGGAL</TableCell>
						        				<TableCell className={classes.row}>KETERANGAN</TableCell>
						        				<TableCell className={classes.row} align='center'>ACTION</TableCell>
						        			</TableRow>
						        		</TableHead>
						        		<TableBody>
						        			{ selectedDays.length > 0 ? selectedDays.map((row, index) => <TableRow key={index}>
						        					<TableCell className={classes.row}>{row.year}-{numberTwodigit(row.month)}-{numberTwodigit(row.day)}</TableCell>
						        					<TableCell>
						        						<TextField 
						        							id="standard-basic" 
						        							placeholder='Masukan keterangan disini' 
						        							variant="outlined"
						        							fullWidth
						        							value={row.keterangan}
						        							onChange={(e) => handleChangeDesc(e, index)}
						        							autoComplete='off'
						        							size='small'
						        						/>
						        					</TableCell>
						        					<TableCell align='center'>
						        						<IconButton 
						        							aria-label="delete" 
						        							style={{padding: 0}}
						        							onClick={() => onRemove(index)}
						        						>
												          <DeleteIcon fontSize="small" />
												        </IconButton>
						        					</TableCell>
						        				</TableRow>) : <TableRow>
						        					<TableCell align='center' colSpan={3}>Select date</TableCell>
						        				</TableRow> }
						        		</TableBody>
						        	</Table>
						        </TableContainer>
					        </Paper>
				        </Grid>
			        </Grid>
		        </CardContent>
		        <Divider />
		        <CardActions style={{justifyContent: 'flex-end'}}>
		        	<Button 
		        		variant="outlined" 
		        		color="primary" 
		        		onClick={onSubmit}
		        		disabled={selectedDays.length > 0 ? false : true }
		        	>
    					SAVE
  					</Button>
		        </CardActions>
		    </Card>
		</div>
	);
}

function mapStateToProps(state) {
	return{
		user: state.auth.user
	}
}

export default connect(mapStateToProps, null)(CalendarComponent);