// app/providers.tsx
"use client";

import store from "@/redux/store/store";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { APIProvider } from "@vis.gl/react-google-maps";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
let persistor = persistStore(store);

export function Providers({ children }) {
	const googleTranslateElementInit = () => {
		new window.google.translate.TranslateElement(
			{
				pageLanguage: "en",
				autoDisplay: false,
			},
			"google_translate_element"
		);
	};
	useEffect(() => {
		var addScript = document.createElement("script");
		addScript.setAttribute(
			"src",
			"//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
		);
		document.body.appendChild(addScript);
		window.googleTranslateElementInit = googleTranslateElementInit;
	}, []);
	return (
		<NextUIProvider>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<APIProvider apiKey={process.env.gmapApi}>
							<div className="relative">
								<div
									className="absolute bottom-0 right-0 bg-slate-100 w-full z-10 max-h-6 text-right"
									id="google_translate_element"
								></div>
								{children}
							</div>
						</APIProvider>
					</LocalizationProvider>
				</PersistGate>
			</Provider>
		</NextUIProvider>
	);
}
