"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <div className="text-3xl">FratOps</div>
            <div className="text-gray-500">
                A new way to manage your fraternity.
            </div>

            <div className="flex flex-row mt-10 gap-2">
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
                <Link href="/members">
                    <Button>Members</Button>
                </Link>
                <Link href="/budget">
                    <Button>Budget</Button>
                </Link>
            </div>

        </div>
    );
}