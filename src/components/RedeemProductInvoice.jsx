import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import api from '../services/api';

const RedeemProductInvoice = () => {

    const { BillNo } = useParams();

    console.log("BillNo from url", BillNo);

    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const invoiceRef = useRef(); // 👈 for capturing PDF

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const res = await api.get(`/product/invoice/${BillNo}`);
                setInvoiceData(res.data.data);
            } catch (error) {
                console.error('Error fetching invoice:', error);
            } finally {
                setLoading(false);
            }
        };

        if (BillNo) {
            fetchInvoice();
        }
    }, [BillNo]);


    console.log("invoiceData", invoiceData);



    const handleDownloadPDF = async () => {
        const element = invoiceRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const margin = 10; // mm
        const usableWidth = pdfWidth - margin * 2;
        const usableHeight = pdfHeight - margin * 2;

        const imgProps = pdf.getImageProperties(imgData);
        const imgRatio = imgProps.height / imgProps.width;
        const imgHeight = usableWidth * imgRatio;

        pdf.addImage(
            imgData,
            'PNG',
            margin,
            margin,
            usableWidth,
            imgHeight > usableHeight ? usableHeight : imgHeight
        );

        pdf.save(`product_invoice_${BillNo}.pdf`);
    };


    if (loading) return <p>Loading...</p>;
    if (!invoiceData) return <p>No invoice found.</p>;

    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
            {/* Download Button */}
            <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                <button onClick={handleDownloadPDF} className="btn btn-success">
                    Download PDF
                </button>
            </div>

            {/* Invoice Section to convert to PDF */}
            <div ref={invoiceRef}>


                <div className="d-flex justify-content-between align-items-start mb-4">

                    <div className='company-details'>
                        {/* Title & Note */}
                        <img src='/assets/images/logo.png' alt="logo" width={100} height={100} />
                        <h6 className="fw-bold mb-0">QuoteVaani</h6>
                        <p className="text-muted">Daily Motivational Quotes Platform</p>
                    </div>

                    <div>
                        <h6 className="mb-1">Robotic SysInfo</h6>
                        <p>GST: 06CDBPS7489B1ZB</p>
                        <p className="mb-0 " style={{ width: 400 }}>Shad Complex, Railway Rd, near S.D. Model School, New Janta Market, Sadar Bazar, Karnal, Haryana 132001<br />
                        </p>
                    </div>

                    <div className="text-end">
                        <p className="mb-0">Invoice# {invoiceData?.billNo || '00000'}</p>
                        <p className="mb-0">Issue Date: {new Date(invoiceData?.createdAt).toLocaleDateString() || 'mm/dd/yyyy'}</p>
                    </div>
                </div>

                <hr />

                {/* Billing and Details */}
                <div className="d-flex justify-content-between align-items-start my-30">

                    <div className="customer-details-container">
                        <h6 className="fw-bold">BILL TO</h6>
                        <p className="mb-0">{invoiceData?.snapshot?.userName || 'Customer name'}</p>
                        <p className="mb-0">{invoiceData?.snapshot?.userEmail || 'Email address'}</p>
                        {/* <p className="mb-0">{farmer.phoneNumber || 'Phone number'}</p>
                        <p className="mb-0">{farmer.address || 'Street address'}</p>
                        <p className="mb-0">{farmer.state}</p>
                        <p className="mb-0">{farmer.city_district}</p>
                        <p className="mb-0">{farmer.registrationNumber || 'Reg No.'}</p> */}
                    </div>

                </div>

                <hr />

                <h6 style={{ marginTop: '2rem' }}>Order Details</h6>
                <table style={tableStyle}>
                    <thead>

                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={cellStyle}>Order ID</th>
                            <th style={cellStyle}>Product</th>
                            <th style={cellStyle}>Price</th>
                            <th style={cellStyle}>GST</th>
                            <th style={cellStyle}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={cellStyle}>{invoiceData?.billNo}</td>
                            <td style={cellStyle}>{invoiceData?.snapshot?.productName}</td>
                            <td style={cellStyle}>₹{invoiceData?.snapshot?.priceValue}</td>
                            <td style={cellStyle}>{invoiceData?.gstAmount}</td>
                            <td style={cellStyle}>{invoiceData?.totalPrice}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    );
};

const cellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '2rem',
    border: '1px solid #ccc',
};

export default RedeemProductInvoice;
