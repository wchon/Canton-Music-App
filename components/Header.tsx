"use client"

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from "react-icons/rx"
import { HiHome, HiSearch } from "react-icons/hi";
import Button from "./Button";
import useAuthModal from "../hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "../hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const router = useRouter();
    const authModal = useAuthModal();
    const supabaseClient = useSupabaseClient();
    const {user, subscription} = useUser();

    const handleLogout = async () => {
        const {error} = await supabaseClient.auth.signOut();
        router.refresh();

        if (error) {
            toast.error(error.message);
        }
        else {
            toast.success('Logged out!');
        }
    }
    return (
        <div className={twMerge(`
            h-fit
            bg-gradient-to-b
            from-pink-800
            p-6
            `, className)}>
            <div className="
                w-full
                mb-4
                flex
                items-center
                justify-between">
                <div className="
                    hidden
                    md:flex
                    gap-x-2
                    items-center">
                    <button onClick={() => router.back()}
                            className="
                                rounded-full
                                bg-black
                                flex
                                items-center
                                justify-center
                                hover-opacity-75
                                transition
                                ">
                        <RxCaretLeft 
                            className="text-white"
                            size={25}/>
                    </button>
                    <button onClick={() => router.forward()}
                            className="
                                rounded-full
                                bg-black
                                flex
                                items-center
                                justify-center
                                hover-opacity-75
                                transition
                                ">
                        <RxCaretRight
                            className="text-white"
                            size={25}/>
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button 
                        className="
                            rounded-full
                            p-2
                            bg-white
                            flex
                            item-center
                            justify-center
                            hover:opacity-75
                            transition">
                                <HiHome className="text-black" size={20}></HiHome>
                        </button>
                        <button 
                        className="
                            rounded-full
                            p-2
                            bg-white
                            flex
                            item-center
                            justify-center
                            hover:opacity-75
                            transition">
                                <HiSearch className="text-black" size={20}></HiSearch>
                           </button>    

                </div>
                <div 
                    className="
                        flex
                        justify-between
                        items-center
                        gap-x-4"
                    >
                        {user ?(
                            <div 
                                className="
                                    flex
                                    gap-x-4
                                    items-center"
                            >
                                <Button
                                    className="
                                        bg-white
                                        px-6
                                        py-2"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                                <Button
                                    onClick={() => router.push('/account')}
                                    className="bg-white"
                                >
                                    <FaUserAlt />
                                </Button>
                                
                            </div>   
                        ) : (
                            <>
                            <div className="
                                flex justify-between
                                items-center
                                gap-x-4"
                            >
                                <Button 
                                    onClick={authModal.onOpen}
                                    className="
                                        bg-transparent
                                        text-neutral-300
                                        font-medium 
                                    "
                                >
                                    Sign up
                                </Button>
                                <Button 
                                    className="
                                        bg-white
                                        px-6
                                        py-2
                                    "
                                    onClick={authModal.onOpen}
                                >
                                    Log in
                                </Button>
                                
                            </div>
                            </>
                        )}
                           
                        </div>
            </div>        
            {children}
        </div>
      );
}
 
export default Header;
<div>
    Header
</div>