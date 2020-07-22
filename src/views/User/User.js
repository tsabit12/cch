import React from "react";
import { makeStyles } from "@material-ui/styles";
import { 
	Grid,
	Card,
	CardHeader,
	CardContent,
	Divider,
	Collapse,
	IconButton,
	CardActions
} from "@material-ui/core";
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { removeMessage } from "../../actions/message";
import { fetchUser, getJumlahUser } from "../../actions/user";
import PropTypes from "prop-types";
import Pagination from '@material-ui/lab/Pagination';
import api from "../../api";

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

const TextMessage = props => {

	return(
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                props.closeMessage()
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          variant="filled"
          severity="success"
        >
          { props.text ? props.text : 'No message'}
        </Alert>
	);
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
		listKprk: []
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
			const kprkValue = userData.jabatan === 'Administrator' ? '00' : userData.kantor_pos;
			const payload = {
				...state.paging,
				page: activePage,
				regional: regValue,
				kprk: kprkValue
			};

			await props.getJumlahUser(payload.regional, payload.kprk);

			props.fetchUser(payload)
				.then(() => setState(prevState => ({
					...prevState,
					search:{
						...prevState.search,
						reg: regValue,
						kprk: kprkValue
					}
				})))
				.catch(() => setState(prevState => ({
					...prevState,
					search: {
						...prevState.search,
						reg: regValue,
						kprk: kprkValue
					}
				})))
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	React.useEffect(() => {
		if (message !== null) {
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

	React.useEffect(() => {
		const { offset } = state.paging;
		if (offset !== 0) {
			const payload = {
				...state.paging,
				page: activePage
			};

			props.fetchUser(payload);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.paging]);

	const handleChangePage = (e, page) => {
		setState(prevState => ({
			...prevState,
			activePage: page,
			paging: {
				...prevState.paging,
				offset: page === 1 ? (page * paging.limit) - 10 : (page * paging.limit) - 10 + 1
			}
		}))
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

	return(
		<div className={classes.root}>

			<Collapse in={message === null ? false : true }>
				<div className={classes.message}>
				  <TextMessage 
				  	text={message}
				  	closeMessage={() => props.removeMessage()}
				  />
				</div>
			</Collapse>

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
								<p>Data user kosong</p>
							</div> 
						</CardContent>}
						<Divider/>
						<CardActions className={classes.cardAction}>
							<div className={classes.paging}>
						      <Pagination 
						      	page={activePage}
						      	count={Math.round(jumlah / paging.limit)} 
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
	userData: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		message: state.message.text,
		list: state.user.data,
		jumlah: state.user.jumlah,
		userData: state.auth.user
	}
}

export default connect(mapStateToProps, { removeMessage, fetchUser, getJumlahUser })(User);