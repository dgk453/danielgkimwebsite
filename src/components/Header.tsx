import React from "react";
import { createClient, getRepositoryEndpoint } from "@prismicio/client";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";


const endpoint = getRepositoryEndpoint('danielgkim')

export default async function Header() {
    const client = createClient(endpoint);
    const settings = await client.getSingle('settings');
    return (
        <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
            <nav>
                <ul>
                    <li>
                        <Link href="/" aria-label="Home Page">
                            {settings.data.name}
                        </Link>
                    </li>
                    {settings.data.nav_item.map(({ link, label }, index) => (
                        <li key={index}>
                            {/* Use link.uid to generate the path */}
                            <Link href={`/${link.uid}`}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}