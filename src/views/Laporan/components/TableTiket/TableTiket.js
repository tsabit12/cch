import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
  Button
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
	nowrap : { 
        //borderRightWidth: 1,
        //borderColor: '#aaadab',
        //borderStyle: 'solid',
        whiteSpace: 'nowrap'
	}, // or borderTop: '1px solid red'
	rightBorder: {
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderWidth: 0,
        borderColor: '#e0e0e0',
        borderStyle: 'solid',
	},
  bottomBorder: {
    borderBottomWidth: 1,
    borderWidth: 0,
    borderColor: '#e0e0e0',
    borderStyle: 'solid',
  },
  red: {
    backgroundColor: '#fafafa'
  }
}))

const TableTiket = props => {
	const classes = useStyles();
	var no = 1;

	return(
    <div style={{overflowY: 'auto', minHeight: 300}}>
  		<Table size='small' padding='checkbox'>
  			<TableHead>
            <TableRow>
              <TableCell rowSpan={2} className={clsx(classes.nowrap, classes.rightBorder)}>No</TableCell>
              <TableCell rowSpan={2} className={clsx(classes.nowrap, classes.rightBorder)}>Kantor</TableCell>
              <TableCell align='center' rowSpan={2} className={clsx(classes.nowrap, classes.rightBorder)}>
                Jumlah Pengaduan
              </TableCell>
              <TableCell colSpan={2} align="center" className={clsx(classes.nowrap, classes.rightBorder)}>
                1 hari
              </TableCell>
              <TableCell colSpan={2} align="center" className={clsx(classes.nowrap, classes.rightBorder)}>
                2 hari
              </TableCell>
              <TableCell colSpan={2} align="center" className={clsx(classes.nowrap, classes.rightBorder)}>
                3 hari
              </TableCell>
              <TableCell colSpan={2} align="center" className={clsx(classes.nowrap, classes.rightBorder)}>
                >= 4 hari 
              </TableCell>
              <TableCell colSpan={2} align="center" className={clsx(classes.nowrap, classes.rightBorder)}>
                Total pengaduan selesai
              </TableCell>
              <TableCell rowSpan={2} align="center" className={clsx(classes.nowrap, classes.bottomBorder)}>
                ACTION
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" className={clsx(classes.nowrap, classes.rightBorder)}>Jumlah</TableCell>
              <TableCell align="center" className={clsx(classes.nowrap, classes.rightBorder)}>%</TableCell>

              <TableCell align="center" className={clsx(classes.nowrap, classes.rightBorder)}>Jumlah</TableCell>
              <TableCell align="center" className={clsx(classes.nowrap, classes.rightBorder)}>%</TableCell>

              <TableCell align="center" className={clsx(classes.nowrap, classes.rightBorder)}>Jumlah</TableCell>
              <TableCell align="center" className={clsx(classes.nowrap, classes.rightBorder)}>%</TableCell>

              <TableCell align="center" className={clsx(classes.nowrap, classes.rightBorder)}>Jumlah</TableCell>
              <TableCell align="center" className={clsx(classes.nowrap, classes.rightBorder)}>%</TableCell>

              <TableCell align="center" className={clsx(classes.nowrap, classes.rightBorder)}>Jumlah</TableCell>
              <TableCell align="center" className={clsx(classes.nowrap, classes.rightBorder)}>%</TableCell>
            </TableRow>
      	</TableHead>
    	<TableBody>
    		
    			{ props.data.length === 0 ? <TableRow>
    				<TableCell className={classes.nowrap} colSpan={14} align='center'>Data kosong</TableCell>
    			</TableRow> : props.data.map((row, index) => (
    				<TableRow key={index}>
    					<TableCell className={clsx(classes.nowrap, classes.rightBorder)}>{no++}</TableCell>
    					<TableCell className={clsx(classes.nowrap, classes.rightBorder)}>{row.regional}</TableCell>
    					<TableCell align='center' className={clsx(classes.nowrap, classes.rightBorder)}>{row.tot_all}</TableCell>
    					<TableCell align='center' className={clsx(classes.nowrap, classes.rightBorder)}>{row.hari1}</TableCell>
    					<TableCell align='center' className={clsx(classes.nowrap, classes.rightBorder, classes.red)}>
                { Number(row.tot_all) > 0 ?  Math.round(Number(row.hari1) * 100 / Number(row.tot_all)) : 0 }

    					</TableCell>
    					<TableCell align='center' className={clsx(classes.nowrap, classes.rightBorder)}>{row.hari2}</TableCell>
    					<TableCell align='center' className={clsx(classes.nowrap, classes.rightBorder, classes.red)}>
    						{ Number(row.tot_all) > 0 ? Math.round(Number(row.hari2) * 100 / Number(row.tot_all)) : 0 }
    					</TableCell>
    					<TableCell align='center' className={clsx(classes.nowrap, classes.rightBorder)}>{row.hari3}</TableCell>
    					
              <TableCell align='center' className={clsx(classes.nowrap, classes.rightBorder, classes.red)}>
    						{ Number(row.tot_all) > 0 ? Math.round(Number(row.hari3) * 100 / Number(row.tot_all)) : 0}
    					</TableCell>
    					
              <TableCell align='center' className={clsx(classes.nowrap, classes.rightBorder)}>{row.hari4}</TableCell>
    					
              <TableCell 
                align='center' 
                className={clsx(classes.nowrap, classes.rightBorder, classes.red)}
              >
    						{ Number(row.tot_all) > 0 ? Math.round(Number(row.hari4) * 100 / Number(row.tot_all)) : 0 }
    					</TableCell>
              
              <TableCell align='center' className={clsx(classes.nowrap, classes.rightBorder)}>
                {Number(row.hari1) + Number(row.hari2) + Number(row.hari3) + Number(row.hari4)}
              </TableCell>

    					<TableCell align='center' className={clsx(classes.nowrap, classes.rightBorder, classes.red)}>
    						{Number(row.tot_all) > 0 ? 
                  Math.round((Number(row.hari1) + 
                  Number(row.hari2) + 
                  Number(row.hari3) + 
                  Number(row.hari4)) * 100 / 
                  Number(row.tot_all)) : 0 }
    					</TableCell>
              <TableCell align='center' className={clsx(classes.nowrap, classes.bottomBorder)}>
                <Button 
                  variant='text' 
                  color='primary' 
                  size='small' 
                  style={{margin: 2}} 
                  disableFocusRipple 
                  disableElevation
                  onClick={() => props.onPress(row.regional)}
                >
                  DETAIL
                </Button>
              </TableCell>
    				</TableRow>
    			)) }
    	</TableBody>
  		</Table>
    </div>
	);
}

TableTiket.propTypes = {
  data: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired
}

export default TableTiket;