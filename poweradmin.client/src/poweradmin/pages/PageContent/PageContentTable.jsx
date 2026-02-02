import { useState, useEffect } from "react";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import PageDetailsForm from "./PageDetailsForm";

// Sample page content data
const pageContentData = [
    { id: 1, pageName: "Home" },
    { id: 2, pageName: "About Us" },
    { id: 3, pageName: "Contact" },
    { id: 4, pageName: "Privacy Policy" },
];

function PageContentTable() {
    const [selectedPage, setSelectedPage] = useState(null);
    useEffect(() => {
        document.title = "Page Content | PowerAdmin";
    }, []);
    const columns = [
        {
            title: "PAGE NAME",
            data: "pageName",
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
                        onEdit={() => setSelectedPage(row)}
                        onDelete={() =>
                            alert(`Delete page: ${row.pageName}`)
                        }
                    />
                ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="Page Content Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "Page Content" },
                ]}
            />

            <div className="mt-10">
                {selectedPage ? (
                    <PageDetailsForm
                        page={selectedPage}
                        onBack={() => setSelectedPage(null)}
                    />
                ) : (
                    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-6">
                        <AppDataTable
                            data={pageContentData}
                            columns={columns}
                            searchPlaceholder="Search pages..."
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default PageContentTable;
