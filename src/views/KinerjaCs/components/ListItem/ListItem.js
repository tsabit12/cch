import React from 'react';
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableContainer,
	Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	cell: {
		whiteSpace: 'nowrap',
		//lineHeight: '13px',
		fontSize: 13
	}
}))

const ListItem = props => {
	const classes = useStyles();
	const { data } = props;
	var no = 1;

	return(
		<TableContainer style={{maxHeight: 380}}>
			<Table stickyHeader aria-label="sticky table" size='small' padding='checkbox'>
				<TableHead>
					<TableRow>
						<TableCell className={classes.cell}>NO</TableCell>
						<TableCell className={classes.cell}>KANTOR</TableCell>
						<TableCell className={classes.cell}>CUSTOMER SERVICE</TableCell>
						<TableCell className={classes.cell} align='right'>SELESAI</TableCell>
						<TableCell className={classes.cell} align='right'>TERBUKA</TableCell>
						<TableCell className={classes.cell} align='right'>TOTAL</TableCell>
						<TableCell className={classes.cell} align='center'>ACTION</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ data.length > 0 ? data.map((row, index) => <TableRow key={index}>
						<TableCell className={classes.cell}>{no++}</TableCell>
						<TableCell className={classes.cell}>{row.kantor_pos}</TableCell>
						<TableCell className={classes.cell}>{row.title.toUpperCase()}</TableCell>
						<TableCell className={classes.cell} align='right'>{row.jmlselesai}</TableCell>
						<TableCell className={classes.cell} align='right'>{row.jmlterbuka}</TableCell>
						<TableCell className={classes.cell} align='right'>{Number(row.jmlselesai) + Number(row.jmlterbuka)}</TableCell>
						<TableCell className={classes.cell} align='center'>
							<Button 
								size='small' 
								color='primary'
								onClick={() => props.onView(row.email)}
							>
								Detail
							</Button>
						</TableCell>
					</TableRow>) : <TableRow>
						<TableCell colSpan={7} align='center'>Data kosong</TableCell>
					</TableRow>}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

ListItem.propTypes = {
	data: PropTypes.array.isRequired,
	onView: PropTypes.func.isRequired
}

export default ListItem;