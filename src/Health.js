import React from "react";
import './Health.css';

/* eslint-disable react/prop-types */
export default function Health({value, indicator}) {

    let col;

    if(value > 100) value = 100;

    if( 0 <= value && value < 50) col = "bg50";
    else if( 50 <= value && value < 70) col = "bg70";
    else col = "bg100";

	return (
		<div className={ indicator ? "healthWrapper" : undefined}>
			{indicator && <div className="indicator"> {value} </div> }
			<div className="progressOutter">
				<div
					className={"progressInner " + col}
					style={{ width: value + "%" }}
				></div>
			</div>
		</div>
	);
}
/* eslint-enable react/prop-types */
