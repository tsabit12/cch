import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableContainer,
	TableBody,
	Button
} from '@material-ui/core';
import Loader from '../../../../../Loader';

const useStyles = makeStyles(theme => ({
	redBtn: {
		backgroundColor: theme.palette.error.main,
		color: '#FFF',
		'&:hover': {
			backgroundColor: theme.palette.error.dark
		},
		border: 'none'
	},
	greenBtn: {
		backgroundColor: theme.palette.success.main,
		color: '#FFF',
		'&:hover': {
			backgroundColor: theme.palette.success.dark
		},
		border: 'none'
	}
}))

const ListOffice = props => {
	const [offices, setOffice] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingUpdate, setLoadingUpdate] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		props.getOffice()
			.then(res => {
				setOffice(res);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
				setOffice([]);
			})
		//eslint-disable-next-line
	}, []);

	const handleUpdate = (nopend, allowed) => {
		setLoadingUpdate(true);

		
		const payload = {
			code: nopend,
			allowed: allowed === '1' ? 0 : 1
		}

		props.onUpdate(payload)
			.then(() => {
				setLoadingUpdate(false);
				setOffice(offices => 
					offices.map((row, index) => row.code === nopend ? {...row, xray_allowed: allowed === '1' ? '0' : '1'} : row)
				)
			})
			.catch(err => {
				setLoadingUpdate(false);
				setTimeout(function() {
					alert('Terdapat kesalahan');
				}, 100);
			})
	}

	var no = 1;

	return(
		<React.Fragment>
			<Loader loading={loadingUpdate} />
			<TableContainer style={{maxHeight: '90vh'}}>
				<Table stickyHeader aria-label="sticky table" size='small'>
					<TableHead>
						<TableRow>
							<TableCell>NO</TableCell>
							<TableCell>REGIONAL</TableCell>
							<TableCell>KANTOR</TableCell>
							<TableCell>BISA TAMBAH/IMPORT</TableCell>
							<TableCell align='center'>ACTION</TableCell>
						</TableRow>
					</TableHead>
					{ loading ? <TableBody>
						<TableRow>
							<TableCell align='center' colSpan={5}>Memuat data kantor...</TableCell>
						</TableRow>
					</TableBody> : <React.Fragment>
						{ offices.length > 0 ? <TableBody>
								{ offices.map((row, index) => <TableRow key={index}>
									<TableCell>{no++}</TableCell>
									<TableCell>{row.regional}</TableCell>
									<TableCell>{row.code} - {row.name}</TableCell>
									<TableCell>{row.xray_allowed === '1' ? 'YA' : 'TIDAK'}</TableCell>
									<TableCell align='center'>
										<Button 
											variant='contained' 
											size='small' 
											className={row.xray_allowed === '1' ? classes.redBtn : classes.greenBtn }
											onClick={() => handleUpdate(row.code, row.xray_allowed)}
										>
											{row.xray_allowed === '1' ? 'Batal' : 'Tambah'}
										</Button>
									</TableCell>
								</TableRow> )}
							</TableBody> : <TableBody>
							<TableRow>
								<TableCell align='center' colSpan={5}>Gagal memuat data</TableCell>
							</TableRow>
						</TableBody> }
					</React.Fragment> }
				</Table>
			</TableContainer>
		</React.Fragment>
	);
}

ListOffice.propTypes = {
	getOffice: PropTypes.func.isRequired,
	onUpdate: PropTypes.func.isRequired
}

export default ListOffice;