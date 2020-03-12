import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateMachine } from './store/machine';
import './Machine.css';
import Health from './Health';

const mapStateToProps = function (state) {
    return { machines: state.machine.data }
}

const mapActionsToProps = function (dispatch) {
  return { 
    updateName: (id, name) => dispatch(updateMachine(id, {name}))
  }
}

/* eslint-disable react/prop-types */
class Machine extends React.Component {

    nameInput = React.createRef();
    state = {
      id: this.props.match.params.id
    }

    handleUpdateName = async () => {
      const newName = this.nameInput.current.value;
      const { id } = this.state;
      if(newName){
        this.props.updateName(id, newName);
      }
    }

    getMachineInfo = () => {
      const { id } = this.state;       
      return this.props.machines.find(m => m.id === id);
    }

    shouldComponentUpdate(nextProps, nextState){
      const { id } = this.state;
      
      const m = this.getMachineInfo();
      const m1 = nextProps.machines.find(m => m.id === id)

      return m.health !== m1.health
    } 

    render() {
        console.log('Machine -- Render Start');  
        const m = this.getMachineInfo();
        if(!m) return <div>Machine Data Loading...</div>;

        const { name, health, ip_address: ip } = m;
        
        return <div className="pannel-container">
          <h2>{ name }</h2>
          <div className="pannel">
            <h3> Update Device </h3>
            <div className="field">
              <label>Name: </label>
              <input type="text" ref={this.nameInput} />
              <button type="submit" onClick={this.handleUpdateName}> submit </button>
            </div>
          </div>
          <div className="pannel">
            <Health value={health} indicator="true" />
            <div className="pannel">
            <h3> Status </h3>
            <label>IP Addresss: </label> <span> {ip} </span>
          </div>            
          </div>
        </div>;
    }
}
/* eslint-enable react/prop-types */

export default connect(mapStateToProps, mapActionsToProps)(Machine);