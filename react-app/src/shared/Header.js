import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserDetails } from "../helpers/user-details";
import authService from "../services/authService";

const Header = () => {
  const navigate = useNavigate();
  const userDetails = getUserDetails();

  // Définition de la fonction 'extractBeforeAt' qui prend 'email' comme argument.
  const extractBeforeAt = (email) => {
    // Utilise la méthode 'indexOf' pour trouver l'indice du premier '@' dans l'email fourni.
    // Si '@' n'est pas trouvé, 'indexOf' retourne -1.
    const atIndex = email.indexOf("@");

    // Utilise l'opérateur ternaire pour vérifier si '@' a été trouvé dans l'email.
    // Si 'atIndex' est différent de -1 (ce qui signifie que '@' est présent dans l'email),
    // 'substring(0, atIndex)' est appelé sur 'email' pour extraire et retourner la sous-chaîne
    // qui commence à l'indice 0 et s'étend jusqu'à l'indice juste avant '@'.
    // Si '@' n'est pas trouvé (c'est-à-dire, 'atIndex' est égal à -1),
    // l'email entier est retourné sans modification.
    return atIndex !== -1 ? email.substring(0, atIndex) : email;
  };

  const isAdmin = () => {
    return userDetails && userDetails.role === "ROLE_ADMIN";
  };

  // Définition d'une fonction nommée 'isLoggedIn'
  const isLoggedIn = () => {
    // Affiche les détails de l'utilisateur actuellement stockés dans la variable 'userDetails' dans la console.
    // Cela peut être utilisé pour le débogage afin de vérifier rapidement les informations actuellement détenues sur l'utilisateur.
    console.log(userDetails);

    // Tente de récupérer l'élément 'user' du localStorage. Le localStorage est utilisé ici
    // pour stocker les informations de l'utilisateur entre les sessions de navigation, ce qui permet
    // à l'utilisateur de rester connecté même après avoir fermé l'onglet ou le navigateur.
    const user = localStorage.getItem("user");

    // Évalue si la variable 'user' contient une valeur et renvoie 'true' si c'est le cas,
    // signifiant que l'utilisateur est considéré comme étant connecté. Si 'user' est 'null' ou 'undefined'
    // (ce qui se produit si l'élément 'user' n'existe pas dans localStorage), le résultat est converti en 'false',
    // indiquant que l'utilisateur n'est pas connecté.
    // L'opérateur '!!' est utilisé pour convertir la valeur obtenue en un booléen explicite :
    // 'true' si 'user' existe, et 'false' dans le cas contraire.
    return !!user;
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    authService.logout();
    navigate("/login"); // Rediriger vers la page de connexion
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products">
                Products
              </a>
            </li>
            {isAdmin() && (
              <a className="nav-link" href="/create-product">
                Create
              </a>
            )}
          </ul>
          <div className="form-inline my-2 my-lg-0">
            {!isLoggedIn() ? (
              // Afficher ces boutons si l'utilisateur n'est pas connecté
              <>
                <li className="nav-item mr-4" style={{ listStyleType: "none" }}>
                  <button
                    className="btn btn-outline-success me-2"
                    onClick={() => navigate("/login")}
                  >
                    Connexion
                  </button>
                </li>
                <li className="nav-item" style={{ listStyleType: "none" }}>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/register")}
                  >
                    Créer un compte
                  </button>
                </li>
              </>
            ) : (
              // Afficher ce bouton si l'utilisateur est connecté
              <li className="nav-item" style={{ listStyleType: "none" }}>
                <span className="navbar-text mr-4">
                  Bonjour, {extractBeforeAt(userDetails.name)}
                </span>
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Deconnexion
                </button>
              </li>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Header;
