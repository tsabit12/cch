import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PropTypes from 'prop-types';
import {
	IconButton,
	Typography,
	Breadcrumbs,
	Card,
	CardActions,
	Divider,
	TextField,
	InputAdornment
} from '@material-ui/core';
import { connect } from 'react-redux';
import { 
	ListXray
} from './components';
import Pagination from '@material-ui/lab/Pagination';
import { getTotalDetail, getDetail } from '../../actions/xray';
import SearchIcon from '@material-ui/icons/Search';
import ReplayIcon from '@material-ui/icons/Replay';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	header: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 5
	},
	content: {
		// height: 490,
		// position: 'relative'
	},
	inline: {
		display: 'flex', 
		justifyContent: 'space-between',
		marginBottom: 5,
		alignItems: 'center'
	}
}))

const XrayDetail = props => {
	const classes = useStyles();
	const { data } = props;
	const [paging, setPaging] = useState({
		limit: 13,
		offset: 0,
		active: 1
	})

	const [query, setQuery] = useState('');
	const [isSearch, setSearch] = useState(false);

	useEffect(() => {
		getData();
		//eslint-disable-next-line
	}, []);

	const getData = () => {
		const payload = {
			offset: 0,
			limit: 13
		}

		setPaging({
			limit: 13,
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
	}

	const handleSearch = () => {
		if (!query) {
			alert('Id/isi kiriman belum diisi');
		}else{
			const payload = {
				offset: 0,
				limit: 13,
				query
			};

			//reset
			setPaging({
				limit: 13,
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

	return(
		<div className={classes.root}>
			<div className={classes.inline}>
				<div className={classes.header}>
					<IconButton 
						size="small" 
						style={{marginRight: 10}} 
						onClick={() => props.history.goBack()}
					>
			            <ArrowBackIcon />
			        </IconButton>
					<Breadcrumbs aria-label="Breadcrumb">
				        <Typography color="textPrimary" className={classes.link}>
				          Gagal X-RAY
				        </Typography>
				        <Typography color="textPrimary" className={classes.link}>
				          Laporan Detail
				        </Typography>
				    </Breadcrumbs>
			    </div>
			    <div style={{display: 'flex', width: 350}}>
			    	{ isSearch && <IconButton  style={{marginRight: 5}}  onClick={handleReset}>
			            <ReplayIcon />
			        </IconButton> }
				    <TextField 
						placeholder='Cari ID/Isi kiriman'
						variant='outlined'
						style={{backgroundColor: "#FFF", borderRadius: 3}}
						fullWidth
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						InputProps={{
				            endAdornment: <InputAdornment position="start">
				            	<IconButton
				                  aria-label="toggle password visibility"
				                  onClick={handleSearch}
				                  onMouseDown={handleMouseDownSearch}
				                  edge="end"
				                >
				                  <SearchIcon />
				                </IconButton>
				            </InputAdornment>,
				        }}
					/> 
				</div>
		    </div>
		    <Card>
		    	<div className={classes.content}>
		    		<ListXray 
		    			list={data[`page${paging.active}`] ? data[`page${paging.active}`] : []}
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
		    </Card>
		</div>
	);
}

XrayDetail.propTypes = {
	getTotalDetail: PropTypes.func.isRequired,
	total: PropTypes.number.isRequired,
	getDetail: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired	
}

function mapStateToProps(state) {
	return{
		total: state.xray.total,
		data: state.xray.detail
	}
}

export default connect(mapStateToProps, { getTotalDetail, getDetail })(XrayDetail);