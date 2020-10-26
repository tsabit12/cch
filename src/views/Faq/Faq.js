import React, { useState, useEffect } from 'react';
import { makeStyles }  from '@material-ui/styles';
import {
	Typography,
	AccordionSummary,
	AccordionDetails,
	Accordion,
	Grid
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getData, addData } from '../../actions/faq';
import MuiAlert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Loader from '../Loader';

import { ModalAdd } from './components';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2)
	},
	heading: {
	    fontSize: theme.typography.pxToRem(15),
	    flexBasis: '33.33%',
	    flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	content: {
		marginTop: theme.spacing(2)
	},
	fab: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		margin: theme.spacing(3)
	}
}))

function Alert(props) {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
}

const Faq = props => {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);
	const [errors, setErrors] = useState({});
	const [visible, setVisible] = useState(false);
	const [loading, setLoading ] = useState(false);

	useEffect(() => {
		props.getData()
			.catch(err => setErrors({fetch: 'Terdapat kesalahan, silahkan cobalagi'}));
		//eslint-disable-next-line
	}, [])

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const handleSubmit = (value) => {
		const payload = {
			...value,
			email: props.user.email
		}
		props.addData(payload)
			.then(() => setLoading(false))
			.catch(() => {
				setLoading(false);
				setErrors({fetch: 'Tambah FAQ gagal, silahkan cobalagi'});
			})
	}

	return(
		<div className={classes.root}>
			<Loader loading={loading} />
			<ModalAdd 
				open={visible}
				handleClose={() => setVisible(false)}
				setLoading={(bool) => setLoading(bool)}
				onAdd={handleSubmit}
			/>
			{ errors.fetch && <Alert severity="error">{errors.fetch}</Alert>}
			<Grid
			  container
			  direction="row"
			  justify="center"
			  alignItems="center"
			>
				<Grid item lg={8} sm={12} xl={12} xs={12}>
					{ props.list.map((row, index) => <Accordion expanded={expanded === row.id} onChange={handleChange(row.id)} key={index}>
						<AccordionSummary
						  expandIcon={<ExpandMoreIcon />}
						  aria-controls="panel3bh-content"
						  id="panel3bh-header"
						>
							<Typography className={classes.heading}>{row.title}</Typography>
							  <Typography className={classes.secondaryHeading}>
							    {row.question}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
						  <Typography>
						    {row.answer}
						  </Typography>
						</AccordionDetails>
					</Accordion>)}
				</Grid>
			</Grid>
			{ props.user.jabatan === 'Administrator' && <Fab
	          variant="extended"
	          size="medium"
	          color="primary"
	          aria-label="add"
	          className={classes.fab}
	          onClick={() => setVisible(true)}
	        >
	          <AddIcon />
	          TAMBAH
	        </Fab> }
		</div>
	);
}

Faq.propTypes = {
	list: PropTypes.array.isRequired,
	getData: PropTypes.func.isRequired,
	addData: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return{
		list: state.faq,
		user: state.auth.user
	}
}

export default connect(mapStateToProps, { getData, addData })(Faq);