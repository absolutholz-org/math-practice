import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useTimer } from "use-timer"; // https://openbase.com/js/use-timer
import { ReactComponent as SvgTimer } from "@mdi/svg/svg/timer-outline.svg";

interface ITimerProps {
	seconds: number;
	onTimeOver: () => void;
}

const StyledTimer = styled.div`
	align-items: center;
	display: inline-flex;
	flex-wrap: wrap;
	font-size: 2rem;
	margin: 1rem 0;
`;

const StyledSvgTimer = styled(SvgTimer)`
	font-size: 1.25em;
	height: 1em;
	margin-right: 0.25em;
	width: 1em;
`;

export const Timer = ({ seconds, onTimeOver }: ITimerProps) => {
	const { time, start } = useTimer({
		endTime: 0,
		initialTime: seconds,
		timerType: "DECREMENTAL",
		onTimeOver,
	});

	const [displayMinutes, setDisplayMinutes] = useState(`00`);
	const [displaySeconds, setDisplaySeconds] = useState(`00`);

	useEffect(() => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		setDisplayMinutes(`${minutes}`);
		setDisplaySeconds(seconds < 10 ? `0${seconds}` : `${seconds}`);
	}, [time]);

	useEffect(() => {
		start();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<StyledTimer>
			<StyledSvgTimer />
			<span>
				{displayMinutes}:{displaySeconds}
			</span>
		</StyledTimer>
	);
};
