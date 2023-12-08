import React, { useState } from 'react';

interface EstimateScreenProps {
  formData: {
    userName: string;
    userEmail: string;
    appDescription: string;
  };
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  handleSubmitFormData: () => void;
  totalCost: number;
  handleCostPerFPChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  costPerFP: number;
  saveData: () => void;
}

const EstimateScreen = ({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleNextStep,
  handleSubmitFormData,
  totalCost,
  handleCostPerFPChange,
  costPerFP,
  saveData,
}) => {
  const [formErrors, setFormErrors] = useState({
    userName: '',
    userEmail: '',
    appDescription: '',
  });

  const isFormValid = () => {
    let isValid = true;
    const errors = { ...formErrors };

    if (!formData.userName) {
      errors.userName = 'Please enter your name.';
      isValid = false;
    } else {
      errors.userName = '';
    }

    if (!formData.userEmail) {
      errors.userEmail = 'Please enter your email.';
      isValid = false;
    } else {
      // Basic email validation
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(formData.userEmail)) {
        errors.userEmail = 'Please enter a valid email.';
        isValid = false;
      } else {
        errors.userEmail = '';
      }
    }

    if (!formData.appDescription) {
      errors.appDescription = 'Please enter an app description.';
      isValid = false;
    } else {
      errors.appDescription = '';
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <div data-testid="estimate" className="bg-lime-950 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Estimation</h2>

        <p className="text-lg font-semibold text-gray-800 mb-4">Estimated Cost: {totalCost}</p>

        <div>
          <label className="text-gray-500 text-xs font-semibold block mb-2">Cost per FP:</label>
          <div className="relative flex items-center">
            <span className="mr-2 font-bold text-gray-700">{costPerFP}</span>
            <input
              type="range"
              min="1"
              max="1000"
              step="1"
              value={costPerFP}
              onChange={handleCostPerFPChange}
              className="w-full appearance-none h-3 rounded-full bg-blue-200 hocus:bg-blue-300 focus:outline-none focus:bg-blue-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-gray-500 text-xs font-semibold mb-2">
              Your Name
              <input
                type="text"
                name="userName"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={handleChangeInput}
                value={formData.userName}
              />
              <span className="text-red-500 text-xs">{formErrors.userName}</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 text-xs font-semibold mb-2">
              Your Email
              <input
                type="email"
                name="userEmail"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={handleChangeInput}
                value={formData.userEmail}
              />
              <span className="text-red-500 text-xs">{formErrors.userEmail}</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 text-xs font-semibold mb-2">
              App Description
              <textarea
                name="appDescription"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={handleChangeInput}
                value={formData.appDescription}
              />
              <span className="text-red-500 text-xs">{formErrors.appDescription}</span>
            </label>
          </div>

          <div className="flex justify-between">
            <button
              className="bg-green-900 hover:bg-green-600 text-white rounded-md px-4 py-2 transition duration-300"
              type="button"
              onClick={handlePrevStep}
            >
              Previous
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 transition duration-300"
              type="button"
              onClick={() => {
                if (isFormValid()) {
                  saveData();
                  handleNextStep();
                }
              }}
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EstimateScreen;
