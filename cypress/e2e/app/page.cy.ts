describe('Navigation', () => {
  it('renders the home page and checks for the form component', () => {
    // Visit the home page
    cy.visit('http://localhost:3000'); 
    // Check if the title is present
    cy.get('h1').should('contain', 'Software Cost Estimation');

    // Check if the description is present
    cy.get('p').should('contain', 'Calculate the cost of your software project');

    // Check if the "Start Estimation" link is present
    cy.get('a').contains('Start Estimation').should('exist');

      // click the Start Estimation button and navigate to start 
      cy.get('a').contains('Start Estimation').click();

    // Check if the FormComponent is rendered
    cy.get('[data-testid="form-component"]').should('exist');

    // check if questions is rendered
    cy.get('[data-testid="questions"]').should('exist'); 

    // Example: Answer the questions
    cy.get('[name="softwareType"]').select('Web Application');
    cy.get('[name="noIntegrationRequired"]').type('2');
    cy.get('[name="screens"]').type('5');
    
    // Click the Next button
    cy.get('button').contains('Next').click();

    // render weight questions
    cy.get('[data-testid="weight"]').should('exist');

    // Example: Answer the weight-related questions
    cy.get('[name="backupRecovery"][value="2"]').check();
    cy.get('[name="dataCommunication"][value="3"]').check();
    cy.get('[name="distributedProcessing"][value="1"]').check();
    cy.get('[name="performance"][value="2"]').check();
    cy.get('[name="operationalEnvironment"][value="3"]').check();
    cy.get('[name="dataEntry"][value="1"]').check();
    cy.get('[name="multipleScreenEntry"][value="2"]').check();
    cy.get('[name="masterFiles"][value="3"]').check();
    cy.get('[name="complexFiles"][value="2"]').check();
    cy.get('[name="internalProcessing"][value="1"]').check();
    cy.get('[name="reusableCode"][value="3"]').check();
    cy.get('[name="conversion"][value="2"]').check();
    cy.get('[name="multipleInstallation"][value="1"]').check();
    cy.get('[name="easyUse"][value="2"]').check();

    // Click the Next button
    cy.get('button').contains('Next').click();

    // check is firstscreen form exists
    cy.get('[data-testid="first"]').should('exist');

    // Example: Fill out the form in FirstScreenForm
    cy.get('[name="firstScreenName"]').type('Login Screen');
    cy.get('[name="firstInputFields"]').type('3');
    cy.get('[name="firstDataComplexity"]').select('high');

    // Click the Next button
    cy.get('button').contains('Next').click();

    // check if second screen folrm is rendered
    cy.get('[data-testid="second"]').should('exist');

    // Example: Fill out the form in SecondScreenForm
    cy.get('[name="secondScreenName"]').type('Dashboard');
    cy.get('[name="secondInputFields"]').type('5');
    cy.get('[name="secondDataComplexity"]').select('average');

    // Click the Calculate button
    cy.get('button').contains('Calculate').click();


  // check if the estimate screen is rendered
    cy.get('[data-testid="estimate"]').should('exist');

    // Example: Fill out user details in EstimateScreen
    cy.get('[name="userName"]').type('John Doe');
    cy.get('[name="userEmail"]').type('john.doe@example.com');
    cy.get('[name="appDescription"]').type('A software project description.');

    // Click the Done button
    cy.get('button').contains('Done').click();

    // Check if the Receipt component is rendered
    cy.get('[data-testid="Receipt"]').should('exist');

    // Example: Verify the content in the Receipt component
    cy.get('.text-teal-600').should('contain.text', 'Congratulations!');
    cy.get('.text-teal-600').should('contain.text', 'Your Estimation Details:');

    // Example: Verify user details in the Receipt component
    cy.get('.text-teal-600').should('contain.text', 'Name:');
    cy.get('.text-teal-600').should('contain.text', 'Email:');
    cy.get('.text-teal-600').should('contain.text', 'App Description:');
    cy.get('.text-teal-600').should('contain.text', 'Total Function Points:');
    cy.get('.text-teal-600').should('contain.text', 'Cost per Function Point:');
    cy.get('.text-teal-600').should('contain.text', 'Total Cost:');

    // Example: Go back to the previous step
    cy.get('button').contains('Previous').click();
  });
});
