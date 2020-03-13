import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { updateMachineInfo } from './store/machine';

import './Machine.css';

const mapStateToProps = function (state) {
    return { machines: state.data }
}

const mapActionsToProps = function (dispatch) {
  return { 
    updateName: (id, name) => dispatch(updateMachineInfo(id, {name}))
  }
}

/* eslint-disable react/prop-types */
class Machine extends React.Component {

    nameInput = React.createRef();
    state = {
      id: null,
      name: null,
      ip_address: null,
      health: null
    }

    handleUpdateName = async () => {
      const newName = this.nameInput.current.value;
      const { id } = this.props.match.params;
      if(newName){
        const result = await axios.put(`http://localhost:8080/machines/${id}`, { name: newName });
        this.props.updateName(id, newName);
      }
    }

    getMachineInfo = () => {
      const { id } = this.props.match.params;        
      return this.props.machines.find(m => m.id === id);
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
            <label>Name: </label>
            <input type="text" ref={this.nameInput} />
            <button type="submit" onClick={this.handleUpdateName}> submit </button>
          </div>
          <div className="pannel">
            <div className="healthWrapper">
              <h1> { health } </h1>
              <div className="progressOutter">
                <div className="progressInner" style={{width: health+'%'}}></div>
              </div>
            </div>
          </div>
          <div className="pannel">
            <h3> Status </h3>
            <label>IP Addresss: </label> <span> {ip} </span>
          </div>
        </div>;
    }
}
/* eslint-enable react/prop-types */

export default connect(mapStateToProps, mapActionsToProps)(Machine);