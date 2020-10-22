import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {
	IconButton,
	Card,
	CardActions,
	Divider,
	TextField,
	InputAdornment,
	CardHeader,
	Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import { 
	ListXray
} from './components';
import Pagination from '@material-ui/lab/Pagination';
import { getTotalDetail, getDetail, getAllowed } from '../../actions/xray';
import SearchIcon from '@material-ui/icons/Search';
import ReplayIcon from '@material-ui/icons/Replay';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import { removeMessage } from '../../actions/message';
import CollapseMessage from "../CollapseMessage";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	header: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	inline: {
		display: 'flex', 
		justifyContent: 'space-between',
		alignItems: 'center'
	}
}))

const Loading = () => (
	<p>Loading...</p>
)

const XrayDetail = props => {
	const classes = useStyles();
	const { data, message, user, officesAllowed } = props;
	const [paging, setPaging] = useState({
		limit: 10,
		offset: 0,
		active: 1
	})

	const [query, setQuery] = useState('');
	const [isSearch, setSearch] = useState(false);
	const [mount, setMount] = useState(false);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		props.getAllowed()
			.then(() => setMount(true))
			.catch(() => setMount(true))
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (officesAllowed.length > 0) {
			setMount(true); //don't waith for fetching new office
			
			const isAllowed = officesAllowed.find(row => row === user.kantor_pos);
			if (isAllowed) {
				setVisible(true);
			}
		}
	}, [officesAllowed, user.kantor_pos])

	useEffect(() => {
		if (mount) {
			getData();
		}
		//eslint-disable-next-line
	}, [mount]);

	useEffect(() => {
		if (message.type === 'uploadXray') {
			setTimeout(function() {
				props.removeMessage();
			}, 3000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [message]);

	const getData = () => {
		const payload = {
			offset: 0,
			limit: 10
		}

		setPaging({
			limit: 10,
			offset: 0,
			active: 1
		})

		setSearch(false);
		setQuery('');

		props.getTotalDetail(payload);

		props.getDetail(payload, 'page1');
	}

	const handleChangePage = (e, value) => {
		const offsetValue = (value * paging.limit) - paging.limit;
		const payload = {
			offset: offsetValue,
			limit: paging.limit
		}

		setPaging(paging => ({ ...paging, active: value }));

		props.getDetail(payload, `page${value}`);
	} 

	const handleMouseDownSearch = (e) => {
		e.preventDefault();
		handleSearch();
	}

	const handleSearch = () => {
		if (!query) {
			alert('Id/isi kiriman belum diisi');
		}else{
			const payload = {
				offset: 0,
				limit: 10,
				query
			};

			//reset
			setPaging({
				limit: 10,
				offset: 0,
				active: 1
			});
			setSearch(true);

			props.getTotalDetail({ query });
			props.getDetail(payload, 'page1')
				.catch(err => console.log(err));
		}
	}

	const handleReset = () => {
		getData();
	}

	const renderTitle = () => (
		<div className={classes.inline}>
	        <p>GAGAL X-RAY</p>

		    <div style={{display: 'flex', width: 550, justifyContent: 'flex-end'}}>
		    	{ isSearch && <IconButton  style={{marginRight: 5}} size='small'  onClick={handleReset}>
		            <ReplayIcon />
		        </IconButton> }
		        <form onSubmit={handleMouseDownSearch}>
				    <TextField 
						placeholder='Cari ID/Isi kiriman'
						variant='outlined'
						style={{backgroundColor: "#FFF", borderRadius: 3}}
						fullWidth
						value={query}
						size='small'
						onChange={(e) => setQuery(e.target.value)}
						InputProps={{
				            endAdornment: <InputAdornment position="start">
				            	<IconButton
				                  aria-label="toggle password visibility"
				                  onClick={handleSearch}
				                  edge="end"
				                  size='small'
				                >
				                  <SearchIcon />
				                </IconButton>
				            </InputAdornment>,
				        }}
					/> 
				</form>
				{ visible && <React.Fragment>
					<Button 
						variant='outlined' 
						style={{marginLeft: 5, width: 160}}
						startIcon={<AddIcon />}
						onClick={() => props.history.push('/x-ray/add')}
					>
						TAMBAH
					</Button>

					<Button 
						variant='outlined'
						style={{marginLeft: 5, width: 160}}
						onClick={() => props.history.push('/x-ray/import')}
						startIcon={<PublishIcon />}
					>
						IMPORT
					</Button>
				</React.Fragment> }
			</div>
	    </div>
	);

	return(
		<div className={classes.root}>
			<CollapseMessage 
				visible={message.type === 'uploadXray' ? true : false }
				message={message.text}
				onClose={props.removeMessage}
			/>
			{ mount ? <Card>
		    	<CardHeader
		    		title={renderTitle()}
		    	/>

		    	<Divider />
		    	<div className={classes.content}>
		    		<ListXray 
		    			list={data[`page${paging.active}`] ? data[`page${paging.active}`] : []}
		    			activePage={paging.active}
		    			limit={paging.limit}
		    		/>
		    	</div>

		    	<Divider />
		    	<CardActions style={{justifyContent: 'flex-end'}}>
		    		  <Pagination 
				      	page={paging.active}
				      	count={Math.ceil(props.total / paging.limit)} 
				      	variant="outlined" 
				      	shape="rounded" 
				      	onChange={handleChangePage}
				      />
		    	</CardActions>
		    </Card> : <Loading /> }
		</div>
	);
}

XrayDetail.propTypes = {
	getTotalDetail: PropTypes.func.isRequired,
	total: PropTypes.number.isRequired,
	getDetail: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
	message: PropTypes.object.isRequired,
	removeMessage: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	officesAllowed: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		total: state.xray.total,
		data: state.xray.detail,
		message: state.message,
		user: state.auth.user,
		officesAllowed: state.xray.allowed
	}
}

export default connect(mapStateToProps, { 
	getTotalDetail, 
	getDetail, 
	removeMessage, 
	getAllowed 
})(XrayDetail);