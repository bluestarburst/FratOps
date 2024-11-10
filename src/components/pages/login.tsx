"use client";

import { Button, Card, CardBody, Input, Link } from "@nextui-org/react";
import { getRedirectResult, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useContext, useEffect, useRef, useState } from "react";
import { FirebaseContext } from "../context/firebase-context";
// import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle, faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
// import BackToHome from "./misc/back-home";

export const firebaseErrorDict: {
    [key: string]: string;
} = {
    'auth/invalid-email': 'The email address you entered is invalid',
    'auth/email-already-exists': 'The email address you entered is already in use',
    'auth/email-already-in-use': 'The email address you entered is already in use',
    'auth/invalid-credential': 'Your username or password is incorrect',
    'auth/account-exists-with-different-credential': 'An account already exists with the same email address but a different sign-in type.',
}

export default function Login() {

    const {
        isLoaded,
        auth,
        currentUser,
        debug
    } = useContext(FirebaseContext);

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function toastError(error: {
        code: string,
        message: string
    }) {
        const errorMessage = firebaseErrorDict[error.code] || error.message;
        toast.error(errorMessage,
            {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce
            });
    }

    function google() {

        if (!auth) {
            return;
        }

        console.log("Login");

        // login with google using firebase
        const provider = new GoogleAuthProvider();

        if (debug) {
            signInWithPopup(auth, provider)
                .then((result) => {
                    console.log("Login success", result);
                })
                .catch((error) => {
                    console.log("Login error", error);

                    toastError(error);
                });
        } else {
            signInWithRedirect(auth, provider)
        }
    }

    // function github() {

    //     if (!auth) {
    //         return;
    //     }

    //     console.log("Login");

    //     // login with google using firebase
    //     const provider = new GithubAuthProvider();

    //     if (debug) {
    //         signInWithPopup(auth, provider)
    //             .then((result) => {
    //                 console.log("Login success", result);
    //             })
    //             .catch((error) => {
    //                 console.log("Login error", error);

    //                 toastError(error);
    //             });
    //     } else {
    //         signInWithRedirect(auth, provider)
    //     }
    // }

    // function microsoft() {

    //     if (!auth) {
    //         return;
    //     }

    //     console.log("Login");

    //     // login with google using firebase
    //     const provider = new OAuthProvider("microsoft.com");

    //     if (debug) {
    //         signInWithPopup(auth, provider)
    //             .then((result) => {
    //                 console.log("Login success", result);
    //             })
    //             .catch((error) => {
    //                 console.log("Login error", error);

    //                 toastError(error);
    //             });
    //     } else {
    //         signInWithRedirect(auth, provider)
    //     }
    // }

    async function emailSignIn() {
        if (!auth) {
            return;
        }

        await auth.signOut();

        console.log("Login");

        // login with email using firebase
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                if (result.user.emailVerified === true) {
                    toast.update(toastId?.current ?? "", { type: "success", autoClose: 5000, render: "Verified!" });
                } else {
                    toastError({ code: "auth/email-not-verified", message: "Please verify your email address" });
                }
                console.log("Login success", result);
            })
            .catch((error) => {
                console.log("Login error", error);

                toastError(error);
            });
    }

    useEffect(() => {
        // get redirect results from firebase
        if (!auth) {
            return;
        }

        getRedirectResult(auth)
            .then((result) => {
                console.log("Redirect result", result);
                if (result && result.user && (result.user.emailVerified === true || result.user.providerData[0].providerId !== "password")) {
                    toast.success("Successfully logged in", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce
                    });
                }
            })
            .catch((error) => {
                console.log("Redirect error", error);
                toastError(error);
            });

    }, [auth]);


    useEffect(() => {
        console.log("auth", currentUser);

        if (currentUser) {
            console.log("User", currentUser.displayName);
            router.push("/");
        }

    }, [currentUser]);

    const [shouldVerify, setShouldVerify] = useState(false);

    useEffect(() => {
        if (!auth) {
            return;
        }

        console.log(auth.currentUser);

        if (auth.currentUser && auth.currentUser?.emailVerified === false && auth.currentUser?.providerData[0]?.providerId === "password") {
            setShouldVerify(true);

            const interval = setInterval(() => {
                console.log("Checking email verification");
                auth.currentUser?.reload();
                if (auth.currentUser?.emailVerified) {
                    setShouldVerify(false);
                    toast.update(toastId?.current ?? "", { type: "success", autoClose: 1000, render: "Verified" });
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        }


    }, [auth?.currentUser?.emailVerified]);

    const toastId = useRef<null | number | string>(null);

    useEffect(() => {
        if (shouldVerify && toastId) {
            toastId.current = toast.warning(<>Please verify your email address (<Link color="secondary" onClick={() => {
                if (!auth || !auth.currentUser) {
                    return;
                }

                sendEmailVerification(auth?.currentUser)
                    .then(() => {
                        console.log("Verification email sent");
                        toast.update(toastId?.current ?? "", { type: "success", autoClose: 1000, render: "Verification email sent" });
                    })
                    .catch((error) => {
                        console.log("Verification email error", error);

                        toastError(error);
                    });
            }}>Resend</Link>)</>,
                {
                    position: "top-center",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                    className: "z-50"
                });
        }
    }, [shouldVerify]);

    return (
        isLoaded && !currentUser &&
        <div className="flex flex-col items-center justify-center h-screen animate-fade-in transition-opacity">

            <Card>
                <CardBody className="flex flex-col gap-5 p-8 min-w-[325px]">

                    <p className="text-xl text-wrap"><b>Hello!</b> Welcome back!</p>

                    <div className="flex flex-col gap-2">
                        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" type="email" />
                        <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" />
                    </div>

                    <Button onClick={emailSignIn}>Log in</Button>

                    <div className="flex flex-row justify-center items-center w-full gap-1">
                        <div className="border border-white/30 h-0 w-1/5" />
                        <p className="w-max text-sm">Or Login with</p>
                        <div className="border border-white/30 h-0 w-1/5" />
                    </div>

                    <div className="flex flex-row justify-center w-full gap-1">
                        <Button
                            isIconOnly
                            // className="opacity-50"
                            onClick={google}
                        ><FontAwesomeIcon size="xl" icon={faGoogle} /></Button>
                        <Button
                            isIconOnly
                            className="opacity-50 pointer-events-none"
                        // onClick={microsoft}
                        ><FontAwesomeIcon size="xl" icon={faMicrosoft} /></Button>
                        <Button
                            isIconOnly
                            className="opacity-50 pointer-events-none"
                        // onClick={github}
                        ><FontAwesomeIcon size="xl" icon={faGithub} /></Button>
                    </div>

                    <div className="flex flex-row flex-wrap text-sm w-full text-center justify-center">
                        <div>Don&apos;t have an account? <Link href="/register">Register</Link></div>
                    </div>

                </CardBody>
            </Card>

            {/* <BackToHome /> */}


        </div>
    );
}