import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Grid
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchData } from '../../actions/product';
import {
	TableProduk,
	TableAduan
} from './components';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))


const LaporanProduk = props => {
	const classes = useStyles();

	useEffect(() => {
		props.fetchData();
		//eslint-disable-next-line
	}, []);

	return(
		<div className={classes.root}>
			<Grid container spacing={4}>
				<Grid item lg={6} sm={6} xl={12} xs={12}> 
					<TableProduk data={props.data.list} />
				</Grid>
				<Grid item lg={6} sm={6} xl={12} xs={12}> 
					<TableAduan data={props.data.aduan} />
				</Grid>
			</Grid>
		</div>
	);
}

LaporanProduk.propTypes = {
	fetchData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		data: state.product
	}
}

export default connect(mapStateToProps, { fetchData })(LaporanProduk);