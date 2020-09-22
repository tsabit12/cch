import React from 'react';
import {
	Card,
	CardHeader,
	Divider,
	CardContent,
	CardActions,
	Button,
	FormControl,
	TextField,
	Select,
	MenuItem,
	InputLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	content: {
		overflowY: 'auto',
		height: 400
	},
	field: {
		marginBottom: 20
	},
	group: {
		display: 'flex',
		marginBottom: 20
	}
}))

const CekTarifForm = props => {
	const classes = useStyles();
	const { data: propsData, errors } = props;
	

	return(
		<Card className={classes.root}>
			<CardHeader 
				title='FORM CEK TARIF'
			/>
			<Divider />

			<CardContent className={classes.content}>
				<FormControl className={classes.field} fullWidth>
					<Autocomplete
				        value={propsData.data.sender}
				        onChange={(event, newValue) => {
				          props.onSelectAddress(newValue, 'sender');
				        }}
				        freeSolo
	        			disableClearable
				        inputValue={propsData.data.sender}
				        onInputChange={(event, newInputValue) => {
				          props.handleChangeAutoComplete(newInputValue, 'tarif', 'sender');
				        }}
				        // id="controllable-states-demo"
						options={propsData.cities.text}
						renderInput={(params) => 
							<TextField 
								{...params} 
								error={!!errors.sKodepos}
								helperText={errors.sKodepos ? errors.sKodepos : null }
								label='Kecamatan/Kota pengirim'
								variant='outlined'
								InputLabelProps={{ shrink: true }}
								placeholder='Masukan kecamatan/kota pengirim'
						/> }
					/>
				</FormControl>
				<FormControl className={classes.field} fullWidth>
					<Autocomplete
				        value={propsData.data.receiver}
				        onChange={(event, newValue) => {
				          props.onSelectAddress(newValue, 'receiver');
				        }}
				        freeSolo
	        			disableClearable
				        inputValue={propsData.data.receiver}
				        onInputChange={(event, newInputValue) => {
				          props.handleChangeAutoComplete(newInputValue, 'tarif', 'receiver');
				        }}
				        // id="controllable-states-demo"
						options={propsData.cities.text}
						renderInput={(params) => 
							<TextField 
								{...params} 
								label='Kecamatan/Kota penerima'
								variant='outlined'
								InputLabelProps={{ shrink: true }}
								placeholder='Masukan kecamatan/kota penerima'
								error={!!errors.rKodepos}
								helperText={errors.rKodepos ? errors.rKodepos : null}
						/> }
					/>
				</FormControl>
				<div className={classes.group}>
					<TextField 
						variant='outlined'
						label='Panjang (cm)'
						InputLabelProps={{ shrink: true }}
						placeholder='Masukan panjang'
						autoComplete='off'
						fullWidth
						value={propsData.data.panjang}
						onChange={(e) => props.onChange(e, 'number')}
						name='panjang'
					/>
					<TextField 
						variant='outlined'
						label='Lebar (cm)'
						InputLabelProps={{ shrink: true }}
						placeholder='Masukan lebar'
						autoComplete='off'
						fullWidth
						style={{
							marginRight: 4,
							marginLeft: 5
						}}
						value={propsData.data.lebar}
						onChange={(e) => props.onChange(e, 'number')}
						name='lebar'
					/>
					<TextField 
						variant='outlined'
						label='Tinggi (cm)'
						InputLabelProps={{ shrink: true }}
						placeholder='Masukan tinggi'
						autoComplete='off'
						fullWidth
						value={propsData.data.tinggi}
						onChange={(e) => props.onChange(e, 'number')}
						name='tinggi'
					/>
				</div>
				<div className={classes.group}>
					<FormControl 
						style={{
							marginRight: 4
						}}
						variant="outlined" 
						fullWidth
					>
						<InputLabel id="paketLabel">Jenis Kiriman</InputLabel>
				        <Select
				          labelId="paketLabel"
				          id="type"
				          name="type"
				          value={propsData.data.type}
				          onChange={(e) => props.onChange(e, 'default')}
				          autoWidth={true}
				          label="Jenis Kiriman"
				        >
				          <MenuItem value='1'>PAKET</MenuItem>
				          <MenuItem value='0'>SURAT</MenuItem>
				        </Select>
					</FormControl>
					<FormControl
						style={{
							marginLeft: 4
						}}
						fullWidth
					>
						<TextField 
							variant='outlined'
							error={!!errors.berat}
							helperText={errors.berat ? errors.berat : null }
							label='Berat (gram)'
							InputLabelProps={{ shrink: true }}
							placeholder='Masukan berat'
							autoComplete='off'
							value={propsData.data.berat}
							onChange={(e) => props.onChange(e, 'number')}
							name='berat'
						/>
					</FormControl>
				</div>
				<FormControl fullWidth className={classes.field}>
					<TextField 
						variant='outlined'
						label='Nilai Barang'
						InputLabelProps={{ shrink: true }}
						placeholder='Masukan nilai barang'
						autoComplete='off'
						value={propsData.data.nilai}
						onChange={(e) => props.onChange(e, 'number')}
						name='nilai'
					/>
				</FormControl>
			</CardContent>
			
			<Divider />
			<CardActions>
				<Button
					variant='text'
					color='primary'
					onClick={props.onSubmit}
				>
					TAMPILKAN
				</Button>
			</CardActions>
		</Card>
	);
}

CekTarifForm.propTypes = {
	data: PropTypes.object.isRequired,
	handleChangeAutoComplete: PropTypes.func.isRequired,
	onSelectAddress: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
}

export default CekTarifForm;