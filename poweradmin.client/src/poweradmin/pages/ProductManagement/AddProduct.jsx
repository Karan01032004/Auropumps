import React, { useState, useEffect } from "react";
import MultiImageUpload from "../../components/Forms/MultiImageUpload";
import TinyEditor from "../../components/Forms/TinyEditor";
import SeoMetaSection from "../../components/Forms/SeoMetaSection";
import PageHeader from "../../components/PageHeader";


const AddProduct = () => {
    const [description, setDescription] = useState("");
    const [seoTitle, setSeoTitle] = useState("");
    const [metaTags, setMetaTags] = useState("");
    useEffect(() => {
        document.title = "Add Product | PowerAdmin";
    }, []);
    return (

        <div className="min-h-screen">
            <PageHeader
                title="Product Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "Product Management" }
                ]}
            />
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]  shadow-sm p-6">
                <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
                    Add Product
                </h2>
                {/* Product Name */}
                <div className="mt-6">
                    <label className="mb-1 block  font-medium text-gray-700  dark:text-white">
                        Product Name <span className="text-red-500">*</span>
                    </label>
                    <input className="w-full rounded-lg border border-gray-300 px-3 py-2 " />
                </div>
                {/* Toggles */}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[
                        "Display In New Arrivals?",
                        "Display In Best Sellers?",
                        "Display on Front-End?",
                    ].map((label) => (
                        <div key={label}>
                            <p className="mb-2  font-medium text-gray-700  dark:text-white">
                                {label}
                            </p>
                            <div className="flex gap-4 ">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name={label} /> Yes
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name={label} /> No
                                </label>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6">
                    <div>
                        <label className="mb-1 block  font-medium text-gray-700  dark:text-white">
                            Select 1st Level Category
                        </label>
                        <select className="w-full rounded-lg border border-gray-300 px-3 py-2 ">
                            <option>Select category</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block  font-medium text-gray-700  dark:text-white">
                            Select 2nd Level Category
                        </label>
                        <select className="w-full rounded-lg border border-gray-300 px-3 py-2 ">
                            <option>Select sub category</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block  font-medium text-gray-700  dark:text-white">
                            Select 3rd Level Category
                        </label>
                        <select className="w-full rounded-lg border border-gray-300 px-3 py-2 ">
                            <option>Select sub category</option>
                        </select>
                    </div>
                </div>





                {/* Image Upload */}

                <MultiImageUpload
                    label="Product Images"
                    required
                    onChange={(files) => {
                        console.log("Selected files:", files);
                    }}
                />

                {/* Capacity & Weight */}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label className="mb-1 block  font-medium text-gray-700  dark:text-white">
                            Capacity
                        </label>
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 " />
                    </div>

                    <div>
                        <label className="mb-1 block  font-medium text-gray-700  dark:text-white">
                            Weight
                        </label>
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 " />
                    </div>
                    <div>
                        <label className="mb-1 block  font-medium text-gray-700  dark:text-white">
                            Dimension
                        </label>
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 " />
                    </div>
                </div>


                {/* ✅ Modular CKEditor */}
                <div className="mt-6">
                    <label className="mb-1 block  font-medium text-gray-700  dark:text-white">
                        Product Description <span className="text-red-500">*</span>
                    </label>
                    <div className="rounded-lg border border-gray-300">
                        <TinyEditor
                            value={description}
                            onChange={setDescription}
                        />
                    </div>
                </div>


                {/* SEO */}
                {/* SEO */}
                <SeoMetaSection
                    seoTitle={seoTitle}
                    setSeoTitle={setSeoTitle}
                    metaTags={metaTags}
                    setMetaTags={setMetaTags}
                />


                {/* Submit */}
                <div className="mt-8 flex justify-end">
                    <button className="rounded-lg bg-indigo-600 px-6 py-2  text-white hover:bg-indigo-700">
                        Save Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
