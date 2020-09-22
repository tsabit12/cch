import React from 'react';
import { 
	Card,
	CardHeader,
	Divider,
	CardContent,
	FormControl,
	InputLabel,
	InputAdornment,
	IconButton,
	OutlinedInput,
	Select,
	MenuItem,
	FormHelperText,
	CardActions,
	Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import {
	TimeLine
} from './components';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		maxHeight: ''
	},
	field: {
		marginBottom: 20
	},
	content: {
		height: 400,
		overflowY: 'auto'
	}
}))

const LacakForm = props => {
	const { value, errors } = props;
	const classes = useStyles();
	
	return(
		<Card className={classes.root}>
			<CardHeader 
				title='FORM LACAK KIRIMAN'
			/>
			<Divider/>
			<CardContent className={classes.content}>
				{ value.list.length === 0 ? <React.Fragment>
					<FormControl 
						variant='outlined' 
						fullWidth
						className={classes.field}
					>
						<InputLabel id="jenis-customized-select">Jenis Kiriman</InputLabel>
						<Select
					          value={value.type}
					          onChange={props.handleChange}
					          label="Jenis Kiriman"
					          autoWidth={true}
					          id="type"
					          name="type"
					          labelId="jenis-customized-select"
					        >
					          <MenuItem value='1'>Domestik</MenuItem>
					          <MenuItem value='2'>Internasional</MenuItem>
					    </Select>
					</FormControl>

					<FormControl 
						className={classes.field} 
						variant="outlined"
						fullWidth
						error={!!errors.noresi}
					>
						<InputLabel htmlFor="outlined-adornment-password" shrink>Nomor Resi</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type='text'
							notched
							value={value.noresi}
							onChange={props.handleChange}
							name='noresi'
							autoComplete='off'
							endAdornment={
								<InputAdornment position="end">
									<IconButton
									  aria-label="toggle password visibility"
									  onClick={props.onSearch}
									  // onMouseDown={handleMouseDownPassword}
									  edge="end"
								>
								  		<SearchIcon />
									</IconButton>
								</InputAdornment>
							}
							placeholder='Masukkan nomor resi'
							labelWidth={70}
						/>
						{ errors.noresi && <FormHelperText>{errors.noresi}</FormHelperText>}
					</FormControl>
				</React.Fragment> :  <TimeLine data={value.list} />}
			</CardContent>
			<Divider />
			{ value.list.length > 0 && <CardActions>
				<Button variant='text' color='primary' onClick={props.goBack}>
					Kembali
				</Button>
				<Button variant='text' color='primary' onClick={props.onDone}>
					Selesai
				</Button>
			</CardActions>}
		</Card>
	);
}

LacakForm.propTypes = {
	value: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	goBack: PropTypes.func.isRequired,
	onDone: PropTypes.func.isRequired
}

export default LacakForm;