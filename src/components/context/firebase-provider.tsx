"use client";

import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
	Auth,
	getAuth,
	onAuthStateChanged,
	User,
} from "firebase/auth";
import { doc, Firestore, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FirebaseContext } from "./firebase-context";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default function FirebaseContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	// const debug = process.env.NODE_ENV === "development";
	const debug = true;

	const [isLoaded, setIsLoaded] = useState(false);

	const [app, setApp] = useState<FirebaseApp | null>(null);
	const [analytics, setAnalytics] = useState<Analytics | null>(null);
	const [auth, setAuth] = useState<Auth | null>(null);
	const [firestore, setFirestore] = useState<Firestore | null>(null);

	const [userData, setUserData] = useState<unknown | null>(null);

	const [currentUser, setCurrentUser] = useState(auth?.currentUser);

	useEffect(() => {

		const firebaseConfig = {
			apiKey: "AIzaSyBCULGVk0Fw8gIxMTDzewEE29HzYkQLIrc",
			// authDomain: "tensorboard--tensorboard-234f6.us-central1.hosted.app",
			authDomain: "tensorboard.vercel.app",
			// authDomain: "localhost:3000",
			// authDomain: hostname,
			projectId: "tensorboard-234f6",
			storageBucket: "tensorboard-234f6.appspot.com",
			messagingSenderId: "815212794853",
			appId: "1:815212794853:web:44da2542e8c4622793d50c",
			measurementId: "G-X0RSFV0Y3Y",
		};

		// // Initialize Firebase
		const app = initializeApp(firebaseConfig);
		const analytics = getAnalytics(app);
		const auth = getAuth(app);
		const firestore = getFirestore(app);

		auth.useDeviceLanguage();

		setApp(app);
		setAnalytics(analytics);
		setAuth(auth);
		setFirestore(firestore);

		onAuthStateChanged(auth, (user: User | null) => {
			setIsLoaded(true);
			if (
				user &&
				user.emailVerified === false &&
				user.providerData[0].providerId === "password"
			) {
				return;
			}
			setCurrentUser(user);


			// get user data
			if (user) {
				const userRef = doc(firestore, "users", user.uid);

				getDoc(userRef).then((doc) => {
					console.log("CURRENT USER DATA: ", doc.data());
					if (doc.exists()) {
						setUserData(doc.data());

						onSnapshot(userRef, (doc) => {
							console.log("UPDATING CURRENT USER DATA: ", doc.data());
							setUserData(doc.data());
						});

					} else {
						console.log("No such document!");
					}
				}).catch((error) => {
					console.log("Error getting document:", error);
				});
			}



		});

		console.log("Firebase initialized");
		if ("serviceWorker" in navigator) {
			console.log("Service Worker is supported");
			navigator.serviceWorker.register("/service.js", {
				scope: "/",
			}).then((registration) => {

				// Registration was successful
				console.log(
					"FIREBASE ServiceWorker registration successful with scope: ",
					registration.scope,
				);
			}).catch((err) => {
				// registration failed :(
				console.log("ServiceWorker registration failed: ", err);
			});
		}
	}, []);

	return (
		<FirebaseContext.Provider
			value={{
				debug,
				isLoaded,
				setIsLoaded,
				app,
				setApp,
				analytics,
				setAnalytics,
				auth,
				setAuth,
				firestore,
				setFirestore,
				currentUser,
				setCurrentUser,
				userData,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
}
