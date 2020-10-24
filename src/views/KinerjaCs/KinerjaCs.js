import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	CardHeader,
	Card,
	Divider
} from '@material-ui/core';
import {
	SearchParam,
	ListItem,
	ModalDetail
} from './components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getKinerja } from '../../actions/laporan';
import Loader from '../Loader';
import { convertDay } from '../../helper';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))


const KinerjaCs = props => {
	const { user, list } = props;
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [date, setDate] = useState({
		startdate: convertDay(new Date()),
		enddate: convertDay(new Date())
	})
	const [openDetail, setOpenDetail] = useState({
		open: false,
		item: {}
	})

	const handleSearch = (payload) => {
		setLoading(true);

		props.getKinerja(payload)
			.then(() => {
				setLoading(false);
				setDate({
					startdate: payload.startdate,
					enddate: payload.enddate
				})
			})
			.catch(() => setLoading(false));
	} 

	const handleViewDetail = (email) => {
		setOpenDetail({
			open: true,
			item: {
				email,
				startdate: date.startdate,
				enddate: date.enddate
			}
		})
		//props.history.push(`/kinerja-cs/detail/${email}&${date.startdate}&${date.enddate}`)
	}

	return(
		<div className={classes.root}>
			<ModalDetail 
				item={openDetail}
				onClose={() => setOpenDetail({
					open: false,
					item: {}
				})}
				onClick={(notiket) => props.history.push(`/tiket/${notiket}`)}
			/>
			<Loader loading={loading} />
			<Card>
				<CardHeader 
					title={<SearchParam 
						user={user} 
						getData={(payload) => props.getKinerja(payload)} 
						onSearch={handleSearch} 
						list={list}
					/>}
				/>
				<Divider />
				<ListItem data={list} onView={handleViewDetail} />
			</Card>
		</div>
	);
}

KinerjaCs.propTypes = {
	user: PropTypes.object.isRequired,
	getKinerja: PropTypes.func.isRequired,
	list: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		user: state.auth.user,
		list: state.laporan.kinerjaCs
	}
}

export default connect(mapStateToProps,  { getKinerja })(KinerjaCs);