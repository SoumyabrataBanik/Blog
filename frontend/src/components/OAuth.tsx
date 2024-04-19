import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { signInFailure, signInSuccess } from "../redux-store/user/userSlice";
import toast from "react-hot-toast";

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = getAuth(app);
    async function handleGoogleClick() {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: "select_account",
        });
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch("api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userName: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    photoUrl: resultsFromGoogle.user.photoURL,
                }),
            });
            const data = await res.json();
            const { success, message, user } = data;
            if (success) {
                toast.success(message);
                dispatch(signInSuccess(user));
                navigate("/");
            } else {
                toast.error("Google Login Unsuccessfull");
                dispatch(signInFailure("Google login unsuccessfull"));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button
            className="flex items-center justify-center"
            type="button"
            gradientDuoTone="purpleToPink"
            outline
            onClick={handleGoogleClick}
        >
            <div>
                <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            </div>
            <div className="text-[1rem] mt-[0.1rem]">Continue with Google</div>
        </Button>
    );
};

export default OAuth;
