# Implementation Plan: Next.js Tutorial Chapters

## Overview

This plan implements a comprehensive Next.js tutorial (Chapters 2-7) that teaches developers to build a production-ready event registration application. The implementation follows a progressive learning approach, building on Chapter 1's foundation to create a multi-step registration form with attendee management. Each chapter introduces 1-2 concepts maximum with complete code examples and comprehensive testing.

## Tasks

- [ ] 1. Set up project structure and supporting documents
  - Create tutorial directory structure for chapters 2-7
  - Create TUTORIAL-OVERVIEW.md with chapter listing and learning outcomes
  - Create COMPLETION-CHECKLIST.md mapping requirements to chapters
  - Create TROUBLESHOOTING.md for common issues
  - _Requirements: 9.4, 10.6_

- [ ] 2. Implement Chapter 2: Basic Form Components
  - [ ] 2.1 Create chapter-2-start folder with Chapter 1 baseline
    - Copy Next.js setup, Storybook, Vitest, and Playwright configurations
    - Verify all dependencies in package.json and pnpm-lock.yaml
    - _Requirements: 2.1, 2.4_
  
  - [ ] 2.2 Create Input component with TypeScript and accessibility
    - Implement Input.tsx with InputProps interface
    - Include ARIA labels, error states, and keyboard navigation
    - Use Tailwind CSS for styling
    - _Requirements: 6.1, 6.3, 6.4_
  
  - [ ] 2.3 Create Select component with TypeScript and accessibility
    - Implement Select.tsx with SelectProps interface
    - Include ARIA labels and error states
    - Use Tailwind CSS for styling
    - _Requirements: 6.1, 6.3, 6.4_
  
  - [ ] 2.4 Create Textarea component with TypeScript and accessibility
    - Implement Textarea.tsx with TextareaProps interface
    - Include ARIA labels and error states
    - Use Tailwind CSS for styling
    - _Requirements: 6.1, 6.3, 6.4_
  
  - [ ] 2.5 Create Checkbox component with TypeScript and accessibility
    - Implement Checkbox.tsx with CheckboxProps interface
    - Include ARIA labels and error states
    - Use Tailwind CSS for styling
    - _Requirements: 6.1, 6.3, 6.4_
  
  - [ ]* 2.6 Write unit tests for all form components
    - Test prop handling, onChange callbacks, default values
    - Test accessibility attributes
    - _Requirements: 5.1_
  
  - [ ]* 2.7 Create Storybook stories for all form components
    - Create stories showing default, error, disabled, and focused states
    - Add interaction tests for user input and keyboard navigation
    - _Requirements: 5.2_
  
  - [ ] 2.8 Write Chapter 2 instruction document
    - Include chapter overview, learning outcomes, and prerequisites
    - Add code examples for each component
    - Include testing examples (unit and Storybook)
    - Specify files to create
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 9.1, 9.2, 9.3_

- [ ] 3. Implement Chapter 3: Form Validation
  - [ ] 3.1 Create chapter-3-start folder from Chapter 2 completion
    - Copy all Chapter 2 completed code
    - Verify all form components present
    - _Requirements: 2.1, 2.2_
  
  - [ ] 3.2 Implement validation utility functions
    - Create validation.ts with ValidationRule, FieldValidation types
    - Implement validateField and validateForm functions
    - _Requirements: 4.2_
  
  - [ ]* 3.3 Write unit tests for validation functions
    - Test validation with specific examples
    - Test edge cases: empty strings, whitespace, special characters, boundary values
    - _Requirements: 5.1, 5.4_
  
  - [ ] 3.4 Create FormField wrapper component with validation
    - Implement FormField.tsx that wraps form components with validation
    - Display error messages inline with ARIA error announcements
    - _Requirements: 6.3_
  
  - [ ]* 3.4 Write Storybook stories for FormField component
    - Show valid and invalid states
    - Demonstrate error message display
    - _Requirements: 5.2_
  
  - [ ] 3.5 Write Chapter 3 instruction document
    - Include validation patterns and error handling concepts
    - Add code examples for validation functions
    - Include testing examples
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 9.1, 9.2, 9.3_

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement Chapter 4: Event Selection Step
  - [ ] 5.1 Create chapter-4-start folder from Chapter 3 completion
    - Copy all Chapter 3 completed code
    - Verify validation system present
    - _Requirements: 2.1, 2.2_
  
  - [ ] 5.2 Create Event data model and mock data
    - Implement Event interface in events.ts
    - Create mock event data for tutorial
    - _Requirements: 4.1_
  
  - [ ] 5.3 Create EventSelectionStep component
    - Implement event selection form step using Select component
    - Include event details display
    - Add validation for event selection
    - _Requirements: 4.1, 4.4_
  
  - [ ] 5.4 Create registration page with App Router
    - Create app/register/page.tsx using App Router pattern
    - Integrate EventSelectionStep component
    - _Requirements: 6.5_
  
  - [ ]* 5.5 Write unit tests for EventSelectionStep
    - Test event selection state management
    - Test validation logic
    - _Requirements: 5.1_
  
  - [ ]* 5.6 Write E2E test for event selection
    - Test navigation to form
    - Test event selection interaction
    - Verify selection persists
    - _Requirements: 5.3_
  
  - [ ] 5.7 Write Chapter 4 instruction document
    - Include form step structure and state management concepts
    - Add code examples for event model and step component
    - Include E2E testing examples
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 9.1, 9.2, 9.3_

