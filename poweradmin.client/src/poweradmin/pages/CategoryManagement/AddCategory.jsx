import React, { useState, useEffect } from "react";
import ImageUpload from "../../components/Forms/ImageUpload";
import TinyEditor from "../../components/Forms/TinyEditor";
import SeoMetaSection from "../../components/Forms/SeoMetaSection";
import PageHeader from "../../components/PageHeader";

const AddCategory = () => {
    const [displayOnFrontend, setDisplayOnFrontend] = useState("yes");
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    useEffect(() => {
        document.title = "Add Category | PowerAdmin";
    }, []);
    return (
        <div className="min-h-screen">
            <PageHeader
                title="Category Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "View Category" },
                ]}
            />
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-6">
                <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
                    Add Category
                </h2>

                {/* Display Toggle */}
                <div className="mt-6">
                    <p className="mb-2 font-medium text-gray-700 dark:text-white">
                        Display on Front-End?
                    </p>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="yes"
                                checked={displayOnFrontend === "yes"}
                                onChange={(e) =>
                                    setDisplayOnFrontend(e.target.value)
                                }
                            />
                            Yes
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="no"
                                checked={displayOnFrontend === "no"}
                                onChange={(e) =>
                                    setDisplayOnFrontend(e.target.value)
                                }
                            />
                            No
                        </label>
                    </div>
                </div>

                {/* Category Name */}
                <div className="mt-6">
                    <label className="mb-1 block font-medium text-gray-700 dark:text-white">
                        Category Name
                    </label>
                    <input
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>

                {/* Category Image */}
                <div className="mt-6">
                    <ImageUpload
                        label="Category Image"
                        required
                        onChange={(file) =>
                            console.log("Category Image:", file)
                        }
                    />
                </div>

                {/* Description */}
                <div className="mt-6">
                    <label className="mb-1 block font-medium text-gray-700 dark:text-white">
                        Description
                    </label>
                    <div className="rounded-lg border border-gray-300">
                        <TinyEditor
                            value={description}
                            onChange={setDescription}
                        />
                    </div>
                </div>

                {/* SEO Meta */}
                <SeoMetaSection/>

                {/* Submit */}
                <div className="mt-8 flex justify-end">
                    <button className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700">
                        Save Category
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
