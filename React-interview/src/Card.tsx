import React from "react";

function Card({ name, role }: { name: string; role: string }) {
	return (
		<div className='card'>
			<h2>{name}</h2>
			<p>{role}</p>
		</div>
	);
}

export default Card;
