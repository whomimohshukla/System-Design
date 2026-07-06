import React from "react";

import { useState, useEffect } from "react";

function UseEfffect() {
	// const [count, setCount] = useState(0);

	// useEffect(() => {
	// 	console.log("Effect");
	// }, [count]);

	// return <button onClick={() => setCount(count + 1)}>{count}</button>;

	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((res) => res.json())

			.then(setUsers);
	}, []);

	return (
		<ul>
			{users.map((user: any) => (
				<li key={user.id}>{user.name}</li>
			))}
		</ul>
	);
}

export default UseEfffect;
