import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MultiImageUpload from "../../components/Forms/MultiImageUpload";
import TinyEditor from "../../components/Forms/TinyEditor";
import SeoMetaSection from "../../components/Forms/SeoMetaSection";
import PageHeader from "../../components/PageHeader";
import api from "../../api/axios";

const AddProduct = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();

    // ================= STATES =================
    const [title, setTitle] = useState("");

    const [visible, setVisible] = useState("yes");
    const [isFeatured, setIsFeatured] = useState("no");
    const [isAddContact, setIsAddContact] = useState("no");

    const [description, setDescription] = useState("");
    const [technicalDetails, setTechnicalDetails] = useState("");
    const [moc, setMoc] = useState("");
    const [applications, setApplications] = useState("");

    const [seoTitle, setSeoTitle] = useState("");
    const [metaTags, setMetaTags] = useState("");

    const [images, setImages] = useState([]);
    const [catalogue, setCatalogue] = useState(null);

    const [existingImages, setExistingImages] = useState({});
    const [existingCatalogue, setExistingCatalogue] = useState("");

    const [loading, setLoading] = useState(false);

    // ================= LOAD EDIT DATA =================
    useEffect(() => {
        document.title = isEdit
            ? "Edit Product | PowerAdmin"
            : "Add Product | PowerAdmin";

        if (isEdit) loadProduct();
    }, [id]);

    const loadProduct = async () => {
        const res = await api.get(`/product/${id}`);
        const p = res.data;

        setTitle(p.title);

        setVisible(p.visible ? "yes" : "no");
        setIsFeatured(p.isFeatured ? "yes" : "no");
        setIsAddContact(p.isaddcontact ? "yes" : "no");

        setDescription(p.description);
        setTechnicalDetails(p.technicalDetails);
        setMoc(p.moc);
        setApplications(p.applications);

        setSeoTitle(p.pageIETitle);
        setMetaTags(p.meta);

        setExistingImages({
            image1: p.image1,
            image2: p.image2,
            image3: p.image3,
        });

        setExistingCatalogue(p.catelogue);
    };

    // ================= SUBMIT =================
    const handleSubmit = async () => {
        if (!title.trim()) {
            alert("Product name is required");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("title", title);
            formData.append("Visible", visible === "yes");
            formData.append("isFeatured", isFeatured === "yes");
            formData.append("isaddcontact", isAddContact === "yes");

            formData.append("description", description);
            formData.append("technicalDetails", technicalDetails);
            formData.append("MOC", moc);
            formData.append("applications", applications);

            formData.append("PageIETitle", seoTitle);
            formData.append("Meta", metaTags);

            if (images[0]) formData.append("image1", images[0]);
            if (images[1]) formData.append("image2", images[1]);
            if (images[2]) formData.append("image3", images[2]);
            if (catalogue) formData.append("catalogue", catalogue);

            if (isEdit) {
                await api.put(`/product/update/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await api.post("/product/add", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            navigate("/poweradmin/dashboard");
        } catch (err) {
            console.error(err);
            alert("Save failed");
        } finally {
            setLoading(false);
        }
    };

    // ================= JSX =================
    return (
        <div className="min-h-screen">
            <PageHeader
                title="Add Product"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: isEdit ? "Edit Product" : "Add Product" },
                ]}
            />

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <h2 className="mb-6 text-xl font-semibold">
                    {isEdit ? "Edit Product" : "Add Product"}
                </h2>

                {/* PRODUCT NAME */}
                <div className="mt-6">
                    <label className="font-medium">
                        Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>

                {/* TOGGLES */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        ["Display on Frontend?", visible, setVisible],
                        ["Is Featured?", isFeatured, setIsFeatured],
                        ["Only Viw Contact Button?", isAddContact, setIsAddContact],
                      
                    ].map(([label, value, setter]) => (
                        <div key={label}>
                            <p className="font-medium">{label}</p>
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    checked={value === "yes"}
                                    onChange={() => setter("yes")}
                                />{" "}
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    checked={value === "no"}
                                    onChange={() => setter("no")}
                                />{" "}
                                No
                            </label>
                        </div>
                    ))}
                </div>

                {/* IMAGES */}
                {/* PRODUCT IMAGES */}
                <div className="mt-6">
                    <p className="mb-2 font-medium text-gray-700">
                        Product Images
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* IMAGE 1 */}
                        <div>
                            <label className="text-sm font-medium">Image 1</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const files = [...images];
                                    files[0] = e.target.files[0];
                                    setImages(files);
                                }}
                                className="w-full rounded border px-2 py-1 text-sm"
                            />
                        </div>

                        {/* IMAGE 2 */}
                        <div>
                            <label className="text-sm font-medium">Image 2</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const files = [...images];
                                    files[1] = e.target.files[0];
                                    setImages(files);
                                }}
                                className="w-full rounded border px-2 py-1 text-sm"
                            />
                        </div>

                        {/* IMAGE 3 */}
                        <div>
                            <label className="text-sm font-medium">Image 3</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const files = [...images];
                                    files[2] = e.target.files[0];
                                    setImages(files);
                                }}
                                className="w-full rounded border px-2 py-1 text-sm"
                            />
                        </div>
                    </div>
                </div>


                {/* EXISTING IMAGES (EDIT) */}
                {isEdit && (
                    <div className="mt-4">
                        <p className="mb-2 font-medium text-gray-700">
                            Existing Images
                        </p>
                        <div className="flex gap-4">
                            {Object.values(existingImages).map(
                                (img, i) =>
                                    img && (
                                        <img
                                            key={i}
                                            src={img}
                                            className="h-24 w-24 rounded border object-cover"
                                        />
                                    )
                            )}
                        </div>
                    </div>
                )}


                {/* PDF */}
                {/*<div className="mt-6">*/}
                {/*    <label className="font-medium">Upload Catalogue (PDF)</label>*/}
                {/*    <input*/}
                {/*        type="file"*/}
                {/*        accept=".pdf"*/}
                {/*        onChange={(e) => setCatalogue(e.target.files[0])}*/}
                {/*    />*/}
                {/*    {existingCatalogue && (*/}
                {/*        <p className="text-sm mt-1">*/}
                {/*            Existing:{" "}*/}
                {/*            <a*/}
                {/*                href={existingCatalogue}*/}
                {/*                target="_blank"*/}
                {/*                rel="noreferrer"*/}
                {/*                className="text-blue-600"*/}
                {/*            >*/}
                {/*                View PDF*/}
                {/*            </a>*/}
                {/*        </p>*/}
                {/*    )}*/}
                {/*</div>*/}
                {/* PRODUCT CATALOGUE (PDF) */}
                <div className="mt-6">
                    <label className="mb-1 block font-medium text-gray-700">
                        Product Catalogue (PDF)
                    </label>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setCatalogue(e.target.files[0])}
                        className="w-full rounded border px-3 py-2 text-sm"
                    />

                    <p className="mt-1 text-xs text-gray-500">
                        Upload product catalogue in PDF format
                    </p>

                    {existingCatalogue && (
                        <p className="mt-2 text-sm">
                            Existing Catalogue:{" "}
                            <a
                                href={existingCatalogue}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 underline"
                            >
                                View PDF
                            </a>
                        </p>
                    )}
                </div>

                {/* EDITORS */}
                {[
                    ["Product Description", description, setDescription],
                    ["Technical Details", technicalDetails, setTechnicalDetails],
                    ["MOC", moc, setMoc],
                    ["Applications", applications, setApplications],
                ].map(([label, val, setter]) => (
                    <div className="mt-6" key={label}>
                        <label className="font-medium">{label}</label>
                        <TinyEditor value={val} onChange={setter} />
                    </div>
                ))}

                {/* SEO */}
                <SeoMetaSection
                    seoTitle={seoTitle}
                    setSeoTitle={setSeoTitle}
                    metaTags={metaTags}
                    setMetaTags={setMetaTags}
                />
               
                {/* SUBMIT */}
                <div className="mt-8 text-right">
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="rounded-lg bg-indigo-600 px-6 py-2 text-white"
                    >
                        {loading ? "Saving..." : "Save Product"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
