import classnames from "clsx";
import styles from "./Card.module.css";
export interface CardProps {
	children: React.ReactNode;
	variant?: "letter";
	className?: string;
}

export const Card = ({
	children,
	variant,
	className,
	...restProps
}: CardProps) => {
	return (
		<div
			className={classnames(styles.card, className, {
				[styles.letter]: variant === "letter"
			})}
			{...restProps}>
			{children}
		</div>
	);
};
