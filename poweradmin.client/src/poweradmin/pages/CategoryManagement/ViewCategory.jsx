import { useState, useEffect } from "react";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
 
function ViewCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "View Category | PowerAdmin";
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/category/list");
            setCategories(res.data);
        } catch (err) {
            console.error("Failed to load categories",err);
        } finally {
            setLoading(false);
        }
    }; 
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?"))
            return;

        try {
            await api.delete(`/category/delete/${id}`);
            fetchCategories(); // refresh list
        } catch (err) {
            alert("Delete failed",err);
        }
    };

    const columns = [
        {
            title: "CATEGORY",
            data: "categoryName",
        },
        {
            title: "VISIBLE",
            data: "visible",
            render: (val) =>
                `<span class="${val ? "text-green-600" : "text-red-500"} font-medium">
                    ${val ? "Yes" : "No"}
                </span>`,
        },
        {
            title: "ACTION",
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td, _, row) =>
                renderCell(
                    td,
                    <ActionButtons
                        onEdit={() =>
                            navigate(`/poweradmin/edit-category/${row.id}`)

                        }
                        onDelete={() => handleDelete(row.id)}
                    />
                ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="View Categories"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "View Category" },
                ]}
            />

            <div className="mt-10">
                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-6">
                    <AppDataTable
                        data={categories}
                        columns={columns}
                        loading={loading}
                        searchPlaceholder="Search categories..."
                    />
                </div>
            </div>
        </div>
    );
}

export default ViewCategory;
