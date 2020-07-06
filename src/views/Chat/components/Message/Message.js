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
	Chip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Loader from "../Loader";

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
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
	}
}))

const Text = props => {
	const classes = useStyles();
	return(
		<React.Fragment>
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
	            	{props.date}
	          </Typography>
	        </div>
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
		mount: false
	})

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
		if (state.mount && !props.shouldFetch) {
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
	}, [props.shouldFetch, state.loading, state.mount, props.notiket])

	const handleSubmit = async (e) => {
		e.preventDefault();
		await props.onSendMessage(state.text);
		setState(prevState => ({
			...prevState,
			text: ''
		}))
	}

	const handleChooseFile = () => {
		inputFileRef.current.click();
	}

	// if (state.mount) {
	// 	if (!inputFileRef.current.files) {
	// 		console.log("koeosnh");	
	// 	}else{
	// 		console.log(inputFileRef.current.files);
	// 	}
	// }

	return(
		<Card className={classes.root}>
			<CardHeader 
				className={classes.header}
				title='RESPONSE'
				action={<Chip
				        	icon={<InfoOutlinedIcon />}
				        	label={`Status tiket ${data[0].status}`}
				        	// onClick={handleClick}
				        	// onDelete={handleDelete}
				        	variant="outlined"
				        	color="primary"
				    	/> }
			/>
			{ state.mount ? <React.Fragment>
				<div className={classes.contentForm}>
					<Paper 
						className={classes.form} 
						elevation={1}
						component='form'
						onSubmit={handleSubmit}
					>
						<InputBase 
							placeholder='Masukkan text'
							label='Add Message'
							className={classes.input}
							autoComplete='off'
							rows={5}
							variant="outlined"
							value={state.text}
							onChange={handleChange}
						/>
						<input 
							ref={inputFileRef}
							type='file' 
							hidden
						/>
						<IconButton 
							className={classes.iconButton} 
							aria-label="search"
							onClick={handleChooseFile}
						>
							<AttachFileIcon />
						</IconButton>
						<IconButton type='submit' className={classes.iconButton} aria-label="search">
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
								          	<Avatar alt="Remy Sharp" src={`${process.env.REACT_APP_PUBLIC_URL}/images/avatars/avatar_7.png`} />
								        </ListItemAvatar>
								    	<ListItemText
									      primary={<React.Fragment>
		          							<Typography
									            component="span"
									            variant="body2"
									            className={classes.inline}
									            color="secondary"
									          >
									            {row.username}
									        </Typography>
									      </React.Fragment>}
									      secondary={<Text 
									      	date={row.date} 
									      	msg={row.response}
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
									            {row.username}
									        </Typography>
									      </React.Fragment>}
									      secondary={ <Text 
									      	date={row.date} 
									      	msg={row.response}
									      	align="right"
									      /> }
									      disableTypography={true}
								    	/>
								    	<ListItemAvatar>
								          	<Avatar alt="Remy Sharp" src={`${process.env.REACT_APP_PUBLIC_URL}/images/avatars/avatar_6.png`} />
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