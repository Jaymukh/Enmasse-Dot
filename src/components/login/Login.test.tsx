// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import TermsAndConditions from './TermsAndConditions'; // Update the path accordingly

// describe('TermsAndConditions component', () => {
//   it('renders the "Terms and Conditions" modal', () => {
//     render(
//       <TermsAndConditions
//         showTermsAndConditionsModal={true} // Replace with your logic
//         closeTermsAndConditionsModal={() => {}} // Replace with your logic
//       />
//     );

//     // Assertions for modal content
//     expect(screen.getByText('Terms and Conditions')).toBeInTheDocument();

//     // Checkboxes for accepting terms should be present
//     expect(screen.getByLabelText('I Accept Terms')).toBeInTheDocument();
//     expect(screen.getByLabelText('I Accept Privacy Policies')).toBeInTheDocument();

//     // Close button should be present
//     expect(screen.getByText('Close')).toBeInTheDocument();
//   });

//   it('closes the modal when the "Close" button is clicked', () => {
//     render(
//       <TermsAndConditions
//         showTermsAndConditionsModal={true} // Replace with your logic
//         closeTermsAndConditionsModal={() => {}} // Replace with your logic
//       />
//     );

//     // Find the close button and click it
//     const closeButton = screen.getByText('Close');
//     fireEvent.click(closeButton);

//     // After clicking the close button, the modal should no longer be in the document
//     expect(screen.queryByText('Terms and Conditions')).toBeNull();
//   });

//   it('allows accepting terms when checkboxes are clicked', () => {
//     render(
//       <TermsAndConditions
//         showTermsAndConditionsModal={true} // Replace with your logic
//         closeTermsAndConditionsModal={() => {}} // Replace with your logic
//       />
//     );

//     // Find the checkboxes
//     const acceptTermsCheckbox = screen.getByLabelText('I Accept Terms');
//     const acceptPrivacyCheckbox = screen.getByLabelText('I Accept Privacy Policies');

//     // Initially, checkboxes should not be checked
//     expect(acceptTermsCheckbox).not.toBeChecked();
//     expect(acceptPrivacyCheckbox).not.toBeChecked();

//     // Click the checkboxes
//     fireEvent.click(acceptTermsCheckbox);
//     fireEvent.click(acceptPrivacyCheckbox);

//     // After clicking, checkboxes should be checked
//     expect(acceptTermsCheckbox).toBeChecked();
//     expect(acceptPrivacyCheckbox).toBeChecked();
//   });

//   it('enables the "Continue" button when both checkboxes are checked', () => {
//     render(
//       <TermsAndConditions
//         showTermsAndConditionsModal={true} // Replace with your logic
//         closeTermsAndConditionsModal={() => {}} // Replace with your logic
//       />
//     );

//     // Find the checkboxes and the "Continue" button
//     const acceptTermsCheckbox = screen.getByLabelText('I Accept Terms');
//     const acceptPrivacyCheckbox = screen.getByLabelText('I Accept Privacy Policies');
//     const continueButton = screen.getByText('Continue');

//     // Initially, the "Continue" button should be disabled
//     expect(continueButton).toBeDisabled();

//     // Click the checkboxes
//     fireEvent.click(acceptTermsCheckbox);
//     fireEvent.click(acceptPrivacyCheckbox);

//     // After clicking, the "Continue" button should be enabled
//     expect(continueButton).toBeEnabled();
//   });

//   // Add more test cases for interactions specific to your modal as needed.
// });
