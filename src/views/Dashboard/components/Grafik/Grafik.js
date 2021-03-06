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

const getType = (string, xLabel) => {
  if (xLabel === 'Tiket Keluar') {
    switch(string){
      case 'Selesai':
        return 5;
      case 'Terbuka':
        return 6;
      case 'Semua':
        return 7;
      default: 
        return 7;
    }
  }else{
    switch(string){
      case 'Selesai':
        return 8;
      case 'Terbuka':
        return 9;
      case 'Semua':
        return 10;
      default: 
        return 10;
    }
  }
}

const Grafik = props => {
	const { data: dataProps } = props;

	const [ data, setData ] = useState({
		labels: ['Loading..'],
		datasets: [	
			{
				label: 'data1',
				backgroundColor: palette.primary.main,
				data: [10],
        barThickness: 12,
        maxBarThickness: 15,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
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
						data: [Number(dataProps.keluar.all), Number(dataProps.masuk.all)],
            barThickness: 12,
            maxBarThickness: 15,
            barPercentage: 0.5,
            categoryPercentage: 0.5,
					}, 
					{
						label: 'Terbuka',
						backgroundColor: palette.info.main,
						data: [Number(dataProps.keluar.terbuka), Number(dataProps.masuk.terbuka)],
            barThickness: 12,
            maxBarThickness: 15,
            barPercentage: 0.5,
            categoryPercentage: 0.5,
					},
					{
						label: 'Selesai',
						backgroundColor: palette.success.main,
						data: [Number(dataProps.keluar.selesai), Number(dataProps.masuk.selesai)],
            barThickness: 12,
            maxBarThickness: 15,
            barPercentage: 0.5,
            categoryPercentage: 0.5,
					} 
				],

			})
		}
	}, [dataProps])

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
    },
    onClick: function(event, elements) {
      if(elements.length > 0){
        const chart   = elements[0]._chart;
        const element = chart.getElementAtEvent(event)[0];
        const dataset = chart.data.datasets[element._datasetIndex];
        const xLabel  = chart.data.labels[element._index];
        const value   = dataset.data[element._index];

        const payload = {
          jumlah: value,
          label: xLabel,
          type: getType(dataset.label, xLabel)
        }
        props.getDetail(payload);
      }
    }
  };

	return(
		<Card style={{height: '100%'}}>
			<CardHeader 
				title={<Typography variant='body2'>STATISTIK TIKET</Typography>}
				action={<div style={{display: 'flex', justifyContent: 'space-between', width: 150, marginTop: 7}}>
					<div>
						<div style={{backgroundColor: palette.warning.main, height: 10, width: 10, margin: 'auto'}} />
						<Typography variant='body2'>Semua</Typography>
					</div>
					<div>
						<div style={{backgroundColor: palette.info.main, height: 10, width: 10, margin: 'auto'}} />
						<Typography variant='body2'>Terbuka</Typography>
					</div>
					<div>
						<div style={{backgroundColor: palette.success.main, height: 10, width: 10, margin: 'auto'}} />
						<Typography variant='body2'>Selesai</Typography>
					</div>
				</div>}
			/>
			<Divider />
			<Box
	          height={200}
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