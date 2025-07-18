// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { jsPDF } from 'jspdf';
// import { useRouter, useSearchParams } from 'next/navigation';
// import axios from 'axios';

// export default function LabReportForm() {
//     const searchParams = useSearchParams();
//     const patientId = searchParams.get('patientID');
//     const router = useRouter();

//     const { register, handleSubmit, formState: { errors }, setValue } = useForm();
//     const [incubPeriod, setIncubPeriod] = useState('');
//     useEffect(() => {
//         if (patientId) {
//             axios.get(`http://localhost:3001/user/${patientId}`)
//                 .then((response) => {
//                     console.log(response);
//                     const data = response.data.patient;
//                     console.log(data);
//                     if (data) {
//                         document.getElementById('name').innerText = data.name || 'dds';
//                         document.getElementById('ageSex').innerText = `${data.age}/${data.gender}` || '';
//                         document.getElementById('mrn').innerText = data._id || '';
//                         document.getElementById('collectedOn').innerText = new Date(data.admission_date).toISOString().split("T")[0];
//                         document.getElementById('completedOn').innerText = new Date(data.discharge_date).toISOString().split("T")[0];
//                         document.getElementById('dept').innerText = data.admittingDepartment || 'G1 & Hepato-Pancreatico-Biliary Surgery';
//                         document.getElementById('docname').innerText = data.surgeon || 'Dr Smith Mathew';
//                         document.getElementById('visitType').innerText = data.visitType || 'IP';
//                         document.getElementById('sampleNo').innerText = data.patient_id || '';
//                         document.getElementById('testName').innerText = data.procedure_name || '';
//                         document.getElementById('comments').innerText = data.comments || '';
//                         document.getElementById('diabietic').innerText = data.diabietic || '';
//                         console.log(response.data.prediction);
//                         if (response.data.prediction) 
//                             {

//                                 const pred = response.data.prediction;
    
//                                 // Show meaningful prediction text
//                                 document.getElementById('type').innerText = pred.prediction_text || 'Unknown';
    
//                                 // Add risk level display
//                                 const riskElement = document.getElementById('risk_level') || document.createElement('span');
//                                 riskElement.innerText = `Risk Level: ${pred.risk_level} (${(pred.probability_positive * 100).toFixed(1)}%)`;
    
//                                 // Add confidence display  
//                                 const confidenceElement = document.getElementById('confidence') || document.createElement('span');
//                                 confidenceElement.innerText = `Confidence: ${(pred.confidence * 100).toFixed(1)}%`;
    
//                                 // Color code the risk
//                                 if (pred.risk_level === 'High') 
//                                     {

//                                         riskElement.style.color = 'red';
//                                     } 
//                                 else if (pred.risk_level === 'Medium') 
//                                     {
//                                         riskElement.style.color = 'orange';
//                                     } 
//                                 else 
//                                     {
//                                         riskElement.style.color = 'green';
//                                     }
// } else {
//     document.getElementById('type').innerText = 'Prediction not available';
// }
//                         // document.getElementById('type').innerText = response.data.prediction.prediction;

//                         if (data?.times?.induction && data?.times?.surgeryEnd) {
//                             const inductionTime = data.times.induction.trim();
//                             const surgeryEndTime = data.times.surgeryEnd.trim();

//                             try {
//                                 const inductionDate = new Date(`1970-01-01T${inductionTime}:00`);
//                                 const surgeryEndDate = new Date(`1970-01-01T${surgeryEndTime}:00`);

//                                 if (isNaN(inductionDate) || isNaN(surgeryEndDate)) {
//                                     console.error("Invalid date format:", inductionTime, surgeryEndTime);
//                                     return;
//                                 }

//                                 const diffInMs = surgeryEndDate - inductionDate;
//                                 const adjustedDiffInMs = diffInMs >= 0 ? diffInMs : diffInMs + 24 * 60 * 60 * 1000;
//                                 const diffInHours = adjustedDiffInMs / (1000 * 60 * 60);

