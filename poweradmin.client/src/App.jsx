import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./poweradmin/context/ThemeContext";

import Dashboard from "./poweradmin/pages/Dashboard/Dashboard";
import AppLayout from "./poweradmin/layout/AppLayout";
import BannerManagement from "./poweradmin/pages/BannerManagemnet/BannerManagement";
import BannerForm from "./poweradmin/pages/BannerManagemnet/BannerForm";
import BannerTable from "./poweradmin/pages/BannerManagemnet/BannerTable";
import InquiryTable from "./poweradmin/pages/InquiryManagement/InquiryTable";
import PageContentTable from "./poweradmin/pages/PageContent/PageContentTable";
import AddProduct from "./poweradmin/pages/ProductManagement/AddProduct";
import ViewProduct from "./poweradmin/pages/ProductManagement/ViewProduct";
import AddCategory from "./poweradmin/pages/CategoryManagement/AddCategory";
import ViewCategory from "./poweradmin/pages/CategoryManagement/ViewCategory";
import SignIn from "./poweradmin/pages/SignIn/SignIn";
import ForgotPassword from "./poweradmin/pages/ForgotPassword/ForgotPassword";
import OtpVerify from "./poweradmin/pages/ForgotPassword/OtpVerify";
import AddBlog from "./poweradmin/pages/BlogManagement/AddBlog";
import ViewBlog from "./poweradmin/pages/BlogManagement/ViewBlogs";

function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route path="signin" element={<SignIn />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-otp" element={<OtpVerify />} />

                <Route path="/poweradmin" element={<AppLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="inquiry" element={<InquiryTable />} />
                    <Route path="page-content" element={<PageContentTable />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="view-product" element={<ViewProduct />} />
                    <Route path="add-category" element={<AddCategory />} />
                    <Route path="view-category" element={<ViewCategory />} />
                    <Route path="add-blog" element={<AddBlog />} />
                    <Route path="view-blog" element={<ViewBlog />} />

                    <Route path="banner" element={<BannerManagement />}>
                        <Route index element={<BannerTable />} />
                        <Route path="add" element={<BannerForm />} />
                        <Route path="edit/:id" element={<BannerForm />} />
                    </Route>
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
