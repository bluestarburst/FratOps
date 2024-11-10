"use client";

import { NextUIProvider } from "@nextui-org/system";
import FirebaseContextProvider from "./context/firebase-provider";

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return (

        <NextUIProvider>
            <FirebaseContextProvider>
                {children}
            </FirebaseContextProvider>
        </NextUIProvider>
    );
}