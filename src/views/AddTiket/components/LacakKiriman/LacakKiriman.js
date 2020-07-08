import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardHeader,
	CardActions,
	Divider,
	Button
} from "@material-ui/core";
import {
	FacebookCircularProgress,
	TimelineLacak
} from "./components";
import api from "../../../../api";


const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	loader: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 380
	},
	content: {
		height: 440,
		overflowY: 'auto',
		marginTop: 5,
		marginBottom: 5
	},
	action: {
		justifyContent: 'flex-end'
	}
}))

const LacakKiriman = props => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		loading: true,
		data: []
	})

	React.useEffect(() => {
		if (props.noresi !== '') {
			api.trackAndTrace(props.noresi)
				.then(res => {
					setState(prevState => ({
						...prevState,
						loading: false,
						data: res
					}))
				})
				.catch(err => {
					setState(prevState => ({
						...prevState,
						loading: false
					}))
				});
		}
	}, [props.noresi]);

	return(
		<Card className={classes.root}>
			<CardHeader 
				title={`LACAK KIRIMAN ${props.noresi}`} 
			/>
			<Divider />
			{ state.loading ? <div className={classes.loader}>
				<FacebookCircularProgress />
			</div> : <div className={classes.content}>
				{ state.data.length > 0 ? 
					<TimelineLacak data={state.data}/> : <p style={{margin: 10}}>
						Data not found
					</p> }
			</div> }
			<Divider />

			<CardActions className={classes.action}>
				<Button onClick={() => props.reset()} variant='contained' color='secondary'>RESET</Button>
			</CardActions>
		</Card>
	);
}

LacakKiriman.propTypes = {
	noresi: PropTypes.string.isRequired
}

export default LacakKiriman;