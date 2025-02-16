"use client";

import Dexie from "dexie";
import Head from "next/head";
import { useState } from "react";

const Logout = () => {
	const dbLink =
		(process.env.NEXT_PUBLIC_DEXIE_CLOUD_DB_URL || "")
			.split("//")[1]
			?.split(".")[0] || "";

	const dbName = "DexieStarter-" + dbLink;

	const [message, setMessage] = useState("Logging out...");
	const logout = async () => {
		Dexie.exists(dbName)
			.then((dbExist) => {
				if (dbExist) {
					setMessage("Deleting database..." as string);
					Dexie.delete(dbName)
						.then(() => {})
						.catch((error) => {
							setMessage(error);
							setTimeout(() => {
								if (typeof window !== "undefined") {
									window.location.reload();
								}
							}, 3000);
						})
						.finally(() => {
							setMessage("Cleaning up..." as string);
							setTimeout(() => {
								if (typeof window !== "undefined") {
									window.location.reload();
								}
							}, 3000);
						});
				} else {
					setMessage("Logging out..." as string);
					setTimeout(() => {
						if (typeof window !== "undefined") {
							window.location.href = "/";
						}
					}, 3000);
				}
			})
			.catch((error) => {
				setTimeout(() => {
					if (typeof window !== "undefined") {
						window.location.reload();
					}
				}, 3000);
				setMessage(error);
			});
	};
	logout();

	return (
		<>
			<Head>
				<title>{message}</title>
			</Head>
			<div>{message}</div>
		</>
	);
};

export default Logout;
