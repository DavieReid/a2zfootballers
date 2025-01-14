export interface ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
}

import styles from "./Button.module.css";

export const Button = ({ children, onClick, ...restProps }: ButtonProps) => {
	return (
		<button
			type="button"
			className={styles.button}
			onClick={onClick}
			{...restProps}>
			{children}
		</button>
	);
};
