import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import DashboardLayout from '../components/layout/DashboardLayout';
import AdminDashboard from '../pages/dashboard/Dashboard';
import Products from 'pages/products/Products';
import ProductsLayout from 'components/layout/ProductsLayout';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <AdminDashboard />,
            },
        ],
    },
    {
        path: "/products",
        element: <ProductsLayout />,
        children: [
            {
                index: true,
                element: <Products />,
            },
        ],
    },
]);