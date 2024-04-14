import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

export default function FooterCom() {
    return (
        <>
            <Footer
                container
                className="border border-t-8 border-pink-500"
            >
                <div className="flex-1">
                    <Link
                        to="/"
                        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
                    >
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 rounded-md text-white">
                            Soumyabrata's
                        </span>{" "}
                        Blog
                    </Link>
                </div>
                <div className="flex-1">
                    <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 sm:mt-4">
                        <div>
                            <Footer.Title title="ABOUT" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="https://github.com/SoumyabrataBanik/React-Practice-Projects"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    React Practice Projects
                                </Footer.Link>
                                <Footer.Link
                                    href="/about"
                                    rel="noopener noreferrer"
                                >
                                    Soumyabrata's Blog
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="FOLLOW ME" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="https://github.com/SoumyabrataBanik"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Github
                                </Footer.Link>
                                <Footer.Link href="#">Discord</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="LEGAL" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href="#">
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
            </Footer>
        </>
    );
}
