import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-green-500 text-indigo-50 h-20">
      <header>
        <ul className="p-3 list-none flex justify-start gap-4">
          <li className="p-2">Anasayfa</li>
          <li className="p-2">Sonuç</li>
          <li className="p-2">
            <Link to="/list">Listele</Link>
            </li>
          <li className="flex p-2 justify-end">Çıkış</li>
        </ul>
      </header>
    </div>
  );
};
export default Header;
