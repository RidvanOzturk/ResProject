import { useSelector } from "react-redux";
import useAuthentication from "../hooks/useAuthentication";
import { NavLink, useNavigate } from "react-router-dom";
import { RoleTypes } from "../RoleTypes";
import logo from "../assets/uu_logo.png";

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector(({ UserSlice }) => UserSlice.user);

  const { logoutCall } = useAuthentication();

  const handleLogout = async () => {
    await logoutCall();
  };

  const welcomeText = () => {
    const myDate = new Date();
    const hrs = myDate.getHours();

    let message;

    if (hrs < 12) message = "Günaydın";
    else if (hrs >= 12 && hrs <= 17) message = "Tünaydın";
    else if (hrs >= 17 && hrs <= 22) message = "İyi Akşamlar";
    else if (hrs >= 22 && hrs <= 5) message = "İyi Geceler";

    return message;
  };

  return (
    <div className="bg-cyan-500 border-white py-1">
      <nav className="flex justify-between items-center max-w-6xl h-20 mx-auto">
        <div>
          <a href="/addFile">
            <img src={logo} width="100" height="100" className="-mb-8" />
          </a>
        </div>
        {user.username ? (
          <>
            <div className="basis-2/7">
              {user.role == RoleTypes.admin && (
                <div className="flex justify-between">
                  <a
                    href="/addFile"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                  >
                    Dosya Ekle
                  </a>
                  <a
                    href="/list"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Listele
                  </a>
                </div>
              )}
            </div>
            <div className="basis-1/2 text-xl ps-8">
              <span className="text-white">{welcomeText()}</span>
              &nbsp;
              {user.role == RoleTypes.admin && (
                <span className="text-white font-bold">{user.username}</span>
              )}
            </div>

            <div className="basis-1/6">
              <button
                type="button"
                onClick={handleLogout}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
              >
                ÇIKIŞ
              </button>
            </div>
          </>
        ) : (
          <div className="basis-1/6">
            <a
              href="/panel-login"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
            >
              GİRİŞ
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};
export default Header;
