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
import PropTypes from 'prop-types';

const GrafikProduk = props => {
	const { data: dataProps } = props;

	const [ data, setData ] = useState({
		labels: ['Loading..'],
		datasets: [	
			{
				label: '-',
				backgroundColor: palette.primary.main,
				data: [1]
			}
		]
	});

  useEffect(() => {
    if (dataProps.length > 0) {
        const labels  = [];
        const keluar  = [];
        const masuk   = [];
        dataProps.forEach(row => {
          labels.push(row.jenis_layanan === '' ? '-' : row.jenis_layanan);
          keluar.push(Number(row.jml_keluar));
          masuk.push(Number(row.jml_masuk));
        })

        setData({
          labels,
          datasets: [
            { label: 'Keluar', data: keluar, backgroundColor: palette.success.main },
            { label: 'Masuk', data: masuk, backgroundColor: palette.warning.main },
          ]
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
    },
    onClick: function(event, elements) {
      if(elements.length > 0){
        const chart   = elements[0]._chart;
        const element = chart.getElementAtEvent(event)[0];
        const dataset = chart.data.datasets[element._datasetIndex];
        const xLabel  = chart.data.labels[element._index];
        const value   = dataset.data[element._index];

        //console.log(dataset.label + " at " + xLabel + ": " + value);
        const payload = {
          jumlah: value,
          label: xLabel,
          type: dataset.label === 'Masuk' ? 3 : 4
        }

        props.getDetail(payload);
      }
    }
  };

	return(
		<Card style={{height: '100%'}}>
			<CardHeader 
				title='GRAFIK PRODUK'
				action={<div style={{display: 'flex', justifyContent: 'space-between', width: 100, marginTop: 7}}>
					<div>
						<div style={{backgroundColor: palette.warning.main, height: 15, width: 15, margin: 'auto'}} />
						<Typography variant='body2'>Masuk</Typography>
					</div>
					<div>
						<div style={{backgroundColor: palette.success.main, height: 15, width: 15, margin: 'auto'}} />
						<Typography variant='body2'>Keluar</Typography>
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

GrafikProduk.propTypes = {
  data: PropTypes.array.isRequired,
  getDetail: PropTypes.func.isRequired
}

export default GrafikProduk;