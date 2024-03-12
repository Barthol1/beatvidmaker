import LoginComponent from "./LoginComponent";

export default function HeaderComponent() {
    return (
        <header>
            <div className="grid grid-rows-3">
                <h1>TunesToTube Clone</h1>
                <LoginComponent />
            </div>
        </header>
    );
}