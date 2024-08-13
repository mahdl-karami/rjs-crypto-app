import { useState } from "react";
import Layout from "./assets/components/template/Layout";
import CoinTable from "./assets/components/modules/CoinTable";
import Pagination from "./assets/components/modules/Pagination";

export default function App() {
	const [filter, setFilter] = useState({
		search: "",
		currency: "usd",
	});
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	return (
		<div>
			<Layout filter={filter} setFilter={setFilter}>
				<CoinTable page={page} currency={filter.currency} isLoading={isLoading} setIsLoading={setIsLoading} />
				<Pagination page={page} setPage={setPage} isLoading={isLoading} />
			</Layout>
		</div>
	);
}
