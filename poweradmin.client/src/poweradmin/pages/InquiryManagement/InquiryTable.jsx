import { useState, useEffect } from "react";
import ActionButtons from "../../components/Table/table-cells/ActionButtons";
import AppDataTable from "../../components/Table/AppDataTable";
import inquiryData from "../../content/inquiryData";
import { renderCell } from "../../utils/renderCell";
import PageHeader from "../../components/PageHeader";
import InquiryDetails from "./InquiryDetails";

function InquiryTable() {
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    useEffect(() => {
        document.title = "Inquiry Details | PowerAdmin";
    }, []); 
    const columns = [
        { title: "DATE", data: "date" },
        { title: "NAME", data: "name" },
        { title: "EMAIL ID", data: "email" },
        { title: "SUBJECT", data: "subject" },
        {
            title: "ACTION",
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td, _, row) =>
                renderCell(
                    td,
                    <ActionButtons
                        onView={() => setSelectedInquiry(row)}
                        onDelete={() => alert(`Delete: ${row.email}`)}
                    />
                ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="Inquiry Management"
                breadcrumbs={[
                    { label: "Dashboard", href: "/poweradmin" },
                    { label: "Inquiry Management" }
                ]}
            />

            <div className="mt-10">
                {selectedInquiry ? (
                    <InquiryDetails
                        inquiry={selectedInquiry}
                        onBack={() => setSelectedInquiry(null)}
                    />
                ) : (
                        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]  shadow-sm p-6">
                        <AppDataTable
                            data={inquiryData}
                            columns={columns}
                            searchPlaceholder="Search inquiries..."
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default InquiryTable;
