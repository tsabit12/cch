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
import clsx from "clsx";
import AddIcon from '@material-ui/icons/Add';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles(theme => ({
	root: {},
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
	const classes = useStyles();
	return(
		<Card className={clsx(classes.root)}>
			<CardHeader
		        title="NOTIFIKASI"
		    />
		    <Divider/>
			<div className={classes.divButton}>
	        	<Button
				    size="small"
				    variant="outlined"
				    className={classes.button}
				  >
				  	<AddIcon className={classes.leftIcon} />
				    Buat Pengajuan
				</Button>
			</div>
			
			<ListItem className={classes.list} button>
			    <ListItemText primary="Ticket Masuk" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={4} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>
			<Divider/>
			<ListItem className={classes.list} button>
			    <ListItemText primary="Ticket Keluar" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={4} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>
			<Divider/>
			<ListItem className={classes.list} button>
			    <ListItemText primary="Baru Diupdate" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={4} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>
			<Divider/>
			<ListItem className={classes.list} button>
			    <ListItemText primary="Permintaan Tutup Ticket" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={4} color="primary">
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
			<ListItem className={classes.list} button>
			    <ListItemText primary="Semua Ticket Masuk" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={4} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>
			<Divider/>
			<ListItem className={classes.list} button>
			    <ListItemText primary="Semua Ticket Keluar" />
				<ListItemIcon>
					<IconButton aria-label="Cart" disabled>
				      <StyledBadge badgeContent={4} color="primary">
				        <MailIcon />
				      </StyledBadge>
				    </IconButton>
			    </ListItemIcon>
			</ListItem>
	    </Card>
	);
}	

export default BtnPengaduan;