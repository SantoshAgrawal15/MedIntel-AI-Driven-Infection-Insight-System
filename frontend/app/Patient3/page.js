'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AntibioticSurveillanceForm() {
  const searchParams = useSearchParams();
  const patientId = searchParams.get('patientID');
  const [formData, setFormData] = useState({
    priorAntibiotics: [{ name: '', route: '', duration: '', doses: '' }],
    prePeriAntibiotics: [{ name: '', route: '', duration: '', doses: '' }],
    postAntibiotics: [{ name: '', route: '', duration: '', doses: '' }],
    times: { induction: '', incision: '', surgeryEnd: '' },
  });

  const router = useRouter();

  // Antibiotic options for dropdown
  const antibiotics = [
    "Amoxicillin-clavulanic acid", "Amikacin", "Aztreonam", "Cefepime", "Ceftazidime",
    "Ceftriaxone", "Netilmicin", "Meropenem", "Imipenem", "Levofloxacin", "Norfloxacin",
    "Ciprofloxacin", "Cefoperazone/Sulbactum", "Ticarcillin/Clavulanic acid", "Piperacillin-tazobactum",
    "Ceftazidime/Avibactam", "Penicillin", "Oxacillin", "Gentamicin", "Tetracycline", "Clindamycin",
    "Vancomycin E STRIP", "Linezolid", "Teicoplanin", "Nitrofurantoin", "Erythromycin", "Cefoxitin",
    "Co-trimoxazole", "Netilmicin", "Ertapenem", "Chloramphenicol", "Fosfomycin", "Colistin E STRIP"
  ];

  const routes = ["I/V", "I/M", "S/C", "I/D", "P/O", "LOCAL APPLICATION", "SUB LINGUAL"];
  const doses = ['1', '2', '3', '4', '5'];
  // Update formData when patientId is available
  useEffect(() => {
    if (patientId) {
      setFormData((prevData) => ({ ...prevData, patientId }));
    }
  }, [patientId]);

  // Handle form input changes
  const handleChange = (e, index, section) => {
    console.log(e.target.name, e.target.value);
    const { name, value } = e.target;
    const newSection = [...formData[section]];
    newSection[index][name] = value;
    setFormData({ ...formData, [section]: newSection });
  };

  // Add a row
  const addRow = (section) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], { name: '', route: '', duration: '', doses: '' }],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("Request Body: 3", formData);
    // Send formData to the backend using a POST request
    try {
      const response = await fetch("http://localhost:3001/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle successful response
      if (response.ok) {
        const data = await response.json();
        console.log("Data submitted successfully:", data);
        router.push(`/LabReport?patientID=${patientId}`); // Redirect to Lab Report page on success
      } else {
        // Handle errors from the backend
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      // Handle any network errors
      console.error("Network error:", error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='bg-teal-100 text-teal-800'>
        <div className="w-3/4 mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Antibiotic Prescription Surveillance Form</h1>
          <form onSubmit={handleSubmit} method='POST' action="http://localhost:3001/patient">

            {/* Antibiotics Prior to Operation */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Antibiotics given Prior to operation</h2>
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Antibiotic Name</th>
                    <th className="border border-gray-300 p-2">Route of Admin.</th>
                    <th className="border border-gray-300 p-2">Duration</th>
                    <th className="border border-gray-300 p-2">No. of Doses</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.priorAntibiotics.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        <select
                          name="name"
                          value={row.name}
                          onChange={(e) => handleChange(e, index, 'priorAntibiotics')}
                          className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                        >
                          <option value="">Select Antibiotic</option>
                          {antibiotics.map((antibiotic, idx) => (
                            <option key={idx} value={antibiotic}>{antibiotic}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <select
                          name="route"
                          value={row.route}
                          onChange={(e) => handleChange(e, index, 'priorAntibiotics')}
                          className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                        >
                          <option value="">Select Route</option>
                          {routes.map((route, idx) => (
                            <option key={idx} value={route}>{route}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="duration"
                          placeholder="Duration"
                          value={row.duration}
                          onChange={(e) => handleChange(e, index, 'priorAntibiotics')}
                          className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <select
                          name="doses"
                          value={row.doses}
                          onChange={(e) => handleChange(e, index, 'priorAntibiotics')}
                          className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                        >
                          <option value="">Select Doses</option>
                          {doses.map((dose, idx) => (
                            <option key={idx} value={dose}>{dose}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={() => addRow('priorAntibiotics')}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Row for Prior Antibiotics
              </button>
            </div>

            {/* Antibiotics Pre/Peri-operatively */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Antibiotics given Pre/Perioperatively</h2>
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Antibiotic Name</th>
                    <th className="border border-gray-300 p-2">Route of Admin.</th>
                    <th className="border border-gray-300 p-2">Duration</th>
                    <th className="border border-gray-300 p-2">No. of Doses</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.prePeriAntibiotics.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        <select
                          name="name"
                          value={row.name}
                          onChange={(e) => handleChange(e, index, 'prePeriAntibiotics')}
                          className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                        >
                          <option value="">Select Antibiotic</option>
                          {antibiotics.map((antibiotic, idx) => (
                            <option key={idx} value={antibiotic}>{antibiotic}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <select
                          name="route"
                          value={row.route}
                          onChange={(e) => handleChange(e, index, 'prePeriAntibiotics')}
                          className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                        >
                          <option value="">Select Route</option>
                          {routes.map((route, idx) => (
                            <option key={idx} value={route}>{route}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="duration"
                          placeholder="Duration"
                          value={row.duration}
                          onChange={(e) => handleChange(e, index, 'prePeriAntibiotics')}
                          className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <select
                          name="doses"
                          value={row.doses}
                          onChange={(e) => handleChange(e, index, 'prePeriAntibiotics')}
                          className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                        >
                          <option value="">Select Doses</option>
                          {doses.map((dose, idx) => (
                            <option key={idx} value={dose}>{dose}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={() => addRow('prePeriAntibiotics')}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Row for Pre/Perioperatively Antibiotics
              </button>
            </div>

            {/* Antibiotics Post-operatively */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Antibiotics given Post-operatively</h2>
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Antibiotic Name</th>
                    <th className="border border-gray-300 p-2">Route of Admin.</th>
                    <th className="border border-gray-300 p-2">Duration</th>
                    <th className="border border-gray-300 p-2">No. of Doses</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.postAntibiotics.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        <select
                          name="name"
                          value={row.name}
                          onChange={(e) => handleChange(e, index, 'postAntibiotics')}
                          className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                        >
                          <option value="">Select Antibiotic</option>
                          {antibiotics.map((antibiotic, idx) => (
                            <option key={idx} value={antibiotic}>{antibiotic}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <select
                          name="route"
                          value={row.route}
                          onChange={(e) => handleChange(e, index, 'postAntibiotics')}
                          className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                        >
                          <option value="">Select Route</option>
                          {routes.map((route, idx) => (
                            <option key={idx} value={route}>{route}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name="duration"
                          placeholder="Duration"
                          value={row.duration}
                          onChange={(e) => handleChange(e, index, 'postAntibiotics')}
                          className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <select
                          name="doses"
                          value={row.doses}
                          onChange={(e) => handleChange(e, index, 'postAntibiotics')}
                          className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                        >
                          <option value="">Select Doses</option>
                          {doses.map((dose, idx) => (
                            <option key={idx} value={dose}>{dose}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                onClick={() => addRow('postAntibiotics')}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Row for Post-operatively Antibiotics
              </button>
            </div>
            {/* Time Fields */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Time Fields</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="induction" className="block text-gray-700">Time of Induction</label>
                  <input
                    type="time"
                    id="induction"
                    name="induction"
                    value={formData.times.induction}
                    onChange={(e) => setFormData({ ...formData, times: { ...formData.times, induction: e.target.value } })}
                    className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                  />
                </div>
                <div>
                  <label htmlFor="incision" className="block text-gray-700">Time of Incision</label>
                  <input
                    type="time"
                    id="incision"
                    name="incision"
                    value={formData.times.incision}
                    onChange={(e) => setFormData({ ...formData, times: { ...formData.times, incision: e.target.value } })}
                    className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                  />
                </div>
                <div>
                  <label htmlFor="surgeryEnd" className="block text-gray-700">End Time of Surgery</label>
                  <input
                    type="time"
                    id="surgeryEnd"
                    name="surgeryEnd"
                    value={formData.times.surgeryEnd}
                    onChange={(e) => setFormData({ ...formData, times: { ...formData.times, surgeryEnd: e.target.value } })}
                    className="w-full border border-teal-800 rounded-md p-2 bg-emerald-100"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">Submit Form</button>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  );
}


