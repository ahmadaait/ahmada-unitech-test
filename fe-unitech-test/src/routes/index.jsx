import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
const Loader = lazy(() => import('../components/Loader.jsx'));
const Login = lazy(() => import('../views/Auth/Login.jsx'));
const Dashboard = lazy(() => import('../views/Dashboard/Index.jsx'));
const Categories = lazy(() => import('../views/Categories/Index.jsx'));
const CategoriesCreate = lazy(() => import('../views/Categories/Create.jsx'));
const CategoriesEdit = lazy(() => import('../views/Categories/Edit.jsx'));
const Images = lazy(() => import('../views/Images/Index.jsx'));
const ImagesCreate = lazy(() => import('../views/Images/Create.jsx'));
const ImagesEdit = lazy(() => import('../views/Images/Edit.jsx'));
const Products = lazy(() => import('../views/Products/Index.jsx'));
const ProductsCreate = lazy(() => import('../views/Products/Create.jsx'));
const ProductsEdit = lazy(() => import('../views/Products/Edit.jsx'));
const ProductsShow = lazy(() => import('../views/Products/Show.jsx'));
const Statistics = lazy(() => import('../views/Statistics/Index.jsx'));

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/" */}
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />

      {/* private route "/dashboard" */}
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          </Suspense>
        }
      />
      <Route
        path="/categories"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <Categories />
            </PrivateRoutes>
          </Suspense>
        }
      />
      <Route
        path="/categories/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <CategoriesCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />
      <Route
        path="/categories/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <CategoriesEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />

      <Route
        path="/images"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <Images />
            </PrivateRoutes>
          </Suspense>
        }
      />
      <Route
        path="/images/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <ImagesCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />
      <Route
        path="/images/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <ImagesEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />
      <Route
        path="/products"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <Products />
            </PrivateRoutes>
          </Suspense>
        }
      />
      <Route
        path="/products/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <ProductsCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />
      <Route
        path="/products/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <ProductsEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />
      <Route
        path="/products/show/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <ProductsShow />
            </PrivateRoutes>
          </Suspense>
        }
      />
      <Route
        path="/statistics"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <Statistics />
            </PrivateRoutes>
          </Suspense>
        }
      />
    </Routes>
  );
}
