import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
	Card,
	CardHeader,
	Divider,
	Box,
	Typography
} from '@material-ui/core';
import palette from '../../../../theme/palette';

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary,
    callbacks: {
      label: function(tooltipItem, data) {
        var xLabel       = data.datasets[tooltipItem.datasetIndex].label; 
        var tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        return `${xLabel} = ${parseInt(tooltipValue).toLocaleString()}`;   
      }
    } // end callbacks:
  },
  // showAllTooltips: true,
  plugins: {
  	datalabels: {
  		display: true,
  		anchor: 'end',
        align: 'end',
        color: palette.text.secondary,
        textAlign: 'center',
        offset: -2
  	}
  },
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 15,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: palette.text.secondary
        },
        padding: 10,
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          min: 0,
          callback(value) {
            // you can add your own method here (just an example)
            return Number(value).toLocaleString('en')
          }
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider
        }
      }
    ]
  }
};

const Grafik = props => {
	const { data: dataProps } = props;

	const [ data, setData ] = useState({
		labels: ['Loading..'],
		datasets: [	
			{
				label: 'data1',
				backgroundColor: palette.primary.main,
				data: [10]
			}
		]
	});

	useEffect(() => {
		if (Object.keys(dataProps).length > 0) {
			setData({
				labels: ['Tiket Keluar', 'Tiket Masuk'],
				datasets: [
					{
						label: 'Semua',
						backgroundColor: palette.warning.main,
						data: [Number(dataProps.keluar.all), Number(dataProps.masuk.all)]
					}, 
					{
						label: 'Terbuka',
						backgroundColor: palette.info.main,
						data: [Number(dataProps.keluar.terbuka), Number(dataProps.masuk.terbuka)]
					},
					{
						label: 'Selesai',
						backgroundColor: palette.success.main,
						data: [Number(dataProps.keluar.selesai), Number(dataProps.masuk.selesai)]
					} 
				],

			})
		}
	}, [dataProps])

	return(
		<Card style={{height: '100%'}}>
			<CardHeader 
				title='STATISTIK TIKET'
				action={<div style={{display: 'flex', justifyContent: 'space-between', width: 150, marginTop: 7}}>
					<div>
						<div style={{backgroundColor: palette.warning.main, height: 15, width: 15, margin: 'auto'}} />
						<Typography variant='body2'>Semua</Typography>
					</div>
					<div>
						<div style={{backgroundColor: palette.info.main, height: 15, width: 15, margin: 'auto'}} />
						<Typography variant='body2'>Terbuka</Typography>
					</div>
					<div>
						<div style={{backgroundColor: palette.success.main, height: 15, width: 15, margin: 'auto'}} />
						<Typography variant='body2'>Selesai</Typography>
					</div>
				</div>}
			/>
			<Divider />
			<Box
	          height={350}
	          position="relative"
	          margin={4}
	       	>
    			<Bar
		            data={data}
		            options={options}
		        />
    		</Box>
		</Card>
	);
}

export default Grafik;