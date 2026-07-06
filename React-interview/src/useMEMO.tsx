import { useMemo } from "react";
import { useState } from "react";

function UseMEMO() {
	const [count, setCount] = useState(0);

	const square = useMemo(() => {
		console.log("Calculating...");
		return count * count;
	}, [count]);

	return (
		<>
			<h1>{square}</h1>

			<button onClick={() => setCount((c) => c + 1)}>Increment</button>
		</>
	);
}

export default UseMEMO;
