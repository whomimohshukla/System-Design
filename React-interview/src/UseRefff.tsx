import React from "react";

import { useState, useRef } from "react";

function UseRefff() {
	const [count, setCount] = useState(0);

	const countRef = useRef(0);

	function increment() {
		countRef.current++;
		console.log(countRef.current);
	}
	return (
		<div>
			<button onClick={increment}>Increment</button>
		</div>
	);
}

export default UseRefff;
