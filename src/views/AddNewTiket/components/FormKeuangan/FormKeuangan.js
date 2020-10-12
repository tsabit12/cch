import React, { useEffect, useState } from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	FormControl,
	MenuItem,
	InputLabel,
	Select,
	TextField,
	Button,
	FormLabel,
	TextareaAutosize
} from '@material-ui/core';
import api from '../../../../api';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { listAduan } from '../../../../helper';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	field: {
		marginBottom: 20
	},
	inline: {
		display: 'flex'
	}
}))

const FormKeuangan = props => {
	const classes = useStyles();
	const { errors, pelanggan, user } = props;
	const [listProduk, setProduk ] = useState([]);
	const [field, setField] = useState({
		layanan: '00',
		noresi: '',
		kantorasal: '',
		kantortujuan: '',
		tujuan: '',
		catatan: '',
		jenis: '00'
	})

	const [tujuanKantor, setTujuan] = useState([]);
	const [placeholder, setPlaceholder] = useState('Masukan nomor resi');
	const [offices, setOffices] = useState([]);
	const [offices2, setOffices2] = useState([]);
	const [offices3, setOffices3] = useState([]);

	useEffect(() => {
		api.getProdukJaskug()
			.then(res => setProduk(res))
	}, []);

	useEffect(() => {
		if (field.layanan === 'WU' || field.layanan === 'WI' || field.layanan === 'WK') {
			setPlaceholder('00--//327383//as');
		}else{
			setPlaceholder('Masukan nomor resi');
		}
	}, [field.layanan])

	useEffect(() => {
		if (field.kantorasal) {
			if (field.kantorasal.length > 0 && field.kantorasal.length < 10 ) {
				const timeId = setTimeout(function() {
					api.cch.getKprk(field.kantorasal)
						.then(res => setOffices(res))
				}, 500);

				return () => clearTimeout(timeId);
			}
		}
	}, [field.kantorasal]);

	useEffect(() => {
		if (field.kantortujuan) {
			if (field.kantortujuan.length > 0 && field.kantortujuan.length < 10 ) {
				const timeId = setTimeout(function() {
					api.cch.getKprk(field.kantortujuan)
						.then(res => setOffices2(res))
				}, 500);

				return () => clearTimeout(timeId);
			}
		}
	}, [field.kantortujuan]);

	useEffect(() => {
		if (field.tujuan) {
			if (field.tujuan.length > 0 && field.tujuan.length < 10 ) {
				const timeId = setTimeout(function() {
					api.cch.getKprk(field.tujuan)
						.then(res => setOffices3(res))
				}, 500);

				return () => clearTimeout(timeId);
			}
		}
	}, [field.tujuan]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setField(field => ({
			...field,
			[name]: value
		}))
	}

	// const handleChangeResi = (e) => {
	// 	const { value } = e.target;
	// 	//const regex = /(([A-Za-z0-9]{7})([-])([0-9]{2})([\/])([0-9]{2})([\/])([0-9]{6})){1,24}/;
	// 	const newValue = value.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "-");
	// 	setField(field => ({
	// 		...field,
	// 		noresi: newValue
	// 	}))
	// }

	const handleChangeAutocomplete = (value, name) => {
		setField(field => ({
			...field,
			[name]: value
		}))
	}

	const handleSubmit = () => {
		props.validateCustomer();
		if (Object.keys(errors).length === 0) {
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

			api.cch.addPelanggan(payloadPelanggan)
				.then(customers => {
					const { custid } 			= customers;
					const payloadNoTiket = {
						nopend: props.user.kantor_pos
					}
					api.cch.getNomorTiket(payloadNoTiket)
						.then(resTiket => {
							const payloadTiket = [];
							tujuanKantor.forEach(row => {
								payloadTiket.push({
									tipe_bisnis: null,
									tipe_kantorpos: null,
									asal_kiriman: field.kantorasal.split('-')[0].trim(),
									asal_pengaduan: user.kantor_pos,
									tujuan_kiriman: field.kantortujuan.split('-')[0].trim(),
									jenis_layanan: field.layanan,
									awb: field.noresi,
									jenis_kiriman: 3,
									tgl_exp: resTiket.tglExp,
									no_tiket: resTiket.noTiket,
									cust_id: custid,
									status: '1',
									tujuan_pengaduan: row.nopend,
									tipe_pelanggan: null,
									channel_aduan: pelanggan.channel,
									user_cch: props.user.email,
									status_baca: '1', // belum dibaca
									kategori: '5',
									jenis_aduan: field.jenis
								})
							})

							const payload = {
								tiket: payloadTiket,
								response_tiket: {
									response: field.catatan,
									file_name: null,
									lacak_value: null,
									user_cch: props.user.email,
									ticket_id: resTiket.noTiket
								}
							}

							api.addTicket(payload)
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

	return(
		<Card className={classes.root}>
			<CardHeader 
				title='FORM PENGADUAN KEUANGAN'
			/>
			<Divider />
			<CardContent>
				<FormControl fullWidth variant='outlined' size="small" className={classes.field}>
					<InputLabel htmlFor="layananLabel">Layanan</InputLabel>
					<Select
						labelId="layananLabel"
						label="Layanan"
						name="layanan"
						value={field.layanan}
						onChange={handleChange}
					>
						<MenuItem value='00'>--Pilih Layanan--</MenuItem>
						{ listProduk.map((row, index) => <MenuItem key={index} value={row.kd_layanan}>
							{row.nama_layanan}
						</MenuItem>)}
					</Select>
				</FormControl>
				<FormControl fullWidth size="small" className={classes.field}>
					<TextField 
						variant='outlined'
						placeholder={placeholder}
						size='small'
						InputLabelProps={{ shrink: true }}
						label='Nomor Resi'
						name='noresi'
						value={field.noresi}
						onChange={handleChange}
						autoComplete='off'
					/>
				</FormControl>
				<div className={classes.inline} style={{marginBottom: 20}}>
					<FormControl fullWidth size="small" style={{marginRight: 5}}>
						<Autocomplete
					        inputValue={field.kantorasal}
					        onInputChange={(event, newInputValue) => handleChangeAutocomplete(newInputValue, 'kantorasal')}
							options={offices}
							getOptionLabel={(option) => `${option.nopend} - ${option.NamaKtr}`}
							//getOptionSelected={(option) => option.posCode}
							renderInput={(params) => 
								<TextField 
									{...params} 
									label='Kantor Bayar'
									variant='outlined'
									InputLabelProps={{ shrink: true }}
									placeholder='Cari kantor bayar'
									size='small'
							/> }
						/>
					</FormControl>
					<FormControl fullWidth size="small" style={{marginLeft: 5}}>
						<Autocomplete
					        inputValue={field.kantortujuan}
					        onInputChange={(event, newInputValue) => handleChangeAutocomplete(newInputValue, 'kantortujuan')}
							options={offices2}
							getOptionLabel={(option) => `${option.nopend} - ${option.NamaKtr}`}
							//getOptionSelected={(option) => option.posCode}
							renderInput={(params) => 
								<TextField 
									{...params} 
									label='Kantor Setor'
									variant='outlined'
									InputLabelProps={{ shrink: true }}
									placeholder='Cari kantor setor'
									size='small'
							/> }
						/>
					</FormControl>
				</div>
				<FormControl fullWidth variant='outlined' size="small" className={classes.field}>
					<InputLabel id="labelAduan">Jenis Aduan</InputLabel>
					<Select
				          value={field.jenis}
				          onChange={handleChange}
				          label="Jenis Aduan"
				          autoWidth={true}
				          id="jenis"
				          name="jenis"
				          labelId="labelAduan"
				        >
				          { listAduan.map((row, index) => <MenuItem key={index} value={row.value}>
				          		{ row.text }
				          	</MenuItem>)}
				    </Select>
				</FormControl>
				<FormControl fullWidth size="small" className={classes.field}>
					<Autocomplete
						value={tujuanKantor}
						multiple
					    onChange={(event, newValue) => setTujuan(newValue)}
				        inputValue={field.tujuan}
				        onInputChange={(event, newInputValue) => handleChangeAutocomplete(newInputValue, 'tujuan')}
						options={offices3}
						getOptionLabel={(option) => `${option.nopend} - ${option.NamaKtr}`}
						// getOptionSelected={(option) => option.nopend}
						renderInput={(params) => 
							<TextField 
								{...params} 
								label='Kantor Tujuan'
								variant='outlined'
								InputLabelProps={{ shrink: true }}
								placeholder='Cari kantor setor'
								size='small'
						/> }
					/>
				</FormControl>
				<FormControl fullWidth size="small" className={classes.field}>
					<FormLabel component="legend" style={{marginBottom: 5}}>
						Catatan
					</FormLabel>
					<TextareaAutosize
						rowsMax={10}
						//className={classes.textArea}
						rowsMin={5}
						aria-label="maximum height"
						placeholder="Masukan catatan disini"
						value={field.catatan}
						name='catatan'
						onChange={handleChange}
					/>
				</FormControl>
			</CardContent>
			<Divider />
			<CardActions style={{justifyContent: 'flex-end'}}>
				<Button variant='outlined' onClick={handleSubmit}>
					BUAT TIKET
				</Button>
			</CardActions>
		</Card>
	);
}

FormKeuangan.propTypes = {
	validateCustomer: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	pelanggan: PropTypes.object.isRequired,
	setLoading: PropTypes.func.isRequired
}

export default FormKeuangan;