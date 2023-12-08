import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


let User;

if (mongoose.models && mongoose.models.user) {
  User = mongoose.model('user');
} else {
  const userSchema = new mongoose.Schema({
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
      appDescription: String
    }
  });

  User = mongoose.model('user', userSchema);
}


export default User;
