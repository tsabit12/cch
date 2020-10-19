import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Grid
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchData, resetData } from '../../actions/product';
import {
	TableProduk,
	TableAduan,
	SearchParam,
	ModalDetail,
	TableLokus
} from './components';
import Loader from '../Loader';
import Alert from '../Alert';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))


const LaporanProduk = props => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({});
	const [openDetail, setOpendDetail] = useState({
		visible: false,
		param: {}
	});

	useEffect(() => {
		return () => props.resetData();
		//eslint-disable-next-line
	}, []);

	const handleSearch = (payload) => {
		setLoading(true);
		setOpendDetail(openDetail => ({
			visible: false,
			param: {
				...openDetail.param,
				...payload
			}
		}))

		props.fetchData(payload)
			.then(() => setLoading(false))
			.catch(err => {
				setError({global: 'Terdapat kesalahan'})
				setLoading(false);
			})
	} 

	const handleClickDetail = (layanan, tipe, label) => {
		setOpendDetail(openDetail => ({
			visible: true,
			param: {
				...openDetail.param,
				layanan,
				tipe,
				label
			}
		}))
	}

	return(
		<div className={classes.root}>
			<SearchParam 
				onSearch={handleSearch} 
				data={props.data}
				loading={loading}
			/>
			<Loader loading={loading} />
			<ModalDetail 
				open={openDetail.visible}
				onClose={() => setOpendDetail(openDetail => ({
					...openDetail,
					visible: false
				}))}
				param={openDetail.param}
			/>
			<Alert 
				open={!!error.global}
				message={error.global}
				variant='error'
				onClose={() => setError({})}
			/>
			{ props.data.list.length > 0 && <Grid container spacing={4}>
				<Grid item lg={6} sm={6} xl={12} xs={12}> 
					<TableLokus
						data={props.data.lokus} 
						onClickDetail={handleClickDetail}
					/>
				</Grid>
				<Grid item lg={6} sm={6} xl={12} xs={12}> 
					<TableAduan 
						data={props.data.aduan} 
						onClickDetail={handleClickDetail}
					/>
				</Grid>
				<Grid item lg={12} sm={12} xl={12} xs={12}> 
					<TableProduk 
						data={props.data.list} 
						onClickDetail={handleClickDetail}
					/>
				</Grid>
			</Grid> }
		</div>
	);
}

LaporanProduk.propTypes = {
	fetchData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
	resetData: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		data: state.product
	}
}

export default connect(mapStateToProps, { fetchData, resetData })(LaporanProduk);