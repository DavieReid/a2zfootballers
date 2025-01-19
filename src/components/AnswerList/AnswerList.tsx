import styles from "./AnswerList.module.css";
export interface AnswerListProps {
	children: React.ReactNode;
}

export const AnswerList = ({ children, ...restProps }: AnswerListProps) => {
	return (
		<ul className={styles.list} {...restProps}>
			{children}
		</ul>
	);
};
