import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	tableRightBorder : { 
        // borderRightWidth: 1,
        borderWidth: 1,
        borderColor: '#aaadab',
        borderStyle: 'solid',
        whiteSpace: 'nowrap'
	}, // or borderTop: '1px solid red'
	bottomBorder: {
        // borderBottomWidth: 1
	}
}))

const TableTiket = props => {
	const classes = useStyles();
	var no = 1;

	return(
		<Table size='small' padding='checkbox'>
			<TableHead>
                <TableRow>
                  <TableCell rowSpan={2} className={classes.tableRightBorder}>No</TableCell>
                  <TableCell rowSpan={2} className={classes.tableRightBorder}>Kantor</TableCell>
                  <TableCell align='center' rowSpan={2} className={classes.tableRightBorder}>Jumlah Pengaduan</TableCell>
                  <TableCell colSpan={2} align="center" className={clsx(classes.tableRightBorder, classes.bottomBorder)}>
                    1 hari
                  </TableCell>
                  <TableCell colSpan={2} align="center" className={clsx(classes.tableRightBorder, classes.bottomBorder)}>
                    2 hari
                  </TableCell>
                  <TableCell colSpan={2} align="center" className={clsx(classes.tableRightBorder, classes.bottomBorder)}>
                    3 hari
                  </TableCell>
                  <TableCell colSpan={2} align="center" className={clsx(classes.tableRightBorder, classes.bottomBorder)}>
                    >= 4 hari 
                  </TableCell>
                  <TableCell colSpan={2} align="center" className={clsx(classes.tableRightBorder, classes.bottomBorder)}>
                    Total pengaduan selesai
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" className={classes.tableRightBorder}>Jumlah</TableCell>
                  <TableCell align="center" className={classes.tableRightBorder}>%</TableCell>

                  <TableCell align="center" className={classes.tableRightBorder}>Jumlah</TableCell>
                  <TableCell align="center" className={classes.tableRightBorder}>%</TableCell>

                  <TableCell align="center" className={classes.tableRightBorder}>Jumlah</TableCell>
                  <TableCell align="center" className={classes.tableRightBorder}>%</TableCell>

                  <TableCell align="center" className={classes.tableRightBorder}>Jumlah</TableCell>
                  <TableCell align="center" className={classes.tableRightBorder}>%</TableCell>

                  <TableCell align="center" className={classes.tableRightBorder}>Jumlah</TableCell>
                  <TableCell align="center" className={classes.tableRightBorder}>%</TableCell>
                </TableRow>
          	</TableHead>
          	<TableBody>
          		
          			{ props.data.length === 0 ? <TableRow>
          				<TableCell className={classes.tableRightBorder} colSpan={13} align='center'>Data kosong</TableCell>
          			</TableRow> : props.data.map((row, index) => (
          				<TableRow key={index}>
          					<TableCell className={classes.tableRightBorder}>{no++}</TableCell>
          					<TableCell className={classes.tableRightBorder}>{row.regional}</TableCell>
          					<TableCell align='center' className={classes.tableRightBorder}>{row.tot_all}</TableCell>
          					<TableCell align='center' className={classes.tableRightBorder}>{row.hari1}</TableCell>
          					<TableCell align='center' className={classes.tableRightBorder}>
                      { Number(row.tot_all) > 0 ?  Math.round(Number(row.hari1) * 100 / Number(row.tot_all)) : 0 }

          					</TableCell>
          					<TableCell align='center' className={classes.tableRightBorder}>{row.hari2}</TableCell>
          					<TableCell align='center' className={classes.tableRightBorder}>
          						{ Number(row.tot_all) > 0 ? Math.round(Number(row.hari2) * 100 / Number(row.tot_all)) : 0 }
          					</TableCell>
          					<TableCell align='center' className={classes.tableRightBorder}>{row.hari3}</TableCell>
          					<TableCell align='center' className={classes.tableRightBorder}>
          						{ Number(row.tot_all) > 0 ? Math.round(Number(row.hari3) * 100 / Number(row.tot_all)) : 0}
          					</TableCell>
          					<TableCell align='center' className={classes.tableRightBorder}>{row.hari4}</TableCell>
          					<TableCell align='center' className={classes.tableRightBorder}>
          						{ Number(row.tot_all) > 0 ? Math.round(Number(row.hari4) * 100 / Number(row.tot_all)) : 0 }
          					</TableCell>
                    <TableCell align='center' className={classes.tableRightBorder}>
                      {Number(row.hari1) + Number(row.hari2) + Number(row.hari3) + Number(row.hari4)}
                    </TableCell>
          					<TableCell align='center' className={classes.tableRightBorder}>
          						{Number(row.tot_all) > 0 ? 
                        Math.round((Number(row.hari1) + 
                        Number(row.hari2) + 
                        Number(row.hari3) + 
                        Number(row.hari4)) * 100 / 
                        Number(row.tot_all)) : 0 }
          					</TableCell>
          				</TableRow>
          			)) }
          	</TableBody>
		</Table>
	);
}

export default TableTiket;