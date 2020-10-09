import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	Button,
	Divider,
	MenuItem,
	Grow,
	ClickAwayListener,
	Popper,
	Paper,
	MenuList
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import { connect } from 'react-redux';
import { removeMessage } from '../../actions/message';
import { getData } from '../../actions/xray';
import CollapseMessage from "../CollapseMessage";
import { DatePicker } from "@material-ui/pickers";
import {
	TableXray 
} from './components';
import { convertDay } from '../../helper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	param: {
		padding: 10,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
}))


const XrayReport = props => {
	const anchorRef = useRef();
	const classes = useStyles();
	const { message } = props;
	const [params, setParams] = useState({
		startdate: new Date(),
		enddate: new Date(),
		type: '1'
	})

	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (message.type === 'uploadXray') {
			setTimeout(function() {
				props.removeMessage();
			}, 3000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [message]);

	useEffect(() => {
		const payload = {
			startdate: convertDay(new Date()),
			enddate: convertDay(new Date()),
			type: '1'
		}
		props.getData(payload)
			.then(() => setLoading(false))
			.catch(() => setLoading(false));
		//eslint-disable-next-line
	}, []);

	const handleToggle = () => setOpen(!open)

	const handleClose = (event) => {
	    if (anchorRef.current && anchorRef.current.contains(event.target)) {
	      return;
	    }
	    
	    setOpen(false);
	};
	
	const handleListKeyDown = (event) => {
	    if (event.key === 'Tab') {
	      event.preventDefault();
	      setOpen(false);
	    }
	}


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

	const handleChangeDate = (date, name) => {
		setParams(params => ({ ...params, [name]: date }))
	}

	const handleSearch = () => {
		const payload = {
			startdate: convertDay(params.startdate),
			enddate: convertDay(params.enddate),
			type: params.type
		}

		setLoading(true);

		props.getData(payload)
			.then(res => setLoading(false))
			.catch(err => setLoading(false));
	}

	const handleClickReportType = (value) => {
		if (value !== params.type){
			setLoading(true);
			const payload = {
				startdate: convertDay(params.startdate),
				enddate: convertDay(params.enddate),
				type: value
			}

			props.getData(payload)
				.then(res => setLoading(false))
				.catch(err => setLoading(false));
		}

		setParams(params => ({ ...params, type: value }))
		setOpen(false);
	} 

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
				<div className={classes.param}>
					<div>
						<Button
				            size="medium"
				            variant="outlined"
				            style={{width: 200}}
				            ref={anchorRef}
					        aria-controls={open ? 'menu-list-grow' : undefined}
					        aria-haspopup="true"
					        onClick={handleToggle}
					        endIcon={<ArrowDropDownIcon />}
				        >
						    { params.type === '1' ? 'ASAL KIRIMAN' : 'TUJUAN KIRIMAN'}
						</Button>
						<Popper open={open} anchorEl={anchorRef.current} style={{zIndex: 1}} role={undefined} transition disablePortal>
				          {({ TransitionProps, placement }) => (
				            <Grow
				              {...TransitionProps}
				              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
				            >
				              <Paper>
				                <ClickAwayListener onClickAway={handleClose}>
				                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
				                  		<MenuItem onClick={() => handleClickReportType('1')}>ASAL KIRIMAN</MenuItem>
				                  		<MenuItem onClick={() => handleClickReportType('2')}>TUJUAN KIRIMAN</MenuItem>
				                  </MenuList>
				                </ClickAwayListener>
				              </Paper>
				            </Grow>
				          )}
				        </Popper>
					</div>
					<div>
						<DatePicker
					        format="YYYY-MM-DD"
					        views={["year", "month", "date"]}
					        autoOk
					        size='small'
					        variant="inline"
					        style={{marginLeft: 5}}
					        label="Mulai"
					        inputVariant='outlined'
					        value={params.startdate}
					        onChange={(e) => handleChangeDate(e._d, 'startdate')}
					    />
					    <DatePicker
					        format="YYYY-MM-DD"
					        views={["year", "month", "date"]}
					        autoOk
					        size='small'
					        variant="inline"
					        style={{marginLeft: 5}}
					        label="Sampai"
					        inputVariant='outlined'
					        value={params.enddate}
					        onChange={(e) => handleChangeDate(e._d, 'enddate')}
					    />
					    <Button 
					    	variant='contained' 
					    	color='primary' 
					    	style={{marginLeft: 5}}
					    	onClick={handleSearch}
					    >
					    	Tampilkan
					    </Button>
				    </div>
				</div>
				<Divider />
				<TableXray 
					data={props.data}
					loading={loading}
				/>
			</Card>
		</div>
	);
}

XrayReport.propTypes = {
	message: PropTypes.object.isRequired,
	removeMessage: PropTypes.func.isRequired,
	getData: PropTypes.func.isRequired,
	data: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		message: state.message,
		data: state.xray.summary
	}
}

export default connect(mapStateToProps, { removeMessage, getData })(XrayReport);