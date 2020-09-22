import React from 'react';
import {
	Card,
	CardHeader,
	Divider,
	CardContent,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	TextField,
	FormHelperText
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
	field: {
		marginBottom: 20
	},
	fieldLeft: {
		marginBottom: 20,
		marginRight: 5
	},
	fieldRight: {
		marginBottom: 20,
		marginLeft: 5
	},
	group: {
		display: 'flex'
	}
}))

const FormPengaduan = props => {
	const { value, channels, errors } = props;
	const classes = useStyles();

	const getLabelFromChannel = (id) => {
		const find = channels.find(row => row.id === id);
		if (find.id === '7' || find.id === '6') { // walkin && e commerce
			return 'Sosmed';
		}else{
			return find.channel;
		}
	}

	console.log(value.channel);

	return(
		<Card>
			<CardHeader 
				title='FORM PENGADUAN'
			/>
			<Divider />
			<CardContent>
				<FormControl 
					variant='outlined' 
					fullWidth
					className={classes.field}
				>
					<InputLabel id="jenis-customized-select">Jenis Pengaduan</InputLabel>
					<Select
				          value={value.jenis}
				          onChange={props.handleChange}
				          label="Jenis Pengaduan"
				          autoWidth={true}
				          id="jenis"
				          name="jenis"
				          labelId="jenis-customized-select"
				        >
				          <MenuItem value='0'>--Pilih--</MenuItem>
				          <MenuItem value='5'>Pengaduan</MenuItem>
				          <MenuItem value='1'>Lacak Kiriman</MenuItem>
				          <MenuItem value='2'>Info Tarif</MenuItem>
				          <MenuItem value='4'>Kantor Pos & Kode Pos</MenuItem>
				    </Select>
				</FormControl>

				<div className={classes.group}>
					<FormControl
						variant='outlined' 
						fullWidth
						className={classes.field}
						error={!!errors.channel}
					>
						<InputLabel id="labelChannel">Channel</InputLabel>
						<Select
							name='channel'
							labelId='labelChannel'
							id='channel'
							value={value.channel}
							label='Channel'
							autoWidth={true}
							onChange={props.handleChange}
						>
							{ channels.length > 0 ? channels.map((row, index) => (
								<MenuItem value={row.id} key={index}>{row.channel}</MenuItem>
							)) : <MenuItem value='0'>--Pilih Channel--</MenuItem>}
						</Select>
						{ errors.channel && <FormHelperText>{errors.channel}</FormHelperText>}
					</FormControl>
				</div>

				{ value.channel !== '0' && 
					<FormControl
						fullWidth
						className={classes.field}
					>
						<Autocomplete
					        value={value.channelName}
					        onChange={(event, newValue) => {
					          props.onChangeSelectAutoComplete(newValue);
					        }}
					        freeSolo
		        			disableClearable
					        inputValue={value.channelName}
					        onInputChange={(event, newInputValue) => {
					          props.handleChangeAutoComplete(newInputValue, 'default', 'default');
					        }}
					        id="controllable-states-demo"
	    					options={props.options}
	    					renderInput={(params) => 
		    						<TextField 
		    							{...params} 
		    							label={`${getLabelFromChannel(value.channel)}`}
		    							variant='outlined'
										InputLabelProps={{ shrink: true }}
										placeholder={`Masukan ${getLabelFromChannel(value.channel)} pelanggan`}
										error={!!errors.channelName}
									helperText={errors.channelName ? errors.channelName : null }
	    					/> }
				    	/>
					</FormControl> }

				<FormControl
					fullWidth
					className={classes.field}
				>
					<TextField 
						label='Nama Pelanggan'
						variant='outlined'
						InputLabelProps={{ shrink: true }}
						value={value.nama}
						name='nama'
						error={!!errors.nama}
						helperText={errors.nama ? errors.nama : null }
						id='nama'
						onChange={props.handleChange}
						placeholder='Masukan nama pelanggan'
						autoComplete='off'
					/>
				</FormControl>

				{ value.channel !== '1' && 
				<FormControl
					fullWidth
					className={classes.field}
				>
					<TextField 
						label='Nomor Telepon'
						variant='outlined'
						InputLabelProps={{ shrink: true }}
						value={value.phone}
						name='phone'
						id='phone'
						onChange={props.handleChange}
						placeholder='Masukan nomor telepon pelanggan'
						autoComplete='off'
						error={!!errors.phone}
						helperText={errors.phone ? errors.phone : null }
					/>
				</FormControl> }

				{ value.channel !== '5' && 
					<FormControl
						fullWidth
						className={classes.field}
					>
						<TextField 
							label='Email'
							variant='outlined'
							InputLabelProps={{ shrink: true }}
							value={value.email}
							name='email'
							id='email'
							onChange={props.handleChange}
							placeholder='Masukan email pelanggan'
							autoComplete='off'
						/>
					</FormControl> }

				<FormControl
					fullWidth
					className={classes.field}
				>
					<Autocomplete
				        inputValue={value.alamat}
				        onInputChange={(event, newInputValue) => {
				          props.onChangeAlamat(newInputValue);
				        }}
				        id="controllable-alamat"
    					options={props.cities}
    					renderInput={(params) => 
	    						<TextField 
	    							{...params} 
	    							label='Alamat'
	    							variant='outlined'
									InputLabelProps={{ shrink: true }}
									placeholder='Masukan alamat pelanggan'
    							/> 
    						}
			    	/>
				</FormControl>
			</CardContent>
		</Card>
	);
}

FormPengaduan.propTypes = {
	value: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	channels: PropTypes.array.isRequired,
	handleChangeAutoComplete: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
	onChangeSelectAutoComplete: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
}

export default FormPengaduan;