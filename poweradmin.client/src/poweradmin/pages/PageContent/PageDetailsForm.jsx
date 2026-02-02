import { useState, useEffect } from "react";
import SeoMetaSection from "../../components/Forms/SeoMetaSection";
import TinyEditor from "../../components/Forms/TinyEditor";


const PageDetailsForm = ({ page, onBack }) => {
    useEffect(() => {
        document.title = "Edit Page Content | PowerAdmin";
    }, []);
    const [pageName, setPageName] = useState(page?.pageName || "");
    const [content, setContent] = useState(page?.content || "");
    const [seoTitle, setSeoTitle] = useState(page?.seoTitle || "");
    const [metaTags, setMetaTags] = useState(page?.metaTags || "");

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            pageName,
            content,
            seoTitle,
            metaTags,
        };

        console.log("Page Data:", payload);
        // 🔥 API call here
    };

    return (
        <div className="min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 shadow-sm"
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Page Details
                    </h2>

                    {onBack && (
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 
                    text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/10"
                        >
                            ← Back
                        </button>
                        
                    )}
                </div>

                {/* Page Name */}
                <div className="mt-4">
                    <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">
                        Page Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={pageName}
                        onChange={(e) => setPageName(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
                        placeholder="Enter page name"
                        required
                    />
                </div>

                {/* Page Content */}
                <div className="mt-6">
                    <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">
                        Page Content <span className="text-red-500">*</span>
                    </label>
                    <div className="rounded-lg border border-gray-300 dark:border-gray-700">
                        <TinyEditor
                            value={content}
                            onChange={setContent}
                        />
                    </div>
                </div>

                {/* SEO Section */}
                <SeoMetaSection
                    seoTitle={seoTitle}
                    setSeoTitle={setSeoTitle}
                    metaTags={metaTags}
                    setMetaTags={setMetaTags}
                />

                {/* Submit */}
                <div className="mt-8 flex justify-end gap-3">
                    {onBack && (
                        <button
                            type="button"
                            onClick={onBack}
                            className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            Cancel
                        </button>
                    )}

                    <button
                        type="submit"
                        className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
                    >
                        Save Page
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PageDetailsForm;
