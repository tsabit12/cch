import React, { useEffect, useState, useRef } from 'react';
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
	TextareaAutosize,
	FormHelperText
} from '@material-ui/core';
import api from '../../../../api';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { listAduan, validateFile } from '../../../../helper';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	field: {
		marginBottom: 20
	},
	inline: {
		display: 'flex'
	},
	error: {
		fontSize: 13,
		color: 'red'
	}
}))

const FormKeuangan = props => {
	const classes = useStyles();
	const { errors, pelanggan, user } = props;
	const inputFileref = useRef();
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
	const [isValid, setValid] = useState({});
	const [file, setFile] = useState('');

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

		setValid(isValid => ({
			...isValid,
			[name]: undefined
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
		setValid(isValid => ({
			...isValid,
			[name]: undefined
		}))
	}

	const handleSubmit = () => {
		props.validateCustomer();
		const err = validate(field, tujuanKantor);
		setValid(err);

		if (Object.keys(errors).length === 0 && Object.keys(err).length === 0) {
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
							const payloadTiket = [];
							tujuanKantor.forEach(row => {
								payloadTiket.push({
									tipe_bisnis: null,
									tipe_kantorpos: null,
									asal_kiriman: field.kantorasal ? field.kantorasal.split('-')[0].trim() : null,
									asal_pengaduan: user.kantor_pos,
									tujuan_kiriman: field.kantortujuan ? field.kantortujuan.split('-')[0].trim() : null,
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

							const response_tiket = {
								response: field.catatan,
								file_name: null,
								lacak_value: null,
								user_cch: props.user.email,
								ticket_id: resTiket.noTiket,
								no_resi: field.noresi
							}

							formData.append('tiket', JSON.stringify(payloadTiket));
							formData.append('response_tiket', JSON.stringify(response_tiket));
							if (file) formData.append('file', inputFileref.current.files[0]);

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

	const validate = (value, tujuan) => {
		const errors = {};
		if (value.layanan === '00') errors.layanan = 'Jenis layanan belum dipilih';
		if (tujuan.length <= 0) errors.tujuanKantor = 'Harap pilih 1 atau lebih tujuan kantor';
		if (value.jenis === '00') errors.jenis = 'Jenis aduan belum dipilih';
		// if (value.kantorasal.split('-').length !== 2) errors.kantorasal = 'Kantor bayar belum dipilih';
		// if (value.kantortujuan.split('-').length !== 2) errors.kantortujuan = 'Kantor setor belum dipilih';
		if (!value.noresi) errors.noresi = 'Nomor resi tidak boleh kosong';
		return errors;
	}

	const handleClickFile = () => {
		inputFileref.current.value = null;
		inputFileref.current.click();

		setFile('');
		setValid(isValid => ({
			...isValid,
			file: undefined
		}))
	}

	const handleChangeFile = () => {
		const { files } = inputFileref.current;

		const fileIsValid = validateFile(files);
		if (fileIsValid.isvalid === false) {
			setValid(isValid => ({
				...isValid,
				file: fileIsValid.message
			}))
			setTimeout(function() {
				inputFileref.current.value = null;
			}, 10);
		}else{
			setFile(files[0].name);
		}
	}

	return(
		<Card className={classes.root}>
			<CardHeader 
				title='FORM PENGADUAN KEUANGAN'
			/>
			<Divider />
			<CardContent>
				<FormControl 
					fullWidth 
					variant='outlined' 
					size="small" 
					className={classes.field}
					error={!!isValid.layanan}
				>
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
					{ isValid.layanan && <FormHelperText>{isValid.layanan}</FormHelperText>}
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
						error={!!isValid.noresi}
						helperText={isValid.noresi ? isValid.noresi : null }
					/>
				</FormControl>
				<div className={classes.inline} style={{marginBottom: 20}}>
					<FormControl fullWidth size="small" style={{marginRight: 5}}>
						<Autocomplete
					        inputValue={field.kantorasal}
					        onInputChange={(event, newInputValue) => handleChangeAutocomplete(newInputValue, 'kantorasal')}
							options={offices}
							getOptionLabel={(option) => `${option.nopend} - ${option.NamaKtr}`}
							renderInput={(params) => 
								<TextField 
									{...params} 
									label='Kantor Bayar'
									variant='outlined'
									InputLabelProps={{ shrink: true }}
									placeholder='Cari kantor bayar'
									size='small'
									error={!!isValid.kantorasal}
						      		helperText={isValid.kantorasal ? isValid.kantorasal : null }
							/> }
						/>
					</FormControl>
					<FormControl fullWidth size="small" style={{marginLeft: 5}}>
						<Autocomplete
					        inputValue={field.kantortujuan}
					        onInputChange={(event, newInputValue) => handleChangeAutocomplete(newInputValue, 'kantortujuan')}
							options={offices2}
							getOptionLabel={(option) => `${option.nopend} - ${option.NamaKtr}`}
							renderInput={(params) => 
								<TextField 
									{...params} 
									label='Kantor Setor'
									variant='outlined'
									InputLabelProps={{ shrink: true }}
									placeholder='Cari kantor setor'
									size='small'
									error={!!isValid.kantortujuan}
						      		helperText={isValid.kantortujuan ? isValid.kantortujuan : null }
							/> }
						/>
					</FormControl>
				</div>
				<FormControl 
					fullWidth 
					variant='outlined' 
					size="small"
					className={classes.field}
					error={!!isValid.jenis}
				>
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
				    { isValid.jenis && <FormHelperText>{isValid.jenis}</FormHelperText>}
				</FormControl>
				<FormControl fullWidth size="small" className={classes.field}>
					<Autocomplete
						value={tujuanKantor}
						multiple
					    onChange={(event, newValue) => {
					    	setTujuan(newValue);
					    	setValid(isValid => ({
					    		...isValid,
					    		tujuanKantor: undefined
					    	}))
					    }}
				        inputValue={field.tujuan}
				        onInputChange={(event, newInputValue) => handleChangeAutocomplete(newInputValue, 'tujuan')}
						options={offices3}
						getOptionLabel={(option) => `${option.nopend} - ${option.NamaKtr}`}
						// getOptionSelected={(option) => option.nopend}
						renderInput={(params) => 
							<TextField 
								{...params} 
								label='Tujuan Pengaduan'
								variant='outlined'
								InputLabelProps={{ shrink: true }}
								placeholder='Cari kantor tujuan pengaduan'
								size='small'
								error={!!isValid.tujuanKantor}
						      	helperText={isValid.tujuanKantor ? isValid.tujuanKantor : null }
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
				<input 
					type='file'
					style={{display: 'none'}}
					ref={inputFileref}
					onChange={handleChangeFile}
				/>
				<Button variant='outlined' color='primary' onClick={handleClickFile}>
					{ file ? file : 'UPLOAD FILE (MAX 50mb)' }
				</Button>
				{ isValid.file && <p className={classes.error}>{isValid.file}</p>}
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