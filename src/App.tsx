import React from "react";
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

function App() {
	function onTimeOver() {
		console.log("Time is over");
	}

	return (
		<StyledApp>
			<Equation />
			<Timer seconds={10 * 60} onTimeOver={onTimeOver} />
			<DateDisplay date={new Date()} />
		</StyledApp>
	);
}

export default App;
