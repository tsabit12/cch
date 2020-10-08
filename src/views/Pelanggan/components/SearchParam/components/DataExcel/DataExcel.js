import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DataExcel = props => {
	const { data } = props;
	const btnRef = useRef();

	useEffect(() => {
		if (data.length > 0) {
			setTimeout(function() {
				btnRef.current.click();
			}, 10);
		}
	}, [data]);
	

	return(
		<div style={{display: 'none'}}>
			<ExcelFile filename={`data_pelanggan`} element={<button ref={btnRef}>Download Data</button>}>
	            <ExcelSheet data={data} name="Employees">
	                <ExcelColumn label="Customer ID" value="customerId"/>
	                <ExcelColumn label="Channel" value={(col) => `${col.JenisSosmed} (${col.sosmed})`}/>
	                <ExcelColumn label="Nama" value="namaLengkap"/>
	                <ExcelColumn label="Phone" value="phone"/>
	                <ExcelColumn label="Email" value={(col) => col.email ? col.email : '-'}/>
	                <ExcelColumn label="Kantor" value="nopend"/>
	                <ExcelColumn label="Alamat" value="detail_address"/>
	                <ExcelColumn label="Kec/Kab" value="alamat"/>
	            </ExcelSheet>
	        </ExcelFile>
        </div>
	);
}

DataExcel.propTypes = {
	data: PropTypes.array.isRequired
}

export default DataExcel;