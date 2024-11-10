"use client";

import React, { useEffect } from "react";
import MemberCard from "../members/member-card";
import MemberTable from "../members/member-table";
import { Selection } from "@nextui-org/react";
import { users } from "../members/tmp_data";

type User = typeof users[0];

export default function Members() {

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    // const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
    const [realUsers, setRealUsers] = React.useState<User[]>([]);

    useEffect(() => {
        console.log(selectedKeys);

        // if selectedKeys is all, set selectedKeys to all user ids
        if (selectedKeys === "all") {
            setRealUsers(users);
        } else {
            setRealUsers(users.filter((user) => selectedKeys.has(user.id.toString())));
        }

    }, [selectedKeys]);

    return (

        <div className="px-6 lg:px-32 py-12 flex flex-col-reverse lg:flex-row  gap-5 scroll">
            {/* <div className="p-32 grid grid-flow-row grid-cols-2 gap-5"> */}
            <MemberTable
                users={users}
                selectedKeys={selectedKeys}
                setSelectedKeys={setSelectedKeys}
            // setSelectedUser={setSelectedUser}
            />
            <div className="sticky -mx-3 lg:-mx-0 lg:min-w-max top-12 h-max flex lg:flex-col flex-row gap-3 max-h-[90vh] overflow-y-auto pr-2 pb-2 scroll z-10">
                {realUsers.length === 0 ? (
                    <div className="text-center text-lg text-gray-500">
                        Select a user to view details.
                        <div className="opacity-0 pointer-events-none">
                        <MemberCard
                            selectedUser={null}
                        />
                        </div>
                    </div>
                ) : null}

                {realUsers.map((user) => (
                    <MemberCard
                        key={user.id}
                        selectedUser={user}
                    />
                ))}



            </div>
        </div>

    );
}