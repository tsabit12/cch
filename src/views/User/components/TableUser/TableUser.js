import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import {
	Table,
	TableCell,
	TableRow,
	TableHead,
	TableBody,
	IconButton
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 500,
		position: 'relative',
		overflowX: 'auto'
	},
	row: {
		whiteSpace: 'nowrap',
		lineHeight: '13px'
	},
	text: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		maxWidth: '150px'
	},
	group: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}	
}))

const TableUser = props => {
	const classes = useStyles();
	const { activePage, limit } = props;

	var no = (activePage * limit) - limit + 1;

	return(
		<div className={classes.root}>
			<Table>
              	<TableHead>
	                <TableRow>
	                  <TableCell className={classes.row}>No</TableCell>
	                  <TableCell className={classes.row}>NAMA</TableCell>
	                  <TableCell className={classes.row}>USERNAME</TableCell>
	                  <TableCell className={classes.row}>EMAIL</TableCell>
	                  <TableCell className={classes.row}>KANTOR</TableCell>
	                  <TableCell className={classes.row}>REGIONAL</TableCell>
	                  <TableCell className={classes.row}>JABATAN</TableCell>
	                  <TableCell className={classes.row} align='center'>UPDATE</TableCell>
	                </TableRow>
              	</TableHead>
		        <TableBody>
		        	{ props.data.map((row, index) => (
		        		<TableRow key={index}>
			              <TableCell component="th" scope="row" className={classes.row}>{no++}</TableCell>
			              <TableCell className={classes.row}>{row.NamaLengkap}</TableCell>
			              <TableCell className={classes.row}>{row.username}</TableCell>
			              <TableCell className={classes.row}>{row.email}</TableCell>
			              <TableCell className={classes.row}>{row.kprk}</TableCell>
			              <TableCell className={classes.row}>{row.regional}</TableCell>
			              <TableCell className={classes.row}>
			              	<p className={classes.text}>{row.jabatan}</p>
			              </TableCell>
			              <TableCell className={classes.row}>
			              	<div className={classes.group}>
	              				<IconButton 
	              					color="default" 
	              					aria-label="update user"
	              					size="small"
	              					style={{padding: 0, height: 0}}
	              					//onClick={() => props.onEdit(row.customerId)}
	              				>
							        <EditIcon />
							    </IconButton>
						    </div>
			              </TableCell>
			            </TableRow>
		        	))}
		        </TableBody>
            </Table>
		</div>
	);
}

TableUser.propTypes = {
	data: PropTypes.array.isRequired,
	activePage: PropTypes.number.isRequired,
	limit: PropTypes.number.isRequired
}

export default TableUser;