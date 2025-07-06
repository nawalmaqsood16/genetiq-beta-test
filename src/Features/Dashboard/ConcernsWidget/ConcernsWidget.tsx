import { useState } from "react";
import styles from "./ConcernsWidget.module.scss";
import { ConcernsCard } from "./Components/ConcernsCard/ConcernsCard";
import { concernsMockData, Concern } from "./helpers/concernsMockData";
import { useApp } from "@/App/Context/AppContext";

interface ConcernsWidgetProps {
	category: string;
}

export const ConcernsWidget = ({ category }: ConcernsWidgetProps) => {
	const [showAll, setShowAll] = useState(false);
	const { translate } = useApp();

	// Filter concerns based on category
	// For now, we don't have a system property in the Concern type,
	// so we'll filter based on the link property if it exists
	const filteredData =
		category === "total"
			? concernsMockData
			: concernsMockData.filter((item: Concern) => 
				item.link === category
			);

	const visibleData = showAll ? filteredData : filteredData.slice(0, 3);

	return (
		<div className={styles["concerns-container"]}>
			<div className={styles["concerns-header"]}>
				<h2>{translate("keyAreasOfConcern")}</h2>
				{filteredData.length > 3 && (
					<button
						className={styles["concerns-show-all"]}
						onClick={() => setShowAll(!showAll)}
					>
						{showAll ? "Hide" : translate("showAll")}
					</button>
				)}
			</div>
			<div className={styles["concerns-cards"]}>
				{visibleData.map((concern: Concern, index: number) => (
					<ConcernsCard key={index} concern={concern} />
				))}
			</div>
		</div>
	);
};
