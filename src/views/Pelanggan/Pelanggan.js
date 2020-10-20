import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardHeader,
	CardActions,
	Divider
} from "@material-ui/core";
import {
	SearchParam,
	DataPelanggan,
	ModalEdit
} from "./components";
import api from "../../api";
import { 
	getPelanggan, 
	getTotalPelanggan, 
	resetData,
	updatePelanggan
} from "../../actions/laporan";
import Pagination from '@material-ui/lab/Pagination';
import { connect } from "react-redux";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	action: {
		justifyContent: 'flex-end'
	}
}))

const Pelanggan = props => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		activePage: 1,
		data: [],
		offset: 0,
		kprk: '00',
		channel: '00',
		regional: '00',
		mount: false,
		loading: true,
		visible: {
			status: false,
			data: {}
		}
	});

	const { activePage, data, visible } = state;
	const { dataUser } = props;

	React.useEffect(() => {
		(async () => {
			const payload = {
				offset: 0,
				channel: '00'
			}

			if (dataUser.kantor_pos === '40005') {
		      payload.regional = 'KANTORPUSAT';
		      payload.kprk = '00';
		    }else{
		      if (dataUser.utype === 'Regional') {
		        payload.regional = dataUser.regional;
		        payload.kprk = '00';
		      }else if(dataUser.utype === 'Kprk'){
		        payload.regional = dataUser.regional;
		        payload.kprk = dataUser.kantor_pos;
		      }else{ //omni halopos
		        payload.regional = 'KANTORPUSAT';
		        payload.kprk = dataUser.kantor_pos;
		      }
		    }
			
			await props.getTotalPelanggan(payload);

			props.getPelanggan(payload, 'page1')
				.then(() => {
					setState(prevState => ({
						...prevState,
						mount: true,
						loading: false,
						kprk: payload.kprk,
						regional: payload.regional
					}))
				})
				.catch(err => {
					setState(prevState => ({
						...prevState,
						loading: false,
						kprk: payload.kprk,
						regional: payload.regional
					}))
				})
		})();

		return () => {
			props.resetData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (props.listPelanggan[`page${activePage}`]) {
			setState(prevState => ({
				...prevState,
				data: props.listPelanggan[`page${activePage}`]
			}))
		}
	}, [props.listPelanggan, activePage])

	const handleGetKprk = (reg) => api.getKprk(reg === '01' ? 'KANTORPUSAT' : reg)

	const handleSearch = async (payload) => {
		props.resetData();

		setState(prevState => ({
			...prevState,
			data: [],
			loading: true,
			offset: 0,
			kprk: payload.kprk,
			regional: payload.regional,
			channel: payload.channel
		}))

		const payloadW = {
			...payload,
			offset: 0
		} 

		await props.getTotalPelanggan(payload);

		//back to page 1
		props.getPelanggan(payloadW, 'page1')
			.then(() => {
				setState(prevState => ({
					...prevState,
					loading: false,
					activePage: 1
				}))
			})
			.catch(err => {
				setState(prevState => ({
					...prevState,
					loading: false,
					activePage: 1
				}))
			})
	}

	const handleChangePage = (event, page) => {
		const offsetValue = (page * 11) - 11;
		
		const payload = {
			offset: offsetValue,
			kprk: state.kprk,
			regional: state.regional,
			channel: state.channel
		}

		props.getPelanggan(payload, `page${page}`);

		setState(prevState => ({
			...prevState,
			activePage: page,
			offset: offsetValue
		}))
	}

	const handleEdit = (id) => {
		const findData = state.data.find(row => row.customerId === id);
		setState(state => ({
			...state,
			visible: {
				status: true,
				data: findData
			}
		}))
	}

	const handleCloseModal = () => {
		setState(state => ({
			...state,
			visible: {
				status: false,
				data: {}
			}
		}))
	}

	const handleUpdate = (field) => {
		
		props.updatePelanggan(field, activePage);

		setTimeout(function() {
			setState(state => ({
				...state,
				visible: {
					status: false,
					data: {}
				}
			}))
		}, 100);
	}

	return(
		<div className={classes.root}>
			{ visible.status && 
				<ModalEdit 
					data={visible.data}
					onClose={handleCloseModal}
					onUpdate={handleUpdate}
				/> }
			<Card>
				<CardHeader 
					title='DATA PELANGGAN'
					action={<SearchParam 
						getKprk={handleGetKprk} 
						onSubmit={handleSearch}
						jabatan={dataUser.jabatan}
						user={dataUser}
					/>} 
				/>
				<Divider/>
				<DataPelanggan 
					list={data}
					loading={state.loading}
					activePage={activePage}
					onEdit={handleEdit}
				/>
				<CardActions className={classes.action}>
					<Pagination 
						count={Math.ceil(props.total / 11)} 
						variant="outlined" 
						shape="rounded" 
						page={activePage}
						onChange={handleChangePage}
					/>
				</CardActions>
			</Card>
		</div>
	);
}

Pelanggan.propTypes = {
	getPelanggan: PropTypes.func.isRequired,
	getTotalPelanggan: PropTypes.func.isRequired,
	total: PropTypes.number.isRequired,
	listPelanggan: PropTypes.object.isRequired,
	resetData: PropTypes.func.isRequired,
	dataUser: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		total: state.laporan.jumlahPelanggan,
		listPelanggan: state.laporan.pelanggan,
		dataUser: state.auth.user
	}
}

export default connect(mapStateToProps, { 
	getPelanggan, 
	getTotalPelanggan,
	resetData,
	updatePelanggan
})(Pelanggan);