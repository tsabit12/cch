import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
	MenuItem,
	FormControl,
	Select,
	InputLabel,
	Button
} from "@material-ui/core";
import PropTypes from "prop-types";
import palette from '../../../../theme/palette';
import { listReg, listChannel } from '../../../../helper';
import DescriptionIcon from '@material-ui/icons/Description';
import Loader from '../../../Loader';
import Alert from '../../../Alert';
import api from '../../../../api';

import {
	DataExcel 
} from './components';

const useStyles = makeStyles(theme => ({
	formControl: {
		marginTop: 10,
		marginLeft: 8,
		marginRight: 8,
		minWidth: 200
	},
	button: {
		marginTop: 10
	},
	buttonDownload: {
		marginTop: 10,
		marginLeft: 5,
		backgroundColor: palette.success.main,
		'&:hover': {
			backgroundColor: palette.success.dark
		},
		color: '#FFF'
	}
}))

const SearchParam = props => {
	const [state, setState] = React.useState({
		reg: '00',
		kprk: '00',
		listKprk: [],
		channel: '00'
	})
	const classes = useStyles();
	const { user } = props;
	const [loading, setLoading] = useState(false);
	const [downloaded, setDownloaded] = useState([]);
	const [errors, setErrors] = useState({});
	const [disabledrReg, setDisabledReg] = useState(false);
	
	const { listKprk } = state;

	React.useEffect(() => {
		if (user.utype === 'Kprk') {
			setState(prevState => ({
				...prevState,
				reg: user.regional,
				kprk: user.kantor_pos
			}))
			setDisabledReg(true);
		}else if (user.utype === 'Regional') {
			setState(prevState => ({
				...prevState,
				reg: user.regional
			}))

			setDisabledReg(true);

			props.getKprk(user.regional)
				.then(res => setState(prevState => ({
					...prevState,
					listKprk: res
				})))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	const handleChangeReg = (e) => {
		const { value } = e.target;
		setState(prevState => ({
			...prevState,
			reg: value,
			kprk: '00'
		}))

		props.getKprk(value)
			.then(res => setState(prevState => ({
				...prevState,
				listKprk: res
			})))
	}

	const handleChange = (e) => {
		const { value, name } = e.target;
		setState(prevState => ({
			...prevState,
			[name]: value
		}))
	}

	const handleClick = () => {
		const payload = {
			regional: state.reg,
			kprk: state.kprk,
			channel: state.channel
		}
		props.onSubmit(payload)
	}

	const handleDownload = () => {
		setLoading(true);
		setErrors({});

		const payload = {
			regional: state.reg,
			kprk: state.kprk,
			channel: state.channel
		};

		api.download.pelanggan(payload)
			.then(res => {
				setDownloaded(res);
				setLoading(false);
			})
			.catch(err => {
				setLoading(false);
				setErrors({global: 'Download failed'});
			})
	}

	return(
		<React.Fragment>
			{ downloaded.length > 0 && <DataExcel data={downloaded} /> }
			<Alert 
				open={!!errors.global}
				message={errors.global}
				variant='error'
			/>

			<Loader loading={loading} />
			<FormControl 
				variant="outlined" 
				size="small" 
				className={classes.formControl}
			>
		        <InputLabel id="labelArea">REGIONAL</InputLabel>
		        <Select
		          labelId="labelArea"
		          id="demo-simple-select-outlined"
		          value={state.reg}
		          onChange={handleChangeReg}
		          label="REGIONAL"
		          disabled={disabledrReg}
		        >
		        	{ listReg.map((row, index) => <MenuItem key={index} value={row.value}>
		        		{row.text}
		        	</MenuItem>)}
		        </Select>
		    </FormControl>

		    <FormControl 
				variant="outlined" 
				size="small" 
				className={classes.formControl}
			>
		        <InputLabel id="labelKprk">KPRK</InputLabel>
		        <Select
			          labelId="labelKprk"
			          id="kprk"
			          name='kprk'
			          value={state.kprk}
			          onChange={handleChange}
			          label="KPRK"
			          disabled={user.utype === 'Kprk' ? true : false }
			          
			        >
			         	<MenuItem value="00">SEMUA KPRK</MenuItem>
			         	{user.utype === 'Kprk' && <MenuItem value={user.kantor_pos}>
			        		{user.fullname}
			        	</MenuItem>}

				        {listKprk.length > 0 && listKprk.map((row, index) => (
				        	<MenuItem value={row.code} key={index}>{row.kprk}</MenuItem>
				        ))}
				</Select>
		    </FormControl>

		     <FormControl 
				variant="outlined" 
				size="small" 
				className={classes.formControl}
			>
		        <InputLabel id="labelChannel">CHANNEL</InputLabel>
		        <Select
			          labelId="labelChannel"
			          id="channel"
			          name='channel'
			          value={state.channel}
			          onChange={handleChange}
			          label="CHANNEL"
			          
			        >
			         	{ listChannel.map((row, index) => <MenuItem key={index} value={row.value}>
			         		{row.text}
			         	</MenuItem>)}
				</Select>
		    </FormControl>
		    
		    <Button 
		    	variant="contained" 
		    	className={classes.button} 
		    	color="primary"
		    	onClick={handleClick}
		    >
		    	Tampilkan
		    </Button>

		    <Button 
		    	variant="contained" 
		    	className={classes.buttonDownload} 
		    	onClick={handleDownload}
		    	startIcon={<DescriptionIcon />}
		    >
		    	Download
		    </Button>
	    </React.Fragment>
	);
}

SearchParam.propTypes = {
	getKprk: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
}

export default SearchParam;