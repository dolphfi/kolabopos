import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import DashboardLayout from '../components/layout/DashboardLayout';
import AdminDashboard from '../pages/dashboard/Dashboard';
import Products from 'pages/products/Products';
import ProductsLayout from 'components/layout/productlayout/ProductsLayout';
import AddProductLayout from 'components/layout/productlayout/AddProductLayout';
import AddProduct from 'pages/products/AddProduct';
import ProductDetails from 'pages/products/ProductDetails';
import ProductDetailsLayout from 'components/layout/productlayout/ProductDetailsLayout';
import EditProductLayout from 'components/layout/productlayout/EditProductLayout';
import EditProduct from 'pages/products/EditProduct';
import ExpiredProducts from 'pages/products/ExpiredProducts';
import ExpiredProductsLayout from 'components/layout/productlayout/ExpiredProductsLayout';

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
    {
        path: "/products/add",
        element: <AddProductLayout />,
        children: [
            {
                index: true,
                element: <AddProduct />,
            },
        ],
    },
    {
        path: "/products/details/:id",
        element: <ProductDetailsLayout />,
        children: [
            {
                index: true,
                element: <ProductDetails />,
            },
        ],
    },
    {
        path: "/products/edit/:id",
        element: <EditProductLayout />,
        children: [
            {
                index: true,
                element: <EditProduct />,
            },
        ],
    },
    {
        path: "/products/expired",
        element: <ExpiredProductsLayout />,
        children: [
            {
                index: true,
                element: <ExpiredProducts />,
            },
        ],
    },
]);