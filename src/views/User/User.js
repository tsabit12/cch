import React from "react";
import { makeStyles } from "@material-ui/styles";
import { 
	Grid,
	Card,
	CardHeader,
	CardContent,
	Divider,
	CardActions
} from "@material-ui/core";
import { connect } from "react-redux";
import { removeMessage } from "../../actions/message";
import { fetchUser, getJumlahUser } from "../../actions/user";
import PropTypes from "prop-types";
import Pagination from '@material-ui/lab/Pagination';
import api from "../../api";
import CollapseMessage from "../CollapseMessage";

import {
	TableUser,
	SearchForm
} from "./components";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	action: {
		marginTop: 5
	},
	contentEmpty: {
		minHeight: 430,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	message: {
		marginTop: 10,
		marginBottom: 10
	},
	cardAction: {
		justifyContent: 'flex-end'
	},
	paging: {
		margin: 3
	}
}))

const convertKprkValue = (user) => {
	if (user.utype === 'Kprk') {
		return user.kantor_pos;
	}else{
		return '00';
	}
}

const User = props => {

	const [state, setState] = React.useState({
		activePage: 1,
		data: [],
		paging: {
			offset: 0,
			limit: 10
		},
		search:{
			reg: '00',
			kprk: '00'
		},
		listKprk: [],
		loading: false
	})

	const classes = useStyles();
	const { history, message, jumlah, userData } = props;
	const { activePage, data, paging } = state;

	//this page is only for management and admin
	//so set kprk to 00
	//cause cs cannot access this route
	React.useEffect(() => {
		(async () => {
			const regValue 	= userData.jabatan === 'Administrator' ? '00' : userData.regional;
			const kprkValue = convertKprkValue(userData);
			const payload = {
				...state.paging,
				page: activePage,
				regional: regValue,
				kprk: kprkValue
			};

			setState(prevState => ({
				...prevState,
				loading: true
			}))

			await props.getJumlahUser(payload.regional, payload.kprk);

			props.fetchUser(payload)
				.then(() => setState(prevState => ({
					...prevState,
					search:{
						...prevState.search,
						reg: regValue,
						kprk: kprkValue
					},
					loading: false
				})))
				.catch(() => setState(prevState => ({
					...prevState,
					search: {
						...prevState.search,
						reg: regValue,
						kprk: kprkValue
					},
					loading: false
				})))
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//fetch kprk for user regional
	React.useEffect(() => {
		if (props.userData.utype === 'Regional') {
			api.getKprk(props.userData.regional)
				.then(res => setState(prevState => ({
					...prevState,
					listKprk: res
				})));			
		}
	}, [props.userData]);


	React.useEffect(() => {
		if (message.display) {
			setTimeout(function() {
				props.removeMessage();
			}, 3000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.message]);

	//using state to display data from store
	React.useEffect(() => {
		if (props.list[`page${activePage}`]) {
			setState(prevState => ({
				...prevState,
				data: props.list[`page${activePage}`]
			}))
		}
	}, [props.list, activePage]);


	const handleChangePage = (e, page) => {
		//const offsetValue = page === 1 ? (page * 10) - 10 : (page * 10) - 11 + 1;
		const offsetValue = (page * paging.limit) - paging.limit;
		const { reg, kprk } = state.search;

		const payload = {
			regional: reg,
			offset: offsetValue,
			kprk: kprk,
			limit: paging.limit,
			page: page
		}

		setState(prevState => ({
			...prevState,
			activePage: page,
			loading: true
		}))

		props.fetchUser(payload)
			.then(() => {
				setState(prevState => ({
					...prevState,
					loading: false,
					paging: {
						...prevState.paging,
						offset: offsetValue
					}
				}))	
			})
			.catch(err => setState(prevState => ({
				...prevState,
				loading: false,
				paging: {
					...prevState.paging,
					offset: offsetValue
				}
			})))
	}

	const onChangeSearch = (e) => {
		const { name, value } = e.target;
		if (name === 'reg') {
			setState(prevState => ({
				...prevState,
				search: {
					...prevState.search,
					reg: value,
					kprk: '00'
				}
			}))

			api.getKprk(value)
				.then(res => setState(prevState => ({
					...prevState,
					listKprk: res
				})))
		}else{
			setState(prevState => ({
				...prevState,
				search: {
					...prevState.search,
					[name]: value
				}
			}))
		}
	}

	const handleSearch = async () => {
		const { reg, kprk } = state.search;
		setState(prevState => ({
			...prevState,
			loading: true,
			offset: 0,
			data: []
		}))

		await props.getJumlahUser(reg, kprk);

		const payload = {
			regional: reg,
			offset: 0,
			kprk: kprk,
			limit: state.paging.limit,
			page: 1
		}

		props.fetchUser(payload)
			.then(() => {
				setState(prevState => ({
					...prevState,
					loading: false,
					activePage: 1
				}))	
			})
			.catch(err => setState(prevState => ({
				...prevState,
				loading: false,
				activePage: 1
			})))
	}


	return(
		<div className={classes.root}>
			<CollapseMessage 
				visible={message.display}
				message={message.text}
				onClose={props.removeMessage}
			/>
			<Grid container spacing={4}>
				<Grid
		          item
		          lg={12}
		          sm={12}
		          xl={12}
		          xs={12}
		        >
					<Card>
						<CardHeader 
							title='KELOLA DATA USER' 
							action={<SearchForm 
								history={history} 
								value={state.search}
								handleChange={onChangeSearch}
								kprkList={state.listKprk}
								user={userData}
								onSearch={handleSearch}
							/>}
						/>
						<Divider />
						{ data.length > 0 ? 
							<TableUser 
								data={data}  
								activePage={activePage}
								limit={paging.limit}
							/> : <CardContent>
							<div className={classes.contentEmpty}>
								{state.loading ? <p>Loading...</p> : <p>Data user kosong</p> }
							</div> 
						</CardContent>}
						<CardActions className={classes.cardAction}>
							<div className={classes.paging}>
						      <Pagination 
						      	page={activePage}
						      	count={Math.ceil(jumlah / paging.limit)} 
						      	variant="outlined" 
						      	shape="rounded" 
						      	onChange={handleChangePage}
						      />
						    </div>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
}


User.propTypes = {
	list: PropTypes.object.isRequired,
	jumlah: PropTypes.number.isRequired,
	userData: PropTypes.object.isRequired,
	message: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		message: state.message,
		list: state.user.data,
		jumlah: state.user.jumlah,
		userData: state.auth.user
	}
}

export default connect(mapStateToProps, { removeMessage, fetchUser, getJumlahUser })(User);