import {useSelector} from "react-redux";
import useAuthentication from "../hooks/useAuthentication";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    const user = useSelector(({UserSlice}) => UserSlice.user);

    const {logoutCall} = useAuthentication();

    const handleLogout = async () => {
        await logoutCall();
    }

    const welcomeText = () => {

        const myDate = new Date();
        const hrs = myDate.getHours();

        let message;

        if (hrs < 12)
        message = 'Good Morning';
        else if (hrs >= 12 && hrs <= 17)
        message = 'Good Afternoon';
        else if (hrs >= 17 && hrs <= 24)
        message = 'Good Evening';

        return message;
    }

  return (
    
     <nav className="bg-white border-white px-4 lg:px-6 py-2.5 dark:bg-green-500">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                {
                    user.username
                    ?
                    <>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    
                        <li>
                            <a href="#" className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Anasayfa</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Listele</a>
                        </li>
                        
                    </ul>
                </div>
                        <div className="flex items-center lg:order-2">
                            <span className="dark:text-white">
                                {welcomeText()}
                            </span>
                            &nbsp;
                            { 
                                user.role == "admin" && <span className="dark:text-white font-bold">{user.username}</span>
                            }
                        </div>
                        <div className="flex items-center lg:order-2 ">
                            <button type="button"
                            onClick={handleLogout}
                            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                Çıkış
                            </button>
                        </div>
                    </>
                    : 
                    null
                }
                
            </div>
        </nav>
  );
};
export default Header;
