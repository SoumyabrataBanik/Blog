import { useSelector } from "react-redux";
import { RootState } from "../redux-store/store";
import { Button, TextInput } from "flowbite-react";

const DashProfile = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);
    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="text-center my-7 font-semibold text-3xl md:text-4xl">
                Profile
            </h1>
            <div className="flex flex-col gap-3 mt-[3rem] items-center justify-center">
                <form className="flex flex-col gap-7 w-full">
                    <div className="w-36 h-36 rounded-full self-center">
                        <img
                            src={currentUser?.avatar}
                            alt="User Avatar"
                            className="w-full h-full rounded-full border-8 border-gray-200"
                        />
                    </div>
                    <TextInput
                        id="username"
                        type="text"
                        defaultValue={currentUser?.userName}
                    />
                    <TextInput
                        id="email"
                        type="email"
                        defaultValue={currentUser?.email}
                    />
                    <TextInput
                        id="password"
                        type="password"
                        placeholder="New Password"
                    />
                    <Button
                        type="submit"
                        gradientDuoTone="purpleToPink"
                        outline
                    >
                        Update Profile
                    </Button>
                </form>
                <div className="text-red-600 flex justify-between mt-4 w-full">
                    <span className="cursor-pointer hover:underline">
                        Delete Account
                    </span>
                    <span className="cursor-pointer hover:underline">
                        Sign Out
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DashProfile;
