import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Grid
} from '@material-ui/core';
import {
	Navbar,
	ListTiket
} from './components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTotal, getNewTiket } from '../../actions/tiket';
import api from '../../api';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const getTypeTiket = activeNumber => {
	switch(activeNumber){
		case 1:
			return { type: 'GET_TIKET_MASUK', list: 'activeMasuk' };
		case 2: 
			return { type: 'GET_TIKET_KELUAR', list: 'activeKeluar' };
		case 3:
			return { type: 'GET_TIKET_MASUK_DONE', list: 'activeMasukDone' };
		case 4:
			return { type: 'GET_TIKET_KELUAR_DONE', list: 'activeKeluarDone' };
		default: 
			return { type: '-', list: '-'};
	}
}


const TiketReport = props => {
	const classes = useStyles();
	const [activePage, setActivePage] = useState(1);

	useEffect(() => {
		props.getTotal(props.user.kantor_pos);
		if (props.user.kantor_pos === '40005') {
			setActivePage(2);
		}
		//eslint-disable-next-line
	}, [props.user])

	const handleGetTiket = (payload, activePaging) => {
		const { type } = getTypeTiket(activePage);
		const newPayload = {
			...payload,
			nopend: props.user.kantor_pos,
			typeReport: type
		}


		props.getNewTiket(newPayload, activePaging, type);
	}

	const handleClickTiket = (no) => {
		if (activePage === 1) {
			api.updateStatusTiket(no)
				.then(res => console.log(res));
		}

		props.history.push(`/tiket/${no}`);
	}

	return(
		<div className={classes.root}>
			<Grid container spacing={4}>
		      	<Grid
		          item
		          lg={3}
		          sm={4}
		          xl={3}
		          xs={12}
		        >
					<Navbar 
						jumlah={props.total} 
						page={activePage}
						onChangePage={setActivePage}
						level={props.user.kantor_pos === '40005' ? 1 : 2}
						addTicket={() => props.history.push("/tiket/add")}
					/>
		        </Grid>
		        <Grid
		          item
		          lg={9}
		          sm={8}
		          xl={9}
		          xs={12}
		        >
		        	<ListTiket 
		        		page={activePage} 
		        		total={props.total}
		        		getTiket={handleGetTiket}
		        		list={props.data[getTypeTiket(activePage).list]}
		        		onClickTiket={handleClickTiket}
		        	/>
		        </Grid>
	        </Grid>
		</div>
	);
}

TiketReport.propTypes = {
	getTotal: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	total: PropTypes.object.isRequired,
	getNewTiket: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		user: state.auth.user,
		total: state.tiket.count,
		data: state.tiket.list
	}
}

export default connect(mapStateToProps, { getTotal, getNewTiket })(TiketReport);