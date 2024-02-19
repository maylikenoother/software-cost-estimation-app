"use client"
import React, { useState, useEffect } from 'react';
import Questions from '../components/Questions';
import WeightQuestions from '../components/WeightQuestions'
import FirstScreenForm from '../components/FirstScreenForm'
import SecondScreenForm from '../components/SecondScreenForm'
import EstimateScreen from '../components/EstimateScreen'
import Receipt from '../components/Receipt'
import User from '../../../models/user'

export interface InitialFormData {
  [key: string]: any;

    readonly softwareType: string;
    readonly noIntegrationRequired: number | null;
    readonly screens: number | null;
    readonly backupRecovery: number | null;
    readonly dataCommunication: number | null;
    readonly distributedProcessing: number | null;
    readonly performance: number | null;
    readonly operationalEnvironment: number | null;
    readonly dataEntry:number | null;
    readonly multipleScreenEntry: number | null;
    readonly masterFiles: number | null;
    readonly complexFiles: number | null;
    readonly internalProcessing: number | null;
    readonly reusableCode: number | null;
    readonly conversion: number | null;
    readonly multipleInstallation: number | null;
    readonly easyUse: number | null;
    readonly firstScreenName: string;
    readonly firstInputFields: number | null;
    readonly firstDataComplexity: "high" | "average" | "low";
    readonly secondScreenName: string;
    readonly secondInputFields: number | null;
    readonly secondDataComplexity: "high" | "average" | "low";
    readonly userName: string;
    readonly userEmail: string;
    readonly appDescription: string;
}

let initialFormData: InitialFormData = {
  softwareType: '',
  noIntegrationRequired: null,
  screens: null,
  backupRecovery: null,
  dataCommunication:null,
  distributedProcessing: null,
  performance: null,
  operationalEnvironment: null,
  dataEntry: null,
  multipleScreenEntry: null,
  masterFiles: null,
  complexFiles: null,
  internalProcessing: null,
  reusableCode: null,
  conversion: null,
  multipleInstallation: null,
  easyUse: null,
  firstScreenName: '',
  firstInputFields: null,
  firstDataComplexity: "low",
  secondScreenName: '',
  secondInputFields: null,
  secondDataComplexity: "low",
  userName: '',
  userEmail: '',
  appDescription:''
};

const stepArray = ['Questions', 'WeightQuestions', 'FirstScreenForm', 'SecondScreenForm', 'EstimateScreen', 'Receipt'] as const;

