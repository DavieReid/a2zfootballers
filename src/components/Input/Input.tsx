import classnames from "clsx";

import type {
	ChangeEventHandler,
	KeyboardEventHandler,
	RefObject
} from "react";

import styles from "./Input.module.css";
import { useResetStatus } from "./useResetStatus";

export interface InputProps {
	status: string;
	readOnly: boolean;
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	onKeyDown: KeyboardEventHandler<HTMLInputElement>;
	ref: RefObject<HTMLInputElement | null>;
}

export const Input = ({
	readOnly,
	status,
	onChange,
	onKeyDown,
	value,
	ref
}: InputProps) => {

	useResetStatus();
	return (
		<input
			ref={ref}
			aria-label="Answer List"
			className={classnames(styles.root, {
				[styles.shake]: status === "Incorrect"
			})}
			value={value}
			onChange={onChange}
			onKeyDown={onKeyDown}
			readOnly={readOnly}
		/>
	);
};
