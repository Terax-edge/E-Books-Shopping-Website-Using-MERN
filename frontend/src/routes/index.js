import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import ForgotPassword from "../Pages/ForgotPassword";
import Signup from "../Pages/Signup";
import AdminPanel from "../Pages/AdminPanel"
import AllUsers from "../Pages/AllUsers"
import AllProducts from "../Pages/AllProducts";
import ProductDetails from "../Pages/ProductDetails";


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [ {
                path : "",
                element: <Home/>
            },
           
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path:"sign-up",
                element: <Signup />
            },
            {
                path : "product/:id",
                element : <ProductDetails />
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                     {
                        path: "all-products",
                        element: <AllProducts />
                    }
                ]
                
            },
            
        ]
    }
])

export default router