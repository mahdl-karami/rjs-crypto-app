import styles from "../styles/footer.module.css";
export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p>
				Developer for practice (Work by real API) |{" "}
				<a href="https:/github.com/mahdl-karami" target="_blank" rel="noreferrer">
					Mahdl-Karami
				</a>
			</p>
		</footer>
	);
}
