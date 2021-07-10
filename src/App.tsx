import React, { useState } from "react";
import styled from "styled-components";

import { Equation } from "./components/Equation/Equation";
import { Timer } from "./components/Timer/Timer";
import { DateDisplay } from "./components/DateDisplay/DateDisplay";

const StyledApp = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
`;

enum State {
	NOT_STARTED,
	RUNNING,
	FINISHED,
}

function App() {
	const urlParams = new URLSearchParams(window.location.search);
	const minutes = parseInt(urlParams?.get("minutes") || "10");
	const [state, setState] = useState(State.NOT_STARTED);

	function onTimeOver() {
		setState(State.FINISHED);
	}

	function start() {
		setState(State.RUNNING);
	}

	return (
		<StyledApp>
			{state === State.NOT_STARTED && (
				<div>
					Ready?
					<button onClick={start}>Start practicing</button>
				</div>
			)}
			{state === State.RUNNING && (
				<>
					<Equation />
					<Timer seconds={minutes * 60} onTimeOver={onTimeOver} />
					<DateDisplay date={new Date()} />
				</>
			)}
			{state === State.FINISHED && <div>Good Job!</div>}
		</StyledApp>
	);
}

export default App;
