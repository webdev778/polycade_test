import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as machineActions from '../store/machine';
import Machine from '../components/Machine';

/* eslint-disable react/prop-types */
class MachineContainer extends React.Component {

    constructor(props) {
        super(props);

        // For refreshing
        if(!props.current) 
            props.MachineActions.setCurrent(this.props.match.params.id);
    }

    handleUpdateName = (name) => {
      const { id } = this.props.data;
      if(name){
        this.props.MachineActions.updateMachine(id, {name});
      }
    }

    render() {
        return <Machine data={this.props.data} updateHandler={this.handleUpdateName}/>
    }
}
/* eslint-enable react/prop-types */

export default connect(
    (state) => ({
        data: state.machine.data.find(m => m.id === state.machine.current),
        current: state.machine.current
    }),
    (dispatch) => ({
        MachineActions: bindActionCreators(machineActions, dispatch),
    })
)(MachineContainer);