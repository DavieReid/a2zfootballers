import styles from "./AnswerList.module.css";
export interface AnswerListProps {
	children: React.ReactNode;
	variant?: "letter";
}

export const AnswerList = ({
	children,
	variant,
	...restProps
}: AnswerListProps) => {
	return (
		<ul className={styles.list} {...restProps}>
			{children}
		</ul>
	);
};
