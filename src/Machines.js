import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Machines.css';
import { 
    fetchMachineListPending, 
    fetchMachineListFailure, 
    fetchMachineListSuccess
} from './store/machine';

const mapStateToProps = (state) => {
	return {
		machines: state.data,
		loading: state.loading
	}
}

const mapActionsToProps = function (dispatch) {
    return { 
      fetchPending: () => dispatch(fetchMachineListPending()),
      fetchFailure: (err) => dispatch(fetchMachineListFailure(err)),
      fetchSuccess: (resp) => dispatch(fetchMachineListSuccess(resp))
    }
  }

/* eslint-disable react/prop-types */
class Machines extends React.Component {

    async UNSAFE_componentWillMount() {       
        this.props.fetchPending();
        try{
			const { data: result }  = await axios.get('http://localhost:8080/machines');   
			/*			
			await new Promise(resolve  => {
				setTimeout(()=>{
					resolve();
				}, 3000);
			});
			*/
            // Dispatch action to update redux store
            this.props.fetchSuccess(result);
        }catch( err ){
            this.props.fetchFailure( err );
        }
	}
		
	render() {		
		
		return <div>
				{ this.props.loading && <h1>Loading...</h1>}
				<table className="TFtable">
					<thead>
						<tr><th>Name</th><th>IP Address</th><th>Health</th></tr>
					</thead>
					<tbody>
						{ this.props.machines.map((m) => <tr key={m.id}><td><Link to={`/machines/${m.id}`}>{m.name}</Link></td><td>{m.ip_address}</td><td><div className="progress"><div style={{width:m.health+'%'}}></div></div></td></tr>) }
					</tbody>
				</table>
			</div>
	}
}

/* eslint-enable react/prop-types */
export default connect(mapStateToProps, mapActionsToProps)(Machines);