//                                 setIncubPeriod(`${Math.round(diffInHours)} hrs`);
//                             } catch (error) {
//                                 console.error("Error in calculation:", error);
//                             }
//                         } else {
//                             console.error("Missing or invalid times:", data?.times);
//                         }

//                     }
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching patient data:', error);
//                 });
//         }
//     }, [patientId, setValue]);



//     const onSubmit = (data) => {
//         console.log('Form submitted with:', data);
//     };

//     const generatePDF = () => {
//         const doc = new jsPDF();
    
//         // Set title
//         doc.setFontSize(18);
//         doc.text('Department of Laboratory Medicine - Microbiology', 14, 20);
    
//         // Add Patient Information
//         doc.setFontSize(14);
//         doc.text('Patient Information:', 14, 30);
//         doc.text(`Name: ${document.getElementById('name').innerText || '---'}`, 14, 40);
//         doc.text(`Age/Sex: ${document.getElementById('ageSex').innerText || '---'}`, 14, 50);
//         doc.text(`MRN: ${document.getElementById('mrn').innerText || '---'}`, 14, 60);
//         doc.text(`Department: ${document.getElementById('dept').innerText || '---'}`, 14, 70);
//         doc.text(`Consulting Doctor: ${document.getElementById('docname').innerText || '---'}`, 14, 80);
//         doc.text(`Diabetic: ${document.getElementById('diabietic').innerText || '---'}`, 14, 90);
//         doc.text(`Visit Type: ${document.getElementById('visitType').innerText || '---'}`, 14, 100);
//         doc.text(`Specimen Collected On: ${document.getElementById('collectedOn').innerText || '---'}`, 14, 110);
//         doc.text(`Specimen Completed On: ${document.getElementById('completedOn').innerText || '---'}`, 14, 120);
//         doc.text(`Sample No: ${document.getElementById('sampleNo').innerText || '---'}`, 14, 130);
    
//         // Add Test and Sample Information
//         doc.text('Test and Sample Information:', 14, 150);
//         doc.text(`Test Name: ${document.getElementById('testName').innerText || '---'}`, 14, 160);
//         doc.text(`Incubation Period: ${document.getElementById('incubPeriod').innerText || '---'}`, 14, 170);
    
//         // Add Identifications
//         doc.text('Possible Identifications:', 14, 190);
//         const identifications = [
//             { model: 'Random Forest', type: document.getElementById('type').innerText || '---' },
//             { model: 'XGBoost', type: '---' } // Placeholder for example
//         ];
    
//         identifications.forEach((id, index) => {
//             doc.text(`${index + 1}. Model: ${id.model}, Type: ${id.type}`, 14, 200 + index * 10);
//         });
    
//         // Add Antibiotic Susceptibility
//         doc.text('Antibiotic Susceptibility:', 14, 230);
//         const antibiotics = [
//             'Gentamicin', 
//             'Amikacin', 
//             'Netilmicin', 
//             'Ciprofloxacin', 
//             'Levofloxacin', 
//             'Trimethoprim/Sulfamethoxazole'
//         ];
    
//         antibiotics.forEach((antibiotic, index) => {
//             const interpretation = document.getElementById(`interpretation_${antibiotic}`).innerText || '---';
//             doc.text(`${antibiotic}: ${interpretation}`, 14, 240 + index * 10);
//         });
    
//         // Add Comments
//         const comments = document.getElementById('comments').value || '---';
//         doc.text('Comments:', 14, 300);
//         doc.text(comments, 14, 310);
    
//         // Save the PDF
//         doc.save('LabReport.pdf');
//     };
    

//     const handleFormSubmit = () => {
//         router.push('/Dashboard'); // Adjust route as necessary
//     };

//     return (
//         <div className='bg-teal-100 text-teal-800'>
//             <div className="w-3/4 mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
//                 <h1 className='text-4xl font-extrabold text-center'>Department of Laboratory Medicine - Microbiology</h1>
//                 <form onSubmit={handleSubmit(onSubmit)}>

