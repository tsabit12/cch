import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardHeader,
	CardActions,
	Divider
} from "@material-ui/core";
import {
	SearchParam,
	DataPelanggan
} from "./components";
import api from "../../api";
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	action: {
		justifyContent: 'flex-end'
	}
}))

const Pelanggan = props => {
	const classes = useStyles();

	const handleGetKprk = (reg) => api.getKprk(reg)

	const handleSearch = (payload) => console.log(payload)

	return(
		<div className={classes.root}>
			<Card>
				<CardHeader 
					title='DATA PELANGGAN'
					action={<SearchParam 
						getKprk={handleGetKprk} 
						onSubmit={handleSearch}
					/>} 
				/>
				<Divider/>
				<DataPelanggan />
				<CardActions className={classes.action}>
					<Pagination 
						count={10} 
						variant="outlined" 
						shape="rounded" 
						// onChange={handleChangePage}
					/>
				</CardActions>
			</Card>
		</div>
	);
}

export default Pelanggan;