import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	CardActions,
	Divider,
	Button,
	Grid
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import { getData, getTotal } from '../../actions/setting';
import {
	TableLibur,
	ListSetting,
	ModalSetting
} from './components';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	card: {
		minHeight: 350,
		display: 'relative'
	}
}))

const DataLibur = props => {
	const classes = useStyles();
	const [paging, setPaging] = useState({
		active: 1,
		offset: 0
	})

	const [openModal, setOpenModal] = useState({
		type: null,
		visible: false
	})

	useEffect(() => {
		
		const payload = {
			active: 1,
			offset: 0
		}

		props.getTotal();
		props.getData(payload);
		//eslint-disable-next-line
	}, []);

	const handleChangePage = (e, page) => {
		const offsetValue = page === 1 ? (page * 15) - 15 : (page * 15) - 16 + 1;
		setPaging({
			active: page,
			offset: offsetValue
		})

		const payload = {
			offset: offsetValue,
			active: page
		};

		props.getData(payload);
	} 

	const handleAdd = () => props.history.push(`/setting/add`)

	const handleClictSettings = (type) => {
		setOpenModal({
			type,
			visible: true
		})
	}

	return(
		<div className={classes.root}>
			<ModalSetting 
				param={openModal} 
				onClose={() => setOpenModal({
					visible: false,
					type: null
				})}
			/>
			<Grid container spacing={4}>
				<Grid item lg={9} xl={2} sm={12} xs={12}>
					<Card>
						<CardHeader 
							title='DATA HARI LIBUR'
							action={<Button variant='outlined' onClick={handleAdd}>TAMBAH</Button>}
						/>
						<Divider />
						<div className={classes.card}>
							<TableLibur 
								data={props.data[`page${paging.active}`] ? props.data[`page${paging.active}`] : [] }
								activePage={paging.active}
							/>
						</div>
						<Divider />
						<CardActions style={{justifyContent: 'flex-end'}}>
							<Pagination 
								count={Math.ceil(props.total / 15)} 
								variant="outlined" 
								shape="rounded" 
								page={paging.active}
								onChange={handleChangePage}
							/>
						</CardActions>
					</Card>
				</Grid>
				<Grid item lg={3} xl={12} sm={12} xs={12}>
					<ListSetting 
						onClick={handleClictSettings}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

DataLibur.propTypes = {
	getTotal: PropTypes.func.isRequired,
	getData: PropTypes.func.isRequired,
	total: PropTypes.number.isRequired,
	data: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		total: state.laporan.totalLibur,
		data: state.laporan.libur
	}
}

export default connect(mapStateToProps, { getData, getTotal })(DataLibur);