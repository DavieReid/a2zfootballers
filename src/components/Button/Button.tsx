import classnames from "clsx";
export interface ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
}

import styles from "./Button.module.css";

export const Button = ({
	children,
	disabled,
	onClick,
	...restProps
}: ButtonProps) => {
	return (
		<button
			type="button"
			className={classnames(styles.button, { [styles.disabled]: disabled })}
			onClick={onClick}
			{...restProps}>
			{children}
		</button>
	);
};
