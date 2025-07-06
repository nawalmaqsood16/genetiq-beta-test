import React, { useState } from "react";
import styles from "./Navigation.module.scss";
import { useApp } from "@/App/Context/AppContext";
import Settings from "@/Features/Structural/Settings/Settings";

// Importing SVGs as React Components
import DashboardIcon from "@assets/Navbar/Icons/Dashboard.svg?react";
import ReportsIcon from "@assets/Navbar/Icons/Reports.svg?react";
import GoalsIcon from "@assets/Navbar/Icons/Goals.svg?react";
import TestIcon from "@assets/Navbar/Icons/Test.svg?react";

interface NavigationProps {
	onClick?: (selected: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onClick }) => {
	const [selected, setSelected] = useState<string>("dashboard");
	const { translate } = useApp();

	const handleClick = (buttonText: string) => {
		setSelected(buttonText);
		if (onClick) {
			onClick(buttonText);
		}
	};

	// Buttons array with correct icons and translations
	const buttons = [
		{ text: "dashboard", icon: <DashboardIcon /> },
		{ text: "goals", icon: <GoalsIcon /> },
		{ text: "reports", icon: <ReportsIcon /> },
		{ text: "tests", icon: <TestIcon /> },
	];

	return (
		<div className={styles["navigation-container"]}>
			{buttons.map((button) => (
				<button
					key={button.text}
					className={`${selected === button.text ? styles["selected"] : ""}`}
					onClick={() => handleClick(button.text)}
				>
					<span className={styles.icon}>{button.icon}</span>
					{translate(button.text)}
				</button>
			))}
			<div className={styles.settingsWrapper}>
				<Settings />
			</div>
		</div>
	);
};

export default Navigation;
