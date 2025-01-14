import classnames from "clsx";
import styles from "./Card.module.css";
export interface CardProps {
	children: React.ReactNode;
	variant?: "letter";
}

export const Card = ({ children, variant, ...restProps }: CardProps) => {
	return (
		<div
			className={classnames(styles.card, {
				[styles.letter]: variant === "letter"
			})}
			{...restProps}>
			{children}
		</div>
	);
};
