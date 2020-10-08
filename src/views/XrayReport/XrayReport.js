import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	Button,
	Divider
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import { connect } from 'react-redux';
import { removeMessage } from '../../actions/message';
import CollapseMessage from "../CollapseMessage";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
}))


const XrayReport = props => {
	const classes = useStyles();
	const { message } = props;

	useEffect(() => {
		if (message.type === 'uploadXray') {
			setTimeout(function() {
				props.removeMessage();
			}, 3000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [message]);

	const renderTitle = () => (
		<div className={classes.header}>
			<p>GAGAL X-RAY</p>
			<div styles={{display: 'flex'}}>
				<Button 
					variant='outlined'
					onClick={() => props.history.push('/x-ray/import')}
					startIcon={<PublishIcon />}
				>
					IMPORT
				</Button>
				<Button 
					variant='outlined' 
					style={{marginLeft: 5}}
					startIcon={<AddIcon />}
					onClick={() => props.history.push('/x-ray/add')}
				>
					TAMBAH
				</Button>
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
			<Card>
				<CardHeader 
					title={renderTitle()}
				/>
				<Divider />
			</Card>
		</div>
	);
}

XrayReport.propTypes = {
	message: PropTypes.object.isRequired,
	removeMessage: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return{
		message: state.message
	}
}

export default connect(mapStateToProps, { removeMessage })(XrayReport);