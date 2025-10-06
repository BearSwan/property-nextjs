import { FaShareSquare } from "react-icons/fa";
// FIXME:TODO: add functionality for share buttons
const ShareButtons = ({ property }) => {
    return ( 
        <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
                <FaShareSquare className="mr-2" /> Share Property
        </button>
    );
}
export default ShareButtons;