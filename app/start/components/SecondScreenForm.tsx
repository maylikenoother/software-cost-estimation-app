import React, { ChangeEvent } from 'react';

// Define the InitialFormData type
type InitialFormData = {
    softwareType: string;
    noIntegrationRequired: number;
    screens: number | null;
    backupRecovery: number | null;
    dataCommunication: number | null;
    distributedProcessing: number | null;
    performance: number | null;
    operationalEnvironment: number | null;
    dataEntry:number | null;
    multipleScreenEntry: number | null;
    masterFiles: number | null;
    complexFiles: number | null;
    internalProcessing: number | null;
    reusableCode: number | null;
    conversion: number | null;
    multipleInstallation: number | null;
    easyUse: number | null;
    firstScreenName: string;
    firstInputFields: number | null;
    firstDataComplexity: "high" | "average" | "low";
    secondScreenName: string;
    secondInputFields: number | null;
    secondDataComplexity: "high" | "average" | "low";
    userName: string;
    userEmail: string;
    appDescription: string;
};

interface SecondScreenFormProps {
  formData: InitialFormData
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  handleSubmitFormData: () => void;
}

const SecondScreenForm: React.FC<SecondScreenFormProps> = ({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleNextStep,
  handleSubmitFormData,
}) => {
  const isFormValid = () => {
    return (
      formData.firstScreenName !== '' &&
      formData.firstInputFields !== 0
    );
  };

  return (
    <div data-testid="second" className="bg-lime-950 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Second Screen Details</h2>
        <form data-testid="secondScreen-form">
          <div className="mb-4">
            <label className="block text-gray-500 text-xs font-semibold mb-2">
              Screen Name
              <input
                type="text"
                name="secondScreenName"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={(e) => handleChangeInput(e)}
                value={formData.secondScreenName}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 text-xs font-semibold mb-2">
              Number of Input Fields
              <input
                type="number"
                name="secondInputFields"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={(e) => handleChangeInput(e)}
                value={formData.secondInputFields}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 text-xs font-semibold mb-2">
              How complex is the data processing?
              <select
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                name="secondDataComplexity"
                onChange={(e) => handleChangeInput(e)}
                value={formData.secondDataComplexity}
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
              onClick={() => {
                if (isFormValid()) {
                  handleSubmitFormData();
                  handleNextStep();
                }
              }}
              disabled={!isFormValid()}
            >
              Calculate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecondScreenForm;
