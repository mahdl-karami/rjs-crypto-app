import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, filter, setFilter }) {
	return (
		<>
			<Header filter={filter} setFilter={setFilter} data={["d", "p"]} />
			{children}
			<Footer />
		</>
	);
}
