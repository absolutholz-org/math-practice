import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as SvgCheckMark } from "@mdi/svg/svg/checkbox-marked-circle-outline.svg";
import { ReactComponent as SvgNext } from "@mdi/svg/svg/arrow-right-thick.svg";

import { Button } from "../Button/Button";

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
type FormEvent = React.FormEvent<HTMLFormElement>;

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
	font-size: 5rem;
	justify-content: center;
	margin: 2rem 0;
`;

const StyledInput = styled.input`
	background: none;
	border: 0;
	border-bottom: 2px solid;
	font: inherit;
	line-height: 1;
	outline: none;
	padding: 0;
	text-align: center;
	width: 3ch;
`;

const StyledSvgCheckMark = styled(SvgCheckMark)`
	fill: forestgreen;
	font-size: 5rem;
	height: 1em;
	width: 1em;
`;

const StyledEquationCorrect = styled.div`
	align-items: center;
	background: hsl(0deg 0% 0% / 25%);
	bottom: 0;
	display: flex;
	justify-content: center;
	left: 0;
	position: fixed;
	right: 0;
	top: 0;
`;

const StyledEquationCorrectWindow = styled.section`
	background: #fff;
	border-radius: 4px;
	box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
		0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
	padding: 2rem;
	text-align: center;
	width: min(20rem, calc(100% - 2rem));
`;

const StyledEquationCorrectWindowHdln = styled.section`
	font-size: 2.5rem;
	font-weight: 100;
	margin: 0;
`;

const StyledEquationCorrectWindowFooter = styled.footer`
	margin-top: 2rem;
`;

const StyledSvgNext = styled(SvgNext)`
	fill: currentColor;
	font-size: 1.25em;
	height: 1em;
	margin: 0.1em -0.5rem 0 0.5rem;
	width: 1em;
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

	function checkResult(solution: number): void {
		if (solution === result) {
			setState(State.CORRECT);
		} else {
			setState(State.INCORRECT);
		}
	}

	function onSubmit(event: FormEvent): void {
		checkResult(parseInt(inputRef?.current?.value || ""));
		event.preventDefault();
	}

	function onInput(event: InputEvent): void {
		checkResult(parseInt(event.target.value));
	}

	function onNext(event: ButtonEvent): void {
		createEquation();
		formRef.current?.reset();
		inputRef.current?.focus();
	}

	// function onTryAgain(event: ButtonEvent): void {}

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
		<form ref={formRef} onSubmit={onSubmit}>
			<StyledEquation>
				<span>{first}</span>
				<span>{operation === Operation.ADDITION ? " + " : " - "}</span>
				<span>{second}</span>
				<span> = </span>
				<StyledInput
					inputMode="numeric"
					onChange={onInput}
					ref={inputRef}
					type="text"
				/>
			</StyledEquation>

			{state === State.CORRECT && (
				<StyledEquationCorrect>
					<StyledEquationCorrectWindow>
						<StyledSvgCheckMark />
						<StyledEquationCorrectWindowHdln>
							Correct!
						</StyledEquationCorrectWindowHdln>
						<div>
							{first}{" "}
							{operation === Operation.ADDITION ? " + " : " - "}{" "}
							{second} = {result}
						</div>
						<StyledEquationCorrectWindowFooter>
							<Button onClick={onNext} type="submit">
								<span>Next</span> <StyledSvgNext />
							</Button>
						</StyledEquationCorrectWindowFooter>
					</StyledEquationCorrectWindow>
				</StyledEquationCorrect>
			)}

			{/* {state === State.INCORRECT && (
				<div>
					Incorrect!
					<button onClick={onTryAgain} type="button">
						Try again
					</button>
				</div>
			)} */}
		</form>
	);
};
