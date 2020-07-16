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
	DataPelanggan
} from "./components";
import api from "../../api";
import { getPelanggan, getTotalPelanggan } from "../../actions/laporan";
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
		mount: false,
		loading: true
	});

	const { activePage, data } = state;

	React.useEffect(() => {
		(async () => {
			const payload = {
				kprk: '00',
				offset: 0
			}
			
			await props.getTotalPelanggan(payload);

			await props.getPelanggan(payload, 'page1');

			setState(prevState => ({
				...prevState,
				mount: true,
				loading: false
			}))
		})();
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

	const handleGetKprk = (reg) => api.getKprk(reg)

	const handleSearch = async (payload) => {
		//reset jumlah
		setState(prevState => ({
			...prevState,
			data: [],
			loading: true,
			offset: 0,
			activePage: 1,
			kprk: payload.kprk
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
					loading: false
				}))
			})
			.catch(err => {
				setState(prevState => ({
					...prevState,
					loading: false
				}))
			})
	}

	const handleChangePage = (event, page) => {
		const offsetValue = page === 1 ? (page * 10) - 10 : (page * 10) - 11 + 1;
		
		const payload = {
			offset: offsetValue,
			kprk: state.kprk,
		}

		props.getPelanggan(payload, `page${page}`);

		setState(prevState => ({
			...prevState,
			activePage: page,
			offset: offsetValue
		}))
	}

	// console.log(state.offset)

	return(
		<div className={classes.root}>
			<Card>
				<CardHeader 
					title='DATA PELANGGAN'
					action={<SearchParam 
						getKprk={handleGetKprk} 
						onSubmit={handleSearch}
					/>} 
				/>
				<Divider/>
				<DataPelanggan 
					list={data}
					loading={state.loading}
				/>
				<CardActions className={classes.action}>
					<Pagination 
						count={Math.ceil(props.total / 10)} 
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
	listPelanggan: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		total: state.laporan.jumlahPelanggan,
		listPelanggan: state.laporan.pelanggan
	}
}

export default connect(mapStateToProps, { getPelanggan, getTotalPelanggan })(Pelanggan);