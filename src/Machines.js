import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Machines.css";
import Health from "./Health";

const mapStateToProps = state => {
	return {
		machines: state.machine
	};
};

/* eslint-disable react/prop-types */
function Machines({machines}) {
	return (
		<div>
			<table className="TFtable">
				<thead>
					<tr>
						<th>Name</th>
						<th>IP Address</th>
						<th>Health</th>
					</tr>
				</thead>
				<tbody>
					{machines.map(m => (
						<tr key={m.id}>
							<td>
								<Link to={`/machines/${m.id}`}>{m.name}</Link>
							</td>
							<td>{m.ip_address}</td>
							<td>
								{/* <div className="progress">
									<div
										style={{ width: m.health + "%" }}
									></div>
								</div> */}
								<Health value={m.health} indicator={false} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

/* eslint-enable react/prop-types */
export default connect(mapStateToProps)(Machines);
