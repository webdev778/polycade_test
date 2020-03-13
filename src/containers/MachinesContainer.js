import React, { Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Machines from '../components/Machines';
import { setCurrent } from '../store/machine';


/* eslint-disable react/prop-types */
function MachinesContainer({machines, changeCurrent, history, fetched}) {
	const handleSelect = (id) => {
		// e.stopPropagation();
		history.push(`/machines/${id}`);
	}

	// console.log('MachinesContainer Render');
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
