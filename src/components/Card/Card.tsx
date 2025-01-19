import classnames from "clsx";
import styles from "./Card.module.css";
export interface CardProps {
	children: React.ReactNode;
	variant?: "letter";
	isAnswer?: boolean;
}

export const Card = ({
	children,
	variant,
	isAnswer,
	...restProps
}: CardProps) => {
	return (
		<div
			className={classnames(styles.card, {
				[styles.letter]: variant === "letter",
				[styles.answer]: isAnswer
			})}
			{...restProps}>
			{children}
		</div>
	);
};
