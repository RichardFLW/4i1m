import Link from "next/link";

export default function Navbar() {
    return (
      <div className="navbar">

       <p>4i1m</p>
       <Link href="/"> Acceui</Link>
       <Link href="/pagedejeu"> Jouer</Link>
       <Link href="/stats"> stats</Link>
      </div>
    );
  }
  