//                     {/* Patient Details Table */}
//                     <h2 className="text-xl font-semibold mt-4">Patient Information</h2>
//                     <table className="w-full mt-4 border border-gray-300">
//                         <tbody>
//                             <tr>
//                                 <td className="border px-4 py-2"><span className="font-bold">Name:</span></td>
//                                 <td className="border px-4 py-2"><span id="name"></span></td>
//                                 <td className="border px-4 py-2"><span className="font-bold">Department:</span></td>
//                                 <td className="border px-4 py-2"><span id="dept">G1 & Hepato-Pancreatico-Biliary Surgery</span></td>
//                             </tr>
//                             <tr>
//                                 <td className="border px-4 py-2"><span className="font-bold">Age/Sex:</span></td>
//                                 <td className="border px-4 py-2"><span id="ageSex">25/M</span></td>
//                                 <td className="border px-4 py-2"><span className="font-bold">Consulting Doctor:</span></td>
//                                 <td className="border px-4 py-2"><span id="docname">Dr Smith Mathew</span></td>
//                             </tr>
//                             <tr>
//                                 <td className="border px-4 py-2"><span className="font-bold">MRN:</span></td>
//                                 <td className="border px-4 py-2"><span id="mrn">123456789</span></td>
//                                 <td className="border px-4 py-2"><span className="font-bold">Diabetic:</span></td>
//                                 <td className="border px-4 py-2"><span id="diabietic">Yes</span></td>
//                             </tr>
//                             <tr>
//                                 <td className="border px-4 py-2"><span className="font-bold">Visit Type:</span></td>
//                                 <td className="border px-4 py-2"><span id="visitType">IP</span></td>
//                                 <td className="border px-4 py-2"><span className="font-bold">Specimen Collected On:</span></td>
//                                 <td className="border px-4 py-2"><span id="collectedOn">---</span></td>
//                             </tr>
//                             <tr>
//                                 <td className="border px-4 py-2"><span className="font-bold">Sample No:</span></td>
//                                 <td className="border px-4 py-2"><span id="sampleNo">32112</span></td>
//                                 <td className="border px-4 py-2"><span className="font-bold">Specimen Completed On:</span></td>
//                                 <td className="border px-4 py-2"><span id="completedOn">---</span></td>
//                             </tr>
//                         </tbody>
//                     </table>


//                     {/* Test and Sample Information Table */}
//                     <h2 className="text-xl font-semibold mt-4">Test and Sample Information</h2>
//                     <table className="w-full mt-4">
//                         <tbody>
//                             <tr>
//                                 <td className="font-bold">Test Name:</td>
//                                 <td><span id="testName">AEROBIC C & S</span></td>
//                             </tr>
//                             <tr>
//                                 <td className="font-bold">Incubation Period:</td>
//                                 <td><span id="incubPeriod">{incubPeriod || 'N/A'}</span></td>
//                             </tr>
//                         </tbody>
//                     </table>

//                     {/* Identifications Table */}
//                     <h2 className="text-xl font-semibold mt-4">Possible Identifications</h2>
//                     <table className="w-full mt-4 border-collapse border border-gray-300">
//                         <thead className="bg-gray-400">
//                             <tr>
//                                 <th className="text-left px-4 py-2 border">S No.</th>
//                                 <th className="text-left px-4 py-2 border">Infection Details</th>
//                                 <th className="text-left px-4 py-2 border">Additional Info</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td className="w-2/12 font-medium text-left px-4 py-2 border">
//                                     <span>1 (Random Forest)</span>
//                                 </td>
//                                 <td className="text-left px-4 py-2 border">
//                                     <span>Surgical Site Infection</span>
//                                 </td>
//                                 <td className="text-left px-4 py-2 border">
//                                     <span id='type'>---</span>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td className="w-2/12 font-medium text-left px-4 py-2 border">
//                                     <span>2 (XGBoost)</span>
//                                 </td>
//                                 <td className="text-left px-4 py-2 border">
//                                     <span>Surgical Site Infection</span>
//                                 </td>
//                                 <td className="text-left px-4 py-2 border">
//                                     <span>---</span>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>