const FormComponent = () => {
  const [step, setStep] = useState<typeof stepArray[number]>('Questions');
  const [formData, setFormData] = useState<InitialFormData>(initialFormData);
  const [totalCost, setTotalCost] = useState(0);
  const [totalFunctionPoint, setTotalFunctionPoint] = useState(0);
  const [costPerFP, setCostPerFP] = useState(1);

  const complexityOrder = ['low', 'average', 'high'] as const;

  const getHigherComplexity = (
    firstDataComplexity: typeof complexityOrder[number],
    secondDataComplexity: typeof complexityOrder[number]
    ) => {
    if (firstDataComplexity === 'high' || secondDataComplexity === 'high') {
      return 'high';
    } else {
      const firstDataComplexityValue = complexityOrder.indexOf(firstDataComplexity);
      const secondDataComplexityValue = complexityOrder.indexOf(secondDataComplexity);

      return firstDataComplexityValue > secondDataComplexityValue ? firstDataComplexity : secondDataComplexity;
    }
  };



  const calculateCAF = (formData: InitialFormData): number => {
    // Define your questions and their respective fields in formData
    const questionFields: (keyof InitialFormData)[] = [
      'backupRecovery',
      'dataCommunication',
      'distributedProcessing',
      'performance',
      'operationalEnvironment',
      'dataEntry',
      'multipleScreenEntry',
      'masterFiles',
      'complexFiles',
      'internalProcessing',
      'reusableCode',
      'conversion',
      'multipleInstallation',
      'easyUse',
    ];

    // Initialize the sum of Fi
    let sumFi = 0;

    // Loop through the questions and add up their values
    questionFields.forEach((field) => {
      const value = parseInt(formData[field], 10); // Ensure formData[field] is a string
      sumFi += value;
    });

    // Calculate CAF using the formula
    const CAF = 0.65 + 0.01 * sumFi; 

    return CAF;
  };
  
  const calculateUFP = (formData:InitialFormData):number => {
    const derivedComplexity = getHigherComplexity(
      formData.firstDataComplexity,
      formData.secondDataComplexity
    );
  
    const counts : { [key: string]: number } = {
      EIs: formData.firstInputFields + formData.secondInputFields,
      EOs: formData.screens,
      EQs: formData.screens,
      ILFs: formData.screens + formData.noIntegrationRequired,
      EIFs: formData.noIntegrationRequired,
    };
  
    const complexityWeights = {
      low: {
        EIs: 3,
        EOs: 4,
        EQs: 3,
        ILFs: 7,
        EIFs: 5,
      },
      average: {
        EIs: 4,
        EOs: 5,
        EQs: 4,
        ILFs: 10,
        EIFs: 7,
      },
      high: {
        EIs: 6,
        EOs: 7,
        EQs: 6,
        ILFs: 15,
        EIFs: 10,
      },
    };
  
    let UFP = 0;
  
    for (const type in counts) {
      if (counts.hasOwnProperty(type)) {
        UFP +=
          Object.values(complexityWeights[derivedComplexity])
            .filter((value) => typeof value === 'number')
            .reduce((sum, value) => sum + value * (counts[type] as number), 0);
      }
    }
    return UFP;
  }

  
  const calculateFP = (formData: InitialFormData): number => {
    const CAF = calculateCAF(formData);
    const UFP = calculateUFP(formData);
  
    const totalFunctionPoint = UFP * CAF;
    console.log("Total Function Points: " + totalFunctionPoint);
  
    return totalFunctionPoint; // Return the calculated FP
  };
  
  const calculateTotalCost = (totalFunctionPoint: number, costPerFP: number): number => {
    const totalCost = totalFunctionPoint * costPerFP;
    return totalCost; // Return the calculated total cost as a number
  };
  
  
  
  

  const handleNextStep = (): void => {
    const currentStepIndex = stepArray.indexOf(step);
    const nextStep = stepArray[currentStepIndex + 1];
    if (nextStep) setStep(nextStep);
  };

  const handlePrevStep = (): void => {
    const currentStepIndex = stepArray.indexOf(step);
    const prevStep = stepArray[currentStepIndex - 1];
    if (prevStep) setStep(prevStep);
  };

 // Correct typing for input change event handler
 const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = event.target;
  
  // Check if the input type is 'radio' and ensure numerical values are handled correctly
  if (event.target.type === 'radio') {
    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value) // Parse radio input values as integers
    }));
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value // Handle other input types normally
    }));
  }
};



  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>)  => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
  };
  
  const handleSubmitFormData = () => {
    const totalFunctionPoint: number  = calculateFP(formData); // Calculate FP
    setTotalFunctionPoint(totalFunctionPoint); // Update state if needed
    
    const newTotalCost: number = calculateTotalCost(totalFunctionPoint, costPerFP); // Calculate total cost
   
    
    setTotalCost(newTotalCost); // set the newTotalCost as a number
    console.log("New Total Cost:", newTotalCost);
  };
  
  

  const saveData = async () => {
  
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });
  
      if (response.ok) {
        const data = await response.json(); 
        // User created successfully
        console.log('User created:', data);
      } else {
        // Handle errors here
        console.error('Failed to create user.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  

  };
  

  const handleCostPerFPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    const newCostPerFP: number = parseFloat(event.target.value);
  
    // Update the costPerFP state with the new value
    setCostPerFP(newCostPerFP);
    console.log("newCostPerFP: " + newCostPerFP);
  
    // Recalculate totalCost based on the updated costPerFP
    const newTotalCost: number = totalFunctionPoint * newCostPerFP;
  
    // Update the totalCost state with the new value
    setTotalCost(newTotalCost);
    console.log("newTotalCost:" + newTotalCost);
  };
  


  useEffect(() => {
    console.log(formData);
   const body = JSON.stringify(formData);
     console.log(body); // Log the stringified data

  }, [formData]);



  return (
    <div data-testid="form-component">
      {step === 'Questions' ? (
        <Questions
          formData={formData}
          handleChangeInput={handleChangeInput}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'WeightQuestions' ? (
        <WeightQuestions
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'FirstScreenForm' ? (
        <FirstScreenForm
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}

      {step === 'SecondScreenForm' ? (
        <SecondScreenForm
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleSubmitFormData={handleSubmitFormData}
        />
      ) : null}
      {step === 'EstimateScreen' ? (
        <EstimateScreen
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          handleChangeTextArea={handleChangeTextArea}
          totalCost={totalCost}
          costPerFP={costPerFP}
        handleCostPerFPChange={handleCostPerFPChange}
        saveData={saveData}
        />
      ) : null}
      {step === 'Receipt' ? (
        <Receipt
          formData={formData}
          totalCost={totalCost}
          handlePrevStep={handlePrevStep}
          costPerFP={costPerFP}
          totalFunctionPoint={totalFunctionPoint}
        />
      ) : null}
    </div>
  );
};

export default FormComponent;


