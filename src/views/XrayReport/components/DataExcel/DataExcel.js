import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import ReactExport from "react-export-excel";
import { Button } from '@material-ui/core';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = makeStyles(theme => ({
	greenBtn: {
		backgroundColor: theme.palette.success.main,
		color: '#FFF',
		marginLeft: 5,
		'&:hover': {
			backgroundColor: theme.palette.success.dark
		}
	}
}))

const DataExcel = props => {
	const classes = useStyles();

	return(
		<ExcelFile 
			filename={props.label} 
			element={<Button className={classes.greenBtn} variant='contained' color='primary'>
			      		Download
			      	</Button> }
		>
			<ExcelSheet data={props.data} name="sheet1">
				<ExcelColumn label="REGIONAL" value="regional"/>
				<ExcelColumn label="JUMLAH" value={(col) => Number(col.total_xray)} />
			</ExcelSheet>
		</ExcelFile>
	);
}

DataExcel.propTypes = {
	data: PropTypes.array.isRequired,
	label: PropTypes.string.isRequired
}

export default DataExcel;