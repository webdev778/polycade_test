import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as machineActions from '../store/machine';
import Machine from '../components/Machine';

/* eslint-disable react/prop-types */
function MachineContainer ({data, MachineActions}) {

	const handleUpdateName = (name) => {
		const { id } = data;
		if (name) {
			MachineActions.updateMachine(id, {name});
		}
	};

	console.log('MachineContainer Render');
	return <Fragment>
		{ data && <Machine data={data} updateHandler={handleUpdateName}/> }
	</Fragment>;
}
/* eslint-enable react/prop-types */

export default connect(
	(state, oweProps) => ({
		data: state.machine.data.find(m => m.id === oweProps.match.params.id)
	}),
	(dispatch) => ({
		MachineActions: bindActionCreators(machineActions, dispatch)
	})
)(MachineContainer);
