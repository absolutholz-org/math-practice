import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

enum Operation {
	ADDITION = 1,
	SUBTRACTION = 0,
}

enum State {
	NOT_STARTED = 0,
	WAITING = 1,
	INCORRECT = 2,
	CORRECT = 3,
}

const StyledEquation = styled.div`
	display: flex;
	flex-wrap: wrap;
	font-size: 4rem;
	justify-content: center;
`;

const StyledInput = styled.input`
	background: #efefef;
	border: 0;
	font: inherit;
	line-height: 1;
	padding: 0 0 0.1em;
	text-align: center;
	width: 3ch;
`;

const max = 20;

export const Equation = () => {
	const [state, setState] = useState(State.NOT_STARTED);
	const [operation, setOperation] = useState(Operation.ADDITION);
	const [first, setFirst] = useState(0);
	const [second, setSecond] = useState(0);
	const [result, setResult] = useState(0);
	const formRef = useRef<HTMLFormElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	function createEquation(): void {
		const operation = Math.round(Math.random());
		const first = Math.round(Math.random() * max);
		const second =
			operation === Operation.ADDITION
				? Math.round(Math.random() * (max - first))
				: Math.round(Math.random() * first);
		const result =
			operation === Operation.ADDITION ? first + second : first - second;

		setOperation(operation);
		setFirst(first);
		setSecond(second);
		setResult(result);
	}

	function onInput(event: InputEvent): void {
		const solution = parseInt(event.target.value);
		console.log({ solution, result, first, second });
		if (solution === result) {
			setState(State.CORRECT);
			console.log("good job");
		} else {
			setState(State.INCORRECT);
			console.log("try again");
		}
	}

	function onNext(event: ButtonEvent): void {
		createEquation();
		formRef.current?.reset();
		inputRef.current?.focus();
	}

	function onTryAgain(event: ButtonEvent): void {}

	useEffect(() => {
		createEquation();

		// return () => {
		// 	debounceOnInput.cancel();
		// }
	}, []);

	useEffect(() => {
		setState(State.WAITING);
	}, [result]);

	return (
		<form ref={formRef}>
			<StyledEquation>
				<span>{first}</span>
				<span>{operation === Operation.ADDITION ? " + " : " - "}</span>
				<span>{second}</span>
				<span> = </span>
				<StyledInput
					inputMode="numeric"
					onChange={onInput}
					ref={inputRef}
					type="number"
				/>
			</StyledEquation>

			{state === State.CORRECT && (
				<div>
					Correct!
					<button onClick={onNext} type="button">
						Next
					</button>
				</div>
			)}

			{state === State.INCORRECT && (
				<div>
					Incorrect!
					<button onClick={onTryAgain} type="button">
						Try again
					</button>
				</div>
			)}
		</form>
	);
};
