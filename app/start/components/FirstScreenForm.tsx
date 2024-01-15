import React, { ChangeEvent } from 'react';

type InitialFormData = {
  softwareType: string;
  noIntegrationRequired: number;
  screens: number;
  backupRecovery: number;
  dataCommunication: number;
  distributedProcessing: number;
  performance: number;
  operationalEnvironment: number;
  dataEntry: number;
  multipleScreenEntry: number;
  masterFiles: number;
  complexFiles: number;
  internalProcessing: number;
  reusableCode: number;
  conversion: number;
  multipleInstallation: number;
  easyUse: number;
  firstScreenName: string;
  firstInputFields: number;
  firstDataComplexity: "high" | "average" | "low";
  secondScreenName: string;
  secondInputFields: number;
  secondDataComplexity: "high" | "average" | "low";
  userName: string;
  userEmail: string;
  appDescription: string;
};

interface FirstScreenFormProps {
  formData: InitialFormData
  handleChangeInput: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handlePrevStep: () => void;
  handleNextStep: () => void;
}

const FirstScreenForm: React.FC<FirstScreenFormProps> = ({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleNextStep,
}) => {
  const isFormValid = () => {
    return (
      formData.firstScreenName !== '' &&
      formData.firstInputFields !== 0
    );
  };

  return (
    <div data-testid="first" className="bg-lime-950 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">First Screen</h2>
        <form data-testid="firstScreen-form">
          <div className="mb-4">
            <label className="block text-gray-500 text-xs font-semibold mb-2">
              Screen Name
              <input
                type="text"
                name="firstScreenName"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={(e) => handleChangeInput(e)}
                value={formData.firstScreenName}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 text-xs font-semibold mb-2">
              Number of Input Fields
              <input
                type="number"
                name="firstInputFields"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={(e) => handleChangeInput(e)}
                value={formData.firstInputFields}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 text-xs font-semibold mb-2">
              How complex is the data processing?
              <select
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                name="firstDataComplexity"
                onChange={(e) => handleChangeInput(e)}
                value={formData.firstDataComplexity}
              >
                <option value="">-.-</option>
                <option value="low">low</option>
                <option value="average">average</option>
                <option value="high">high</option>
              </select>
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
              className={`bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 transition duration-300 ${
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

export default FirstScreenForm;
