import styles from "../styles/pagination.module.css";
export default function Pagination({ page, setPage, isLoading }) {
	const clickHandler = ({ target }) => {
		if (target.innerText == "Previus") {
			if (page == 1) {
				return;
			}
			setPage((page) => page - 1);
			return;
		}
		if (target.innerText == "Next") {
			if (page == 10) {
				return;
			}
			setPage((page) => page + 1);
			return;
		}
		setPage(Number(target.innerText));
	};
	return (
		<>
			{isLoading ? null : (
				<div className={styles.pagination}>
					<button onClick={clickHandler} className={page == 1 ? styles.disable : null}>
						Previus
					</button>
					<button onClick={clickHandler} className={page == 1 ? styles.active : null}>
						1
					</button>
					<button onClick={clickHandler} className={page == 2 ? styles.active : null}>
						2
					</button>
					{page > 2 && page < 9 ? (
						<>
							<span>...</span>
							<button className={styles.active}>{page}</button>
						</>
					) : null}
					<span>...</span>
					<button onClick={clickHandler} className={page == 9 ? styles.active : null}>
						9
					</button>
					<button onClick={clickHandler} className={page == 10 ? styles.active : null}>
						10
					</button>
					<button onClick={clickHandler} className={page == 10 ? styles.disable : null}>
						Next
					</button>
				</div>
			)}
		</>
	);
}
