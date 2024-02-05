import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for User document
export interface IUser extends Document {
  formData: {
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
  };
}

// Define the User schema
const userSchema = new Schema<IUser>({
  formData: {
    softwareType: String,
    noIntegrationRequired: Number,
    screens: Number,
    backupRecovery: Number,
    dataCommunication: Number,
    distributedProcessing: Number,
    performance: Number,
    operationalEnvironment: Number,
    dataEntry: Number,
    multipleScreenEntry: Number,
    masterFiles: Number,
    complexFiles: Number,
    internalProcessing: Number,
    reusableCode: Number,
    conversion: Number,
    multipleInstallation: Number,
    easyUse: Number,
    firstScreenName: String,
    firstInputFields: Number,
    firstDataComplexity: String,
    secondScreenName: String,
    secondInputFields: Number,
    secondDataComplexity: String,
    userName: String,
    userEmail: String,
    appDescription: String,
  },
});

// Define and export the User model
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
