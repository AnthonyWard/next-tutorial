# Next.js Event Registration Tutorial - Overview

## Introduction

This tutorial teaches you to build a production-ready event registration application using Next.js 14+, TypeScript, and modern testing practices. You'll create a multi-step registration form with attendee management, following enterprise patterns and best practices throughout.

By the end of this tutorial, you'll have built a complete application with:
- Reusable form components with accessibility features
- Client-side validation with clear error handling
- Multi-step form navigation with state persistence
- Complete registration flow (event selection, attendee details, dietary/accessibility needs, review)
- Attendee management page with responsive layouts
- Comprehensive test coverage (unit, component, and E2E tests)

## Prerequisites

- Basic knowledge of React and TypeScript
- Node.js 18+ installed
- pnpm package manager installed
- Completion of Chapter 1 (Next.js setup, Storybook, Vitest, Playwright)

## Tutorial Structure

This tutorial consists of 7 chapters, each building progressively on the previous one. Each chapter introduces 1-2 new concepts with practical examples and comprehensive testing.

---

## Chapter 1: Project Setup and Testing Foundation

**Status:** ✅ Complete (prerequisite)

**Learning Outcomes:**
- Set up a Next.js 14+ project with TypeScript
- Configure Storybook for component development
- Set up Vitest for unit testing
- Configure Playwright for E2E testing
- Understand the App Router pattern
- Use pnpm for package management

**Key Concepts:**
- Next.js App Router
- TypeScript configuration
- Testing infrastructure
- Development tooling

**Deliverables:**
- Fully configured Next.js project
- Storybook setup with example stories
- Vitest configuration with example tests
- Playwright configuration with example E2E tests

---

## Chapter 2: Basic Form Components

**Learning Outcomes:**
- Create isolated, reusable form components
- Implement TypeScript prop interfaces for type safety
- Add accessibility attributes (ARIA labels, roles, keyboard navigation)
- Use Tailwind CSS for consistent styling
- Write unit tests for component behavior
- Create Storybook stories for visual testing

**Key Concepts:**
- Component isolation and reusability
- Controlled components pattern
- Accessibility best practices
- TypeScript prop types
- Component testing strategies

**Components Built:**
- Input component (text, email, tel, number types)
- Select component (dropdown with options)
- Textarea component (multi-line text input)
- Checkbox component (boolean input)

**Testing Focus:**
- Unit tests for prop handling and onChange callbacks
- Storybook stories for visual states (default, error, disabled, focused)
- Interaction tests for user input and keyboard navigation

**Files Created:**
- `src/components/forms/Input.tsx`
- `src/components/forms/Select.tsx`
- `src/components/forms/Textarea.tsx`
- `src/components/forms/Checkbox.tsx`
- Unit tests and Storybook stories for each component

---

## Chapter 3: Form Validation

**Learning Outcomes:**
- Implement client-side validation patterns
- Create reusable validation utility functions
- Display error messages with accessibility support
- Test validation logic comprehensively
- Handle edge cases (empty strings, special characters, boundary values)

**Key Concepts:**
- Validation rule patterns
- Field-level vs form-level validation
- Error message display with ARIA
- Validation testing strategies

**Features Built:**
- Validation utility functions (validateField, validateForm)
- FormField wrapper component with validation
- Error message display with ARIA announcements
- Validation rule types (required, minLength, maxLength, pattern, custom)

**Testing Focus:**
- Unit tests for validation functions with specific examples
- Edge case testing (empty, whitespace, special characters, boundaries)
- Storybook stories showing valid and invalid states

**Files Created:**
- `src/lib/validation.ts`
- `src/lib/validation.test.ts`
- `src/components/forms/FormField.tsx`
- Storybook stories for FormField

---

## Chapter 4: Event Selection Step

**Learning Outcomes:**
- Create form step components
- Implement basic form state management
- Define data models with TypeScript
- Write E2E tests for user flows
- Use Next.js App Router for pages

**Key Concepts:**
- Form step component structure
- Event data modeling
- State management basics
- E2E testing with Playwright

**Features Built:**
- Event data model and mock data
- EventSelectionStep component
- Registration page with App Router
- Event selection validation

**Testing Focus:**
- Unit tests for event selection state
- Component tests for event dropdown interaction
- E2E tests for complete event selection flow

**Files Created:**
- `src/app/register/page.tsx`
- `src/components/registration/EventSelectionStep.tsx`
- `src/lib/events.ts`
- `tests/e2e/event-selection.spec.ts`

---

## Chapter 5: Multi-Step Form Navigation

**Learning Outcomes:**
- Implement React Context API for state management
- Create step navigation components
- Add progress indicators
- Persist form state with localStorage
- Test navigation logic and state persistence

**Key Concepts:**
- React Context API
- State persistence strategies
- Navigation patterns (forward, backward, validation blocking)
- Progress indicators
- localStorage usage

