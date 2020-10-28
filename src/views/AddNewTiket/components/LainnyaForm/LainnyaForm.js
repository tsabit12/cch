import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	FormLabel,
	TextareaAutosize,
	FormControl,
	TextField,
	Button,
	CardActions,
	FormHelperText,
	MenuItem,
	Select,
	InputLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api from '../../../../api';
import { listLayanan } from '../../../../helper';

const useStyles = makeStyles(theme=> ({
	root: {
		height: '100%'
	},
	content: {
		minHeight: '50vh'
	}
}))

const LainnyaForm = props => {
	const { errors: propsErr, pelanggan, user } = props;
	const [catatan, setCatatan] = useState('');
	const [layanan, setLayanan] = useState('00');
	const [offices, setOffices] = useState([]);
	const [kantor, setKantor] = useState({
		text: '',
		value: {}
	});
	const [errors, setError] = useState({});

	useEffect(() => {
		if (kantor.text) {
			const timeId = setTimeout(function() {
				api.cch.getKprk(kantor.text)
						.then(res => setOffices(res))
			}, 500);

			return () => clearTimeout(timeId)
		}
	}, [kantor.text])

	const classes = useStyles();

	const handleChange = (e) => {
		const { value } = e.target;
		setCatatan(value);
		setError(er => ({
			...er,
			catatan: undefined
		}))
	}

	const handleChangeAutoComplet = (newInputValue) => {
		setKantor(kantor => ({
			...kantor,
			text: newInputValue
		}))
	}

	const handleSubmit = () => {
		const errors = validate(kantor.value, catatan);
		props.validateCustomer();
		setError(errors);
		if (Object.keys(errors).length === 0 && Object.keys(propsErr).length === 0) {
			const payloadPelanggan = {
				requestName: pelanggan.nama,
				alamat: pelanggan.alamat,
				nohp: pelanggan.channel === '1' ? pelanggan.channelName : pelanggan.phone,
				email: pelanggan.email,
				sosmed: pelanggan.channel === '7' || pelanggan.channel === '8' ? '' : pelanggan.channelName,
				user: user.username,
				nik: pelanggan.channel === '7' || pelanggan.channel === '8' ? pelanggan.channelName : '',
				nopend: user.kantor_pos,
				jenisChannel: pelanggan.channel,
				detailAlamat: pelanggan.detailAlamat
			}

			props.setLoading(true);
			const formData = new FormData();

			api.cch.addPelanggan(payloadPelanggan)
				.then(customers => {
					const { custid } 			= customers;
					const payloadNoTiket = {
						nopend: props.user.kantor_pos
					}
					api.cch.getNomorTiket(payloadNoTiket)
						.then(resTiket => {
							const payloadTiket = [{
								tipe_bisnis: null,
								tipe_kantorpos: null,
								asal_kiriman: '-',
								asal_pengaduan: user.kantor_pos,
								tujuan_kiriman: '-',
								jenis_layanan: layanan,
								awb: '-',
								jenis_kiriman: 3,
								tgl_exp: resTiket.tglExp,
								no_tiket: resTiket.noTiket,
								cust_id: custid,
								status: '1',
								tujuan_pengaduan: kantor.value.nopend,
								tipe_pelanggan: null,
								channel_aduan: pelanggan.channel,
								user_cch: user.email,
								status_baca: '1', // belum dibaca
								kategori: '5',
								jenis_aduan: '10'
							}];

							const response_tiket = {
								response: catatan,
								file_name: null,
								lacak_value: null,
								user_cch: user.email,
								ticket_id: resTiket.noTiket,
								no_resi: '-'
							}

							formData.append('tiket', JSON.stringify(payloadTiket));
							formData.append('response_tiket', JSON.stringify(response_tiket));

							api.addTicket(formData)
								.then(() => props.setSucces())
								.catch(() => {
									props.setLoading(false);
									alert('Gagal add tiket');
								})
						})
						.catch(() => {
							props.setLoading(false);
							alert('Gagal add tiket');
						})
				})
				.catch(() => {
					props.setLoading(false);
					alert('Gagal add tiket');
				})
		}
	}

	const validate = (office, note) => {
		const errors = {};
		if(!office.nopend) errors.kantor = 'Kantor tujuan belum dipilih';
		if(!note) errors.catatan = 'Catatan tidak boleh kosong';
		if (layanan === '00') errors.layanan = 'Layanan belum dipilih';
		return errors;
	}

	return(
		<Card className={classes.root}>
			<CardHeader 
				title='FORM LAIN-LAIN'
			/>
			<Divider />
			<CardContent className={classes.content}>
				<FormControl fullWidth style={{marginBottom: 20}}>
					<Autocomplete
				        inputValue={kantor.text}
				        onInputChange={(event, newInputValue) => handleChangeAutoComplet(newInputValue)}
						options={offices}
						onChange={(event, newValue) => {
				          setKantor(kantor => ({
				          	...kantor,
				          	value: newValue
				          }))
				          setError(err => ({
				          	...err,
				          	kantor: undefined
				          }))
				        }}
						getOptionLabel={(option) => option.nopend ? `${option.nopend} - ${option.NamaKtr}` : ''}
						getOptionSelected={(row) => row.nopend}
						renderInput={(params) => 
							<TextField 
								{...params} 
								label='Kantor Tujuan'
								variant='outlined'
								InputLabelProps={{ shrink: true }}
								placeholder='Cari kantor tujuan'
								size='small'
								error={!!errors.kantor}
					      		helperText={errors.kantor ? errors.kantor : null }
						/> }
					/>
				</FormControl>

				<FormControl 
					variant='outlined' 
					fullWidth
					size='small'
					style={{marginBottom: 20}}
					error={!!errors.layanan}
				>
					<InputLabel id="labelLayanan">Layanan</InputLabel>
					<Select
				          value={layanan}
				          onChange={(e) => {
				          	const { value } = e.target
				          	setLayanan(value);
				          	setError(err => ({
				          		...err,
				          		layanan: undefined
				          	}))
				          }}
				          label="Layanan"
				          autoWidth={true}
				          id="layanan"
				          name="layanan"
				          labelId="labelLayanan"
				        >
				          { listLayanan.map((row, index) => <MenuItem key={index} value={row.value}>
				          		{ row.text }
				          	</MenuItem>)}
				    </Select>
				    { errors.layanan && <FormHelperText>{errors.layanan}</FormHelperText>}
				</FormControl>

				<FormControl fullWidth error={!!errors.catatan}>
					<FormLabel component="legend" style={{marginBottom: 5}}>
						Catatan
					</FormLabel>
					<TextareaAutosize
						rowsMax={10}
						//className={classes.textArea}
						rowsMin={5}
						aria-label="maximum height"
						placeholder="Masukan catatan disini"
						value={catatan}
						name='catatan'
						onChange={handleChange}
					/>
					{ errors.catatan && <FormHelperText>{errors.catatan}</FormHelperText>}
				</FormControl>
			</CardContent>
			<Divider />
			<CardActions style={{justifyContent: 'flex-end'}}>
				<Button onClick={handleSubmit} color='primary'>Buat Tiket</Button>
			</CardActions>
		</Card>
	);
}

LainnyaForm.propTypes = {
	validateCustomer: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	setLoading: PropTypes.func.isRequired
}

export default LainnyaForm;