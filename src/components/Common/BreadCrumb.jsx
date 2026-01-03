import { Link } from "react-router-dom";
import { urls } from "../../constants/urls";

const BreadCrumb = ({ category, title }) => {
  return (
    <nav className="text-sm text-slate-500 flex items-center gap-1">
      <Link to={urls.products} className="hover:text-indigo-600 transition">
        Products
      </Link>

      <span>/</span>

      {category && (
        <>
          <span className="capitalize cursor-default">{category}</span>
          <span>/</span>
        </>
      )}

      <span className="text-salte-700 font-medium line-clamp-1 cursor-default">
        {title}
      </span>
    </nav>
  );
};

export default BreadCrumb;
