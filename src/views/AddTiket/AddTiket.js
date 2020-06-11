import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Breadcrumbs,
	Typography
} from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4),
	},
	link: {
    	display: 'flex',
	},
	linkRoot: {
		display: 'flex',
		cursor: 'pointer'
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
}))

const AddTiket = props => {
	const classes = useStyles();

	return(
		<div className={classes.root}>
			<Breadcrumbs aria-label="Breadcrumb">
		        <Typography color="primary" onClick={() => props.history.push("/tiket")} className={classes.linkRoot}>
		          <FileCopyIcon className={classes.icon} />
		          Tiket
		        </Typography>
		        <Typography color="textPrimary" className={classes.link}>
		          Pengajuan
		        </Typography>
		    </Breadcrumbs>
		</div>
	);
}

export default AddTiket;