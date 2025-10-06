'use client'
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }) => {
    const {data:session} = useSession();
    const userId = session?.user?.id;

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    // FIXME:TODO: read about useEffect
    useEffect(() => {
        if (!userId) {
            setLoading(false)
            return;
        } else {
            // FIXME:TODO: read about then when to use
            checkBookmarkStatus(property._id).then((res) => {
                if (res.error) toast.error(res.error);
                if (res.isBookmarked) setIsBookmarked(true);
                setLoading(false);
            })
        }
    }, [property._id, userId, checkBookmarkStatus]);

    const handleCLick = async () => {
        if (!userId) {
            toast.error('You need to be signed in to bookmark listing');
            return;
        }

        bookmarkProperty(property._id).then((res) => {
            if (res.error) {
                toast.error(res.error);
            } else {
                setIsBookmarked(res.isBookmarked);
                toast.success(res.message);
            }
        })
    }

    // FIXME:TODO: add loading state
    if (loading) {
        return <p className="text-center">Loading...</p>
    }
    return isBookmarked ? ( 
        <button
            onClick={handleCLick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
            <FaBookmark className="mr-2" /> Remove Bookmark
        </button>
    ) : (
        <button
            onClick={handleCLick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
            <FaBookmark className="mr-2" /> Bookmark Property
        </button>
    );
}

export default BookmarkButton;