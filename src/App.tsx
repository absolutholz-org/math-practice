import React from "react";

import "./App.css";

import { Equation } from "./components/Equation/Equation";
import { Timer } from "./components/Timer/Timer";

function App() {
	function onTimeOver() {
		console.log("Time is over");
	}

	return (
		<div className="App">
			<Equation />
			<Timer seconds={2 * 60} onTimeOver={onTimeOver} />
		</div>
	);
}

export default App;
