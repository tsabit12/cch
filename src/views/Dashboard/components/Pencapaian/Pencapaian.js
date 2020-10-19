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


const Pencapaian = props => {
	const theme = useTheme();

	const data = {
	    datasets: [
	      {
	        data: [props.kurang, props.lebih],
	        backgroundColor: [
	          theme.palette.primary.main,
	          theme.palette.error.main
	        ],
	        borderWidth: 8,
	        borderColor: theme.palette.white,
	        hoverBorderColor: theme.palette.white
	      }
	    ],
	    labels: ['24 Jam', '>24 Jam']
	};

	const labelValue = [
		{jumlah: props.kurang, color: theme.palette.primary.main, label: '24 Jam' },
		{jumlah: props.lebih, color: theme.palette.error.main, label: '> 24 Jam' }
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
	    plugins: {
	    	datalabels: {
	    		display: true,
	    		color: 'white'
	    	}
	    },
	    legend: {
	      display: false
	    },
	    onClick: function(evt, elm) {
	    	if(elm.length > 0){
	    		var ind 	= elm[0]._index;
	    		const payload = {
	    			jumlah: data.datasets[0].data[ind],
	    			label: data.labels[ind] === '>24 Jam' ? 'lebih' : 'kurang',
	    			type: props.type === 'MASUK' ? 1 : 2
	    		} 
	    		props.getDetail(payload);
	    	}
	    }
	};

	return(
		<Card style={{height: '100%'}}>
			<CardHeader 
				title={`PENCAPAIAN ${props.type}`}
			/>
			<Divider />
			<div>
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
	    			{ labelValue.map((row, index) => 
	    				<Box p={1} textAlign="center" key={index}>
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
    		</div>
		</Card>
	);
}

Pencapaian.propTypes = {
	lebih: PropTypes.number.isRequired,
	kurang: PropTypes.number.isRequired,
	getDetail: PropTypes.func.isRequired
}

export default Pencapaian;