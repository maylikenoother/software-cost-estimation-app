import React from 'react';

interface ReceiptProps {
  formData: {
    userName: string;
    userEmail: string;
    appDescription: string;
  };
  totalFunctionPoint: number;
  costPerFP: number;
  totalCost: number;
  handlePrevStep: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ formData, totalFunctionPoint, costPerFP, totalCost, handlePrevStep }) => {
  return (
    <div data-testid="Receipt" className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-teal-600 mb-6">Congratulations!</h2>
        <p className="text-teal-600 mb-4">Your Estimation Details:</p>

        <div className="table-container overflow-x-auto">
          <table className="w-full mb-6">
            <tbody>
              <tr className="border-b bg-gray-200">
                <td className="py-2 text-teal-600 font-semibold pr-4 w-9/10 whitespace-nowrap">Name:</td>
                <td className="py-2 text-teal-600 whitespace-nowrap">{formData.userName}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-teal-600 font-semibold pr-4 w-9/10 whitespace-nowrap">Email:</td>
                <td className="py-2 text-teal-600 whitespace-nowrap">{formData.userEmail}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-teal-600 font-semibold pr-4 w-9/10 whitespace-nowrap">App Description:</td>
                <td className="py-2 text-teal-600 whitespace-nowrap">{formData.appDescription}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-teal-600 font-semibold pr-4 w-9/10 whitespace-nowrap">Total Function Points:</td>
                <td className="py-2 text-teal-600 whitespace-nowrap">{totalFunctionPoint}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-teal-600 font-semibold pr-4 w-9/10 whitespace-nowrap">Cost per Function Point:</td>
                <td className="py-2 text-teal-600 whitespace-nowrap">{costPerFP}</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="py-2 text-teal-600 font-semibold pr-4 w-9/10 whitespace-nowrap">Total Cost:</td>
                <td className="py-2 text-teal-600 whitespace-nowrap pr-4">{totalCost}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Previous button */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 transition duration-300"
            onClick={handlePrevStep}
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
