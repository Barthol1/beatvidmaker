import Link from "next/link";
import LoginComponent from "./LoginComponent";

export default function HeaderComponent() {
  return (
    <header>
      <div className="grid grid-rows-1 grid-flow-col p-4 border shadow bg-slate-100 text-black">
        <div>
          <Link href="/"> TunesToTube Clone</Link>
        </div>
        <div></div>
        <LoginComponent />
      </div>
    </header>
  );
}