- [ ] 6. Implement Chapter 5: Multi-Step Form Navigation
  - [ ] 6.1 Create chapter-5-start folder from Chapter 4 completion
    - Copy all Chapter 4 completed code
    - Verify event selection step present
    - _Requirements: 2.1, 2.2_
  
  - [ ] 6.2 Implement FormContext with React Context API
    - Create FormContext.tsx with FormContextValue interface
    - Implement FormProvider with state management
    - Add localStorage persistence for form state
    - _Requirements: 4.5, 8.1, 8.3_
  
  - [ ] 6.3 Create useFormContext custom hook
    - Implement hook for accessing form context
    - Add error handling for missing provider
    - _Requirements: 4.5_
  
  - [ ] 6.4 Create StepNavigator component
    - Implement step navigation UI with progress indicator
    - Add forward/backward navigation logic
    - Prevent invalid navigation (forward blocked on validation errors)
    - _Requirements: 4.3_
  
  - [ ] 6.5 Create ProgressBar component
    - Implement visual progress indicator
    - Show current step and total steps
    - _Requirements: 4.3_
  
  - [ ] 6.6 Update registration page to use FormProvider
    - Wrap page with FormProvider
    - Integrate StepNavigator and ProgressBar
    - Update EventSelectionStep to use context
    - _Requirements: 4.5_
  
  - [ ]* 6.7 Write unit tests for FormContext and navigation
    - Test context provider state management
    - Test navigation logic (forward, backward, validation blocking)
    - Test localStorage persistence
    - _Requirements: 5.1, 8.4_
  
  - [ ]* 6.8 Write E2E tests for multi-step navigation
    - Test forward and backward navigation
    - Test step persistence across page refresh
    - Test invalid navigation prevention
    - _Requirements: 5.3, 5.5_
  
  - [ ] 6.9 Write Chapter 5 instruction document
    - Include React Context API and state persistence concepts
    - Add code examples for context provider and navigation components
    - Include testing examples
    - Explain localStorage persistence trade-offs
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 8.5, 9.1, 9.2, 9.3_

- [ ] 7. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Implement Chapter 6: Complete Registration Form
  - [ ] 8.1 Create chapter-6-start folder from Chapter 5 completion
    - Copy all Chapter 5 completed code
    - Verify multi-step navigation system present
    - _Requirements: 2.1, 2.2_
  
  - [ ] 8.2 Create AttendeeDetailsStep component
    - Implement attendee details form (firstName, lastName, email, phone, organization)
    - Use Input components with validation
    - Integrate with FormContext
    - _Requirements: 4.4_
  
  - [ ] 8.3 Create DietaryAccessibilityStep component
    - Implement dietary restrictions and accessibility needs form
    - Use Checkbox and Textarea components
    - Integrate with FormContext
    - _Requirements: 4.4_
  
  - [ ] 8.4 Create ReviewStep component
    - Display all form data for review
    - Add terms agreement and marketing consent checkboxes
    - Implement form submission logic
    - _Requirements: 4.4, 10.5_
  
  - [ ] 8.5 Implement registration store for data persistence
    - Create registration-store.ts with RegistrationStore class
    - Implement submit, getAll, and getById methods
    - Use in-memory storage for tutorial (can be replaced with API)
    - _Requirements: 8.2, 8.3_
  
  - [ ] 8.6 Create success confirmation page
    - Create app/register/success/page.tsx
    - Display registration summary
    - Clear localStorage form state
    - _Requirements: 10.5_
  
  - [ ] 8.7 Update FormContext with submission logic
    - Add submitForm method to context
    - Integrate with registration store
    - Handle submission errors with retry logic
    - Add isSubmitting state
    - _Requirements: 8.2_
  
  - [ ]* 8.8 Write unit tests for all form steps
    - Test AttendeeDetailsStep validation
    - Test DietaryAccessibilityStep data handling
    - Test ReviewStep data aggregation
    - _Requirements: 5.1, 10.3_
  
  - [ ]* 8.9 Write integration tests for complete form flow
    - Test all steps working together
    - Test form data preservation across steps
    - Test submission flow
    - _Requirements: 5.3_
  
  - [ ]* 8.10 Write E2E test for full registration journey
    - Test complete flow from event selection to confirmation
    - Test validation at each step
    - Test successful submission
    - _Requirements: 5.3, 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [ ]* 8.11 Write unit tests for registration store
    - Test submit, getAll, and getById methods
    - Test data persistence
    - _Requirements: 5.1, 8.4_
  
  - [ ] 8.12 Write Chapter 6 instruction document
    - Include complete form integration concepts
    - Add code examples for all form steps
    - Include submission and persistence patterns
    - Include comprehensive testing examples
    - Explain data persistence trade-offs
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 8.5, 9.1, 9.2, 9.3_

