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
		backgroundColor: 'rgba(216, 212, 212, 0.94)',
		height: 40
	},
	listItem: {
		height: 40
	}
}))

const StyledBadge = withStyles(theme => ({
  badge: {
    top: '50%',
	right: -3,
	fontSize: 10,
    // The border color match the background color.
    border: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
}))(Badge);

const Navbar = props => {
	const classes = useStyles();
	const { page } = props;
	const { done, active, close, lastupdate, lastupdateMasuk } = props.jumlah;

	return(
		<Card className={classes.root}>
			<CardHeader 
				title={
					<Button
					    variant="outlined"
					    className={classes.button}
						fullWidth
						size='small'
					    onClick={props.addTicket}
					>
				  		<AddIcon className={classes.leftIcon} style={{fontSize: 18}} />
				    	<Typography variant='body2' style={{fontWeight: 'bold'}}>Buat Pengaduan</Typography>
					</Button> 
				}
			/>
			<div className={classes.label}>
				<Typography
	              color="inherit"
	              gutterBottom
				  variant="body2"
				  style={{fontWeight: 'bold'}}
	            >
	            	DALAM PROSES
	            </Typography>
            </div>

            { props.level !== 1 && <ListItem 
				className={page === 1 ? classes.listActived : classes.listItem} 
				button 
				onClick={() => props.onChangePage(1)}
			>
			    <ListItemText primary={<Typography variant='body2'>Pengaduan Masuk</Typography>} />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled size='small'>
				      <StyledBadge badgeContent={active.masuk} color="primary">
				        <MailIcon style={{fontSize: 20}} />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem> }

			<ListItem 
				className={page === 2 ? classes.listActived : classes.listItem} 
				button 
				onClick={() => props.onChangePage(2)}
			>
			    <ListItemText primary={<Typography variant='body2'>Pengaduan Keluar</Typography>} />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled size='small'>
				      <StyledBadge badgeContent={active.keluar} color="primary">
				        <MailIcon style={{fontSize: 20}} />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>
			<Divider />
			<div className={classes.label}>
				<Typography
	              color="inherit"
	              gutterBottom
				  variant="body2"
				  style={{fontWeight: 'bold'}}
	            >
	            	SUDAH SELESAI
	            </Typography>
			</div>

			{ props.level !== 1 && <ListItem 
				className={page === 3 ? classes.listActived : classes.listItem} 
				button 
				onClick={() => props.onChangePage(3)}
			>
			    <ListItemText primary={<Typography variant='body2'>Pengaduan Masuk</Typography>} />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled size='small'>
				      <StyledBadge badgeContent={done.masuk} color="primary">
					  	<MailIcon style={{fontSize: 20}} />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem> }

			<ListItem 
				button 
				onClick={() => props.onChangePage(4)}
				className={page === 4 ? classes.listActived : classes.listItem}
			>
			    <ListItemText primary={<Typography variant='body2'>Pengaduan Keluar</Typography>} />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled size='small'>
				      <StyledBadge badgeContent={done.keluar} color="primary">
					  	<MailIcon style={{fontSize: 20}} />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>
			<Divider />
			<div className={classes.label}>
				<Typography
	              color="inherit"
	              gutterBottom
				  variant="body2"
				  style={{fontWeight: 'bold'}}
	            >
	            	BARU DIUPDATE
	            </Typography>
			</div>

			<ListItem 
				button 
				onClick={() => props.onChangePage(6)}
				className={page === 6 ? classes.listActived : classes.listItem}
			>
			    <ListItemText primary={<Typography variant='body2'>Pengaduan Keluar</Typography>} />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled size='small'>
				      <StyledBadge badgeContent={lastupdate} color="primary">
					  	<MailIcon style={{fontSize: 20}} />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>

			{ props.level !== 1 && <ListItem 
				button 
				onClick={() => props.onChangePage(7)}
				className={page === 7 ? classes.listActived : classes.listItem}
			>
			    <ListItemText primary={<Typography variant='body2'>Pengaduan Masuk</Typography>} />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled size='small'>
				      <StyledBadge badgeContent={lastupdateMasuk} color="primary">
					  	<MailIcon style={{fontSize: 20}} />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem> }
			<Divider />

			<div className={classes.label}>
				<Typography
	              color="inherit"
	              gutterBottom
				  variant="body2"
				  style={{fontWeight: 'bold'}}
	            >
	            	LAINNYA
	            </Typography>
			</div>

			<ListItem 
				button 
				onClick={() => props.onChangePage(5)}
				className={page === 5 ? classes.listActived : classes.listItem}
			>
			    <ListItemText primary={<Typography variant='body2'>Request Tutup</Typography>} />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled size='small'>
				      <StyledBadge badgeContent={close} color="primary">
				        <MailIcon style={{fontSize: 20}} />
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