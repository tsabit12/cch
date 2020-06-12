import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	FormControl,
	FormLabel,
	FormControlLabel,
	Switch
} from "@material-ui/core";
import BootstrapInput from "../FormPengaduan/BootstrapInput";
import FormChecked from "./FormChecked";

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	container:{
		minHeight: '500px',
    	position: 'relative'
	},
	field:{
		width:'100%'
	},
	labelForm: {
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(1)
	},
	labelWithSwitch: {
		display: 'flex',
		marginBottom: theme.spacing(1),
		alignItems: 'center',
		justifyContent: 'space-between'
	}
}))

const ResponseTnt = props => {
	const [state, setState] = React.useState({
		data: {
			layanan: '',
			officeCode: '',
			officeName: ''
		},
		checked: false
	})

	React.useEffect(() => {
		if (props.data.length > 0) {
			const layananValue = props.data[0].description.split(";")[0].split(":")[1];
			setState(prevState => ({
				...prevState,
				data: {
					...prevState.data,
					layanan: layananValue
				},
				checked: true
			}))
		}
	}, [props.data])

	const onCheckedChange = () => setState(prevState => ({
		...prevState,
		checked: !prevState.checked
	}))

	const classes 	= useStyles();
	const { data, checked } = state;
	// console.log(props.data);
	return(
		<Card className={classes.root}>
			<CardHeader title="HASIL CEK RESI" />
			<Divider />
			<CardContent>
				<div className={classes.container}>
					<FormControl className={classes.field}>
						<div className={classes.labelWithSwitch}>
							<FormLabel component="legend" >
								Jenis Layanan
							</FormLabel>
							<FormControlLabel
						        control={
						          <Switch
						            checked={state.checked}
						            onChange={onCheckedChange}
						            color="primary"
						          />
						        }
						        label="Berdasarkan Nomor Resi"
						        labelPlacement="start"
						    />
						</div>
						<BootstrapInput 
					    	name="layanan"
					    	value={data.layanan}
					    	id="layanan-customized-input" 
					    	disabled={checked}
					    	style={{marginTop: -10}}
					    />
					</FormControl>
					{ checked ? <FormChecked data={props.data} /> : <p>Oyy</p> }
				</div>
			</CardContent>
		</Card>
	);
}

export default ResponseTnt;