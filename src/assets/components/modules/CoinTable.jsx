import ChartModal from "./ChartModal";
import { useEffect, useState } from "react";
import {returnURL } from "../../../services/cryptoAPI";
import { RotatingLines } from "react-loader-spinner";
import styles from "../styles/table.module.css";

export default function CoinTable({ page, currency, isLoading, setIsLoading }) {
	// set states
	const [coins, setCoins] = useState([]);
	const [modal , setModal] = useState(false);
	// loading states liftedUp
	// use effects
	useEffect(() => {
		const controller = new AbortController();
		setIsLoading(true);
		const getData = async () => {
			const res = await fetch(returnURL(page, currency), {
				signal: controller.signal,
			});
			const json = await res.json();
			setCoins(json);
			setIsLoading(false);
		};
		getData();
		return () => controller.abort();
	}, [page, currency, setIsLoading]);
	// functions
	const currencySymbol = () => {
		if (currency == "usd") {
			return "$";
		}
		if (currency == "eur") {
			return "€";
		} else {
			return "¥";
		}
	};
	return (
		<>
			{isLoading ? (
				<div className={styles.loading}>
					<RotatingLines visible={true} height="200" width="200" color="grey" strokeWidth="3" animationDuration="0.75" ariaLabel="rotating-lines-loading" wrapperStyle={{}} wrapperClass="" strokeColor="dodgerblue" />
				</div>
			) : (
				<>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Coin</th>
								<th>Name</th>
								<th>Price</th>
								<th>Last 24h</th>
								<th>Total Voluem</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{coins.map(({ id, name, current_price, image, symbol, price_change_percentage_24h: price_change, total_volume }) => (
								<tr key={id}>
									<td>
										<div>
											<img src={image} alt={name} onClick={()=> setModal([id , image])}/>
											<h2>{symbol}</h2>
										</div>
									</td>
									<td>{name}</td>
									<td>
										{currencySymbol()} {current_price.toLocaleString()}
									</td>
									<td className={price_change < 0 ? styles.alert : styles.succes}>{price_change.toFixed(2)}%</td>
									<td>{total_volume.toLocaleString()}</td>
									<td className={price_change < 0 ? styles.alert : styles.succes}>{price_change < 0 ? "false" : "true"}</td>
								</tr>
							))}
						</tbody>
					</table>
					{modal ? <ChartModal modal={modal} setModal={setModal} currency={currency}/> : null}
				</>
			)}
		</>
	);
}
