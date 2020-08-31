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
	TableTarif
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
			email: ''
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
		errors: {},
		loading: false,
		listTarif: []
	})

	const { pengaduan, lacak, errors, tarif } = state;

	useEffect(() => {
		props.getChannel();
		//eslint-disable-next-line
	}, []); 

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

		setState(state => ({
			...state,
			pengaduan: {
				...state.pengaduan,
				[name]: value
			},
			errors: {
				...state.errors,
				[name]: undefined
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
					nama: findedOptions.name_requester
				},
				errors: {
					...state.errors,
					phone: undefined,
					alamat: undefined,
					nama: undefined
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
							list: tracks
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
		}

		if (!pengaduan.nama) errors.nama = 'Nama pelanggan tidak boleh kosong';
		if (!pengaduan.alamat) errors.alamat = 'Alamat harap diisi';

		if (pengaduan.channel === '0'){
			errors.channel = 'Channel belum dipilih';	
		}else{
			if (!pengaduan.phone && pengaduan.channel !== '1') errors.phone = 'Nomor telepon tidak boleh kosong';
			if (!pengaduan.channelName) errors.channelName = 'Tidak boleh kosong';
		}
		return errors;
	}

	const saveCustomer = () => {
		setState(state => ({
			...state,
			loading: true
		}))
		const payload = {
			requestName: pengaduan.nama,
			alamat: pengaduan.alamat,
			nohp: pengaduan.phone,
			email: pengaduan.email,
			sosmed: pengaduan.channel === '7' || pengaduan.channel === '8' ? '' : pengaduan.channelName,
			user: props.user.username,
			nik: pengaduan.channel === '7' || pengaduan.channel === '8' ? pengaduan.channelName : '',
			nopend: props.user.kantor_pos,
			jenisChannel: pengaduan.channel
		}

		api.cch.addPelanggan(payload)
			.then(res => {
				console.log(res);
				resetAllState()
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

	const resetAllState = () => {
		setState(state => ({
			pengaduan: {
				jenis: '0',
				channel: '0',
				channelName: '',
				nama:'',
				phone: '',
				alamat: '',
				email: ''
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
			errors: {},
			loading: false,
			listTarif: []
		}))
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
		    	{ state.listTarif.length === 0 ? <Grid container spacing={4}>
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
			        	/>
			        </Grid>
			        <Grid
			          item
			          lg={6}
			          sm={6}
			          xl={12}
			          xs={12}
			        >
			        	{ pengaduan.jenis === '5' && <TiketForm /> }
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
			        </Grid>
		    	</Grid> : <TableTarif 
		    		onBack={() => setState(state => ({
		    			...state,
		    			listTarif: []
		    		}))}
		    		data={state.listTarif}
		    		payload={tarif.data}
		    		onDone={saveCustomer}
		    	/>}
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