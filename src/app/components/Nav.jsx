import Link from "next/link";

const Nav = () => {
    return (
        <nav>
            <div className="nav-logo">
                <Link href="/">Dylan Ngo</Link>
            </div>
            <div className="nav-links">
                <Link href="/about">About</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/contact">Contact</Link>

            </div>
        </nav>
    );
};

export default Nav;