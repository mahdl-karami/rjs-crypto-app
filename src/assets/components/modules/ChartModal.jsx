import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "../styles/chartModal.module.css";
import { chartData } from "../../../services/cryptoAPI";

export default function ChartModal({ modal, setModal, currency }) {
	const [chartFilter, setChartFilter] = useState("prices");
	const [chart, setChart] = useState(null);
	useEffect(() => {
		const getChart = async () => {
			const res = await fetch(chartData(modal[0], currency));
			const json = await res.json();
			setChart(json);
		};
		getChart();
	}, [chartFilter]);

	const convertData = (data, type) => {
		return data[type].map((item) => {
			return { data: item[0], value: item[1] };
		});
	};
	return (
		<>
			{chart ? (
				<div className={styles.container}>
					<div className={styles.modal}>
						<div className={styles.coinInfo}>
							<img src={modal[1]} alt="" />
							<h3>{modal[0]}</h3>
							<button onClick={() => setModal(null)}>X</button>
						</div>
						<ResponsiveContainer width="100%" height="80%">
							<LineChart
								width={400}
								height={400}
								data={convertData(chart, chartFilter)}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="data" visibility={"hidden"} />
								<YAxis domain={["auto", "auto"]} />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="value" stroke="dodgerblue" strokeWidth={"2px"} />
							</LineChart>
						</ResponsiveContainer>
						<div className={styles.chartFilter}>
							<button value="prices" onClick={(e) => setChartFilter(e.target.value)}>
								Prices
							</button>
							<button value="market_caps" onClick={(e) => setChartFilter(e.target.value)}>
								Market Caps
							</button>
							<button value="total_volumes" onClick={(e) => setChartFilter(e.target.value)}>
								Total Volumes
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
