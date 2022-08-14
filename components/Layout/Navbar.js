import Link from "next/link";

export default function Navbar() {
    const links = [
        {
            link: '/about',
            slug: 'About'
        },
        {
            link: '/articels',
            slug: 'Articles'
        }
    ]

    return (
        <nav className="px-6 py-4 flex flex-row justify-between">
            <div>
                Logo Here
            </div>
            <div className="flex flex-row justify-around">
                {
                    links.map((e, i) => (
                        <Link key={i} href={e.link}>{e.slug}</Link>
                    ))
                }
            </div>
        </nav>
    )
}