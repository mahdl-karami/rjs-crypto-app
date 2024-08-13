import { useEffect, useState } from "react";
import { searchURL } from "../../../services/cryptoAPI";
import { RotatingLines } from "react-loader-spinner";
import styles from "../styles/search.module.css";
export default function SearchBox(props) {
	const search = props.search.trim();
	// set states
	const [coins, setCoins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	// use effects
	useEffect(() => {
		const controller = new AbortController();
		setIsLoading(true);
		const getData = async () => {
			const respons = await fetch(searchURL(search), {
				signal: controller.signal,
			});
			const json = await respons.json();
			setCoins(json.coins);
			setIsLoading(false);
		};
		search ? getData() : setCoins([]);
		return () => controller.abort();
	}, [search]);
	return (
		<div className={styles.search} style={{ display: `${search ? "block" : "none"}` }}>
			{isLoading && search ? (
				<div className={styles.loading}>
					<RotatingLines visible={true} height="100" width="100" color="grey" strokeWidth="4" animationDuration="0.75" ariaLabel="rotating-lines-loading" wrapperStyle={{}} wrapperClass="" strokeColor="#fff" />
				</div>
			) : (
				<>
					{coins.map(({ id, large, symbol, name }) => (
						<div key={id} className={styles.row}>
							<img src={large} alt={symbol} />
							<h3>{name}</h3>
						</div>
					))}
				</>
			)}
		</div>
	);
}
