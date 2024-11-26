import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, { Loader as productsLoader, Action as updateAvailabilityAction } from './views/Products'
import NewProduct, { Action as newProductAction } from './views/NewProduct'
import EditProduct, { Loader as editProductLoader, Action as editProductAction } from './views/EditProduct'
import { Action as deleteProductAction } from './components/ProductDetails'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'products/new',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'products/:id/edit', // ROA Pattern - Resource-oriented desing 
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'products/:id/delete',
                action: deleteProductAction
            }
        ]
    }
])