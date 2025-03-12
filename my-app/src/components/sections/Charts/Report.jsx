import React from 'react';
import { CalendarIcon, X, Printer } from 'lucide-react'; // Import icons
import logoicon from "../../../assets/images/logo.png";
import "../../../styles/print.css";

export function Report({ selectedPeriod, onClose}) {
    const reportData = {
        title: "Agricultural Performance Report",
        date: new Date().toLocaleDateString(),
        author: "Vince",
        department: "Agriculture",
        summary:
            "This report summarizes the agricultural performance based on harvest, water usage, and fertilizer usage.",
        content: {
            currentWeek: {
                totalHarvest: "500 kg",
                waterUsage: "1200 liters",
                fertilizerUsage: "50 kg",
            },
            lastWeek: {
                totalHarvest: "450 kg",
                waterUsage: "1100 liters",
                fertilizerUsage: "45 kg",
            },
            lastMonth: {
                totalHarvest: "2000 kg",
                waterUsage: "5000 liters",
                fertilizerUsage: "200 kg",
            },
            lastYear: {
                totalHarvest: "24000 kg",
                waterUsage: "60000 liters",
                fertilizerUsage: "2400 kg",
            },
        },
    };


    // const authorName = `${userProfile?.firstName || ""} ${userProfile?.lastName || ""} ${userProfile?.suffix || ""}`.trim();

    const data = reportData.content[selectedPeriod];

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center  bg-opacity-10 z-50">
      
          
            {/* Report Content */}
            <div className="bg-white shadow-lg rounded-lg relative max-h-[90vh] w-full max-w-[210mm] overflow-y-auto print:container">
            <div className="absolute top-4 right-4 flex space-x-4 print:hidden">
                <button
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    onClick={onClose}
                >
                    <X className="h-6 w-6 text-gray-700" />
                </button>
                <button
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    onClick={handlePrint}
                >
                    <Printer className="h-6 w-6 text-gray-700" />
                </button>
            </div>
                <div className="mx-auto bg-white p-[20mm] flex flex-col print:p-[10mm]">
                    {/* Report Header */}
                    <div className="flex justify-between items-start border-b pb-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{reportData.title}</h1>
                            <div className="flex items-center text-sm text-gray-500 mt-2">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                <span>{reportData.date}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center h-16 w-16 rounded">
                            <img src={logoicon} alt="Logo" />
                        </div>
                    </div>

                    {/* Report Metadata */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Author</h3>
                            <p className="text-base">{reportData.author}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Department</h3>
                            <p className="text-base">{reportData.department}</p>
                        </div>
                    </div>

                    {/* Executive Summary */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Executive Summary</h2>
                        <div className="bg-gray-50 p-4 rounded">
                            <p className="text-sm">{reportData.summary}</p>
                        </div>
                    </div>

                    {/* Report Content */}
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">Report Details</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">Total Harvest</h3>
                                <p className="text-base">{data.totalHarvest}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium">Water Usage</h3>
                                <p className="text-base">{data.waterUsage}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium">Fertilizer Usage</h3>
                                <p className="text-base">{data.fertilizerUsage}</p>
                            </div>
                        </div>
                    </div>

                    {/* Report Footer */}
                    <div className="mt-auto pt-6 border-t text-sm text-gray-500 flex justify-between">
                        <span>Generated on {new Date().toLocaleDateString()}</span>
                        <span>Page 1 of 1</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Report;
