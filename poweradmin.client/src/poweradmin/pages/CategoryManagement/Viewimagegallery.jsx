import { useEffect, useState } from "react";
import ImageCell from "../../components/Table/table-cells/ImageCell";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import { renderCell } from "../../utils/renderCell";
import AppDataTable from "../../components/Table/AppDataTable";
import api from "../../api/axios";

function ImageGalleryTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "View Image Gallery | PowerAdmin";
        loadGallery();
    }, []);

    const loadGallery = async () => {
        try {
            const res = await api.get("/imagegallery/list");
            setData(res.data);
        } catch (err) {
            console.error("Failed to load image gallery", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this image?"))
            return;

        try {
            await api.delete(`/imagegallery/delete/${id}`);
            loadGallery(); // refresh list
        } catch (err) {
            alert("Delete failed",err);
        }
    }; 
    const BACKEND_URL = "https://localhost:7051";
    const columns = [
        {
            title: "IMAGE",
            data: "image",
            orderable: false,
            width: "10%",
            createdCell: (td, data) =>
                renderCell(td, <ImageCell src={data ? `${BACKEND_URL}/Webfiles/gallery/${data}` : "/placeholder.png"} alt="gallery"
                    // Tailwind use kar rahe ho toh yahan se change hoga
                    // Inline style sabse taqatwar hota hai, ye apply ho hi jayega
                    style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                    }}/>),
                //renderCell(td, <ImageCell src={data ? `${IMAGE_BASE_URL}${data}` : "/placeholder.png"} />),
              //  renderCell(td, <ImageCell src={data} />),
        },
        {
            title: "TITLE",
            data: "title",
            width: "48%",
        },
        {
            title: "VISIBLE",
            data: "displayonfrontend",
            width: "16%",
            render: (val) =>
                `<span class="${val ? "text-green-600" : "text-red-500"
                } font-medium">
                    ${val ? "Yes" : "No"}
                </span>`,
        },
        {
            title: "ACTION",
            data: null,
            orderable: false,
            searchable: false,
            width: "12%",
            createdCell: (td, _, row) =>
                renderCell(
                    td,
                    <ActionButtons
                        onEdit={() =>
                            window.location.href =
                            `/poweradmin/edit-image-gallery/${row.id}`
                        }
                        onDelete={() => handleDelete(row.id)}
                    />
                ),
        },
    ];

    return (
        <div className="mt-10">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-6">
                <AppDataTable
                    data={data}
                    columns={columns}
                    loading={loading}
                    searchPlaceholder="Search images..."
                />
            </div>
        </div>
    );
}

export default ImageGalleryTable;
