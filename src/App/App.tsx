import { RouterProvider } from "react-router-dom";
import "./Styles/Global.scss";
import Router from "./Routes/Router";
import { AppProvider } from "./Context/AppContext";

function App() {
	return (
		<AppProvider>
			<RouterProvider router={Router} />
		</AppProvider>
	);
}

export default App;
