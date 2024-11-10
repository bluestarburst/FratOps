"use client";

import { Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@nextui-org/react";
import { users } from "./tmp_data";

type User = typeof users[0];

export default function MemberCard({
    selectedUser = null
}: {
    selectedUser: User | null;
}) {
    return (<Card className="h-max w-max animate-fade-in min-h-max min-w-max">
        <CardHeader className="flex gap-3">
            <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src={selectedUser ? selectedUser.avatar : "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"}
                width={40}
            />
            <div className="flex flex-col">
                <p className="text-md">{selectedUser?.name}</p>
                <p className="text-small text-default-500">{selectedUser?.role}</p>
            </div>
        </CardHeader>
        <Divider />
        <CardBody className="h-max overflow-hidden">
            <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <Divider />
        <CardFooter>
            <Link
                isExternal
                showAnchorIcon
                href="https://github.com/nextui-org/nextui"
            >
                Visit source code on GitHub.
            </Link>
        </CardFooter>
    </Card>);
}