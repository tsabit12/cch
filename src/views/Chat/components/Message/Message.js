import React from "react";
import {
	Card,
	CardHeader,
	Divider,
	Typography,
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	InputBase,
	IconButton,
	Paper,
	Chip,
	CardContent,
	CardMedia,
	Dialog,
	DialogTitle,
	Select,
	MenuItem,
	InputLabel,
	FormControl
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Loader from "../Loader";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CancelIcon from '@material-ui/icons/Cancel';

import GetAppIcon from '@material-ui/icons/GetApp';

import api from "../../../../api";

const DetailProfile = props => {
	const { user } = props;
	return(
		<Dialog 
			onClose={props.handleClose} 
			aria-labelledby="simple-dialog-title" 
			open={Object.keys(props.user).length > 0 ? true : false }
		>
	      <DialogTitle id="simple-dialog-title">{user.title}</DialogTitle>
	      <List>
	        <ListItem disabled>
	          <ListItemText 
	          	primary={`Kantor : ${user.regional} (${user.fullname})`}
	          />
	        </ListItem>
	        <ListItem disabled>
	          <ListItemText 
	          	primary={`Jabatan : ${user.jabatan}`}
	          />
	        </ListItem>
	        <ListItem disabled>
	          <ListItemText 
	          	primary={`Nippos : ${user.username}`}
	          />
	        </ListItem>
	      </List>
	    </Dialog>
	);
} 

const useStyles = makeStyles(theme => ({
	root: {
		// height: '100%'
	},
	header: {
		backgroundColor: '#f3f1ee'
	},
	inline: {
		display: 'inline',
	},
	list: {
		width: '100%',
		backgroundColor: theme.palette.background.paper
	},
	text: {
		whiteSpace: 'pre-line'
	},
	content: {
		height: 380,
		overflowY: 'auto'
	},
	contentForm: {
		padding: 10
	},
	button: {
		marginTop: 5
	},
	form: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%'
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	rightText: {
		display: 'flex',
	    justifyContent: 'flex-end',
	    paddingRight: 26,
	    textAlign: 'right',
	    whiteSpace: 'pre-line'
	},
	loader: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '90%'
	},
	file: {
		marginLeft: 10,
		marginTop: 6
	},
	right: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	rowTrack: {
		marginBottom: 5,
		borderBottom: '1.3px dotted',
		marginTop: 10
	},
	typography: {
		marginBottom: 5
	},
}))

