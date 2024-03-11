export default function formComponent() {
    function onSubmit() {
        console.log("form submitted")
    }
    return (
        <form onSubmit={onSubmit}>
            
        </form>
    )
}