import React from "react";
import {
  Card,
  CardHeader,
  Divider,
  Button,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  IconButton,
  Typography
} from '@material-ui/core';
import { makeStyles, withStyles } from "@material-ui/styles";
import AddIcon from '@material-ui/icons/Add';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 600
	},
	divButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10
	},
	button: {
		paddingLeft: 17,
		paddingRight: 17
	},
	leftIcon: {
		marginRight: 2
	},
	margin: {
	    margin: theme.spacing(1),
	},
	list: {
		padding: 0,
		paddingLeft: 15,
		paddingRight: 10
	},
	listActived: {
		padding: 0,
		paddingLeft: 15,
		paddingRight: 10,
		backgroundColor: 'rgba(216, 212, 212, 0.94)'
	},
	bottom: {
		margin: 10,
		marginLeft: 15,
		marginTop: 20
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

const BtnPengaduan = props => {
	const { total } = props;
	const classes = useStyles();
	return(
		<Card className={classes.root}>
			<CardHeader
		        title="NOTIFIKASI"
		    />
		    <Divider/>
			<div className={classes.divButton}>
	        	<Button
				    size="small"
				    variant="outlined"
				    className={classes.button}
				    onClick={props.addTicket}
				  >
				  	<AddIcon className={classes.leftIcon} />
				    Buat Pengajuan
				</Button>
			</div>
			
			<ListItem 
				className={props.activeLink === 1 ? classes.listActived : classes.list} 
				button 
				onClick={() => props.onClickTitle('TICKET MASUK', 1)}
			>
			    <ListItemText primary="Ticket Masuk" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={total.masuk} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>
			<Divider/>
			<ListItem 
				className={props.activeLink === 2 ? classes.listActived : classes.list} 
				button 
				onClick={() => props.onClickTitle('TICKET KELUAR', 2)}
			>
			    <ListItemText primary="Ticket Keluar" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={total.keluar} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>
			<Divider/>
			<ListItem 
				button 
				onClick={() => props.onClickTitle('BARU DIUPDATE', 3)}
				className={props.activeLink === 3 ? classes.listActived : classes.list} 
			>
			    <ListItemText primary="Baru Diupdate" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={total.updated} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>
			<Divider/>
			<ListItem 
				button 
				onClick={() => props.onClickTitle('PERMINTAAN TUTUP TICKET', 4)}
				className={props.activeLink === 4 ? classes.listActived : classes.list} 
			>
			    <ListItemText primary="Permintaan Tutup Ticket" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={total.closed} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>
			<div className={classes.bottom}>
				<Typography
	              className={classes.title}
	              color="inherit"
	              gutterBottom
	              variant="h5"
	            >
	            	Semua Ticket
	            </Typography>
			</div>
			<ListItem 
				button 
				onClick={() => props.onClickTitle('SEMUA TICKET MASUK', 5)}
				className={props.activeLink === 5 ? classes.listActived : classes.list} 
			>
			    <ListItemText primary="Semua Ticket Masuk" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={total.allKeluar} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>
			<Divider/>
			<ListItem 
				className={props.activeLink === 6 ? classes.listActived : classes.list} 
				button 
				onClick={() => props.onClickTitle('SEMUA TICKET KELUAR', 6)}
			>
			    <ListItemText primary="Semua Ticket Keluar" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={total.allMasuk} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>
	    </Card>
	);
}	

export default BtnPengaduan;