const useStylesImage = makeStyles(theme => ({
	root: {
		display: 'flex',
		margin: '5px',
		width: '296px'
	},
	details: {
		display: 'flex',
		flexDirection: 'column'
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 151,
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	playIcon: {
		height: 38,
		width: 38,
	}
}))

const RenderImage = (props) => {
	const classes = useStylesImage();
	const types  = props.file.split(".")[1].toLowerCase();
	let image = '';
	if (types === 'png' || types === 'jpg' || types === 'jpeg') {
		image = `${process.env.REACT_APP_IMAGE}/${props.file}`;
	}else{
		image = `${process.env.REACT_APP_PUBLIC_URL}/images/file.png`;
	}

	const handleClick = () => {
		window.open(`${process.env.REACT_APP_IMAGE}/${props.file}`, "_blank")
	}
	
	return(
		<Card className={classes.root}>
	      <div className={classes.details}>
	        <CardContent className={classes.content}>
	          <Typography component="h5" variant="h5">
	            {props.text}
	          </Typography>
	           <Typography variant="body2" color="textSecondary">{props.date} ({props.status})</Typography>
	        </CardContent>
	        <div className={classes.controls}>
	          <IconButton aria-label="play/pause" onClick={handleClick}>
	            <GetAppIcon 
	            	className={classes.playIcon} 
	            />
	          </IconButton>
	        </div>
	      </div>
	      <CardMedia
	        className={classes.cover}
	        image={image}
	      />
	    </Card>
	);
} 

const Text = props => {
	const classes = useStyles();
	return(
		<React.Fragment>
			{ props.file === null ? <React.Fragment>
				<div className={ props.align === "right" ? classes.rightText : classes.text}>
		          <Typography
		            component="span"
		            variant="body2"
		            className={classes.inline}
		            color="inherit"
		          >
		            {`${props.msg.split("&").join("\n")}`}
		          </Typography>
		        </div>  
		        
		        <div className={ props.align === "right" ? classes.rightText : classes.text}>
		        	<Typography
			            component="span"
			            variant="body2"
			            className={classes.inline}
			            color="initial"
			            style={{
			            	fontSize: '10px'
			            }}
			        >
		            	{props.date} ({props.status})
		          </Typography>
		        </div>
	        </React.Fragment> : 
	        	<div className={props.align === "right" ? classes.rightText : ''}>
		        	<RenderImage 
		        		file={props.file}
		        		date={props.date}
		        		text={props.msg}
		        		status={props.status}
		        	/>
				</div> }

			{ props.lacak && JSON.parse(props.lacak).map((row, index) => (
				<div className={classes.rowTrack} key={index}>
					<Typography variant='body2' className={classes.typography}>
						DESCRIPTION ({row.description})
					</Typography>

					<Typography variant='body2' className={classes.typography}>
						EVENT NAME : {row.eventName} ({row.eventDate})
					</Typography>

					<Typography variant='body2' className={classes.typography}>
						 OFFICE : {row.officeCode} - {row.officeName}
					</Typography>
				</div>
			))}
        </React.Fragment>
	);
}

const Message = props => {
	const classes = useStyles();
	const { data } = props;
	const inputFileRef = React.useRef();

	const [state, setState] = React.useState({
		text: '',
		loading: false,
		mount: false,
		fileName: '',
		placeholder: 'Masukkan text',
		photoProfileValue: '',
		profile: {}
	})

	const [statusValue, setStatusValue] = React.useState('12');

	React.useEffect(() => {
		if (data.length > 0 && state.photoProfileValue === '') {
			const userProfile = data.find(row => row.username === props.dataUser.email);
			if (userProfile) {
				setState(prevState => ({
					...prevState,
					photoProfileValue: userProfile.photoProfile
				}))
			}
		}
	}, [data, state.photoProfileValue, props.dataUser]);

	const handleChange = (e) => {
		const { value } = e.target;
		setState(prevState => ({
			...prevState,
			text: value
		}))
	}

	React.useEffect(() => {
		setTimeout(() => {
			setState(prevState => ({
				...prevState,
				mount: true
			}))
		}, 300);
	}, []);

	//refresh after 3 second
	React.useEffect(() => {
		//props status is mean tiket was done
		if (state.mount && !props.shouldFetch && !props.status && Object.keys(state.profile).length === 0) {
			const timeoutID = setTimeout(() => {
				//handle infinte loop
		        setState(prevState => ({
		        	...prevState,
		        	loading: !prevState.loading
		        }));
		        props.getNewResponse(props.notiket);
			}, 3000);

			return () => clearTimeout(timeoutID);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.shouldFetch, state.loading, state.mount, props.notiket, props.status, state.profile])

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (state.text) {
			if (state.fileName) { //upload
				const { files } = inputFileRef.current;
				await props.onUpload(files[0], state.text, state.photoProfileValue, statusValue);
				setState(prevState => ({
					...prevState,
					text: '',
					fileName: '',
					placeholder: 'Masukkan text'
				}))
				inputFileRef.current.value = null;
				setStatusValue('12');
			}else{
				await props.onSendMessage(state.text, state.photoProfileValue, statusValue);
				setState(prevState => ({
					...prevState,
					text: ''
				}));
				setStatusValue('12');
			}	
		}else{
			alert("Text harap diisi");
		}
	}

	const handleChooseFile = () => {
		inputFileRef.current.value = null;
		inputFileRef.current.click();

		setTimeout(function() {
			setState(prevState => ({
				...prevState,
				fileName: '',
				placeholder: 'Masukkan text'
			}))
		}, 10);
	}


	const handleChangeFile = () => {
		const { files } = inputFileRef.current;
		setState(prevState => ({
			...prevState,
			fileName: files[0].name,
			placeholder: 'Masukkan keterangan gambar'
		}))
	}

	const handleDeleteFile = () => {
		inputFileRef.current.value = null;
		setState(prevState => ({
			...prevState,
			fileName: '',
			placeholder: 'Masukkan text'
		}))
	}

	const showDetailUser = (username) => {
		api.getProfile(username)
			.then(user => setState(prevState => ({
				...prevState,
				profile: user
			})))
			.catch(err => alert("Terdapat kesalahan saat memuat profile pengguna"))
	}

	return(
		<Card className={classes.root}>
			<DetailProfile 
				user={state.profile}
				handleClose={() => setState(prevState => ({
					...prevState,
					profile: {}
				}))}
			/>
			<CardHeader 
				className={classes.header}
				title={`RESPONSE TIKET (${props.notiket})`}
			/>
			{state.fileName && <div className={classes.file}>
				<Chip
			        icon={<PhotoCameraIcon />}
			        label={`File Name : ${state.fileName}`}
			        color="secondary"
			        onDelete={handleDeleteFile}
			        deleteIcon={<CancelIcon />}
			    />
			</div>}

			{ state.mount ? <React.Fragment>
				<div className={classes.contentForm}>
					<Paper 
						className={classes.form} 
						elevation={1}
						component='form'
						onSubmit={handleSubmit}
					>
						<InputBase 
							placeholder={state.placeholder}
							label='Add Message'
							className={classes.input}
							autoComplete='off'
							rows={5}
							variant="outlined"
							value={state.text}
							onChange={handleChange}
							disabled={props.status}
						/>
						<FormControl 
							variant="outlined" 
							size="small" 
							style={{width: 150, marginTop: 10, marginBottom: 5}}
						>
							<InputLabel id="labelKprk">Status</InputLabel>
							<Select
					          labelId="labelKprk"
					          id="kprk"
					          name="kprk"
					          value={statusValue}
					          onChange={(e) => setStatusValue(e.target.value)}
					          label="Status"
					          //disabled={props.user.utype === 'Kprk' ? true : false }
					        >
					        	<MenuItem value="12">Investigasi</MenuItem>
					        	<MenuItem value="17">Konfirmasi</MenuItem>
					        	<MenuItem value="18">Request Tutup</MenuItem>
					        </Select>
						</FormControl>
						<input 
							ref={inputFileRef}
							type='file' 
							hidden
							onChange={handleChangeFile}
						/>
						<IconButton 
							className={classes.iconButton} 
							aria-label="search"
							onClick={handleChooseFile}
							disabled={props.status}
						>
							<AttachFileIcon />
						</IconButton>
						<IconButton 
							type='submit' 
							disabled={props.status}
							className={classes.iconButton} 
							aria-label="search"
						>
							<SendIcon />
						</IconButton>
					</Paper>
				</div>
				<Divider />
				
				<div className={classes.content}>
					<List className={classes.list}>
						{data.map((row, index) => (
							<React.Fragment key={index}>
								{ row.username !== props.dataUser.email ? 
									<ListItem alignItems="center" >
									 	<ListItemAvatar>
								          	<Avatar 
								          		alt="Remy Sharp" 
								          		src={row.photoProfile === null ? `${process.env.REACT_APP_PUBLIC_URL}/images/` : `${process.env.REACT_APP_IMAGE}/profile/${row.photoProfile}`} 
								          		style={{cursor: 'pointer'}}
								          		onClick={() => showDetailUser(row.username)}
								          	/>
								        </ListItemAvatar>
								    	<ListItemText
									      primary={<React.Fragment>
		          							<Typography
									            component="span"
									            variant="body2"
									            className={classes.inline}
									            color="secondary"
									          >
									            {row.username} ({row.kantor_pos})
									        </Typography>
									      </React.Fragment>}
									      secondary={<Text 
									      	date={row.date} 
									      	msg={row.response}
									      	file={row.file_name}
									      	lacak={row.lacak_value}
									      	status={row.status_tiket}
									      />}
									      disableTypography={true}
								    	/>
								    </ListItem> :  <ListItem alignItems="center" >
								    	<ListItemText
									      primary={<React.Fragment>
		          							<Typography
									            component="span"
									            variant="body2"
									            className={classes.rightText}
									            color="secondary"
									          >
									            {row.username} ({row.kantor_pos})
									        </Typography>
									      </React.Fragment>}
									      secondary={ <Text 
									      	date={row.date} 
									      	msg={row.response}
									      	file={row.file_name}
									      	align="right"
									      	lacak={row.lacak_value}
									      	status={row.status_tiket}
									      /> }
									      disableTypography={true}
								    	/>
								    	<ListItemAvatar>
								          	<Avatar 
								          		alt="Remy Sharp" 
								          		src={row.photoProfile === null ? `${process.env.REACT_APP_PUBLIC_URL}/images/` : `${process.env.REACT_APP_IMAGE}/profile/${row.photoProfile}`} 
								          	/>
								        </ListItemAvatar>
								    </ListItem> }

							    <Divider variant="fullWidth" component="li" />
							</React.Fragment>
						))}
					</List>
				</div>
			</React.Fragment> : <div className={classes.loader}><Loader /></div>}
		</Card>
	);
}

Message.propTypes = {
	data: PropTypes.array.isRequired,
	dataUser: PropTypes.object.isRequired,
	onSendMessage: PropTypes.func.isRequired,
	notiket: PropTypes.string.isRequired,
	getNewResponse: PropTypes.func.isRequired,
	shouldFetch: PropTypes.bool.isRequired
}

export default Message;