//                     {/* Antibiotic Susceptibility Table */}
//                     <h2 className="text-xl font-semibold mt-4">Antibiotic Susceptibility</h2>
//                     <table className="w-full mt-4 table-auto border-collapse border border-gray-300">
//                         <thead className="bg-gray-400">
//                             <tr>
//                                 <th className="text-left px-4 py-2 border">Antibiotic</th>

//                                 <th className="text-left px-4 py-2 border">Interpretation</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {['Gentamicin', 'Amikacin', 'Netilmicin', 'Ciprofloxacin', 'Levofloxacin', 'Trimethoprim/Sulfamethoxazole'].map((antibiotic, index) => (
//                                 <tr key={index}>
//                                     <td className="px-4 py-2 border">{antibiotic}</td>
//                                     <td className="px-4 py-2 border">
//                                         <span id={`interpretation_${antibiotic}`}>
//                                             {['Sensitive', 'Resistant', 'Intermediate', 'Sensitive', 'Resistant', 'Intermediate'][index]}
//                                         </span>
//                                     </td>
//                                 </tr>
//                             ))}

//                         </tbody>
//                     </table>

//                     {/* Comments Section */}
//                     <h2 className="text-xl font-semibold mt-4">Comments</h2>
//                     <textarea
//                         id="comments"
//                         rows="4"
//                         className="w-full p-2 mt-2 border rounded-md"
//                         placeholder="Enter comments here"
//                     ></textarea>

