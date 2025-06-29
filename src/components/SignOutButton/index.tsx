import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const SignOutButton = () => {
    const handleSignOut = async () => {
        await signOut(auth);
    };

    return <button onClick={handleSignOut}>Sign Up</button>;
}

export default SignOutButton;