import styles from "../styles/header.module.css";
import SearchBox from "../modules/SearchBox";
export default function Header({ filter, setFilter }) {
	const { search, select } = filter;
	// functions
	function changeHandler(e) {
		const { name, value } = e.target;
		setFilter((filter) => ({ ...filter, [name]: value }));
	}
	return (
		<header className={styles.header}>
			<span>
				<input name="search" type="text" placeholder="Search" value={search} onChange={changeHandler} />
				<SearchBox search={filter.search} />
				<select name="currency" id="" value={select} onChange={changeHandler}>
					<option value="usd">$ usd</option>
					<option value="eur">€ eur</option>
					<option value="jpy">¥ jpy</option>
				</select>
			</span>
			<h1>CRYPTO APP</h1>
		</header>
	);
}
