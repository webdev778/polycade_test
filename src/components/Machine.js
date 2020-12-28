import React from 'react';
import './Machine.css';
import Health from './Health';

/* eslint-disable react/prop-types */
export default function Machine ({data, updateHandler}) {

	const nameInput = React.createRef();
	const { name, health, ip_address: ip } = (data || {});

	return <div className="pannel-container">
		<h2>{ name }</h2>
		<div className="pannel">
			<h3> Update Device </h3>
			<div className="field">
				<label>Name: </label>
				<input type="text" ref={nameInput} />
				<button type="submit" onClick={() => updateHandler(nameInput.current.value)}> submit </button>
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
/* eslint-enable react/prop-types */