**Features Built:**
- FormContext with React Context API
- useFormContext custom hook
- StepNavigator component
- ProgressBar component
- localStorage persistence for form state

**Testing Focus:**
- Unit tests for context provider and navigation logic
- E2E tests for multi-step navigation
- Persistence tests (page refresh, step transitions)

**Files Created:**
- `src/contexts/FormContext.tsx`
- `src/hooks/useFormContext.ts`
- `src/components/registration/StepNavigator.tsx`
- `src/components/registration/ProgressBar.tsx`
- Updated registration page with FormProvider

---

## Chapter 6: Complete Registration Form

**Learning Outcomes:**
- Build multiple form steps with validation
- Implement review and submit functionality
- Create data persistence layer
- Handle form submission with error handling
- Test complete form flows end-to-end

**Key Concepts:**
- Multi-step form integration
- Review step pattern
- Data persistence strategies (localStorage + in-memory store)
- Form submission flow
- Error handling and retry logic

**Features Built:**
- AttendeeDetailsStep (name, email, phone, organization)
- DietaryAccessibilityStep (dietary restrictions, accessibility needs)
- ReviewStep (data review, terms agreement, marketing consent)
- Registration store for data persistence
- Success confirmation page
- Complete form submission flow

**Testing Focus:**
- Unit tests for each form step
- Integration tests for complete form flow
- E2E tests for full registration journey
- Validation tests for each step

**Files Created:**
- `src/components/registration/AttendeeDetailsStep.tsx`
- `src/components/registration/DietaryAccessibilityStep.tsx`
- `src/components/registration/ReviewStep.tsx`
- `src/lib/registration-store.ts`
- `src/app/register/success/page.tsx`
- E2E tests for complete registration flow

---

## Chapter 7: Attendee Management

**Learning Outcomes:**
- Create data display pages
- Implement responsive layouts (table vs cards)
- Handle loading and error states
- Fetch and display data
- Test accessibility features

**Key Concepts:**
- Data fetching patterns
- Responsive design strategies
- Loading and error state handling
- Accessibility testing
- Full application integration

**Features Built:**
- Attendee data model
- AttendeeCard component (responsive card layout)
- AttendeeList component (list container with states)
- Attendees page with data fetching
- Responsive layouts (cards on mobile, table on desktop)

**Testing Focus:**
- Unit tests for attendee components
- E2E tests for complete user journey (register → view attendees)
- Accessibility tests (screen reader, keyboard navigation)
- Responsive layout tests

**Files Created:**
- `src/app/attendees/page.tsx`
- `src/components/attendees/AttendeeList.tsx`
- `src/components/attendees/AttendeeCard.tsx`
- E2E tests for attendee management
- Accessibility tests

---

## Learning Path

The tutorial follows a carefully designed progression:

1. **Foundation** (Chapter 1): Set up development environment and testing tools
2. **Components** (Chapter 2): Build isolated, reusable form components
3. **Validation** (Chapter 3): Add validation logic and error handling
4. **First Step** (Chapter 4): Create the first form step with state management
5. **Navigation** (Chapter 5): Add multi-step navigation and persistence
6. **Complete Form** (Chapter 6): Build all form steps and submission flow
7. **Data Display** (Chapter 7): Create attendee management page

Each chapter builds on the previous one, ensuring you understand each concept before moving to the next.

## Technology Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm
- **Unit Testing:** Vitest
- **Component Testing:** Storybook with interaction tests
- **E2E Testing:** Playwright
- **State Management:** React Context API
- **Data Persistence:** localStorage (form state) + in-memory store (submissions)

## Enterprise Best Practices

Throughout the tutorial, you'll learn and apply:

- **TypeScript:** Proper type definitions for all components and functions
- **Accessibility:** ARIA labels, keyboard navigation, focus management
- **Testing:** Comprehensive coverage with unit, component, and E2E tests
- **Component Design:** Isolated, reusable components with clear interfaces
- **State Management:** Appropriate patterns for different use cases
- **Error Handling:** Graceful degradation and clear error messages
- **Code Organization:** Logical file structure and separation of concerns

## Getting Started

1. Complete Chapter 1 to set up your development environment
2. Follow each chapter in sequence
3. Complete the exercises and tests in each chapter
4. Refer to the TROUBLESHOOTING.md guide if you encounter issues
5. Use the COMPLETION-CHECKLIST.md to track your progress

## Additional Resources

- **COMPLETION-CHECKLIST.md:** Track your progress through the tutorial
- **TROUBLESHOOTING.md:** Solutions to common issues
- **Chapter instruction documents:** Detailed step-by-step guides for each chapter

## Support

If you encounter issues:
1. Check the TROUBLESHOOTING.md guide
2. Review the chapter's instruction document
3. Examine the completed code in the chapter folder
4. Verify your starting state matches the previous chapter's completion

Happy learning! 🚀
