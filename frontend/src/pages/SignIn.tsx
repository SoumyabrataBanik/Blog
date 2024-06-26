import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";

import { RootState } from "../redux-store/store";
import {
    signInFailure,
    signInStart,
    signInSuccess,
} from "../redux-store/user/userSlice";
import { FormDataType, ResponseData } from "./SignUp";
import OAuth from "../components/OAuth";

export default function SignIn() {
    //Navigator:
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //States:
    const [formData, setFormData] = useState<FormDataType>({
        email: "",
        password: "",
    });
    const [resData, setResData] = useState<ResponseData>({
        success: true,
        message: "Successful",
    });
    const [openModal, setOpenModal] = useState<boolean>(false);

    // Redux Selector:
    const { loading } = useSelector((state: RootState) => state.user);

    // Handler functions:
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    async function onSubmitHandler(e: FormEvent) {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            dispatch(signInFailure("All Fields are required"));
        }
        try {
            // setLoading(true);
            dispatch(signInStart());
            const res = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            const { success, message } = await data;
            setResData({ success, message });
            if (!success) {
                setOpenModal(true);
                dispatch(signInFailure(message));
            } else {
                dispatch(signInSuccess(data?.user));
                navigate("/");
            }
        } catch (error) {
            setResData({
                success: false,
                message: "Api Error",
            });
            dispatch(signInFailure(resData.message));
        }
    }

    async function modalCloseHandler() {
        setOpenModal(false);
    }

    return (
        <>
            <div className="min-h-screen mt-20">
                <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-10 max-w-4xl p-3 mx-auto">
                    <div className="flex-1">
                        <Link
                            to="/"
                            className="text-4xl font-bold dark:text-white"
                        >
                            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 rounded-md text-white">
                                Soumyabrata's
                            </span>{" "}
                            Blog
                        </Link>
                        <p className="text-sm mt-8 text-pretty tracking-wide text-gray-600 dark:text-gray-300">
                            This a personal project. You can sign in using your
                            email or google.
                            <br />
                            <span className="font-semibold">
                                Recommendation
                            </span>
                            :
                            <br />
                            You can use temp-mail.org or similar service for
                            registering and exploring the features in the
                            website.
                        </p>
                    </div>
                    <div className="flex-1">
                        <p className="text-2xl font-semibold text-center mb-5">
                            Sign In
                        </p>
                        <form
                            className="flex flex-col flex-grow gap-4"
                            onSubmit={onSubmitHandler}
                        >
                            <div>
                                <Label value="Your Email" />
                                <TextInput
                                    type="email"
                                    id="email"
                                    placeholder="johndoe@example.com"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label value="Your Password" />
                                <TextInput
                                    type="password"
                                    id="password"
                                    placeholder="*****"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <Button
                                gradientDuoTone="purpleToPink"
                                type="submit"
                            >
                                {loading ? (
                                    <p className="flex items-center justify-center">
                                        <Spinner size="sm" />
                                        <span className="p-3">Loading</span>
                                    </p>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                            <OAuth />
                        </form>
                    </div>
                </div>
                <p className="text-base md:text-lg text-center mt-10 md:mt-20">
                    <span>Don't have an account?</span>{" "}
                    <Link
                        to="/sign-up"
                        className="text-blue-500 underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>

            {/* MODAL */}
            {
                <Modal
                    show={openModal}
                    size="md"
                    onClose={modalCloseHandler}
                    popup
                >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            {!resData.success ? (
                                <HiOutlineXCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-gray-200" />
                            ) : (
                                <HiOutlineCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-400 dark:text-gray-200" />
                            )}
                            <h3 className="mb-5 text-lg font-normal text-gray-700 dark:text-gray-400">
                                {resData.message}
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button
                                    color={
                                        resData.success ? "success" : "failure"
                                    }
                                    onClick={modalCloseHandler}
                                >
                                    OK
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </>
    );
}
