export interface ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
}

import styles from "./Button.module.css";

export const Button = ({ children, onClick }: ButtonProps) => {
	return (
		<button type="button" className={styles.button} onClick={onClick}>
			{children}
		</button>
	);
};
