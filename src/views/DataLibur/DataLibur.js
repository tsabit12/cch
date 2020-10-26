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
import { getData, getTotal, generateData } from '../../actions/setting';
import {
	TableLibur,
	ListSetting,
	ModalSetting,
	ModalAdd
} from './components';
import { periodeView } from '../../helper';
import Loader from '../Loader';
import Alert from '../Alert';

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

	const [modalAdd, setModalAdd] = useState(false);
	const [loading, setLoading] = useState(false);
	const [myalert, showAlert] = useState({
		open: false,
		variant: 'error',
		message: '...'
	});

	useEffect(() => {
		const payload = {
			active: 1,
			offset: 0
		}

		props.getTotal();
		props.getData(payload);
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (myalert.open) {
			setTimeout(function() {
				showAlert(myalert => ({
					...myalert,
					open: false
				}))
			}, 3000);
		}
	}, [myalert.open])

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

	const handleAdd = () => {
		setModalAdd(true);
	}

	const handleClictSettings = (type) => {
		if (type === 1) {
			setOpenModal({
				type,
				visible: true
			})
		}else{
			props.history.push("/faq");
		}
	}

	const handleGenerateLibur = (periode) => {
		const periodeConverted = periodeView(periode).replace('-', '');
		setLoading(true);
		setModalAdd(false);
		showAlert(myalert => ({
			...myalert,
			open: false
		}))

		props.generateData(periodeConverted, 1) //reset to page 1
			.then(() => {
				setLoading(false);
				showAlert({
					open: true,
					variant: 'success',
					message: 'Generate hari libur berhasil'
				});
				//reset paging
				setPaging({
					active: 1,
					offset: 0
				})
			})
			.catch(err => {
				setLoading(false);
				showAlert({
					open: true,
					variant: 'error',
					message: 'Data tidak ditemukan atau data sudah di generate sebelumnya'
				})
			})
	} 

	return(
		<div className={classes.root}>
			<Loader loading={loading} />
			<Alert 
				open={myalert.open} 
				variant={myalert.variant}
				onClose={() => showAlert({
					open: false,
					message: '',
					variant: 'error'
				})}
				message={myalert.message}
			/>
			<ModalSetting 
				param={openModal} 
				onClose={() => setOpenModal({
					visible: false,
					type: null
				})}
			/>
			<ModalAdd 
				open={modalAdd}
				handleClose={() => setModalAdd(false)}
				onSubmit={handleGenerateLibur}
			/>
			<Grid container spacing={4}>
				<Grid item lg={9} xl={2} sm={12} xs={12}>
					<Card>
						<CardHeader 
							title='KELOLA HARI LIBUR'
							action={<Button variant='outlined' onClick={handleAdd}>GENERATE</Button>}
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
	data: PropTypes.object.isRequired,
	generateData: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		total: state.laporan.totalLibur,
		data: state.laporan.libur
	}
}

export default connect(mapStateToProps, { getData, getTotal, generateData })(DataLibur);