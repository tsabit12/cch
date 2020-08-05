import React from "react";
import PropTypes from "prop-types";
import {
	Card,
	Table,
	TableHead,
	TableCell,
	TableRow,
	TableBody,
	CardActions,
	Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import api from "../../../../api";
import paginate from 'paginate-array';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	loader: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '90%'
	},
	row: {
		whiteSpace: 'nowrap',
		lineHeight: '15px'
	},
	action: {
		justifyContent: 'flex-end'
	},
	content: {
		minHeight: 440,
		overflowY: 'auto'
	}
}))

const Kodepos = props => {
	const [state, setState] = React.useState({
		todos: [],
		page: 1,
		text: 'Loading...',
		currPage: {},
		size: 8
	})

	React.useEffect(() => {
		api.cekKodepos(props.city)
			.then(todos => {
				const currPage = paginate(todos, 1, 8);	
				console.log(currPage);
				setState(state => ({
					...state,
					todos,
					currPage
				}))
			})
			.catch(err => {
				setState(state => ({
					...state,
					text: 'Terdapat kesalahan'
				}))
			})
	}, [props.city]);

	const classes = useStyles();
	const { currPage } = state;
	
	var no = (Number(state.page) * 8) - 7;

	const handleChangePage = (e, page) => {
		const newCurrPage = paginate(state.todos, page, state.size);
		setState(state => ({
			...state,
			page,
			currPage: newCurrPage
		})) 
	}


	return(	
		<Card className={classes.root}>
			<div className={classes.content}>
				<Table>
					<TableHead>
		                <TableRow>
		                  <TableCell className={classes.row}>NO</TableCell>
		                  <TableCell className={classes.row}>KANTOR POS</TableCell>
		                  <TableCell className={classes.row}>JENIS</TableCell>
		                  <TableCell className={classes.row}>ALAMAT</TableCell>
		                  <TableCell className={classes.row}>KODE POS</TableCell>
		                </TableRow>
	              	</TableHead>
	              	<TableBody>
	              		{ state.todos.length === 0 ? <TableRow>
	              			<TableCell colSpan='5' className={classes.row} align='center'>{state.text}</TableCell>
	              		</TableRow> : currPage.data.map((row, index) => (
	              			<TableRow key={index}>
	              				<TableCell className={classes.row}>{no++}</TableCell>
	              				<TableCell className={classes.row}>{row.office_name}</TableCell>
	              				<TableCell className={classes.row}>{row.type}</TableCell>
	              				<TableCell className={classes.row}>{row.address}</TableCell>
	              				<TableCell className={classes.row}>{row.zipcode}</TableCell>
	              			</TableRow>
	              		))}
	              	</TableBody>
				</Table>
			</div>
			<CardActions className={classes.action}>
				<Button variant='outlined' onClick={props.resetForm}>Reset</Button>
				<Pagination 
					count={currPage.totalPages ? currPage.totalPages : 0 } 
					variant="outlined" 
					shape="rounded" 
					page={state.page}
					onChange={handleChangePage}
				/>
			</CardActions>
		</Card>
	);
}

Kodepos.propTypes = {
	city: PropTypes.string.isRequired,
	resetForm: PropTypes.func.isRequired
}

export default Kodepos;