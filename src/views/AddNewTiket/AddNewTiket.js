import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {
	IconButton,
	Typography,
	Breadcrumbs,
	Grid
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { 
	FormPengaduan,
	TiketForm,
	LacakForm,
	CekTarifForm,
	TableTarif,
	KantorPos,
	TableOffice
} from './components';
import { connect } from 'react-redux';
import { getChannel } from '../../actions/laporan';
import api from '../../api';
import Loader from '../Loader';
import Alert from "../Alert";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	header: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 5
	},
	btn: {
		marginTop: 10
	}
}))

const numberWithCommas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const AddNewTiket = props => {
	const classes = useStyles();
	const [state, setState] = useState({
		pengaduan: {
			jenis: '0',
			channel: '0',
			channelName: '',
			nama:'',
			phone: '',
			alamat: '',
			email: '',
			detailAlamat: ''
		},
		options: {
			list: [],
			text: []
		},
		lacak:{
			noresi: '',
			type: '1',
			list: []
		},
		tarif: {
			data: {
				sender: '',
				receiver: '',
				panjang: '',
				lebar: '',
				tinggi: '',
				type: '1',
				berat: '',
				sKodepos: '',
				rKodepos: '',
				nilai: ''
			},
			cities: {
				text: [],
				listCites: []
			}
		},
		tiket: {
			data: {
				noresi: '',
				type: '1',
				tujuanKirim: '',
				listTujuan: [],
				channel: 'Agen',
				jenisCustomer: 'Ritel',
				bisnis: 'E-Commerce',
				catatan: ''
			},
			tracks: [],
			wasAdded: false,
			detail: {
				// status: '',
				// nomor: null
			}
		},
		errors: {},
		loading: false,
		listTarif: [],
		listOffice: []
	})
	const [offices, setOffices] = useState([]);
	const [isHidden, setHidden] = useState(false);

	const { pengaduan, lacak, errors, tarif, tiket } = state;

	useEffect(() => {
		props.getChannel();
		//eslint-disable-next-line
	}, []); 

	useEffect(() => {
		if (state.listTarif.length > 0 || offices.length > 0) {
			setHidden(true);
		}
	}, [state.listTarif, offices])

	useEffect(() => {
		if (pengaduan.channelName) {
			const time = setTimeout(function() {
				api.getPelanggan(pengaduan.channelName, props.user.kantor_pos)
					.then(customers => {
						if (customers.length > 0) {
							const text = [];
							customers.forEach(row => {
								text.push(row.sosmed);
							})
							setState(state => ({
								...state,
								options: {
									list: customers,
									text
								}
							}))
						}
					})
			}, 800);

			return () => clearTimeout(time);
		}
	}, [pengaduan.channelName, props.user.kantor_pos]);

	useEffect(() => {
		if (tarif.data.sender) {
			const time = setTimeout(function() {
				const payload = {
					kodepos: tarif.data.sender
				};

				getAddress(payload);

			}, 800);

			return () => clearTimeout(time);
		}
	}, [tarif.data.sender])

	useEffect(() => {
		if (tarif.data.receiver) {
			const time = setTimeout(function() {
				const payload = {
					kodepos: tarif.data.receiver
				};

				getAddress(payload);
			}, 800);

			return () => clearTimeout(time);
		}
	}, [tarif.data.receiver])

	// useEffect(() => {
	// 	if (pengaduan.alamat) {
	// 		const time = setTimeout(function() {
	// 			const payload = {
	// 				kodepos: pengaduan.alamat
	// 			};

	// 			getAddress(payload);
	// 		}, 800);

	// 		return () => clearTimeout(time);
	// 	}
	// }, [pengaduan.alamat])

	useEffect(() => {
		if (tiket.data.tujuanKirim !== '') {
			api.cch.getKprk(tiket.data.tujuanKirim)
				.then(res => {
					setState(prevState => ({
						...prevState,
						listOffice: res
					}))
				})
		}
	}, [tiket.data.tujuanKirim])

	const getAddress = (payload) => {
		api.cch.getAddress(payload)
			.then(cities => {
				const text = [];
				cities.forEach(row => {
					text.push(`${row.kecamatan}, ${row.kabupaten}, ${row.provinsi}, ${row.kodepos}`)
				})

				setState(state => ({
					...state,
					tarif:{
						...state.tarif,
						cities: {
							text,
							listCites: cities
						}
					}
				}))
			});
	}

	const onChangePengaduan = (e) => {
		const { name, value } = e.target;
		if (name === 'channel') {
			setState(state => ({
				...state,
				pengaduan: {
					...state.pengaduan,
					channelName: '',
					nama:'',
					phone: '',
					alamat: '',
					email: '',
					detailAlamat: '',
					[name]: value
				},
				errors: {}
			}))
		}else{
			setState(state => ({
				...state,
				pengaduan: {
					...state.pengaduan,
					[name]: name === 'nama' ? value.replace(/[^\w\s]/gi, '') : value
				},
				errors: {
					...errors,
					[name]: undefined
				}
			}))
		}
	}

	const handleChangeAlamat = (value) => {
		setState(state => ({
			...state,
			pengaduan: {
				...state.pengaduan,
				alamat: value.trim()
			}
		}))
	}

	const onChangeAutoComplete = (value, type, name) => {
		if (type === 'tarif') {
			const errName = name === 'sender' ? 'sKodepos' : 'rKodepos';

			setState(state => ({
				...state,
				tarif: {
					...state.tarif,
					data: {
						...state.tarif.data,
						[name]: value
					}
				},
				errors: {
					...state.errors,
					[errName]: undefined
				}
			}))
		}else{
			setState(state => ({
				...state,
				pengaduan: {
					...state.pengaduan,
					channelName: value
				},
				errors: {
					...state.errors,
					channelName: undefined
				}
			}))
		}
	}

	const handleChangeSelect = (value) => {
		const findedOptions = state.options.list.find(row => row.sosmed === value);
		if (findedOptions) {
			setState(state => ({
				...state,
				pengaduan: {
					...state.pengaduan,
					phone: findedOptions.phone,
					alamat: findedOptions.address,
					nama: findedOptions.name_requester,
					detailAlamat: findedOptions.detail_address,
					email: findedOptions.email
				},
				errors: {
					...state.errors,
					phone: undefined,
					alamat: undefined,
					nama: undefined,
					email: undefined
				}
			}))
		}
	}

	const onChangeLacakForm = (e) => {
		const { name, value } = e.target;
		setState(state => ({
			...state,
			lacak: {
				...state.lacak,
				[name]: value
			},
			errors: {
				...state.errors,
				[name]: undefined
			}
		}))
	}

	const searchBarcode = () => {
		const errors = validate('lacak');
		setState(state => ({
			...state,
			errors
		}))

		if (Object.keys(errors).length === 0) {
			setState(state => ({
				...state,
				loading: true
			}))

			const payload = {
				barcode: lacak.noresi,
				type: lacak.type
			}

			api.trackAndTrace(payload)
				.then(tracks => {
					setState(state => ({
						...state,
						lacak: {
							...state.lacak,
							list: tracks.result
						},
						loading: false
					}))
				})
				.catch(err => {
					if (err.response) {
						setState(state => ({
							...state,
							errors: {
								global: 'Data dengan barcode tersebut tidak ditemukan'
							},
							loading: false
						}))
					}else{
						setState(state => ({
							...state,
							errors: {
								global: 'Tidak dapat memproses permintaan anda, silahkan cobalagi nanti'
							},
							loading: false
						}))
					}
				})
		}
	}

	const validate = (type) => {
		const errors = {};
		if (type === 'lacak') {
			if (!lacak.noresi) errors.noresi = 'Nomor resi tidak boleh kosong';
		}else if(type === 'tarif'){
			if (!tarif.data.berat){
				errors.berat = 'Berat tidak boleh kosong';	
			}else{
				if (Number(tarif.data.berat.replace(/\D/g, '')) <= 0) errors.berat = 'Berat harus lebih dari 0';	
			}

			
			if (!tarif.data.rKodepos) errors.rKodepos = 'Alamat penerima tidak valid';
			if (!tarif.data.sKodepos) errors.sKodepos = 'Alamat pengirim tidak valid';
		}else if(type === 'tiket'){
			const { data: dataTiket } = tiket;
			if (dataTiket.listTujuan.length === 0) errors.tujuanKirim = 'Harap select 1 atau lebih kantor tujuan';
			if (!dataTiket.catatan) errors.catatan = 'Catatan harap diisi';
		}

		if (!pengaduan.nama) errors.nama = 'Nama pelanggan tidak boleh kosong';

		if (pengaduan.channel === '0'){
			errors.channel = 'Channel belum dipilih';	
			if (!pengaduan.phone) errors.phone = 'Nomor telepon tidak boleh kosong';
		}else{
			if (pengaduan.channel === '5') {
				var reEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //eslint-disable-line
				if (!reEmail.test(pengaduan.channelName)) errors.channelName = 'Email tidak valid';
			}
			if (pengaduan.channel === '1') {
				var rePhone = /^(^\62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/; //eslint-disable-line
				if (!rePhone.test(pengaduan.channelName)) errors.channelName = 'Nomor ponsel tidak valid. contoh format 08XXX';
			}

			if (!pengaduan.phone && pengaduan.channel !== '1') errors.phone = 'Nomor telepon tidak boleh kosong';
			if (!pengaduan.channelName) errors.channelName = 'Tidak boleh kosong';
		}
		return errors;
	}

	const saveCustomer = (description) => {
		setState(state => ({
			...state,
			loading: true
		}))
		const payload = {
			requestName: pengaduan.nama,
			alamat: pengaduan.alamat,
			nohp: pengaduan.channel === '1' ? pengaduan.channelName : pengaduan.phone,
			email: pengaduan.email,
			sosmed: pengaduan.channel === '7' || pengaduan.channel === '8' ? '' : pengaduan.channelName,
			user: props.user.username,
			nik: pengaduan.channel === '7' || pengaduan.channel === '8' ? pengaduan.channelName : '',
			nopend: props.user.kantor_pos,
			jenisChannel: pengaduan.channel,
			detailAlamat: pengaduan.detailAlamat
		}

		api.cch.addPelanggan(payload)
			.then(res => {
				resetAllState();
				const payloadInfo = {
					jenisChannel: pengaduan.jenis,
					custid: res.custid,
					deskripsi: JSON.stringify(description) 
				}
				
				api.cch.addInfoPos(payloadInfo)
					.catch(err => {
						setState(state => ({
							...state,
							errors: {
								...state.errors,
								global: 'Gagal add info'
							}
						}))
					})

			})
			.catch(err => {
				console.log(err);
				setState(state => ({
					...state,
					loading: false
				}))
			})
	}

	const handleSelectAddress = (value, name) => {
		const kecValue = value.split(',')[0];
		const findCities = tarif.cities.listCites.find(row => row.kecamatan === kecValue);
		
		if (name === 'sender') {
			setState(state => ({
				...state,
				tarif: {
					...state.tarif,
					data: {
						...state.tarif.data,
						sKodepos: findCities.kodepos
					}
				}
			}))
		}else{
			setState(state => ({
				...state,
				tarif: {
					...state.tarif,
					data: {
						...state.tarif.data,
						rKodepos: findCities.kodepos
					}
				}
			}))
		}
	}

	const handleChangeFieldTarif = (e, type) => {
		const { name, value } = e.target;
		if (type === 'number') {
			var val 	= value.replace(/\D/g, '');
			var toInt 	= Number(val);

			setState(state => ({
				...state,
				tarif: {
					...state.tarif,
					data: {
						...state.tarif.data,
						[name]: numberWithCommas(toInt)
					}
				},
				errors: {
					...state.errors,
					[name]: undefined
				}
			}))
		}else{
			setState(state => ({
				...state,
				tarif: {
					...state.tarif,
					data: {
						...state.tarif.data,
						[name]: value
					}
				},
				errors: {
					...state.errors,
					[name]: undefined
				}
			}))
		}
	}

	const onSubmitTarif = () => {
		const errors = validate('tarif');
		setState(state => ({
			...state,
			errors
		}))

		if (Object.keys(errors).length === 0) {
			setState(state => ({
				...state,
				loading: true
			}))

			const { data: newData } = tarif;
			const sender  	= newData.sender.split(",");
			const receiver 	= newData.receiver.split(",");

			const payload = {
				"customerid": "",
				"desttypeid": "1",
				"itemtypeid": newData.type,
				"shipperzipcode": sender[3].trim(),
				"receiverzipcode": receiver[3].trim(),
				"weight": newData.berat.replace(/\D/g, ''),
				"length": newData.panjang ? newData.panjang.replace(/\D/g, '') : '0',
				"width": newData.lebar ? newData.lebar.replace(/\D/g, '') : '0',
				"height": newData.tinggi ? newData.tinggi.replace(/\D/g, '') : '0',
				"diameter": "0",
				"valuegoods": newData.nilai ? newData.nilai.replace(/\D/g, '') : '0',
			}

			api.cch.cekTarif(payload)
				.then(result => {
					setState(state => ({
						...state,
						loading: false,
						listTarif: result
					}))
				})
				.catch(err => {
					console.log(err);
					setState(state => ({
						...state,
						loading: false
					}))
				})
		}
	}

	const onChangeTiket = (e) => {
		const { value, name } = e.target;
		setState(state => ({
			...state,
			tiket: {
				...state.tiket,
				data: {
					...state.tiket.data,
					[name]: value
				}
			},
			errors: {
				...state.errors,
				[name]: undefined
			}
		}))
	} 

	const handleSearchResiTiket = async () => {
		if (!tiket.data.noresi) {
			alert('Nomor resi harap diisi');
		}else{
			setState(state => ({
				...state,
				loading: true
			}))

			const payload = {
				barcode: tiket.data.noresi,
				type: tiket.data.type
			}

			api.cch.validationTiket(tiket.data.noresi)
				.then(response => {
					const { status, no_tiket } = response;
					// if (status !== null) {
					setState(state => ({
						...state,
						tiket:{
							...state.tiket,
							wasAdded: true,
							detail: {
								status,
								no_tiket
							}
						}
					}))
				})

			api.trackAndTrace(payload)
				.then(tracks => {					
					setState(state => ({
						...state,
						loading: false,
						tiket: {
							...state.tiket,
							tracks: tracks.result
						}
					}))
				})
				.catch(err => {
					setState(state => ({
						...state,
						errors: {
							global: 'Data dengan barcode tersebut tidak ditemukan'
						},
						loading: false,
						tiket: {
							...state.tiket,
							tracks: [],
							wasAdded: false,
							detail: {}
						}
					}))
				})
		}
	}

	const handleChangeSearchOffice = (value) => {
		setState(state => ({
			...state,
			tiket: {
				...state.tiket,
				data: {
					...state.tiket.data,
					tujuanKirim: value
				}
			}
		}))
	}

	const handleChooseKprk = (e, value) => {
		setState(state => ({
			...state,
			tiket: {
				...state.tiket,
				data: {
					...state.tiket.data,
					listTujuan: value 
				}
			},
			errors: {
				...state.errors,
				tujuanKirim: undefined
			}
		}))
	}

	const onAddTiket = (valueFormChild) => {
		const errors = validate('tiket');
		setState(state => ({
			...state,
			errors
		}))

		if (Object.keys(errors).length === 0) {
			setState(state => ({
				...state,
				loading: true,
				errors: {}
			}))

			//add pelanggan to get userid for tiket
			const payloadPelanggan = {
				requestName: pengaduan.nama,
				alamat: pengaduan.alamat,
				nohp: pengaduan.channel === '1' ? pengaduan.channelName : pengaduan.phone,
				email: pengaduan.email,
				sosmed: pengaduan.channel === '7' || pengaduan.channel === '8' ? '' : pengaduan.channelName,
				user: props.user.username,
				nik: pengaduan.channel === '7' || pengaduan.channel === '8' ? pengaduan.channelName : '',
				nopend: props.user.kantor_pos,
				jenisChannel: pengaduan.channel,
				detailAlamat: pengaduan.detailAlamat
			}

			api.cch.addPelanggan(payloadPelanggan)
				.then(customers => {
					const { custid } 			= customers;
					const { data: dataTiket } 	= tiket;
					const { asal, tujuan, layanan } = valueFormChild;
					//get number tiket with expired 
					const payloadNoTiket = {
						nopend: props.user.kantor_pos
					}

					api.cch.getNomorTiket(payloadNoTiket)
						.then(resTiket => {
							
							const payloadTiket = [];

							dataTiket.listTujuan.forEach(row => {
								payloadTiket.push({
									tipe_bisnis: dataTiket.bisnis,
									tipe_kantorpos: dataTiket.channel,
									asal_kiriman: asal.split('-')[0].trim(),
									asal_pengaduan: props.user.kantor_pos,
									tujuan_kiriman: tujuan.split('-')[0].trim(),
									jenis_layanan: layanan,
									awb: dataTiket.noresi,
									jenis_kiriman: dataTiket.type,
									tgl_exp: resTiket.tglExp,
									no_tiket: resTiket.noTiket,
									cust_id: custid,
									status: '1',
									tujuan_pengaduan: row.nopend,
									tipe_pelanggan: dataTiket.jenisCustomer,
									channel_aduan: pengaduan.channel,
									user_cch: props.user.email,
									status_baca: '1', // belum dibaca
									kategori: '5'
								})
							})

							const payload = {
								tiket: payloadTiket,
								response_tiket: {
									response: dataTiket.catatan,
									file_name: null,
									lacak_value: JSON.stringify(tiket.tracks),
									user_cch: props.user.email,
									ticket_id: resTiket.noTiket
								}
							}

							api.addTicket(payload)
								.then(res => {
									resetAllState();
								})
								.catch(err => {
									if (err.response) {
										setError('Gagal menambah tiket, silahkan cobalagi');
									}else{
										setError('Tidak dapat memproses permintaan anda, mohon cobalagi nanti');
									}
								})
						})
						//failed get no tiket
						.catch(err => {
							setError('Generate nomor tiket gagal');
						})
				})
				//failed add pelanggan
				.catch(err => {
					setError('Gagal menambah pelanggan, silahkan cobalagi');
				})
		}
	}

	const setError = (msg) => {
		setState(state => ({
			...state,
			loading: false,
			errors: {
				global: msg
			}
		}))
	}

	const resetAllState = () => {
		setState(state => ({
			pengaduan: {
				jenis: '0',
				channel: '0',
				channelName: '',
				nama:'',
				phone: '',
				alamat: '',
				email: '',
				detailAlamat: ''
			},
			options: {
				list: [],
				text: []
			},
			lacak:{
				noresi: '',
				type: '1',
				list: []
			},
			tarif: {
				data: {
					sender: '',
					receiver: '',
					panjang: '',
					lebar: '',
					tinggi: '',
					type: '1',
					berat: '',
					sKodepos: '',
					rKodepos: '',
					nilai: ''
				},
				cities: {
					text: [],
					listCites: []
				}
			},
			tiket: {
				data: {
					noresi: '',
					type: '1',
					tujuanKirim: '',
					listTujuan: [],
					channel: 'Agen',
					jenisCustomer: 'Ritel',
					bisnis: 'E-Commerce',
					catatan: ''
				},
				tracks: [],
				wasAdded: false
			},
			errors: {},
			loading: false,
			listTarif: [],
			listOffice: []
		}))
		setHidden(false);
	}

	const handleValidateKantorPos = () => {
		const { pengaduan } = state;
		const errors = {};

		if (pengaduan.channel === '0') errors.channel = 'Channel belum dipilih';	
		if (!pengaduan.nama) errors.nama = 'Nama pelanggan belum diisi';
		// if (!pengaduan.email) errors.email = 'Email belum diisi';
		// if (!pengaduan.phone) errors.phone = 'Nomor telepon belum diisi';
		
		if (!pengaduan.detailAlamat) errors.detailAlamat = 'Alamat belum diisi';
		if (!pengaduan.channelName) errors.channelName = 'Tidak boleh kosong';

		setState(state => ({
			...state,
			errors
		}))

		return errors;

	}

	return(
		<div className={classes.root}>
			<Loader loading={state.loading} />
			{ errors.global && 
				<Alert 
					open={!!errors.global} 
					variant="error" 
					message={errors.global}
					onClose={() => setState(state => ({
						...state,
						errors: {
							global: undefined
						}
					}))} 
				/> }
			<div className={classes.header}>
				<IconButton 
					size="small" 
					style={{marginRight: 10}} 
					onClick={() => props.history.push("/tiket")}
				>
		            <ArrowBackIcon />
		        </IconButton>
				<Breadcrumbs aria-label="Breadcrumb">
			        <Typography color="textPrimary" className={classes.link}>
			          Tiket
			        </Typography>
			        <Typography color="textPrimary" className={classes.link}>
			          Pengaduan
			        </Typography>
			    </Breadcrumbs>
		    </div>
		    <React.Fragment>
		    	{ !isHidden && <Grid container spacing={4}>
		    		<Grid
			          item
			          lg={6}
			          sm={6}
			          xl={12}
			          xs={12}
			        >
			        	<FormPengaduan 
			        		value={state.pengaduan}
			        		handleChange={onChangePengaduan}
			        		channels={props.channels}
			        		options={state.options.text}
			        		handleChangeAutoComplete={onChangeAutoComplete}
			        		onChangeSelectAutoComplete={handleChangeSelect}
			        		errors={state.errors}
			        		onChangeAlamat={handleChangeAlamat}
			        		cities={tarif.cities.text}
			        	/>
			        </Grid>
			        <Grid
			          item
			          lg={6}
			          sm={6}
			          xl={12}
			          xs={12}
			        >
			        	{ pengaduan.jenis === '5' && 
			        	<TiketForm 
			        		values={state.tiket.data}
			        		handleChange={onChangeTiket}
			        		onSearch={handleSearchResiTiket}
			        		tracks={tiket.tracks}
			        		mappingKodepos={(value) => api.mappingPos(value)}
			        		onChangeSearch={(value) => handleChangeSearchOffice(value)}
			        		optionsOffice={state.listOffice}
			        		onChooseTujuan={handleChooseKprk}
			        		onSubmit={onAddTiket}
			        		errors={state.errors}
			        		isAvailabel={tiket.wasAdded}
			        		tiketDetail={tiket.detail}
			        		onFollowup={(nomor) => props.history.push(`/tiket/${nomor}`)}
			        		onKeppAdd={() => setState(state => ({
			        			...state,
			        			tiket: {
			        				...state.tiket,
			        				wasAdded: false,
			        				detail: {}
			        			}
			        		}))}
			        	/> }
			        	{ pengaduan.jenis === '1' && 
			        	<LacakForm 
			        		value={state.lacak} 
			        		handleChange={onChangeLacakForm}
			        		onSearch={searchBarcode}
			        		errors={state.errors}
			        		goBack={() => setState(state => ({
			        			...state,
			        			lacak: {
			        				...state.lacak,
			        				noresi: '',
			        				type: '1',
			        				list: []
			        			}
			        		}))}
			        		onDone={saveCustomer}
			        	/> }
			        	{ pengaduan.jenis === '2' && 
			        	<CekTarifForm 
			        		data={state.tarif}
			        		handleChangeAutoComplete={onChangeAutoComplete}
			        		onSelectAddress={handleSelectAddress}
			        		onChange={handleChangeFieldTarif}
			        		onSubmit={onSubmitTarif}
			        		errors={state.errors}
			        	/> }

			        	{ pengaduan.jenis === '4' && 
			        		<KantorPos 
			        			validateCustomer={handleValidateKantorPos}	
			        			pelanggan={state.pengaduan}
			        			user={props.user}
			        			setLoading={(bool) => 
			        				setState(state => ({
										...state,
										loading: bool
									})) 
			        			}
			        			setKantor={(offices) => setOffices(offices)}
			        			setError={(global) => setState(state => ({
			        				...state,
			        				errors: {
			        					global
			        				}
			        			}))}

			        		/> } 
			        </Grid>
		    	</Grid> }

		    	{ state.listTarif.length > 0 &&
	    			<TableTarif 
			    		onBack={() => {
			    			setState(state => ({
				    			...state,
				    			listTarif: []
			    			}))
			    			setHidden(false);
			    		}}
			    		data={state.listTarif}
			    		payload={tarif.data}
			    		onDone={saveCustomer}
			    	/> }

				{ offices.length > 0 && 
					<TableOffice 
						data={offices} 
						onBack={() => {
							setHidden(false);
							setTimeout(function() {
								setOffices([]);
							}, 10);
						}}
					/> }
		    </React.Fragment>
		</div>
	);
}

AddNewTiket.propTypes = {
	getChannel: PropTypes.func.isRequired,
	channels: PropTypes.array.isRequired
}

function mapStateToProps(state) {
	return{
		channels: state.laporan.channel,
		user: state.auth.user
	}
}

export default connect(mapStateToProps, { getChannel })(AddNewTiket);