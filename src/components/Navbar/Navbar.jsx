import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { urls } from "../../constants/urls";

const navItems = [
  {
    link: urls.products,
    title: "Products",
  },
  {
    link: urls.favorites,
    title: "Favorites",
  },
];

const Navbar = () => {
  const favoritesCount = useSelector((state) => state.favorites.items.length);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to={urls.products}
          className="text-2xl font-bold text-indigo-600 tracking-tight"
        >
          ProductDash
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-5 lg:gap-12">
          {navItems.map((item) => {
            const isFavorites = item.link === urls.favorites;

            return (
              <NavLink key={item.link} to={item.link}>
                {({ isActive }) => (
                  <div
                    className={`relative text-base font-semibold cursor-pointer transition-colors
                      ${
                        isActive
                          ? "text-indigo-600"
                          : "text-slate-700 hover:text-indigo-600"
                      }`}
                  >
                    {item.title}

                    {/* Active underline */}
                    <span
                      className={`absolute left-0 -bottom-2 h-0.5 w-full bg-indigo-600 transition-opacity
                        ${isActive ? "opacity-100" : "opacity-0"}`}
                    />

                    {/* Favorites badge */}
                    {isFavorites && favoritesCount > 0 && (
                      <span className="absolute -top-3 -right-5 min-w-5 h-5 px-1 rounded-full bg-pink-500 text-white text-xs font-bold flex items-center justify-center">
                        {favoritesCount}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
