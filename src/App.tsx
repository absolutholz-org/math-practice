import React, { useState } from "react";
import styled from "styled-components";

import { Equation } from "./components/Equation/Equation";
import { Timer } from "./components/Timer/Timer";
import { DateDisplay } from "./components/DateDisplay/DateDisplay";
import { Button } from "./components/Button/Button";

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

	function reset() {
		setState(State.NOT_STARTED);
	}

	return (
		<StyledApp>
			{state === State.NOT_STARTED && (
				<>
					<h1>Ready to practice your math skills?</h1>
					<div>
						<Button onClick={start}>Start</Button>
					</div>
				</>
			)}
			{state === State.RUNNING && (
				<>
					<Equation />
					<Timer seconds={minutes * 60} onTimeOver={onTimeOver} />
					<DateDisplay date={new Date()} />
				</>
			)}
			{state === State.FINISHED && (
				<>
					<h1>Good Job!</h1>
					<div>
						<Button onClick={reset}>Practice some more</Button>
					</div>
				</>
			)}
		</StyledApp>
	);
}

export default App;
