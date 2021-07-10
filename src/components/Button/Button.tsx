import React, { ReactNode } from "react";
import styled from "styled-components";

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const StyledButton = styled.button`
	align-items: center;
	background: rebeccapurple;
	border: 0;
	border-radius: 4px;
	color: #fff;
	display: inline-flex;
	font: inherit;
	margin: 0;
	padding: 0.5rem 1.5rem 0.6rem;
`;

interface IButtonProps {
	children: ReactNode;
	onClick: (event: ButtonEvent) => void;
	type?: "button" | "submit";
}

export const Button = ({
	children,
	onClick,
	type = "button",
}: IButtonProps) => {
	return (
		<StyledButton onClick={onClick} type={type}>
			{children}
		</StyledButton>
	);
};
