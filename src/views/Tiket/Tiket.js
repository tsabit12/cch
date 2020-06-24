import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from '@material-ui/core';
import { 
	BtnPengaduan,
	TableTiket
} from "./components";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Tiket = props => {
	const [state, setState] = React.useState({
		title: 'Ticket Masuk',
		active: 1
	})

	const handleChangeTitle = (title, active) => setState(prevState => ({
		...prevState,
		title,
		active: active
	}))

	const classes = useStyles();

	return(
		<div className={classes.root}>
	      <Grid
	        container
	        spacing={4}
	      >
	      	<Grid
	          item
	          lg={3}
	          sm={6}
	          xl={3}
	          xs={12}
	        >
	        	<BtnPengaduan 
	        		onClickTitle={handleChangeTitle} 
	        		addTicket={() => props.history.push("/tiket/add")}
	        		activeLink={state.active}
	        	/>
	        </Grid>
	        <Grid
	          item
	          lg={9}
	          sm={6}
	          xl={3}
	          xs={12}
	        >
	        	<TableTiket title={state.title} />
	        </Grid>
	      </Grid>
	    </div>
	);
}

export default Tiket;