import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import api from '../../../../api';

import {
	ListOffice
} from './components';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: '#FFF'
  }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getLabel = (type) => {
	switch(type){
		case 1:
			return 'KELOLA KANTOR TAMBAH/IMPORT XRAY';
		default:
			return '';
	}
}

const ModalDetail = props => {
	const { visible, type } = props.param;
	const classes = useStyles();
 
	return (
	    <div>
	      <Dialog fullScreen open={visible} TransitionComponent={Transition}>
	        <AppBar className={classes.appBar}>
	          <Toolbar>
	            <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
	              <CloseIcon />
	            </IconButton>
	            <Typography variant="h6" className={classes.title}>
	              { getLabel(type) }
	            </Typography>
	            <div className={classes.flexGrow} />
	          </Toolbar>
	        </AppBar>
	        { type === 1 && <ListOffice 
	        	getOffice={() => api.getListOffice()}
	        	onUpdate={(payload) => api.xray.addNewOffice(payload)}
	        /> }
	      </Dialog>
	    </div>
	);
}

ModalDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
  param: PropTypes.object.isRequired
}

export default ModalDetail;