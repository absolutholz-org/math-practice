import React from "react";
import styled from "styled-components";

const StyledDateDisplay = styled.span`
	font-size: 0.875rem;
`;

interface IDateDisplayProps {
	date: Date;
}

export const DateDisplay = ({ date }: IDateDisplayProps) => {
	return (
		<StyledDateDisplay>
			{date.toLocaleString("default", {
				weekday: "long",
				day: "numeric",
				month: "long",
				year: "numeric",
			})}
		</StyledDateDisplay>
	);
};
