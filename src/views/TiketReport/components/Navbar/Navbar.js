import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	Button,
	Divider,
	Typography,
	ListItem,
	ListItemText,
	ListItemIcon,
	IconButton,
	Badge
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MailIcon from '@material-ui/icons/Mail';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	label: {
		margin: 10
	},
	listActived: {
		backgroundColor: 'rgba(216, 212, 212, 0.94)'
	}
}))

const StyledBadge = withStyles(theme => ({
  badge: {
    top: '50%',
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
}))(Badge);

const Navbar = props => {
	const classes = useStyles();
	const { page } = props;
	const { done, active } = props.jumlah;

	return(
		<Card className={classes.root}>
			<CardHeader 
				title={
					<Button
					    variant="outlined"
					    className={classes.button}
					    fullWidth
					    onClick={props.addTicket}
					>
				  		<AddIcon className={classes.leftIcon} />
				    	Buat Pengaduan
					</Button> 
				}
			/>
			<Divider />
			<div className={classes.label}>
				<Typography
	              color="inherit"
	              gutterBottom
	              variant="h5"
	            >
	            	DALAM PROSES
	            </Typography>
            </div>

            { props.level !== 1 && <ListItem 
				className={page === 1 ? classes.listActived : null} 
				button 
				divider
				onClick={() => props.onChangePage(1)}
			>
			    <ListItemText primary="Pengaduan Masuk" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={active.masuk} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem> }

			<ListItem 
				className={page === 2 ? classes.listActived : null} 
				button 
				divider
				onClick={() => props.onChangePage(2)}
			>
			    <ListItemText primary="Pengaduan Keluar" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={active.keluar} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>

			<div className={classes.label}>
				<Typography
	              color="inherit"
	              gutterBottom
	              variant="h5"
	            >
	            	SUDAH SELESAI
	            </Typography>
			</div>

			{ props.level !== 1 && <ListItem 
				className={page === 3 ? classes.listActived : null} 
				button 
				divider
				onClick={() => props.onChangePage(3)}
			>
			    <ListItemText primary="Pengaduan Masuk" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={done.masuk} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem> }

			<ListItem 
				button 
				onClick={() => props.onChangePage(4)}
				className={page === 4 ? classes.listActived : null}
			>
			    <ListItemText primary="Pengaduan Keluar" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={done.keluar} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>
		</Card>
	);
}

Navbar.propTypes = {
	jumlah: PropTypes.object.isRequired,
	page: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	level: PropTypes.number.isRequired,
	addTicket: PropTypes.func.isRequired
}

export default Navbar;