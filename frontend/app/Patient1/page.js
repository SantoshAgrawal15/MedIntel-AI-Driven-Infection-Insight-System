'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import html2pdf from 'html2pdf.js';
import { Suspense } from 'react';
export default function Patient() {



  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");


  const calculateBMI = (height, weight) => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const calculatedBMI = (weight / (heightInMeters ** 2)).toFixed(2);
      setBMI(calculatedBMI);
    }
    else {
      setBMI("");
    }
  }

  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    bmi: '',
    diabietic: '',
    gender: '',
    dateOfAdmission: '',
    dateOfDischarge: '',
    admittingDepartment: '',
    departmentSurgeon: '',
    procedureName: '',
    diagnosis: '',
    surgeon: '',
    theatre: '',
    outpatientProcedure: '',
    scenarioProcedure: '',
    woundClass: '',
    papGiven: '',
    antibioticsGiven: '',
    durationOfPAP: '',
    ssiEventOccurred: '',
    eventDate: '',
  });

  const procedures = [
    "Abdominal aortic aneurysm repair",
    "Limb amputation",
    "Appendix surgery",
    "Shunt for dialysis",
    "Bile duct, liver or pancreatic surgery",
    "Carotid endarterectomy",
    "Gallbladder surgery",
    "Colon surgery",
    "Cesarean section",
    "Gastric surgery",
    "Heart transplant",
    "Abdominal hysterectomy",
    "Kidney transplant",
    "Laminectomy",
    "Liver transplant",
    "Neck surgery",
    "Kidney surgery",
    "Ovarian surgery",
    "Prostate surgery",
    "Rectal surgery",
    "Small bowel surgery",
    "Spleen surgery",
    "Thoracic surgery",
    "Thyroid and/or parathyroid surgery",
    "Vaginal hysterectomy",
    "Exploratory laparotomy",
    "Breast surgery",
    "Cardiac surgery",
    "Coronary artery bypass graft with both chest and donor site incisions",
    "Coronary artery bypass graft with chest incision only",
    "Craniotomy",
    "Spinal fusion",
    "Open reduction of fracture",
    "Herniorrhaphy",
    "Hip prosthesis",
    "Knee prosthesis",
    "Pacemaker surgery",
    "Peripheral vascular bypass surgery",
    "Ventricular shunt"
  ];

  const operationTheatres = [
    "OT NO. 1",
    "OT NO. 2",
    "OT NO. 3",
    "OT NO. 4",
    "OT NO. 5",
    "OT NO. 6",
    "OT NO. 7",
    "OT NO. 8",
    "OT NO. 9",
    "OT NO. 10",
    "OT NO. 11",
    "OT NO. 12",
    "ROBOTIC OT",
    "C-SEC OT",
    "MINOR OT",
    "COSMETOLOGY OT",
    "Others"
  ];

  const departments = [
    "Cardiothoracic Surgery",
    "Internal Medicine",
    "Anesthesia",
    "Cardiology",
    "Hemato-Oncology & Bone Marrow Transplant",
    "Liver Transplant & Surgical Gastroenterology",
    "Oncology",
    "GI & Hepato-Pancreatico-Biliary Surgery",
    "Critical Care",
    "Pulmonary Medicine & Critical Care",
    "Radiodiagnosis & Imaging",
    "Nephrology",
    "Urology & Renal Transplant",
    "Plastic & Aesthetic Surgery",
    "Gastroenterology",
    "Orthopedics & Joint Replacement",
    "NeuroSciences",
    "Pediatric",
    "Laboratory Medicine",
    "Endocrinology",
    "General & Minimally Access Surgery",
    "Obstetrics & Gynaecology",
    "Dental Department",
    "Nuclear Medicine",
    "Dermatology",
    "Rheumatology",
    "IVF & Reproductive Medicine",
    "Orthopedic Spine",
    "Medical Services",
    "Ophthalmology",
    "ENT",
    "Behavioral Sciences",
    "Onco Surgery"
  ];

  const surgeons = [
    "Manoj Luthra", "Vinay Labroo", "Ramesh Gourishankar", "Biswajit Paul", "Brig (Dr.) Satyaranjan Das",
    "Karisangal Vasudevan Ramaswamy", "(Col) Sunil Sofat", "Ashish Goel", "Rajesh Kapoor", "Shalendra Goel",
    "Gyanendra Agrawal", "Chandra Prakash Singh Chauhan", "Anil Prasad Bhatt", "Amit Kumar Devra",
    "Ashish Rai", "Manik Sharma", "B. L. Agarwal", "Vijay Kumar Sinha", "Sumit Bhushan Sharma", "Rohan Sinha",
    "Dinesh Rattnani", "Ashu Sawhney", "Suryasnata Das", "(Col) Vimal Upreti", "Nidhi Malhotra", "Manish Gupta",
    "Abhishek Goyal", "Poonam Yadav", "Praveen Kumar", "Reenu Jain", "Abhishek Gulia", "Kishore Das", "Pooja Goel",
    "Suhas Singla", "Asfaq Khan", "Shalini Sharma", "Sharique Ahmed", "Deepak Singhal", "Smita Sharma",
    "Pankaj Kumar Goyal", "Sakshi Srivastava", "Suvrat Arya", "Soma Singh", "Devender Chhonker", "Pramod Saini",
    "Lok Prakash Choudhary", "Dhirendra Pratap Singh Yadav", "Ashish Kumar Govil", "Atul Sharma", "Mansoor Ahmed Siddiqui",
    "Krishnanu Dutta Choudhury", "Mrinmay Kumar Das", "Minal Singh", "Anshul Jain", "Swapnil Yashwant Gajway",
    "Ashish Soni", "Kapil Kumar", "Abhinav Kumar", "Hema Rattnani", "Vikash Nayak", "Naveen Prakash Verma",
    "Bhupender Singh", "Aditya Bhatla", "Shovna Veshnavi", "Purnima Sahni Sood", "(Col) Subodh Kumar", "Shweta Goswami",
    "Sunita Maheshwari", "Atul K Maheshwari", "Sharad Dev", "Vikram Singh Solanki", "Radha Agartaniya", "Mithee Bhanot",
    "Vibha Bansal", "Rashmi Vyas", "Richa Thukral", "Nischal Anand", "Abhishek", "Vikram Bhardwaj", "Devashish Sharma",
    "Aastha Gupta", "Dipali Taneja", "Priyadarshi Jitendra Kumar", "Priyanka Srivastava", "Manasi Mehra", "Anita Singla",
    "Abhishek Kumar", "Parul Singhal", "Prerna Sharma", "Shweta Gupta", "Kumari Madhulika", "Jyoti Jain", "Sanjay Sharma",
    "Sandeep Yadav", "Sonalika Singh Chauhan", "Meenakshi Maurya", "Manisha Ranjan", "Pankaj Kumar", "Rohit Kumar Pandey",
    "Deepshikha", "Meenakshi", "Arti Yadav", "Anjali Gupta", "Rajesh Prasad Gupta", "Abhay Kumar Singh", "Raman Mehta",
    "Abhishek Dave", "Preeti Deolwari", "Abhijeet Kotabagi", "Chandrika", "Parineeta Maria", "Soma Singh", "Rakhi Gupta"
  ];
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('pdfContent');
    html2pdf()
      .set({
        margin: 1,
        filename: `Patient_Form_${formData.patientName || 'Unnamed'}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Request Body: 1", formData);
      const response = await fetch('http://localhost:3001/general', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.patientName,
          age: formData.age,
          email: formData.email,
          diabietic: formData.diabietic,  
          height: height,
          weight: weight,
          bmi: bmi,
          gender: formData.gender,
          admission_date: formData.dateOfAdmission,
          discharge_date: formData.dateOfDischarge,
          admittingDepartment: formData.admittingDepartment,
          procedure_name: formData.procedureName,
          surgeon: formData.surgeon,
          theatre: formData.theatre,
          wound_class: formData.woundClass,
          pap_given: formData.papGiven,
          antibiotics_given: formData.antibioticsGiven,
          ssi_event_occurred: formData.ssiEventOccurred,
          event_date: formData.eventDate,
          duration_of_pap: formData.durationOfPAP,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data submitted successfully:', data);
        console.log('Login successful:', data._id);
        router.push(`/Patient2?patientID=${data.patient_id}`);

      } else {
        console.log('Login failed');
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        alert(errorData.Error || 'Login failed');
      }
    } catch (error) {
      console.log('Network or other error during login is working is :', error);
      alert('An error occurred while logging in. Please try againwjehcbiqwu.');
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <div className='bg-teal-100 text-teal-800'>
          <form onSubmit={handleSubmit} style={styles.container} className='bg-gray-100'>
            <div id="pdfContent">
              <h2 className="text-xl font-semibold text-center mb-6">Surgical Site Infection Surveillance Form</h2>

              <div className="mb-4">
                <label htmlFor="patientName" className="block text-teal-800 font-semibold mb-2">Patient Name:</label>
                <input type="text" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100" />
              </div>

              <div className="flex justify-between mb-4">
                
                <div className="w-1/2 pr-2">
                  <label htmlFor="email" className="block text-teal-800 font-semibold mb-2">Email Id:</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100" />
                </div>
                <div className="w-1/2 pl-2">
                  <label htmlFor="age" className="block text-teal-800 font-semibold mb-2">Age:</label>
                  <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100" />
                </div>
              </div>

              <div className="flex justify-between mb-4">

                <div className="w-1/2 pr-2">
                  <label htmlFor="weight" className="block text-teal-800 font-semibold mb-2">Weight (in kg):</label>
                  <input type="number" id="weight" name="weight" className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100"
                    value={weight}
                    onChange={(e) => {
                      const newWeight = e.target.value;
                      setWeight(newWeight);
                      calculateBMI(height, newWeight);
                    }}
                  />
                </div>

                <div className="w-1/2 pr-2">
                  <label htmlFor="height" className="block text-teal-800 font-semibold mb-2">Height (in cm):</label>
                  <input type="number" id="height" name="height" className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100"
                    value={height}
                    onChange={(e) => {
                      const newHeight = e.target.value;
                      setHeight(newHeight);
                      calculateBMI(newHeight, weight);
                    }}
                  />
                </div>

                <div className="w-1/2 pl-2">
                  <label htmlFor="bmi" className="block text-teal-800 font-semibold mb-2">BMI:</label>
                  <input type="text" id="bmi" name="bmi" className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100"
                    value={bmi}
                    disabled
                  />
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <div className="w-1/2 pr-2">
                  <div className="mb-4">
                    <label htmlFor="gender" className="block text-teal-800 font-semibold mb-2">Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100">
                      <option value="">-- Select Gender --</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="w-1/2 pl-2">
                  <div className="mb-4">
                    <label htmlFor="diabetic" className="block text-teal-800 font-semibold mb-2">Diabietic:</label>
                    <select id="diabietic" name="diabietic" value={formData.diabietic} onChange={handleChange} className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100">
                      <option value="">-- Choose--</option>
                      <option value="Yes">yes</option>
                      <option value="No">no</option>
                    </select>
                  </div>
                </div>
              </div>


              <div className="flex justify-between mb-4">
                <div className="w-1/2 pr-2">
                  <label htmlFor="dateOfAdmission" className="block text-teal-800 font-semibold mb-2">Date of Admission:</label>
                  <input type="date" id="dateOfAdmission" name="dateOfAdmission" value={formData.dateOfAdmission} onChange={handleChange} className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100" />
                </div>
                <div className="w-1/2 pl-2">
                  <label htmlFor="dateOfDischarge" className="block text-teal-800 font-semibold mb-2">Date of Procedure:</label>
                  <input type="date" id="dateOfDischarge" name="dateOfDischarge" value={formData.dateOfDischarge} onChange={handleChange} className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100 mb-2" />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="admittingDepartment" className="block text-teal-800 font-semibold mb-2">Admitting Department:</label>
                <select id="admittingDepartment" name="admittingDepartment" value={formData.admittingDepartment} onChange={handleChange} className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100">
                  <option value="">-- Select Department --</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="procedureName" className="block text-teal-800 font-semibold mb-2">Procedure Name:</label>
                <select id="procedureName" name="procedureName" value={formData.procedureName} onChange={handleChange} className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100 mb-2">
                  <option value="">-- Select Procedure --</option>
                  {procedures.map((procedure, index) => (
                    <option key={index} value={procedure}>{procedure}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="surgeon" className="block text-teal-800 font-semibold mb-2">Procedure Done By (Primary Surgeon):</label>
                <select id="surgeon" name="surgeon" value={formData.surgeon} onChange={handleChange} className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100 mb-2">
                  <option value="">-- Select Surgeon --</option>
                  {surgeons.map((surgeon, index) => (
                    <option key={index} value={surgeon}>{surgeon}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="theatre" className="block text-teal-800 font-semibold mb-2">Operation Theatre:</label>
                <select id="theatre" name="theatre" value={formData.theatre} onChange={handleChange} className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100 mb-2">
                  <option value="">-- Select Theatre --</option>
                  {operationTheatres.map((theatre, index) => (
                    <option key={index} value={theatre}>{theatre}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-teal-800 font-semibold mb-2">Wound Class:</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input type="radio" name="woundClass" value="clean" checked={formData.woundClass === "clean"} onChange={handleChange} className="form-radio text-indigo-600" />
                    <span className="ml-2">Clean</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="woundClass" value="cleanContaminated" checked={formData.woundClass === "cleanContaminated"} onChange={handleChange} className="form-radio text-indigo-600" />
                    <span className="ml-2">Clean Contaminated</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="woundClass" value="contaminated" checked={formData.woundClass === "contaminated"} onChange={handleChange} className="form-radio text-indigo-600" />
                    <span className="ml-2">Contaminated</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="woundClass" value="dirtyInfected" checked={formData.woundClass === "dirtyInfected"} onChange={handleChange} className="form-radio text-indigo-600" />
                    <span className="ml-2">Dirty/Infected</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-teal-800 font-semibold mb-2">SSI Event Occurred:</label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ssiYes"
                    name="ssiEventOccurred"
                    value="yes"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="ssiYes" className="mr-4">Yes</label>
                  <input
                    type="radio"
                    id="ssiNo"
                    name="ssiEventOccurred"
                    value="no"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="ssiNo">No</label>
                </div>
              </div>

              {formData.ssiEventOccurred === 'yes' && (
                <div className="mb-4">
                  <label htmlFor="eventDate" className="block text-teal-800 font-semibold mb-2">If Yes, Date of Event:</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100"
                  />
                </div>
              )}


              <div className="mb-4">
                <label className="block text-teal-800 font-semibold mb-2">Pre/Peri-operative Antibiotic Prophylaxis (PAP) given:</label>
                <div className="flex items-center">
                  <input type="radio" id="papYes" name="papGiven" value="yes" onChange={handleChange} className="mr-2" />
                  <label htmlFor="papYes" className="mr-4">Yes</label>
                  <input type="radio" id="papNo" name="papGiven" value="no" onChange={handleChange} className="mr-2" />
                  <label htmlFor="papNo">No</label>
                </div>
              </div>

              {formData.papGiven === 'yes' && (
                <div className="mb-4">
                  <div className="mb-2">
                    <label htmlFor="antibioticsGiven" className="block text-teal-800 font-semibold mb-2">If Yes, Antibiotics Given:</label>
                    <input type="text" id="antibioticsGiven" name="antibioticsGiven" value={formData.antibioticsGiven} onChange={handleChange} className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100" />
                  </div>
                  <div>
                    <label htmlFor="durationOfPAP" className="block text-teal-800 font-semibold mb-2">Duration of PAP:</label>
                    <input type="text" id="durationOfPAP" name="durationOfPAP" value={formData.durationOfPAP} onChange={handleChange} className="w-full border border-teal-800 rounded-md p-2 h-12 bg-emerald-100" />
                  </div>
                </div>
              )}

            </div>

            <div className="mt-6 flex justify-between">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Next</button>
              <button type="button" onClick={handleDownloadPDF} className="px-4 py-2 bg-green-500 text-white rounded-md">Download as PDF</button>
            </div>
          </form>
        </div>
      </>
    </Suspense>
  );
}

const styles = {
  container: {
    width: '75%',
    margin: '0 auto',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    color: '#374151',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    padding: '0.5rem',
    height: '3rem',
  },
  select: {
    width: '100%',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    padding: '0.5rem',
    height: '3rem',
    backgroundColor: 'white',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  halfWidth: {
    width: '48%',
  },
  radioGroup: {
    display: 'flex',
    gap: '1rem',
  },
  radioLabel: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  radio: {
    marginRight: '0.5rem',
  },
  buttonContainer: {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#2563eb',
    },
  },
  downloadButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#10b981',
    color: 'white',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#059669',
    },
  },
  conditionalFields: {
    marginTop: '1rem',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  successText: {
    color: '#10b981',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
};

const hoverStyles = {
  submitButton: {
    ...styles.submitButton,
    ':hover': {
      backgroundColor: '#2563eb',
      transform: 'translateY(-1px)',
      transition: 'all 0.2s ease',
    },
  },
  downloadButton: {
    ...styles.downloadButton,
    ':hover': {
      backgroundColor: '#059669',
      transform: 'translateY(-1px)',
      transition: 'all 0.2s ease',
    },
  },
};