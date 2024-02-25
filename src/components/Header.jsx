import {useSelector} from "react-redux";
import useAuthentication from "../hooks/useAuthentication";
import { NavLink, useNavigate } from "react-router-dom";
import { RoleTypes } from "../RoleTypes";
import logo from "../assets/uu_logo.png"

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
        message = 'Günaydın';
        else if (hrs >= 12 && hrs <= 17)
        message = 'Tünaydın';
        else if (hrs >= 17 && hrs <= 22)
        message = 'İyi Akşamlar';
        else if (hrs >= 22 && hrs <= 5)
        message = 'İyi Geceler';

        return message;
    }

  return (
    
     <nav className="bg-cyan-500 border-white px-4 lg:px-6  dark:bg-cyan-500">
        <div class="flex-none w-14 h-5 ml-7 pt-3 mb-1">
     <img src={logo} />
   </div>
            <div className="flex flex-wrap justify-between pb-4 items-center mx-auto max-w-screen-xl">
                {
                   user.username
                    ?
                    <>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto  lg:order-1" id="mobile-menu-2">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 ">
                    {
                        
                        user.role==RoleTypes.admin
                        ?
                        <>
                        <li>
                            <a href="/addFile" className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 ">Dosya Ekle</a>
                        </li>
                        
                        <li>
                            <a href="/list" className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">Listele</a>
                        </li>
                        </>
                        :null
                     }  
                    </ul>
                </div>
                        <div className="flex items-center lg:order-2">
                            <span className="text-white">
                                {welcomeText()}
                            </span>
                            &nbsp;
                            { 
                                user.role == RoleTypes.admin && <span className="text-white font-bold">{user.username}</span>
                            }
                        </div>
                        <div className="flex items-center lg:order-2 ">
                            <button type="button"
                            onClick={handleLogout}
                            className="text-white hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2   ">
                                Çıkış
                            </button>
                        </div>
                    </>
                    : null
                }
                
            </div>
        </nav>
  );
};
export default Header;
