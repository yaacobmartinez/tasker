import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { SWRConfig } from "swr";
axios.defaults.baseURL = process.env.API_URL;

const theme = createMuiTheme({
	typography: {
		fontFamily: "Poppins, san-serif",
	},
});

function App() {
	return (
		<div>
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<SWRConfig
							value={{
								fetcher: (url) => axios(url).then((r) => r.data),
							}}>
							<Route exact path='/' component={Home} />
						</SWRConfig>
					</Switch>
				</Router>
			</ThemeProvider>
		</div>
	);
}

export default App;
