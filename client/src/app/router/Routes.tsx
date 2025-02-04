import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import Catalog from "../../features/catalog/Catalog";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import RequireAuth from "./RequireAuth";
import Orders from "../../features/orders/Orders";
import Inventory from "../../features/admin/inventory";

// import OrderDetails from "../../features/orders/OrderDetails";

export const router = createBrowserRouter([{
    path: '/',
    element: <App />,
    children: [
        // authenticated roots
        {
            element: <RequireAuth />, children: [
                { path: 'checkout', element: <CheckoutPage /> },
                { path: 'orders', element: <Orders /> },
                // { path: 'order/:id', element: <OrderDetails /> }
                // { path: 'order', element: <OrderDetails /> }
            ]
        },
        // admin roots
        {
            element: <RequireAuth roles={['Admin']} />, children: [
                { path: 'inventory', element: <Inventory /> }]
        },
        { path: '', element: <HomePage /> },
        { path: 'catalog', element: <Catalog /> },
        { path: 'catalog/:id', element: <ProductDetails /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: 'server-error', element: <ServerError /> },
        { path: 'not-found', element: <NotFound /> },
        { path: 'basket', element: <BasketPage /> },
        // { path: 'checkout', element: <CheckoutPage /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <Navigate replace to='/not-found' /> }

    ]
}])