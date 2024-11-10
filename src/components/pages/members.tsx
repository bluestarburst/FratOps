"use client";

import React from "react";
import MemberCard from "../members/member-card";
import MemberTable from "../members/member-table";
import { Selection } from "@nextui-org/react";
import { users } from "../members/tmp_data";

type User = typeof users[0];

export default function Members() {

    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

    return (

        <div className="px-32 py-12 flex flex-row gap-5 scroll">
            {/* <div className="p-32 grid grid-flow-row grid-cols-2 gap-5"> */}
            <MemberTable
                users={users}
                selectedKeys={selectedKeys}
                setSelectedKeys={setSelectedKeys}
                setSelectedUser={setSelectedUser}
            />
            <div className="sticky top-12 h-max">
                <MemberCard
                    selectedUser={selectedUser}
                />
            </div>
        </div>

    );
}