//                     {/* Buttons */}
//                     <div className="mt-6">
//                         <button
//                             onClick={generatePDF}
//                             className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
//                         >
//                             Generate PDF
//                         </button>
//                         <button
//                             type="button"
//                             onClick={handleFormSubmit}
//                             className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
//                         >
//                             Submit
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { jsPDF } from 'jspdf';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function LabReportForm() {
    const searchParams = useSearchParams();
    const patientId = searchParams.get('patientID');
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [incubPeriod, setIncubPeriod] = useState('');
    const [predictionData, setPredictionData] = useState(null);
    
    useEffect(() => {
        if (patientId) {
            axios.get(`http://localhost:3001/user/${patientId}`)
                .then((response) => {
                    console.log(response);
                    const data = response.data.patient;
                    console.log(data);
                    if (data) {
                        document.getElementById('name').innerText = data.name || 'dds';
                        document.getElementById('ageSex').innerText = `${data.age}/${data.gender}` || '';
                        document.getElementById('mrn').innerText = data._id || '';
                        document.getElementById('collectedOn').innerText = new Date(data.admission_date).toISOString().split("T")[0];
                        document.getElementById('completedOn').innerText = new Date(data.discharge_date).toISOString().split("T")[0];
                        document.getElementById('dept').innerText = data.admittingDepartment || 'G1 & Hepato-Pancreatico-Biliary Surgery';
                        document.getElementById('docname').innerText = data.surgeon || 'Dr Smith Mathew';
                        document.getElementById('visitType').innerText = data.visitType || 'IP';
                        document.getElementById('sampleNo').innerText = data.patient_id || '';
                        document.getElementById('testName').innerText = data.procedure_name || '';
                        document.getElementById('comments').innerText = data.comments || '';
                        document.getElementById('diabietic').innerText = data.diabietic || '';
                        
                        console.log(response.data.prediction);
                        if (response.data.prediction) {
                            const pred = response.data.prediction;
                            setPredictionData(pred);
                            
                            // Enhanced prediction display with all details
                            const predictionHTML = `
                                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 5px 0;">
                                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                        <span style="font-size: 18px; font-weight: bold; margin-right: 10px;">${pred.prediction_text}</span>
                                        <span style="padding: 4px 12px; border-radius: 15px; color: white; font-size: 12px; font-weight: bold; 
                                                     background: ${pred.risk_level === 'High' ? '#ff6b6b' : 
                                                                  pred.risk_level === 'Medium' ? '#ffa726' : '#66bb6a'};">
                                            ${pred.risk_level} Risk
                                        </span>
                                    </div>
                                    <div style="margin-bottom: 8px;">
                                        <strong>Infection Probability:</strong> 
                                        <span style="color: ${pred.probability_positive > 0.6 ? 'red' : pred.probability_positive > 0.3 ? 'orange' : 'green'}; font-weight: bold;">
                                            ${(pred.probability_positive * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div style="margin-bottom: 8px;">
                                        <strong>Model Confidence:</strong> ${(pred.confidence * 100).toFixed(1)}%
                                    </div>
                                    <div style="margin-bottom: 8px;">
                                        <strong>Clinical Recommendation:</strong> 
                                        <span style="font-style: italic; color: #555;">
                                            ${pred.risk_level === 'High' ? '🔴 Immediate monitoring and preventive measures recommended' : 
                                              pred.risk_level === 'Medium' ? '🟡 Enhanced monitoring protocols advised' : 
                                              '🟢 Standard post-operative care sufficient'}
                                        </span>
                                    </div>
                                    <div style="margin-top: 10px; padding: 8px; background: #e9ecef; border-radius: 4px; font-size: 12px;">
                                        <strong>Risk Factors Analyzed:</strong> Age: ${pred.input_processed?.Age}, BMI: ${pred.input_processed?.BMI}, 
                                        Diabetes: ${pred.input_processed?.Diabetes_Status}, Surgery: ${pred.input_processed?.Procedure_Name}
                                    </div>
                                </div>
                            `;
                            
                            document.getElementById('type').innerHTML = predictionHTML;
                            
                        } else {
                            document.getElementById('type').innerHTML = `
                                <div style="background: #fff3cd; padding: 10px; border-radius: 4px; color: #856404;">
                                    ⚠️ ML Prediction not available - Manual assessment required
                                </div>
                            `;
                        }

                        if (data?.times?.induction && data?.times?.surgeryEnd) {
                            const inductionTime = data.times.induction.trim();
                            const surgeryEndTime = data.times.surgeryEnd.trim();

                            try {
                                const inductionDate = new Date(`1970-01-01T${inductionTime}:00`);
                                const surgeryEndDate = new Date(`1970-01-01T${surgeryEndTime}:00`);

                                if (isNaN(inductionDate) || isNaN(surgeryEndDate)) {
                                    console.error("Invalid date format:", inductionTime, surgeryEndTime);
                                    return;
                                }

                                const diffInMs = surgeryEndDate - inductionDate;
                                const adjustedDiffInMs = diffInMs >= 0 ? diffInMs : diffInMs + 24 * 60 * 60 * 1000;
                                const diffInHours = adjustedDiffInMs / (1000 * 60 * 60);

                                setIncubPeriod(`${Math.round(diffInHours)} hrs`);
                            } catch (error) {
                                console.error("Error in calculation:", error);
                            }
                        } else {
                            console.error("Missing or invalid times:", data?.times);
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error fetching patient data:', error);
                });
        }
    }, [patientId, setValue]);

    const onSubmit = (data) => {
        console.log('Form submitted with:', data);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
    
        // Set title
        doc.setFontSize(18);
        doc.text('Department of Laboratory Medicine - Microbiology', 14, 20);
    
        // Add Patient Information
        doc.setFontSize(14);
        doc.text('Patient Information:', 14, 30);
        doc.text(`Name: ${document.getElementById('name').innerText || '---'}`, 14, 40);
        doc.text(`Age/Sex: ${document.getElementById('ageSex').innerText || '---'}`, 14, 50);
        doc.text(`MRN: ${document.getElementById('mrn').innerText || '---'}`, 14, 60);
        doc.text(`Department: ${document.getElementById('dept').innerText || '---'}`, 14, 70);
        doc.text(`Consulting Doctor: ${document.getElementById('docname').innerText || '---'}`, 14, 80);
        doc.text(`Diabetic: ${document.getElementById('diabietic').innerText || '---'}`, 14, 90);
        doc.text(`Visit Type: ${document.getElementById('visitType').innerText || '---'}`, 14, 100);
        doc.text(`Specimen Collected On: ${document.getElementById('collectedOn').innerText || '---'}`, 14, 110);
        doc.text(`Specimen Completed On: ${document.getElementById('completedOn').innerText || '---'}`, 14, 120);
        doc.text(`Sample No: ${document.getElementById('sampleNo').innerText || '---'}`, 14, 130);
    
        // Add Test and Sample Information
        doc.text('Test and Sample Information:', 14, 150);
        doc.text(`Test Name: ${document.getElementById('testName').innerText || '---'}`, 14, 160);
        doc.text(`Incubation Period: ${document.getElementById('incubPeriod').innerText || '---'}`, 14, 170);
    
        // Add Enhanced ML Prediction Results
        doc.text('AI Prediction Analysis:', 14, 190);
        if (predictionData) {
            doc.text(`Prediction: ${predictionData.prediction_text}`, 14, 200);
            doc.text(`Risk Level: ${predictionData.risk_level}`, 14, 210);
            doc.text(`Infection Probability: ${(predictionData.probability_positive * 100).toFixed(1)}%`, 14, 220);
            doc.text(`Model Confidence: ${(predictionData.confidence * 100).toFixed(1)}%`, 14, 230);
            doc.text(`Recommendation: ${predictionData.risk_level === 'High' ? 'Immediate monitoring required' : 
                                      predictionData.risk_level === 'Medium' ? 'Enhanced monitoring advised' : 
                                      'Standard care sufficient'}`, 14, 240);
        } else {
            doc.text('ML Prediction not available', 14, 200);
        }
    
        // Add Antibiotic Susceptibility
        doc.text('Antibiotic Susceptibility:', 14, 260);
        const antibiotics = [
            'Gentamicin', 
            'Amikacin', 
            'Netilmicin', 
            'Ciprofloxacin', 
            'Levofloxacin', 
            'Trimethoprim/Sulfamethoxazole'
        ];
    
        antibiotics.forEach((antibiotic, index) => {
            const interpretation = document.getElementById(`interpretation_${antibiotic}`)?.innerText || '---';
            doc.text(`${antibiotic}: ${interpretation}`, 14, 270 + index * 10);
        });
    
        // Add Comments
        const comments = document.getElementById('comments').value || '---';
        doc.text('Comments:', 14, 340);
        doc.text(comments, 14, 350);
    
        // Save the PDF
        doc.save('LabReport.pdf');
    };

    const handleFormSubmit = () => {
        router.push('/Dashboard'); // Adjust route as necessary
    };

    return (
        <div className='bg-teal-100 text-teal-800'>
            <div className="w-3/4 mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
                <h1 className='text-4xl font-extrabold text-center'>Department of Laboratory Medicine - Microbiology</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Patient Details Table */}
                    <h2 className="text-xl font-semibold mt-4">Patient Information</h2>
                    <table className="w-full mt-4 border border-gray-300">
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2"><span className="font-bold">Name:</span></td>
                                <td className="border px-4 py-2"><span id="name"></span></td>
                                <td className="border px-4 py-2"><span className="font-bold">Department:</span></td>
                                <td className="border px-4 py-2"><span id="dept">G1 & Hepato-Pancreatico-Biliary Surgery</span></td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"><span className="font-bold">Age/Sex:</span></td>
                                <td className="border px-4 py-2"><span id="ageSex">25/M</span></td>
                                <td className="border px-4 py-2"><span className="font-bold">Consulting Doctor:</span></td>
                                <td className="border px-4 py-2"><span id="docname">Dr Smith Mathew</span></td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"><span className="font-bold">MRN:</span></td>
                                <td className="border px-4 py-2"><span id="mrn">123456789</span></td>
                                <td className="border px-4 py-2"><span className="font-bold">Diabetic:</span></td>
                                <td className="border px-4 py-2"><span id="diabietic">Yes</span></td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"><span className="font-bold">Visit Type:</span></td>
                                <td className="border px-4 py-2"><span id="visitType">IP</span></td>
                                <td className="border px-4 py-2"><span className="font-bold">Specimen Collected On:</span></td>
                                <td className="border px-4 py-2"><span id="collectedOn">---</span></td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2"><span className="font-bold">Sample No:</span></td>
                                <td className="border px-4 py-2"><span id="sampleNo">32112</span></td>
                                <td className="border px-4 py-2"><span className="font-bold">Specimen Completed On:</span></td>
                                <td className="border px-4 py-2"><span id="completedOn">---</span></td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Test and Sample Information Table */}
                    <h2 className="text-xl font-semibold mt-4">Test and Sample Information</h2>
                    <table className="w-full mt-4">
                        <tbody>
                            <tr>
                                <td className="font-bold">Test Name:</td>
                                <td><span id="testName">AEROBIC C & S</span></td>
                            </tr>
                            <tr>
                                <td className="font-bold">Incubation Period:</td>
                                <td><span id="incubPeriod">{incubPeriod || 'N/A'}</span></td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Enhanced AI Analysis Section */}
                    <h2 className="text-xl font-semibold mt-4">🤖 AI Prediction Analysis</h2>
                    <div className="mt-4 p-4 bg-white border rounded-lg shadow-sm">
                        {predictionData && (
                            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                <h3 className="font-bold text-lg mb-2">Clinical Decision Support Summary</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><strong>Patient Profile:</strong> {predictionData.input_processed?.Age}yr, {predictionData.input_processed?.Gender}, {predictionData.input_processed?.Diabetes_Status === 'Yes' ? 'Diabetic' : 'Non-diabetic'}</div>
                                    <div><strong>Surgery Type:</strong> {predictionData.input_processed?.Procedure_Name}</div>
                                    <div><strong>BMI Category:</strong> {predictionData.input_processed?.BMI > 30 ? 'Obese' : predictionData.input_processed?.BMI > 25 ? 'Overweight' : 'Normal'}</div>
                                    <div><strong>Wound Classification:</strong> {predictionData.input_processed?.Wound_Class}</div>
                                </div>
                            </div>
                        )}
                        
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-400">
                                <tr>
                                    <th className="text-left px-4 py-2 border">Model</th>
                                    <th className="text-left px-4 py-2 border">Infection Type</th>
                                    <th className="text-left px-4 py-2 border">Detailed Analysis</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium text-left px-4 py-2 border">Random Forest</td>
                                    <td className="text-left px-4 py-2 border">Surgical Site Infection</td>
                                    <td className="text-left px-4 py-2 border">
                                        <div id='type'>---</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-medium text-left px-4 py-2 border">XGBoost</td>
                                    <td className="text-left px-4 py-2 border">Surgical Site Infection</td>
                                    <td className="text-left px-4 py-2 border">
                                        <div className="text-gray-500 italic">Model not available</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Antibiotic Susceptibility Table */}
                    <h2 className="text-xl font-semibold mt-4">Antibiotic Susceptibility</h2>
                    <table className="w-full mt-4 table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-400">
                            <tr>
                                <th className="text-left px-4 py-2 border">Antibiotic</th>
                                <th className="text-left px-4 py-2 border">Interpretation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {['Gentamicin', 'Amikacin', 'Netilmicin', 'Ciprofloxacin', 'Levofloxacin', 'Trimethoprim/Sulfamethoxazole'].map((antibiotic, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border">{antibiotic}</td>
                                    <td className="px-4 py-2 border">
                                        <span id={`interpretation_${antibiotic}`}>
                                            {['Sensitive', 'Resistant', 'Intermediate', 'Sensitive', 'Resistant', 'Intermediate'][index]}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Comments Section */}
                    <h2 className="text-xl font-semibold mt-4">Comments</h2>
                    <textarea
                        id="comments"
                        rows="4"
                        className="w-full p-2 mt-2 border rounded-md"
                        placeholder="Enter comments here"
                    ></textarea>

                    {/* Buttons */}
                    <div className="mt-6">
                        <button
                            onClick={generatePDF}
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                        >
                            Generate PDF
                        </button>
                        <button
                            type="button"
                            onClick={handleFormSubmit}
                            className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}