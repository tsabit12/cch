import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import {
	Table,
	TableCell,
	TableRow,
	TableHead,
	TableBody,
	Button,
	Menu,
	MenuItem
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 360,
		position: 'relative',
		overflowX: 'auto'
	},
	row: {
		whiteSpace: 'nowrap',
		//lineHeight: '13px',
		fontSize: 13
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
	},
	btnMenu: {
		// color: '#FFF'
		padding: 0
	}
}))

const ThreeDotsMenu = props => {
	const { status } = props;
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	
	const handleClick = (event) => {
	    setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
	    setAnchorEl(null);
	};

	const handleChoose = () => {
	    setAnchorEl(null);
	    setTimeout(function() {
	    	props.onUpdate();
	    }, 10);
	};

	const handleNonaktif = () => {
		props.onNonaktif();
		setAnchorEl(null);
	}

	return(
		<div>
      		<Button 
		      	aria-controls="simple-menu" 
		      	aria-haspopup="true" 
		      	size='small'
		      	fullWidth
		      	variant='outlined'
		      	// color='primary'
		      	onClick={handleClick}
		      	className={classes.btnMenu}
		    >
		    	PILIH <KeyboardArrowDownIcon size='small' />
		    </Button>
		    <Menu
		        id="simple-menu"
		        anchorEl={anchorEl}
		        keepMounted
		        open={Boolean(anchorEl)}
		        onClose={handleClose}
		    >
		        <MenuItem onClick={handleNonaktif}>{status === '1' ? 'Nonaktifkan' : 'Aktifkan'}</MenuItem>
		        <MenuItem onClick={handleChoose}>Update</MenuItem>
		    </Menu>
	    </div>
	);
}

const TableUser = props => {
	const classes = useStyles();
	const { activePage, limit } = props;

	var no = (activePage * limit) - limit + 1;

	const handleChange = (username, status) => {
		let newStatus = status === '1' ? '2' : '1';
		const payload = {
			status: newStatus,
			username
		};
		props.onUpdate(payload);
	}

	return(
		<div className={classes.root}>
			<Table size='small' padding='checkbox'>
              	<TableHead>
	                <TableRow>
	                  <TableCell className={classes.row}>No</TableCell>
	                  <TableCell className={classes.row}>NAMA</TableCell>
	                  <TableCell className={classes.row}>USERNAME</TableCell>
	                  <TableCell className={classes.row}>EMAIL</TableCell>
	                  <TableCell className={classes.row}>NO HP</TableCell>
	                  <TableCell className={classes.row}>KANTOR</TableCell>
	                  <TableCell className={classes.row}>REGIONAL</TableCell>
	                  <TableCell className={classes.row}>HAK AKSES</TableCell>
	                  <TableCell className={classes.row}>STATUS</TableCell>
	                  <TableCell className={classes.row} align='center'>ACTION</TableCell>
	                </TableRow>
              	</TableHead>
		        <TableBody>
		        	{ props.data.map((row, index) => (
		        		<TableRow key={index}>
			              <TableCell component="th" scope="row" className={classes.row}>{no++}</TableCell>
			              <TableCell className={classes.row}>{row.NamaLengkap.toUpperCase()}</TableCell>
			              <TableCell className={classes.row}>{row.username}</TableCell>
			              <TableCell className={classes.row}>{row.email}</TableCell>
			              <TableCell className={classes.row}>{row.phone}</TableCell>
			              <TableCell className={classes.row}>{row.kprk}</TableCell>
			              <TableCell className={classes.row}>{row.regional}</TableCell>
			              <TableCell className={classes.row}>
			              	<p className={classes.text}>{row.jabatan}</p>
			              </TableCell>
			              <TableCell className={classes.row}>{row.status === '1' ? 'Aktif' : 'Nonaktif'}</TableCell>
			              <TableCell className={classes.row} align='center'>
			              	<ThreeDotsMenu 
			              		status={row.status} 
			              		onNonaktif={() => handleChange(row.username, row.status)}
			              		onUpdate={() => props.onClickUpdate(row.username)}
			              	/>
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
	limit: PropTypes.number.isRequired,
	onUpdate: PropTypes.func.isRequired,
	onClickUpdate: PropTypes.func.isRequired
}

export default TableUser;