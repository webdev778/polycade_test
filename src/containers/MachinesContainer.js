import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Machines from '../components/Machines';


/* eslint-disable react/prop-types */
function MachinesContainer ({machines, changeCurrent, history, fetched}) {
	const handleSelect = (id) => {
		// e.stopPropagation();
		history.push(`/machines/${id}`);
	};

	return (
		<Fragment>
			{ fetched && <Machines data={machines} onSelect={handleSelect} /> }
		</Fragment>
	);
}
/* eslint-enable react/prop-types */

export default connect((state) => ({
	machines: state.machine.data,
	fetched: state.machine.fetched
}))(withRouter(MachinesContainer));
