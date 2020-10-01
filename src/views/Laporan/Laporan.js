import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	Divider,
	Button,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	Paper,
	Popper,
	Grow,
	ClickAwayListener,
	MenuList,
	//CardActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { getLaporanTiket } from '../../actions/laporan';
import { DatePicker } from "@material-ui/pickers";
import { periodeView, listReg } from '../../helper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import {
	TableTiket,
	ModalDetail
} from './components';

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

const Laporan = props => {
	const classes = useStyles();
	const anchorRef = useRef();
	const [params, setParams] = useState({
		periode: new Date(),
		regional: '00'
	})
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [activeName, setActivename ] = useState('00'); //01 keluar : 00 masuk
	const [detail, setDetail] = useState({
		visible: false,
		item: {}
	});

	useEffect(() => {
		const payload = {
			regional:"00",
			periode: periodeView(new Date()),
			type: '00'
		}
		props.getLaporanTiket(payload);
		//eslint-disable-next-line
	}, []);

	const handleChangeDate = (value) => {
		setParams(params => ({
			...params,
			periode: value
		}))
	}

	const handleSearch = () => {
		const payload = {
			regional: params.regional,
			periode: periodeView(params.periode),
			type: activeName
		}	

		setLoading(true);

		props.getLaporanTiket(payload)
			.then(() => setLoading(false))
			.catch(err => setLoading(false))
	}

	const handleChangeReg = (e) => {
		const { value } = e.target;
		setParams(params => ({
			...params,
			regional: value
		}))
	}

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

	const handleClickReportType = () => {
		setOpen(false);
		if (activeName === '01') {
			setActivename('00');
		}else{
			setActivename('01');
		}
	}

	const handleClickDetail = (id) => {
		setDetail({
			visible: true,
			item: {
				kantor: id,
				type: params.regional === '00' ? 'reg' : 'kprk',
				periode: periodeView(params.periode)
			}
		});
	}

	const cardTitle = () => (
		<div className={classes.header}>
			<div>
				<Button
		            size="medium"
		            style={{minWidth: 200}}
		            variant="outlined"
		            ref={anchorRef}
			        aria-controls={open ? 'menu-list-grow' : undefined}
			        aria-haspopup="true"
			        onClick={handleToggle}
		        >
				    {activeName === '01' ? 'LAPORAN TIKET KELUAR' : 'LAPORAN TIKET MASUK'} <ArrowDropDownIcon />
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
		                  		<MenuItem onClick={handleClickReportType}>
		                    		{ activeName === '01' ? 'LAPORAN TIKET MASUK' : 'LAPORAN TIKET KELUAR' }
		                    	</MenuItem>
		                  </MenuList>
		                </ClickAwayListener>
		              </Paper>
		            </Grow>
		          )}
		        </Popper> 
			</div>
			<div style={{display: 'flex', width: 500}}>
				<FormControl variant='outlined' size="small" style={{width: 200}}>
					<InputLabel htmlFor="regLabel">Regional</InputLabel>
					<Select
						labelId="regLabel"
						label="REGIONAL"
						name="regional"
						value={params.regional}
						onChange={handleChangeReg}
						//disabled={state.disabled.reg}
					>
						{listReg.map((row, index) => (
							<MenuItem key={index} value={row.value}>{row.text}</MenuItem>
						))}
					</Select>
				</FormControl>
				
				<DatePicker
			        format="YYYY-MM"
			        views={["year", "month"]}
			        autoOk
			        size='small'
			        variant="inline"
			        style={{marginLeft: 5}}
			        label="Periode"
			        inputVariant='outlined'
			        value={params.periode}
			        onChange={(e) => handleChangeDate(e._d)}
			    />
			    <Button variant='outlined' style={{marginLeft: 5}} onClick={handleSearch} disabled={loading}>
			    	{ loading ? 'Loading...' : 'Tampilkan'}
			    </Button>
		    </div>
		</div>
	);

	return(
		<div className={classes.root}>
			{ detail.visible && 
				<ModalDetail 
					onClose={() => setDetail({ visible: false, item: {} })} 
					item={detail.item}
					type={activeName}
				/> }
			<Card>
				<CardHeader 
					title={cardTitle()}
				/>
				<Divider />
				<TableTiket 
					data={props.listTiket}
					onPress={handleClickDetail}
				/>
				<Divider />
				{ /* <CardActions style={{justifyContent: 'flex-end'}}>
					<Button variant='contained' color='primary'>
						DOWNLOAD TO EXCEL
					</Button>
				</CardActions> */ }
			</Card>
		</div>
	);
}

function mapStateToProps(state) {
	return{
		listTiket: state.laporan.tiket
	}
}

export default connect(mapStateToProps, { getLaporanTiket })(Laporan);