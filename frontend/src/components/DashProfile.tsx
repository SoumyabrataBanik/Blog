import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { Button, TextInput } from "flowbite-react";
import React, {
    ChangeEvent,
    FormEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import { app } from "../firebase";
import { RootState } from "../redux-store/store";
import { updateAvatar } from "../redux-store/user/userSlice";

/**
 * @type FormData and ResData
 */

type FormDataType = {
    userName?: string;
    email?: string;
    avatar?: string;
    password?: string;
};

type ResData = {
    success: boolean;
    message: string;
};

/**
 * @return JSX Element
 */
const DashProfile = () => {
    const dispatch = useDispatch();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
    const [errorUploadingImage, setErrorUploadingImage] = useState<string>("");

    const filePickerRef = useRef<HTMLInputElement>(null);

    const { currentUser } = useSelector((state: RootState) => state.user);
    const [formData, setFormData] = useState<FormDataType>({});

    const uploadImage = useCallback(
        function uploadImage() {
            setErrorUploadingImage("");
            const storage = getStorage(app);
            const fileName = imageFile?.name + "-" + new Date().getTime();
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(
                storageRef,
                imageFile as Blob
            );
            uploadTask.on(
                "state_changed",
                () => {},
                () => {
                    setErrorUploadingImage("Could not upload image to cloud");
                    setImageFileUrl("");
                    setImageFile(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            setImageFileUrl(downloadURL);
                            setFormData({ ...formData, avatar: downloadURL });
                            dispatch(updateAvatar(downloadURL));
                        }
                    );
                }
            );
        },
        [imageFile, formData, dispatch]
    );

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        } else {
            return;
        }
    }, [imageFile, uploadImage]);

    function handleProfilePictureChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        e.preventDefault();
        const file = e.target.files;
        if (file) {
            setImageFile(file[0]);
            setImageFileUrl(URL.createObjectURL(file[0]));
        } else {
            return;
        }
    }

    if (errorUploadingImage) {
        toast.error(errorUploadingImage);
    }

    const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const submitHandler = async function (e: FormEvent) {
        e.preventDefault();
        console.log(formData);
        const res = await fetch(`/api/user/update/${currentUser?.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = (await res.json()) as ResData;
        const { success, message } = data;
        if (success) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="text-center my-7 font-semibold text-3xl md:text-4xl">
                Profile
            </h1>
            <div className="flex flex-col gap-3 mt-[3rem] items-center justify-center">
                <form
                    className="flex flex-col gap-7 w-full"
                    onSubmit={submitHandler}
                >
                    <div
                        className="w-36 h-36 rounded-full self-center mb-4 hover:scale-105"
                        onClick={() => filePickerRef.current?.click()}
                    >
                        <img
                            src={imageFileUrl || currentUser?.avatar}
                            alt="User Avatar"
                            className="w-full h-full rounded-full cursor-pointer hover:scale-105"
                        />
                        <input
                            hidden
                            type="file"
                            name="profilePhoto"
                            id="profilePhoto"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                            ref={filePickerRef}
                        />
                    </div>
                    <TextInput
                        id="userName"
                        type="text"
                        defaultValue={currentUser?.userName}
                        onChange={handleChange}
                    />
                    <TextInput
                        id="email"
                        type="email"
                        defaultValue={currentUser?.email}
                        onChange={handleChange}
                    />
                    <TextInput
                        id="password"
                        type="password"
                        placeholder="New Password"
                        onChange={handleChange}
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
