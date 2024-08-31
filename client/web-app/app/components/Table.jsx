"use client"
import React from "react";
import { Table } from 'flowbite-react';
import Link from "next/link";

export default function TableWithStripedRows({data, head, link}) {
    return (
        <div className="container mx-auto px-4 sm:px-8 font-syne">
            <div className="py-8">
                <Table striped={true}>
                    <Table.Head>
                        {head.map((title, index) => (
                            <Table.HeadCell key={index}>
                                {title}
                            </Table.HeadCell>
                        ))}
                    </Table.Head>
                    <Table.Body>
                        {data.map((auction, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{auction.id}</Table.Cell>
                                <Table.Cell>{auction.title}</Table.Cell>
                                <Table.Cell>{auction.seller}</Table.Cell>
                                <Table.Cell>{new Date(auction.createdAt).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>
                                    <button className="hover:text-gray-900">
                                        <Link href={`${link}${auction.id}`}>View more</Link>
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}
