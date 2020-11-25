import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    Divider,
    Box,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Line } from 'react-chartjs-2'; 
import palette from '../../../../theme/palette';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    cardContent: {
        position: 'relative',
        height: '40px'
    },
    root: {
        height: '100%'
    }
}))

const ChartLine = props => {
    const classes = useStyles();
    const { data: DATA } = props;
    const [data, setData] = useState({
        labels: ['Loading...'],
        datasets: [{
            label: 'Masuk',
            data: [0],
            //backgroundColor: palette.warning.main
        }, {
            label: 'Keluar',
            data: [0],
            //backgroundColor: palette.warning.main        
        }]
    })

    useEffect(() => {
        if(DATA.length > 0){
            const jmlMasuk  = [];
            const jmlKeluar = [];
            const labels    = [];
            DATA.forEach(row => {
                labels.push(row.tgl);
                jmlMasuk.push(Number(row.jmlmasuk));
                jmlKeluar.push(Number(row.jmlkeluar));
            })

            setData({
                labels: labels,
                datasets: [{
                    label: 'Masuk',
                    data: jmlMasuk,
                    pointBackgroundColor: palette.warning.main,
                    pointBorderColor: palette.warning.main,
                    borderColor: palette.warning.main
                }, {
                    label: 'Keluar',
                    data: jmlKeluar,
                    pointBackgroundColor: palette.info.main,
                    pointBorderColor: palette.info.main,
                    borderColor: palette.info.main
                }]
            })
        }
    }, [DATA]);

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
                display: false,
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
                zeroLineColor: palette.divider
              }
            }
          ]
        }
    };

    return(
        <Card className={classes.root}>
            <CardHeader 
                title='GRAFIK TIKET MINGGUAN' 
                action={
                    <div style={{display: 'flex', justifyContent: 'space-between', width: 100, marginTop: 7}}>
                        <div>
                            <div style={{backgroundColor: palette.warning.main, height: 15, width: 15, margin: 'auto'}} />
                            <Typography variant='body2'>Masuk</Typography>
                        </div>
                        <div>
                            <div style={{backgroundColor: palette.info.main, height: 15, width: 15, margin: 'auto'}} />
                            <Typography variant='body2'>Keluar</Typography>
                        </div>
                    </div>
                }
            />
            <Divider />
            <Box
                height={350}
                position="relative"
                margin={4}
            >
                <Line 
                    data={data}
                    options={options}
                />
            </Box>
        </Card>
    )
}

ChartLine.propType = {
    data: PropTypes.array.isRequired
}

export default ChartLine;