import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Machines from '../components/Machines';
import { setCurrent } from '../store/machine';


/* eslint-disable react/prop-types */
function MachinesContainer({machines, changeCurrent, history}) {
	const handleSelect = (id, e) => {
		// e.stopPropagation();
		changeCurrent(id);
		history.push(`/machines/${id}`);
	}

	return (
		<Machines data={machines} onSelect={handleSelect}/>
	);
}
/* eslint-enable react/prop-types */

export default connect((state) => ({
	machines: state.machine.data
}), (dispatch) => ({
	changeCurrent: bindActionCreators(setCurrent, dispatch)
}))(withRouter(MachinesContainer));
