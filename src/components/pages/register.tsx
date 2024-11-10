"use client";

import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase-context";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, OAuthProvider, sendEmailVerification, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, cn, Input, Link } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle, faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { firebaseErrorDict } from "./login";
import { Bounce, toast } from "react-toastify";

export default function Register() {

    const {
        isLoaded,
        auth,
        currentUser,
        debug
    } = useContext(FirebaseContext);

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("init");

    useEffect(() => {
        // create error message if password and confirm password do not match
        if (password !== confirmPassword && confirmPassword !== "") {
            setError("Passwords do not match");
            return;
        } else if (password.length < 6 && password !== "") {
            setError("Password must be at least 6 characters long");
            return;
        } else if (password === "" || confirmPassword === "") {
            setError("init");
            return;
        } else {
            setError("");
        }
    }, [password, confirmPassword]);

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

    function github() {

        if (!auth) {
            return;
        }

        console.log("Login");

        // login with google using firebase
        const provider = new GithubAuthProvider();

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

    function microsoft() {

        if (!auth) {
            return;
        }

        console.log("Login");

        // login with google using firebase
        const provider = new OAuthProvider("microsoft.com");

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

    function register() {

        if (!auth) {
            return;
        }

        console.log("Register");

        // register with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log("Register success", result);
                sendEmailVerification(result.user)
                router.push("/login");
            })
            .catch((error) => {
                console.log("Register error", error);
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
            });
    }

    useEffect(() => {
        console.log("auth", currentUser);

        if (currentUser) {
            console.log("User", currentUser.displayName);
            router.push("/dashboard");
        }

    }, [currentUser]);

    return (isLoaded && !currentUser &&
        <div className="flex flex-col items-center justify-center h-screen animate-fade-in">
            <Card>
                <CardBody className="flex flex-col gap-5 p-8">

                    <p className="text-xl text-wrap"><b>Welcome!</b> You&apos;re almost there!</p>

                    <div className="flex flex-col gap-2">
                        <Input className="input" name="email" id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                        <Input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Input className="input" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <Button
                        className={cn("button", error !== "" ? "opacity-50" : "")}
                        onClick={register}
                        color={error !== "" ? error !== "init" ? "danger" : "default" : "primary"}
                        isDisabled={error !== ""}
                        disableRipple={error !== ""}
                        disableAnimation={error !== ""}
                        disabled={error !== ""}
                    >
                        {error !== "" ? error !== "init" ? error : "Register" : "Register"}
                    </Button>

                    <div className="flex flex-row justify-center items-center w-full gap-1">
                        <div className="border border-white/30 h-0 w-1/5" />
                        <p className="w-max text-sm">Or Sign Up with</p>
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
                        <div>Already have an account? <Link href="/login">Login</Link></div>
                    </div>

                </CardBody>

            </Card>
            <div className="animate-pulse text-primary/25 mt-10 cursor-pointer" onClick={() => {
                router.push("/");
            }}>
                back to home
            </div>
        </div>
    );

}