import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core";
import {
	Table,
	TableCell,
	TableRow,
	TableHead,
	TableBody,
	Switch,
	FormControlLabel
} from "@material-ui/core";

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

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    marginRight: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

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
			<Table size='small'>
              	<TableHead>
	                <TableRow>
	                  <TableCell className={classes.row}>No</TableCell>
	                  <TableCell className={classes.row}>NAMA</TableCell>
	                  <TableCell className={classes.row}>USERNAME</TableCell>
	                  <TableCell className={classes.row}>EMAIL</TableCell>
	                  <TableCell className={classes.row}>KANTOR</TableCell>
	                  <TableCell className={classes.row}>REGIONAL</TableCell>
	                  <TableCell className={classes.row}>JABATAN</TableCell>
	                  <TableCell className={classes.row}>STATUS</TableCell>
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
			              	<FormControlLabel
						        control={
						        	<IOSSwitch 
						        		checked={row.status === '1' ? true : false} 
						        		name="checkedB" 
						        		onChange={() => handleChange(row.username, row.status)}
						        	/>}
						        label={row.status === '1' ? 'Aktif' : 'Nonaktif'}
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
	onUpdate: PropTypes.func.isRequired
}

export default TableUser;