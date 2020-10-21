import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	CardHeader,
	Card,
	Divider,
	CardActions,
	Button
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import {
	SearchParam,
	ListItem
} from './components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getKinerja } from '../../actions/laporan';
import Loader from '../Loader';

import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	grenBtn: {
		backgroundColor: theme.palette.success.main,
		color: '#FFF',
		'&:hover': {
			backgroundColor: theme.palette.success.dark
		},
		border: 'none'
	}
}))


const KinerjaCs = props => {
	const { user, list } = props;
	const classes = useStyles();
	const [loading, setLoading] = useState(false);

	const handleSearch = (payload) => {
		setLoading(true);

		props.getKinerja(payload)
			.then(() => setLoading(false))
			.catch(() => setLoading(false));
	} 

	const handleViewDetail = (email) => props.history.push(`/kinerja-cs/detail/${email}`)

	return(
		<div className={classes.root}>
			<Loader loading={loading} />
			<Card>
				<CardHeader 
					title={<SearchParam 
						user={user} 
						getData={(payload) => props.getKinerja(payload)} 
						onSearch={handleSearch} 
					/>}
				/>
				<Divider />
				<ListItem data={list} onView={handleViewDetail} />
				<Divider />
				<CardActions style={{justifyContent: 'flex-end'}}>
					{ list.length > 0 && <ExcelFile 
						filename='kinerja-CS' 
						element={
							<Button 
								variant='contained' 
								color='primary'
								className={classes.grenBtn}
								endIcon={<GetAppIcon />}
							>
								DOWNLOAD
							</Button>
						}
					>
						<ExcelSheet data={list} name="sheet1">
							<ExcelColumn label="KANTOR" value="kantor_pos"/>
							<ExcelColumn label="CS" value={(col) => col.title.toUpperCase()}/>
							<ExcelColumn label="JUMLAH SELESAI" value={(col) => Number(col.jmlselesai)}/>
							<ExcelColumn label="JUMLAH TERBUKA" value={(col) => Number(col.jmlterbuka)}/>
							<ExcelColumn label="JUMLAH SEMUA" value={(col) => Number(col.jmlterbuka) + Number(col.jmlselesai)}/>
						</ExcelSheet>
					</ExcelFile> }
				</CardActions>
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