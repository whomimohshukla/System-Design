import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Card from "./Card";
import UseEfffect from "./UseEfffect";
import UseRefff from "./UseRefff";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Card name='John' role='Software Engineer' />
			<Card name='Jane' role='Software Engineer' />
			<Card name='Bob' role='Software Engineer' />
			<Card name='Alice' role='Software Engineer' />

			<UseEfffect></UseEfffect>
      <UseRefff></UseRefff>
		</>
	);
}

export default App;
