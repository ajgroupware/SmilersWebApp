import Pages from "../layouts/Pages.jsx";
import RTL from "../layouts/RTL.jsx";
import Dashboard from "../layouts/Dashboard.jsx";
import ReactTables from "../views/Tables/ReactTables.jsx";

import LoginPage from "../views/Pages/LoginPage.jsx";

var indexRoutes = [
  { path: "/rtl", name: "RTL", component: RTL },
  //{ path: "/detalle", name: "Detalle", component: ReactTables },
  { path: "/pages", name: "Pages", component: Pages },
  { path: "/", name: "Home", component: Dashboard },
  //{ path: "/", name: "Login", component: LoginPage }
];

export default indexRoutes;
