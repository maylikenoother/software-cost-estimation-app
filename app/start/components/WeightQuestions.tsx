import React, { ChangeEvent } from 'react';

// Define the InitialFormData type
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

interface WeightQuestionsProps {
    formData: InitialFormData;
    handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handlePrevStep: () => void;
    handleNextStep: () => void;
  }

const WeightQuestions: React.FC<WeightQuestionsProps> = ({
    formData,
    handleChangeInput,
    handlePrevStep,
    handleNextStep,
  }) => {
    const isFormValid = () => {
      return (
        formData.backupRecovery !== '' &&
        formData.dataCommunication !== '' &&
        formData.distributedProcessing !== '' &&
        formData.performance !== '' &&
        formData.operationalEnvironment !== '' &&
        formData.dataEntry !== '' &&
        formData.multipleScreenEntry !== '' &&
        formData.masterFiles !== '' &&
        formData.complexFiles !== '' &&
        formData.internalProcessing !== '' &&
        formData.reusableCode !== '' &&
        formData.conversion !== '' &&
        formData.multipleInstallation !== '' &&
        formData.easyUse !== ''
      );
    };

  return (
    <div data-testid="weight"  className="bg-lime-950 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <p className="text-xl text-gray-800 mb-4">
    Please rate the following questions on a scale where 0 means irrelevant and 5 means very important.</p>

        <form data-testid="weightQuestions-form">
                <div className="mb-4">
                    <p>1. Does the system require reliable backup and recovery?</p>
                    <div className="flex items-center space-x-4">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="backupRecovery"
                            value={value}
                            checked={formData.backupRecovery === value.toString()}
                            onChange={(e) => handleChangeInput(e)}
                            className="mr-1"
                        />
                        {value}
                        </label>
                    ))}
                    </div>
            </div>

            <div className="mb-4">
                    <p>2. Are data communications required?</p>
                    <div className="flex items-center space-x-4">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="dataCommunication"
                            value={value}
                            checked={formData.dataCommunication === value.toString()}
                            onChange={(e) => handleChangeInput(e)}
                            className="mr-1"
                        />
                        {value}
                        </label>
                    ))}
                    </div>
            </div>

            <div className="mb-4">
                    <p>3. Are there distributed processing functions?</p>
                    <div className="flex items-center space-x-4">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="distributedProcessing"
                            value={value}
                            checked={formData.distributedProcessing === value.toString()}
                            onChange={(e) => handleChangeInput(e)}
                            className="mr-1"
                        />
                        {value}
                        </label>
                    ))}
                    </div>
            </div>

            <div className="mb-4">
                    <p>Is performance critical?</p>
                    <div className="flex items-center space-x-4">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="performance"
                            value={value}
                            checked={formData.performance === value.toString()}
                            onChange={(e) => handleChangeInput(e)}
                            className="mr-1"
                        />
                        {value}
                        </label>
                    ))}
                    </div>
            </div>

            <div className="mb-4">
                    <p>5. Will the system run in an existing, heavily utilized operational environment?</p>
                    <div className="flex items-center space-x-4">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="operationalEnvironment"
                            value={value}
                            checked={formData.operationalEnvironment === value.toString()}
                            onChange={(e) => handleChangeInput(e)}
                            className="mr-1"
                        />
                        {value}
                        </label>
                    ))}
                    </div>
            </div>

            <div className="mb-4">
                    <p>6. Does the system require on-line data entry?</p>
                    <div className="flex items-center space-x-4">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="dataEntry"
                            value={value}
                            checked={formData.dataEntry=== value.toString()}
                            onChange={(e) => handleChangeInput(e)}
                            className="mr-1"
                        />
                        {value}
                        </label>
                    ))}
                    </div>
            </div>

            <div className="mb-4">
                    <p>7. Does the on-line data entry require the input transaction to be built over multiple screens or operations?</p>
                    <div className="flex items-center space-x-4">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="multipleScreenEntry"
                            value={value}
                            checked={formData.multipleScreenEntry === value.toString()}
                            onChange={(e) => handleChangeInput(e)}
                            className="mr-1"
                        />
                        {value}
                        </label>
                    ))}
                    </div>
            </div>

            <div className="mb-4">
                    <p>8. Are there master files updated on-line?</p>
                    <div className="flex items-center space-x-4">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="masterFiles"
                            value={value}
                            checked={formData.masterFiles === value.toString()}
                            onChange={(e) => handleChangeInput(e)}
                            className="mr-1"
                        />
                        {value}
                        </label>
                    ))}
                    </div>
            </div>

            <div className="mb-4">
                    <p>9. Are the inputs, outputs, files, or inquiries complex?</p>
                    <div className="flex items-center space-x-4">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="complexFiles"
                            value={value}
                            checked={formData.complexFiles === value.toString()}
                            onChange={(e) => handleChangeInput(e)}
                            className="mr-1"
                        />
                        {value}
                        </label>
                    ))}
                    </div>
            </div>

            <div className="mb-4">
                    <p>10. Is the internal processing complex?</p>
                    <div className="flex items-center space-x-4">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="internalProcessing"
                            value={value}
                            checked={formData.internalProcessing === value.toString()}
                            onChange={(e) => handleChangeInput(e)}
                            className="mr-1"
                        />
                        {value}
                        </label>
                    ))}
                    </div>
            </div>

            <div className="mb-4">
                    <p>11. Is the code designed to be reusable?</p>
                    <div className="flex items-center space-x-4">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="reusableCode"
                            value={value}
                            checked={formData.reusableCode === value.toString()}
                            onChange={(e) => handleChangeInput(e)}
                            className="mr-1"
                        />
                        {value}
                        </label>
                    ))}
                    </div>
            </div>

            <div className="mb-4">
                    <p>12. Are conversion and installation included in the design?</p>
                    <div className="flex items-center space-x-4">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="conversion"
                            value={value}
                            checked={formData.conversion === value.toString()}
                            onChange={(e) => handleChangeInput(e)}
                            className="mr-1"
                        />
                        {value}
                        </label>
                    ))}
                    </div>
            </div>

            <div className="mb-4">
                    <p>13. Is the system designed for multiple installations in different organizations?</p>
                    <div className="flex items-center space-x-4">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="multipleInstallation"
                            value={value}
                            checked={formData.multipleInstallation === value.toString()}
                            onChange={(e) => handleChangeInput(e)}
                            className="mr-1"
                        />
                        {value}
                        </label>
                    ))}
                    </div>
            </div>

            <div className="mb-4">
                    <p>14. Is the application designed to facilitate change and ease of use by the user?</p>
                    <div className="flex items-center space-x-4">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="easyUse"
                            value={value}
                            checked={formData.easyUse === value.toString()}
                            onChange={(e) => handleChangeInput(e)}
                            className="mr-1"
                        />
                        {value}
                        </label>
                    ))}
                    </div>
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

export default WeightQuestions;
