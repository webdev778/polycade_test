import React from 'react';
import './Machines.css';
import Health from './Health';

/* eslint-disable react/prop-types */
export default function Machines ({data, onSelect}) {
	// console.log('Machines Render');
	const items = data.map(m => (
		<tr key={m.id} onClick={(e) => onSelect(m.id)}>
			<td>{m.name}</td>
			<td>{m.ip_address}</td>
			<td><Health value={m.health} indicator={false} /></td>
		</tr>
	));

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
					{
						items
					}
				</tbody>
			</table>
		</div>
	);
}

/* eslint-enable react/prop-types */
