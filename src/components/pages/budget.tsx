"use client";

import { Card, CardBody, CardHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, XAxis, YAxis, Bar } from "recharts";


export default function Budget() {

    // Data for membership pie chart
    const membershipData = [
        { name: 'Active', value: 57 },
        { name: 'Part-Time LOA', value: 7 },
        { name: 'LOA', value: 21 },
        { name: 'Pledges', value: 22 }
    ];

    // Data for expenses bar chart
    const expensesData = [
        { name: 'Membership', value: 100 },
        { name: 'Recruiting', value: 1000 },
        { name: 'Brotherhood', value: 750 },
        { name: 'Ball', value: 6000 },
        { name: 'Service & Philanthropy', value: 300 },
        { name: 'Professional', value: 400 },
        { name: 'AR', value: 1700 },
        { name: 'Marketing', value: 100 },
        { name: 'TR', value: 500 },
        { name: 'Executive Board', value: 350 },
        { name: 'Retreat', value: 7500 }
    ].sort((a, b) => b.value - a.value);

    const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

    return (
        <div className="w-full flex flex-row justify-center">
            <div className="space-y-8 max-w-[1000px] w-full py-12">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            Total Budget
                        </CardHeader>
                        <CardBody>
                            <p className="text-2xl font-bold">${(32621).toLocaleString()}</p>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            Total Members
                        </CardHeader>
                        <CardBody>
                            <p className="text-2xl font-bold">85</p>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            Total Expenses
                        </CardHeader>
                        <CardBody>
                            <p className="text-2xl font-bold">${(26692).toLocaleString()}</p>
                        </CardBody>
                    </Card>
                </div>

                {/* Dues and Fees Table */}
                <Card>
                    <CardHeader>
                        Dues and Fees Structure
                    </CardHeader>
                    <CardBody>
                        <Table>
                            {/* <TableHeader columns={headerColumns}>
                            {(column) => (
                                <TableColumn key={Math.random().toString()}>{column}</TableColumn>
                            )}
                        </TableHeader> */}
                            <TableHeader>
                                <TableColumn>Type</TableColumn>
                                <TableColumn>Count</TableColumn>
                                <TableColumn>Dues</TableColumn>
                                <TableColumn>Total</TableColumn>
                            </TableHeader>
                            <TableBody>
                                <TableRow key={"1"}>
                                    <TableCell>Pledges</TableCell>
                                    <TableCell>22</TableCell>
                                    <TableCell>$350.00</TableCell>
                                    <TableCell>$7,700.00</TableCell>
                                </TableRow>
                                <TableRow key={"2"}>
                                    <TableCell>Active Brothers</TableCell>
                                    <TableCell>57</TableCell>
                                    <TableCell>$250.00</TableCell>
                                    <TableCell>$14,000.00</TableCell>
                                </TableRow>
                                <TableRow key={"3"}>
                                    <TableCell>Part-time LOA</TableCell>
                                    <TableCell>7</TableCell>
                                    <TableCell>$125.00</TableCell>
                                    <TableCell>$875.00</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Membership Distribution */}
                    <Card>
                        <CardHeader>
                            Membership Distribution
                        </CardHeader>
                        <CardBody>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={membershipData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={120}
                                            label={({ name, value }) => `${name}: ${value}`}
                                        >
                                            {membershipData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Expenses Distribution */}
                    <Card>
                        <CardHeader>
                            Top Expenses
                        </CardHeader>
                        <CardBody>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={expensesData}>
                                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#2563eb">
                                            {expensesData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};