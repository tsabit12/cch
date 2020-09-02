import React from "react";
import {
	Card,
	CardHeader,
	CardContent,
	Divider
} from "@material-ui/core";
import { Pie } from 'react-chartjs-2';
import { makeStyles, useTheme } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	chartContainer: {
		position: 'relative',
    	height: '250px'
	},
	stats: {
		marginTop: theme.spacing(2),
		display: 'flex',
		justifyContent: 'center'
	},
	device: {
		textAlign: 'center',
		padding: theme.spacing(1)
	},
}))


const Statistik = props => {
	const classes = useStyles();
	const theme = useTheme();
	const { listData } = props;

	const data = {
	    datasets: [
	      {
	        data: [listData.semuaTicket, listData.ticketSelesai, listData.ticketTerbuka],
	        backgroundColor: [
	          theme.palette.warning.main,
	          theme.palette.secondary.dark,
	          theme.palette.info.main
	        ],
	        borderWidth: 8,
	        borderColor: theme.palette.white,
	        hoverBorderColor: theme.palette.white
	      }
	    ],
	    labels: ['Semua Tiket', 'Tiket Selesai', 'Terbuka']
	};


	const options = {
	    responsive: true,
	    maintainAspectRatio: false,
	    layout: { padding: 0 },
	    tooltips: {
	      enabled: true,
	      mode: 'index',
	      intersect: false,
	      borderWidth: 1,
	      borderColor: theme.palette.divider,
	      backgroundColor: theme.palette.white,
	      titleFontColor: theme.palette.text.primary,
	      bodyFontColor: theme.palette.text.secondary,
	      footerFontColor: theme.palette.text.secondary
	    },
	    plugins: {
	    	datalabels: {
	    		display: true,
	    		color: 'white'
	    	}
	    }
	};

	return(
		<Card>
			<CardHeader 
				title={`STATISTIK ${props.type}`}
			/>
			<Divider />
			<CardContent>
        		<div className={classes.chartContainer}>
        			<Pie
			            data={data}
			            options={options}
			        />	
        		</div>
        	</CardContent>
		</Card>
	);
}

Statistik.propTypes = {
	listData: PropTypes.object.isRequired
}

export default Statistik;