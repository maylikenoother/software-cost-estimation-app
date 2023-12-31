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
  [key: string]: string | number;

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
  firstDataComplexity: string;
  secondScreenName: string;
  secondInputFields: number;
  secondDataComplexity: string;
  userName: string;
  userEmail: string;
  appDescription: string;
}

let initialFormData: InitialFormData = {
  softwareType: '',
  noIntegrationRequired: 0,
  screens: 0,
  backupRecovery: 0,
  dataCommunication: 0,
  distributedProcessing: 0,
  performance: 0,
  operationalEnvironment: 0,
  dataEntry: 0,
  multipleScreenEntry: 0,
  masterFiles: 0,
  complexFiles: 0,
  internalProcessing: 0,
  reusableCode: 0,
  conversion: 0,
  multipleInstallation: 0,
  easyUse: 0,
  firstScreenName: '',
  firstInputFields: 0,
  firstDataComplexity: '',
  secondScreenName: '',
  secondInputFields: 0,
  secondDataComplexity: '',
  userName: '',
  userEmail: '',
  appDescription:''
};

const stepArray = ['Questions', 'WeightQuestions', 'FirstScreenForm', 'SecondScreenForm', 'EstimateScreen', 'Receipt'];

const FormComponent = () => {
  const [step, setStep] = useState('Questions');
  const [formData, setFormData] = useState(initialFormData);
  const [totalCost, setTotalCost] = useState(0);
  const [totalFunctionPoint, setTotalFunctionPoint] = useState(0);
  const [costPerFP, setCostPerFP] = useState(1);

  const getHigherComplexity = (firstDataComplexity: string , secondDataComplexity: string) => {
    const complexityOrder = ['low', 'average', 'high'];

    if (firstDataComplexity === 'high' || secondDataComplexity === 'high') {
      return 'high';
    } else {
      const firstDataComplexityValue = complexityOrder.indexOf(firstDataComplexity);
      const secondDataComplexityValue = complexityOrder.indexOf(secondDataComplexity);

      return firstDataComplexityValue > secondDataComplexityValue ? firstDataComplexity : secondDataComplexity;
    }
  };

  const calculateCAF = (formData: InitialFormData) => {
    // Define your questions and their respective fields in formData
    const questionFields = [
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
      const value = parseInt(formData[field].toString(), 10); // Ensure formData[field] is a string
      sumFi += value;
    });

    // Calculate CAF using the formula
    const CAF = 0.65 + 0.01 * sumFi;

    return CAF;
  };

  const calculateFP = (formData: InitialFormData) => {
    const CAF = calculateCAF(formData);
  
    const derivedComplexity = getHigherComplexity(
      formData.firstDataComplexity,
      formData.secondDataComplexity
    );
  
    const counts = {
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
      if (
        counts.hasOwnProperty(type) &&
        complexityWeights[derivedComplexity][type as keyof typeof complexityWeights[typeof derivedComplexity]] !== undefined
      ) {
        // Use type assertion to let TypeScript know it's a valid property
        UFP +=
          (counts[type as keyof typeof counts] as number) *
          (complexityWeights[derivedComplexity][type as keyof typeof complexityWeights[typeof derivedComplexity]] as number);
      }
      
    }
  
    const totalFunctionPoint = UFP * CAF;
    setTotalFunctionPoint(totalFunctionPoint);
    console.log("totalFunctionPoint" + totalFunctionPoint);
  
    const newTotalCost = (totalFunctionPoint * costPerFP).toLocaleString('en-US', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
    });
    setTotalCost(newTotalCost);
  
    return newTotalCost;
  };
  
  
  
  

  const handleNextStep = () => {
    if (step === 'Questions') setStep('WeightQuestions');
    else if (step === 'WeightQuestions') setStep('FirstScreenForm');
    else if (step === 'FirstScreenForm') setStep('SecondScreenForm');
    else if (step === 'SecondScreenForm') setStep('EstimateScreen');
    else if (step === 'EstimateScreen') setStep('Receipt')
  };

  const handlePrevStep = () => {
    if (step === 'Receipt') setStep('EstimateScreen');
    if (step === 'EstimateScreen') setStep('SecondScreenForm');
    else if (step === 'SecondScreenForm') setStep('FirstScreenForm');
    else if (step === 'FirstScreenForm') setStep('WeightQuestions');
    else if (step === 'WeightQuestions') setStep('Questions');
  };

  const handleChangeInput = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
  
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
  };

  const handleChangeTextArea = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
  };
  
  const handleSubmitFormData = () => {
    const newTotalCost = calculateFP(formData);
    setTotalCost(newTotalCost);
    
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
  

  const handleCostPerFPChange = (event) => {
    const newCostPerFP = parseFloat(event.target.value);
    setCostPerFP(newCostPerFP);
    console.log("newCostPerFP: " + newCostPerFP);

    // Recalculate totalCost based on the updated costPerFP
    const newTotalCost = (totalFunctionPoint * newCostPerFP).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });

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
          costPerFP={costPerFP}
          totalFunctionPoint={totalFunctionPoint}
        />
      ) : null}
    </div>
  );
};

export default FormComponent;


