import React from "react";
import {
	Card,
	CardHeader,
	Divider,
	Box,
	Icon,
	Typography
} from "@material-ui/core";
import { Pie } from 'react-chartjs-2';
import { useTheme } from "@material-ui/styles";
import PropTypes from "prop-types";


const Statistik = props => {
	const theme = useTheme();
	const { listData } = props;

	const data = {
	    datasets: [
	      {
	        data: [listData.all, listData.selesai, listData.terbuka],
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

	const labelValue = [
		{jumlah: listData.all, color: theme.palette.warning.main, label: 'Semua' }, 
		{jumlah: listData.selesai, color: theme.palette.secondary.dark, label: 'Selesai' }, 
		{jumlah: listData.terbuka, color: theme.palette.info.main, label: 'Terbuka' }
	]


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
	    legend: {
	      display: false
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
			
			<Box
	          height={250}
	          position="relative"
	          marginTop={2}
	          marginBottom={2}
	       	>
    			<Pie
		            data={data}
		            options={options}
		        />	
    		</Box>
    		
    		<Divider />

    		<Box
	          display="flex"
	          justifyContent="center"
	          mt={2}
	          marginBottom={2}
	        >
	        	{ labelValue.map((row, index) => <Box p={1} textAlign="center" key={index}>
		              <Icon color="action" />
		              <Typography
		                color="textPrimary"
		                variant="body1"
		              >
		                { row.label }
		              </Typography>
		              <Typography
		                style={{ color: row.color }}
		                variant="h2"
		              >
		                {row.jumlah}
		              </Typography>
				</Box> )}
	        </Box>
		</Card>
	);
}

Statistik.propTypes = {
	listData: PropTypes.object.isRequired
}

export default Statistik;