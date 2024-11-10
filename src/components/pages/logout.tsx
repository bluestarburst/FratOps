"use client";

import { Spinner } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase-context";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Logout() {

    const {
        auth,
    } = useContext(FirebaseContext);

    const router = useRouter();

    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        console.log("Logout");

        if (!auth) {
            return;
        }

        setLoggingOut(true);


    }, [auth]);

    useEffect(() => {

        if (!loggingOut || !auth) {
            return;
        }



        auth.signOut()
            .then(() => {
                console.log("Logout success");
                toast.success("Logged out successfully", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });

                navigator.serviceWorker.getRegistrations().then(registrations => {
                    for (const registration of registrations) {
                        registration.unregister();
                    }
                });

                router.push("/login");
            })
            .catch((error) => {
                console.log("Logout error", error);
            });
    }, [loggingOut]);

    return (
        <Spinner size="lg" />
    );

}