- [ ] 9. Implement Chapter 7: Attendee Management
  - [ ] 9.1 Create chapter-7-start folder from Chapter 6 completion
    - Copy all Chapter 6 completed code
    - Verify complete registration form present
    - _Requirements: 2.1, 2.2_
  
  - [ ] 9.2 Create Attendee data model
    - Define Attendee interface in types
    - Ensure compatibility with Registration model
    - _Requirements: 7.1_
  
  - [ ] 9.3 Create AttendeeCard component
    - Implement card layout for individual attendee
    - Display attendee details, event info, and preferences
    - Use Tailwind CSS for responsive design
    - _Requirements: 7.4_
  
  - [ ] 9.4 Create AttendeeList component
    - Implement list container with loading and error states
    - Use responsive layout (cards on mobile, table on desktop)
    - Handle empty state
    - _Requirements: 7.1, 7.4_
  
  - [ ] 9.5 Create attendees page with App Router
    - Create app/attendees/page.tsx
    - Fetch attendees from registration store
    - Integrate AttendeeList component
    - _Requirements: 6.5, 7.1, 7.2_
  
  - [ ]* 9.6 Write unit tests for attendee components
    - Test AttendeeCard rendering
    - Test AttendeeList with various states (loading, error, empty, populated)
    - Test responsive layout behavior
    - _Requirements: 5.1_
  
  - [ ]* 9.7 Write E2E test for attendee management
    - Test submitting registration
    - Test navigating to attendees page
    - Test verifying attendee appears in list
    - _Requirements: 5.3, 7.3_
  
  - [ ]* 9.8 Write accessibility tests for attendee page
    - Test screen reader compatibility
    - Test keyboard navigation
    - _Requirements: 6.3_
  
  - [ ] 9.9 Write Chapter 7 instruction document
    - Include data fetching and display patterns
    - Add code examples for attendee components
    - Include responsive layout techniques
    - Include testing examples (unit, E2E, accessibility)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 9.1, 9.2, 9.3_

- [ ] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Create completed chapter folders and verify completeness
  - [ ] 11.1 Create chapter-2 folder with completed Chapter 2 code
    - Copy chapter-2-start and add all Chapter 2 implementations
    - Verify all tests pass
    - _Requirements: 2.2_
  
  - [ ] 11.2 Create chapter-3 folder with completed Chapter 3 code
    - Copy chapter-3-start and add all Chapter 3 implementations
    - Verify all tests pass
    - _Requirements: 2.2_
  
  - [ ] 11.3 Create chapter-4 folder with completed Chapter 4 code
    - Copy chapter-4-start and add all Chapter 4 implementations
    - Verify all tests pass
    - _Requirements: 2.2_
  
  - [ ] 11.4 Create chapter-5 folder with completed Chapter 5 code
    - Copy chapter-5-start and add all Chapter 5 implementations
    - Verify all tests pass
    - _Requirements: 2.2_
  
  - [ ] 11.5 Create chapter-6 folder with completed Chapter 6 code
    - Copy chapter-6-start and add all Chapter 6 implementations
    - Verify all tests pass
    - _Requirements: 2.2_
  
  - [ ] 11.6 Create chapter-7 folder with completed Chapter 7 code
    - Copy chapter-7-start and add all Chapter 7 implementations
    - Verify all tests pass
    - _Requirements: 2.2_
  
  - [ ] 11.7 Verify tutorial completeness
    - Verify all registration form steps implemented (event selection, attendee details, dietary/accessibility, review)
    - Verify attendee list page implemented
    - Verify form validation covered at each step
    - Verify data persistence across steps covered
    - Verify confirmation after submission covered
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 12. Update supporting documents with final details
  - Update TUTORIAL-OVERVIEW.md with complete chapter information
  - Update COMPLETION-CHECKLIST.md with all requirement mappings
  - Update TROUBLESHOOTING.md with common issues discovered during implementation
  - _Requirements: 9.4, 10.6_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- All code uses TypeScript with proper type definitions
- All components include accessibility attributes (ARIA labels, keyboard navigation)
- All styling uses Tailwind CSS
- All routes use Next.js App Router patterns (app directory)
- All commands use pnpm package manager
- Testing includes unit tests (Vitest), component tests (Storybook), and E2E tests (Playwright)
- Form state persists using localStorage, submission data persists using in-memory store
- Each chapter builds progressively on previous chapters
- Starting state folders match completed code from previous chapter
