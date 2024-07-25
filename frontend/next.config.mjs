/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		backendUrl: "http://172.17.50.2:8000",
		tokenKey: "eco@token",
		gmapApi: "AIzaSyDYUDVcyIfjP-xMid-UAfMcwlqOBeii__I",
        recaptchaKey: "6LdXydYpAAAAAMdy5lhB3oytrHE3bHo_9l-eGOYq"
	},
	transpilePackages: ["@mui/x-charts"],
};

export default nextConfig;
