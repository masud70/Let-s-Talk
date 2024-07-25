import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Let's Talk!",
	description: "Let's not get bored without internet.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			{/* <head>
				<link
					rel="icon"
					href="/assets/logo_bg_removed.png"
					sizes="any"
				/>
			</head> */}
			<body className={inter.className}>
				<Providers>
					<main className="text-foreground">
						{children}
						<ToastContainer />
					</main>
				</Providers>
			</body>
		</html>
	);
}
