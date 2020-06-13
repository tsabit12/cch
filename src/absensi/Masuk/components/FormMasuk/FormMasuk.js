import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	FormControl,
	TextField,
	Button
} from "@material-ui/core";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const convertToLabel = (date) => {
	const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
	  "Juli", "Augustus", "September", "Oktober", "November", "Desember"
	];
	const d = new Date(date),
	month = '' + monthNames[d.getMonth()],
	day = '' + d.getDate(),
	year = '' + d.getFullYear();
	return `${day} ${month} ${year}`;
}

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		width: '100%'
	},
	field: {
		width: '100%',
	},
	field2:{
		width: '100%',
		marginTop: theme.spacing(4)
	},
	form: {
		margin: theme.spacing(1),
		position: 'relative',
	},
	inputButton: {
		display: 'flex'
	},
	specialOutline: {
	    // borderColor: "pink",
	    borderTopRightRadius: 0,
	    borderBottomRightRadius: 0,
	},
	button: {
		borderTopLeftRadius: 0,
	    borderBottomLeftRadius: 0,
	    width: 100
	}
}));

const FormMasuk = props => {
	const curdate = new Date();

	const classes = useStyles();

	return(
		<Card className={classes.root}>
			<CardHeader title={`FORM ISI ABSENSI (${convertToLabel(curdate)})`} />
			<Divider/>
			<CardContent>
				<div className={classes.form}>
					<FormControl className={classes.field}>
						<div className={classes.inputButton}>
							<TextField 
								variant="outlined" 
								label="JAM MASUK"
								size="medium"
								InputProps={{
						            classes: { notchedOutline: classes.specialOutline }
						        }}
						        style={{width: '100%'}}
								value={props.masuk}
							/>
							<Button 
								className={classes.button} 
								variant="contained" 
								color="primary" 
								size="medium"
								onClick={props.onMasuk}
							>MASUK</Button>
						</div>
					</FormControl>
					<FormControl className={classes.field2}>
						<div className={classes.inputButton}>
							<TextField 
								variant="outlined" 
								label="JAM PULANG"
								size="medium"
								InputProps={{
						            classes: { notchedOutline: classes.specialOutline }
						        }}
						        style={{width: '100%'}}
								value={props.pulang}
							/>
							<Button 
								className={classes.button} 
								variant="contained" 
								style={{backgroundColor: 'red', color: 'white'}} 
								size="medium"
								onClick={props.onPulang}
							>Pulang</Button>
						</div>
					</FormControl>
				</div>
			</CardContent>
			<Divider />
			<CardActions className={classes.actions}>
		        <Button
		          color="primary"
		          size="small"
		          variant="text"
		          href="http://103.78.208.98/absensi"
		          target="_blank"
		        >
		          Tampilkan Rekap <ArrowRightIcon />
		        </Button>
		    </CardActions>
		</Card>
	);
}

export default FormMasuk;