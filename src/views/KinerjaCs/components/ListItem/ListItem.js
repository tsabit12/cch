import React from 'react';
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	TableContainer
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const ListItem = props => {
	const { data } = props;
	var no = 1;

	return(
		<TableContainer style={{maxHeight: 500}}>
			<Table stickyHeader aria-label="sticky table" size='small'>
				<TableHead>
					<TableRow>
						<TableCell>NO</TableCell>
						<TableCell>KANTOR</TableCell>
						<TableCell>CUSTOMER SERVICE</TableCell>
						<TableCell align='right'>SELESAI</TableCell>
						<TableCell align='right'>TERBUKA</TableCell>
						<TableCell align='right'>TOTAL</TableCell>
						<TableCell align='center'>DETAIL</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ data.length > 0 ? data.map((row, index) => <TableRow key={index}>
						<TableCell>{no++}</TableCell>
						<TableCell>{row.kantor_pos}</TableCell>
						<TableCell>{row.title.toUpperCase()}</TableCell>
						<TableCell align='right'>{row.jmlselesai}</TableCell>
						<TableCell align='right'>{row.jmlterbuka}</TableCell>
						<TableCell align='right'>{row.jmlall}</TableCell>
						<TableCell align='center'>
							<IconButton 
	          					color="default" 
	          					aria-label="View detail"
	          					size="small"
	          					//onClick={() => props.onEdit(row.customerId)}
	          				>
						        <ArrowForwardIcon size='small' />
						    </IconButton>
						</TableCell>
					</TableRow>) : <TableRow>
						<TableCell colSpan={7} align='center'>Data kosong</TableCell>
					</TableRow>}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

ListItem.propTypes = {
	data: PropTypes.array.isRequired
}

export default ListItem;