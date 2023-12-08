import React, { ChangeEvent } from 'react';

interface QuestionsProps {
  formData: {
    softwareType: string;
    noIntegrationRequired: number;
    screens: number;
  };
  handleChangeInput: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleNextStep: () => void;
}

const Questions: React.FC<QuestionsProps> = ({ formData, handleChangeInput, handleNextStep }) => {
  const isFormValid = () => {
    const requiredFields = ['softwareType', 'noIntegrationRequired', 'screens'];

    return requiredFields.every((field) => formData[field] !== '' && formData[field] !== null && formData[field] !== undefined);
  };

  return (
    <div data-testid="questions" className="bg-lime-950 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Software Cost Estimation</h1>
        <form data-testid="questions-form">
          <div className="mb-4">
            <label className="block text-gray-500 text-xs font-semibold mb-2">
              What type of software are you developing?
              <select
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                name="softwareType"
                onChange={(e) => handleChangeInput(e)}
                value={formData.softwareType}
              >
                <option value="empty">-.-</option>
                <option value="web">Web Application</option>
                <option value="ios">Mobile App (iOS)</option>
                <option value="android">Mobile App (Android)</option>
                <option value="desktop">Desktop Application</option>
              </select>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 text-xs font-semibold mb-2">
              How many external systems will the software have? (i.e databases, or APIs)
              <input
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                type="number"
                name="noIntegrationRequired"
                onChange={(e) => handleChangeInput(e)}
                value={formData.noIntegrationRequired}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 text-xs font-semibold mb-2">
              How many screens will the software have?
              <input
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                type="number"
                name="screens"
                onChange={(e) => handleChangeInput(e)}
                value={formData.screens}
              />
            </label>
          </div>

          <div className="flex justify-center">
            <button
              className={`bg-green-500 hover-bg-green-600 text-white rounded-md px-4 py-2 transition duration-300 ${
                isFormValid() ? '' : 'cursor-not-allowed opacity-50'
              }`}
              type="button"
              onClick={handleNextStep}
              disabled={!isFormValid()}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Questions;
