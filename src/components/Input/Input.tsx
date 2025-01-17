import classnames from "clsx";

import type { ChangeEventHandler, KeyboardEventHandler } from "react";

import styles from "./Input.module.css";

export interface InputProps {
	status: string;
	readOnly: boolean;
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

export const Input = ({
	readOnly,
	status,
	onChange,
	onKeyDown,
	value
}: InputProps) => {
	return (
		<input
			className={classnames(styles.root, {
				[styles.shake]: status === "incorrect"
			})}
			value={value}
			onChange={onChange}
			onKeyDown={onKeyDown}
			readOnly={readOnly}
		/>
	);
};
