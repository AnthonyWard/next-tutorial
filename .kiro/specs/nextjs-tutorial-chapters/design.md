# Design Document: Next.js Tutorial Chapters

## Overview

This design specifies the architecture for generating Chapters 2-7 of a Next.js tutorial that teaches developers to build a production-ready event registration application. The tutorial follows a progressive learning approach, building on Chapter 1's foundation (Next.js, Storybook, Vitest, Playwright) to create a multi-step registration form with attendee management.

The system generates structured tutorial content including chapter breakdowns, starting state folders, instruction documents, and comprehensive testing examples. Each chapter introduces 1-2 concepts maximum, ensuring learners build understanding incrementally without cognitive overload.

### Key Design Goals

1. **Progressive Complexity**: Simple components before complex forms, single-step before multi-step, UI before data persistence
2. **Enterprise Patterns**: TypeScript, accessibility, isolated components, comprehensive testing
3. **Practical Learning**: Concise instructions with working code examples
4. **Complete Coverage**: All registration form steps and attendee management by final chapter

## Architecture

### Chapter Progression Strategy

The tutorial follows a 7-chapter structure (Chapter 1 already exists):

**Chapter 2: Basic Form Components**
- Input, Select, Textarea components
- Component isolation and reusability
- TypeScript prop types
- Storybook stories for each component

**Chapter 3: Form Validation**
- Client-side validation patterns
- Error message display
- Validation helper functions
- Testing validation logic

**Chapter 4: Event Selection Step**
- First form step implementation
- Event data model
- Form state management basics
- Step-specific testing

**Chapter 5: Multi-Step Form Navigation**
- Step navigation component
- Progress indicator
- Form state persistence across steps
- Navigation testing

**Chapter 6: Complete Registration Form**
- Attendee details step
- Dietary/accessibility needs step
- Review and submit step
- End-to-end form flow testing

**Chapter 7: Attendee Management**
- Attendee list page
- Data fetching and display
- Responsive layouts
- Full application integration testing

### Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Testing**: Vitest (unit), Storybook (component), Playwright (E2E)
- **State Management**: React Context API
- **Data Persistence**: localStorage for form state, in-memory store for submissions

## Components and Interfaces

### Core Form Components (Chapter 2)

```typescript
// Input Component
interface InputProps {
  id: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'number';
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  'aria-describedby'?: string;
}

// Select Component
interface SelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

// Textarea Component
interface TextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

// Checkbox Component
interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}
```

### Validation System (Chapter 3)

```typescript
// Validation Rule Type
type ValidationRule = {
  validate: (value: any) => boolean;
  message: string;
};

// Field Validation Configuration
interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  errorMessage?: string;
}

// Validation Result
interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Validation Functions
function validateField(value: any, rules: FieldValidation): string | null;
function validateForm(data: Record<string, any>, schema: Record<string, FieldValidation>): ValidationResult;
```

### Multi-Step Form Architecture (Chapters 4-6)

```typescript
// Form Step Configuration
interface FormStep {
  id: string;
  title: string;
  description?: string;
  component: React.ComponentType<StepProps>;
  validation: Record<string, FieldValidation>;
}

// Step Props
interface StepProps {
  data: FormData;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

// Form Context
interface FormContextValue {
  currentStep: number;
  totalSteps: number;
  formData: FormData;
  errors: Record<string, string>;
  updateField: (field: string, value: any) => void;
  nextStep: () => void;
  previousStep: () => void;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
}

// Step Navigator Component
interface StepNavigatorProps {
  steps: FormStep[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  allowSkip?: boolean;
}
```

### Registration Form Steps

**Step 1: Event Selection**
```typescript
interface EventSelectionData {
  eventId: string;
  eventName: string;
  eventDate: string;
}
```

**Step 2: Attendee Details**
```typescript
interface AttendeeDetailsData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization?: string;
}
```

**Step 3: Dietary & Accessibility**
```typescript
interface DietaryAccessibilityData {
  dietaryRestrictions: string[];
  otherDietary?: string;
  accessibilityNeeds: string[];
  otherAccessibility?: string;
}
```

**Step 4: Review & Submit**
```typescript
interface ReviewData {
  agreedToTerms: boolean;
  marketingConsent: boolean;
}
```

### Attendee Management (Chapter 7)

```typescript
// Attendee Model
interface Attendee {
  id: string;
  eventId: string;
  eventName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization?: string;
  dietaryRestrictions: string[];
  accessibilityNeeds: string[];
  registeredAt: string;
}

// Attendee List Component
interface AttendeeListProps {
  attendees: Attendee[];
  loading?: boolean;
  error?: string;
}

// Attendee Card Component
interface AttendeeCardProps {
  attendee: Attendee;
  onView?: (id: string) => void;
}
```

## Data Models

### Event Model

```typescript
interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  registeredCount: number;
  isActive: boolean;
}
```

### Registration Model

```typescript
interface Registration {
  id: string;
  eventId: string;
  attendee: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    organization?: string;
  };
  preferences: {
    dietaryRestrictions: string[];
    otherDietary?: string;
    accessibilityNeeds: string[];
    otherAccessibility?: string;
  };
  consent: {
    agreedToTerms: boolean;
    marketingConsent: boolean;
  };
  status: 'draft' | 'submitted' | 'confirmed';
  createdAt: string;
  submittedAt?: string;
}
```

### Form State Model

```typescript
interface FormState {
  currentStep: number;
  data: {
    eventSelection: EventSelectionData;
    attendeeDetails: AttendeeDetailsData;
    dietaryAccessibility: DietaryAccessibilityData;
    review: ReviewData;
  };
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  lastSaved?: string;
}
```

## State Management

### Form State Management Strategy

**Chapter 4-5: React Context for Form State**

The tutorial uses React Context API for managing form state across steps. This approach:
- Provides centralized state management without external dependencies
- Enables step-to-step data persistence
- Simplifies prop drilling for deeply nested components
- Demonstrates enterprise patterns without overwhelming complexity

```typescript
// FormProvider Component
const FormContext = createContext<FormContextValue | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('registration-form-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed.data);
      setCurrentStep(parsed.currentStep);
    }
  }, []);
  
  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('registration-form-state', JSON.stringify({
      currentStep,
      data: formData,
      lastSaved: new Date().toISOString()
    }));
  }, [currentStep, formData]);
  
  // Context value implementation
  // ...
}
```

### Data Persistence Strategy

**Two-Tier Persistence Approach:**

1. **Form State Persistence (localStorage)**
   - Saves form progress automatically
   - Survives page refreshes
   - Cleared on successful submission
   - Used in Chapters 5-6

2. **Submission Persistence (In-Memory Store)**
   - Stores completed registrations
   - Simulates backend API
   - Used in Chapters 6-7
   - Can be replaced with real API in production

```typescript
// Submission Store (Chapter 6-7)
class RegistrationStore {
  private registrations: Map<string, Registration> = new Map();
  
  async submit(registration: Omit<Registration, 'id' | 'createdAt'>): Promise<Registration> {
    const id = crypto.randomUUID();
    const created: Registration = {
      ...registration,
      id,
      createdAt: new Date().toISOString()
    };
    this.registrations.set(id, created);
    return created;
  }
  
  async getAll(): Promise<Registration[]> {
    return Array.from(this.registrations.values());
  }
  
  async getById(id: string): Promise<Registration | null> {
    return this.registrations.get(id) || null;
  }
}

export const registrationStore = new RegistrationStore();
```

## Routing Structure

### Application Routes

```
/                           - Home page with event list
/register                   - Multi-step registration form
  /register?step=1          - Event selection
  /register?step=2          - Attendee details
  /register?step=3          - Dietary & accessibility
  /register?step=4          - Review & submit
/register/success           - Confirmation page
/attendees                  - Attendee list page
```

### Route Implementation (App Router)

```
src/
  app/
    page.tsx                      # Home page
    layout.tsx                    # Root layout
    register/
      page.tsx                    # Registration form container
      layout.tsx                  # Form layout with provider
      success/
        page.tsx                  # Success confirmation
    attendees/
      page.tsx                    # Attendee list page
```

## Chapter-by-Chapter Implementation Plan

### Chapter 2: Basic Form Components

**Concepts Introduced:**
- Component isolation and reusability
- TypeScript prop interfaces
- Accessibility attributes (ARIA labels, roles)
- Controlled components pattern

**Files Created:**
- `src/components/forms/Input.tsx`
- `src/components/forms/Select.tsx`
- `src/components/forms/Textarea.tsx`
- `src/components/forms/Checkbox.tsx`
- `src/components/forms/Input.stories.tsx`
- `src/components/forms/Input.test.tsx`

**Testing Focus:**
- Unit tests: prop handling, onChange callbacks
- Storybook: visual states (default, error, disabled)
- Interaction tests: user input, keyboard navigation

### Chapter 3: Form Validation

**Concepts Introduced:**
- Validation rule patterns
- Error message display
- Form-level vs field-level validation

**Files Created:**
- `src/lib/validation.ts`
- `src/lib/validation.test.ts`
- `src/components/forms/FormField.tsx` (wrapper with validation)

**Testing Focus:**
- Unit tests: validation functions with various inputs
- Edge cases: empty strings, special characters, boundary values

### Chapter 4: Event Selection Step

**Concepts Introduced:**
- Form step component structure
- Basic state management
- Event data model

**Files Created:**
- `src/app/register/page.tsx`
- `src/components/registration/EventSelectionStep.tsx`
- `src/lib/events.ts` (mock event data)
- `tests/e2e/event-selection.spec.ts`

**Testing Focus:**
- Component tests: event selection interaction
- E2E tests: navigate to form, select event, verify selection

### Chapter 5: Multi-Step Form Navigation

**Concepts Introduced:**
- React Context API
- Step navigation logic
- Progress indicators
- localStorage persistence

**Files Created:**
- `src/contexts/FormContext.tsx`
- `src/components/registration/StepNavigator.tsx`
- `src/components/registration/ProgressBar.tsx`
- `src/hooks/useFormContext.ts`

**Testing Focus:**
- Unit tests: context provider, navigation logic
- E2E tests: multi-step navigation, back/forward, persistence

### Chapter 6: Complete Registration Form

**Concepts Introduced:**
- Multiple form steps integration
- Review step pattern
- Form submission flow

**Files Created:**
- `src/components/registration/AttendeeDetailsStep.tsx`
- `src/components/registration/DietaryAccessibilityStep.tsx`
- `src/components/registration/ReviewStep.tsx`
- `src/app/register/success/page.tsx`
- `src/lib/registration-store.ts`

**Testing Focus:**
- Integration tests: complete form flow
- E2E tests: full registration journey
- Validation tests: each step's validation rules

### Chapter 7: Attendee Management

**Concepts Introduced:**
- Data fetching patterns
- Responsive layouts (table vs cards)
- Loading and error states

**Files Created:**
- `src/app/attendees/page.tsx`
- `src/components/attendees/AttendeeList.tsx`
- `src/components/attendees/AttendeeCard.tsx`
- `tests/e2e/attendee-management.spec.ts`

**Testing Focus:**
- Component tests: list rendering, empty states
- E2E tests: view attendees after registration
- Responsive tests: mobile and desktop layouts

## Component Hierarchy

```
App Layout
├── Home Page (/)
│   └── Event List
│       └── Event Card (multiple)
│
├── Registration Form (/register)
│   ├── FormProvider (Context)
│   ├── ProgressBar
│   ├── StepNavigator
│   └── Current Step Component
│       ├── EventSelectionStep
│       │   └── Select (Event dropdown)
│       ├── AttendeeDetailsStep
│       │   ├── Input (First Name)
│       │   ├── Input (Last Name)
│       │   ├── Input (Email)
│       │   ├── Input (Phone)
│       │   └── Input (Organization)
│       ├── DietaryAccessibilityStep
│       │   ├── Checkbox (Dietary options)
│       │   ├── Textarea (Other dietary)
│       │   ├── Checkbox (Accessibility options)
│       │   └── Textarea (Other accessibility)
│       └── ReviewStep
│           ├── Review Section (Event)
│           ├── Review Section (Attendee)
│           ├── Review Section (Preferences)
│           ├── Checkbox (Terms)
│           └── Checkbox (Marketing)
│
├── Success Page (/register/success)
│   └── Confirmation Message
│       └── Registration Summary
│
└── Attendees Page (/attendees)
    └── AttendeeList
        └── AttendeeCard (multiple)
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Chapter Start Folder Existence

*For any* chapter number N (where N >= 2), the tutorial planner should generate a corresponding "chapter-N-start" folder containing the starting state for that chapter.

**Validates: Requirements 2.1**

### Property 2: Chapter Progression Consistency

*For any* two consecutive chapters N and N+1, the starting state of chapter N+1 should match the completed code from chapter N, ensuring learners can build progressively without gaps.

**Validates: Requirements 2.2**

### Property 3: Starting State Completeness

*For any* chapter start folder, it should contain all necessary dependencies (package.json, lock files), configuration files (tsconfig, next.config, etc.), and all components from previous chapters.

**Validates: Requirements 2.3**

### Property 4: Instruction Document Completeness

*For any* chapter instruction document, it should contain all required sections: summary of concepts, learning outcomes, prerequisites, code examples, test coverage examples (unit, Storybook, E2E), and file specifications (which files to create or modify).

**Validates: Requirements 3.1, 3.3, 3.4, 3.5, 9.1, 9.2, 9.3**

### Property 5: Component Unit Test Coverage

*For any* new component introduced in the tutorial, there should be corresponding unit test examples using Vitest that demonstrate testing the component's behavior.

**Validates: Requirements 5.1**

### Property 6: Interactive Component Storybook Coverage

*For any* interactive component (components with user input or state changes), there should be corresponding Storybook interaction test examples demonstrating visual states and user interactions.

**Validates: Requirements 5.2**

### Property 7: User Flow E2E Test Coverage

*For any* user flow (multi-step processes like registration or navigation), there should be corresponding E2E test examples using Playwright that validate the complete flow.

**Validates: Requirements 5.3**

### Property 8: Component Code Quality Standards

*For any* component file in the tutorial, it should use TypeScript with proper type definitions, include accessibility attributes (ARIA labels, roles, keyboard navigation), and use Tailwind CSS classes for styling.

**Validates: Requirements 6.1, 6.3, 6.4**

### Property 9: App Router Pattern Compliance

*For any* route or page in the tutorial, it should follow Next.js App Router patterns (files in app directory structure) rather than Pages Router patterns (files in pages directory).

**Validates: Requirements 6.5**

### Property 10: Package Manager Consistency

*For any* chapter folder, it should use pnpm for package management, evidenced by pnpm-lock.yaml files and pnpm commands in instructions.

**Validates: Requirements 6.6**

### Property 11: Form Step Validation Coverage

*For any* form step component in the registration flow, it should include validation logic and corresponding validation tests that verify error handling and valid input acceptance.

**Validates: Requirements 10.3**

## Error Handling

### Form Validation Errors

**Strategy**: Client-side validation with clear, actionable error messages

- **Field-level validation**: Triggered on blur or change after first interaction
- **Form-level validation**: Triggered on step navigation or submission
- **Error display**: Inline messages below fields with ARIA error announcements
- **Error recovery**: Clear errors when user corrects input

**Example Error Scenarios:**
```typescript
// Required field empty
{ email: "Email is required" }

// Invalid format
{ email: "Please enter a valid email address" }

// Length constraints
{ phone: "Phone number must be at least 10 digits" }

// Custom validation
{ eventId: "Please select an available event" }
```

### Navigation Errors

**Strategy**: Prevent invalid navigation, guide users to correct issues

- **Forward navigation**: Blocked if current step has validation errors
- **Backward navigation**: Always allowed (no validation)
- **Direct step access**: Only allowed for completed steps
- **Error feedback**: Toast or banner message explaining why navigation failed

### Data Persistence Errors

**Strategy**: Graceful degradation with user notification

**localStorage Failures:**
- Catch quota exceeded errors
- Notify user that progress may not be saved
- Allow form to continue functioning
- Provide manual save option

**Submission Failures:**
- Retry logic with exponential backoff
- Clear error messages with retry button
- Preserve form data for retry
- Prevent duplicate submissions

```typescript
async function submitRegistration(data: Registration): Promise<Result> {
  try {
    const result = await registrationStore.submit(data);
    localStorage.removeItem('registration-form-state'); // Clear saved progress
    return { success: true, data: result };
  } catch (error) {
    console.error('Submission failed:', error);
    return { 
      success: false, 
      error: 'Failed to submit registration. Please try again.' 
    };
  }
}
```

### Component Errors

**Strategy**: Error boundaries with fallback UI

- **Component-level boundaries**: Catch rendering errors in form steps
- **Page-level boundaries**: Catch errors in entire pages
- **Fallback UI**: User-friendly error message with recovery options
- **Error reporting**: Log errors for debugging (console in tutorial, monitoring in production)

```typescript
// Error Boundary for Form Steps
<ErrorBoundary fallback={<StepErrorFallback onRetry={resetStep} />}>
  <CurrentStepComponent />
</ErrorBoundary>
```

## Testing Strategy

### Dual Testing Approach

The tutorial demonstrates both unit testing and property-based testing as complementary strategies:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across randomized inputs
- Together they provide comprehensive coverage: unit tests catch concrete bugs, property tests verify general correctness

**Balance Guidance:**
- Focus unit tests on specific examples and integration points
- Use property tests for validation logic, data transformations, and state management
- Avoid writing too many unit tests for scenarios property tests already cover

### Testing Library Selection

**Property-Based Testing:**
- **Library**: fast-check (JavaScript/TypeScript)
- **Configuration**: Minimum 100 iterations per property test
- **Tagging**: Each test references its design document property

```typescript
// Example property test tag format
test('Property 11: Form step validation', () => {
  // Feature: nextjs-tutorial-chapters, Property 11: Form step validation coverage
  fc.assert(
    fc.property(fc.record({...}), (formData) => {
      // Test implementation
    }),
    { numRuns: 100 }
  );
});
```

### Chapter-Specific Testing Focus

**Chapter 2: Basic Form Components**
- Unit tests: Component props, onChange handlers, default values
- Storybook tests: Visual states (default, error, disabled, focused)
- Interaction tests: User input, keyboard navigation, accessibility

**Chapter 3: Form Validation**
- Unit tests: Validation functions with specific examples
- Property tests: Validation rules across randomized inputs
- Edge cases: Empty strings, whitespace, special characters, boundary values

**Chapter 4: Event Selection Step**
- Unit tests: Event data parsing, selection state
- Component tests: Event dropdown interaction
- E2E tests: Navigate to form, select event, verify selection persists

**Chapter 5: Multi-Step Form Navigation**
- Unit tests: Context provider, navigation logic, step state
- Property tests: Navigation state consistency across step transitions
- E2E tests: Forward/backward navigation, step persistence, invalid navigation prevention

**Chapter 6: Complete Registration Form**
- Unit tests: Individual step components, review data aggregation
- Integration tests: Complete form flow with all steps
- E2E tests: Full registration journey from start to confirmation
- Property tests: Form data preservation across all steps

**Chapter 7: Attendee Management**
- Unit tests: Data fetching, list rendering, empty states
- Component tests: Attendee card display, responsive layouts
- E2E tests: Submit registration, navigate to attendees, verify display
- Accessibility tests: Screen reader compatibility, keyboard navigation

### Test Organization

```
src/
  components/
    forms/
      Input.tsx
      Input.test.tsx          # Unit tests
      Input.stories.tsx       # Storybook stories + interaction tests
  lib/
    validation.ts
    validation.test.ts        # Unit + property tests
tests/
  e2e/
    event-selection.spec.ts   # Playwright E2E tests
    registration-flow.spec.ts
    attendee-management.spec.ts
```

### Testing Best Practices Taught

1. **Test Isolation**: Each test should be independent and not rely on others
2. **Descriptive Names**: Test names should clearly describe what is being tested
3. **Arrange-Act-Assert**: Structure tests with clear setup, execution, and verification
4. **Accessibility Testing**: Include ARIA attribute verification and keyboard navigation tests
5. **Error State Testing**: Always test error conditions and edge cases
6. **Mock Data**: Use realistic but controlled test data
7. **Test Coverage**: Aim for high coverage but focus on meaningful tests, not just metrics

### Continuous Testing

The tutorial emphasizes running tests during development:

```bash
# Unit tests in watch mode
pnpm test

# Storybook for component development
pnpm storybook

# E2E tests (run after implementation)
pnpm test:e2e
```

## Tutorial Generation Workflow

### Phase 1: Chapter Planning

1. **Analyze Requirements**: Review all acceptance criteria and feature requirements
2. **Define Chapter Sequence**: Determine logical progression (simple to complex)
3. **Allocate Features**: Assign features to chapters (1-2 concepts per chapter)
4. **Validate Completeness**: Ensure all requirements covered by final chapter
5. **Create Chapter Breakdown Document**: List all chapters with concepts and learning outcomes

### Phase 2: Content Generation

For each chapter (2-7):

1. **Create Starting State Folder**:
   - Copy completed code from previous chapter
   - Verify all dependencies and configurations present
   - Test that starting state runs without errors

2. **Write Instruction Document**:
   - Chapter overview and learning outcomes
   - Prerequisites (previous chapters required)
   - Step-by-step implementation instructions
   - Code examples for new components
   - Testing examples (unit, Storybook, E2E)
   - Summary and next steps

3. **Implement Reference Code**:
   - Create all components and features for the chapter
   - Write comprehensive tests
   - Verify code follows enterprise best practices
   - Test complete functionality

4. **Create Completed State**:
   - This becomes the starting state for next chapter
   - Verify all tests pass
   - Verify application runs correctly

### Phase 3: Quality Assurance

1. **Validate Chapter Progression**:
   - Verify each chapter builds on previous
   - Test that starting states work correctly
   - Ensure no missing dependencies

2. **Review Instructions**:
   - Check for clarity and conciseness
   - Verify code examples are complete
   - Ensure testing examples are comprehensive

3. **Test Complete Tutorial**:
   - Follow instructions from Chapter 2 to 7
   - Verify learner can complete each chapter
   - Validate final application has all features

4. **Create Supporting Documents**:
   - Tutorial overview with all chapters
   - Completion checklist
   - Troubleshooting guide

### Deliverables

**For Each Chapter (2-7):**
- `chapter-X-start/` folder with starting code
- `chapter-X/` folder with completed code
- `XX-chapter-title.md` instruction document

**Supporting Documents:**
- `TUTORIAL-OVERVIEW.md` - Complete chapter listing with learning outcomes
- `COMPLETION-CHECKLIST.md` - Requirements to chapters mapping
- `TROUBLESHOOTING.md` - Common issues and solutions

### Quality Criteria

Each chapter must meet these criteria before completion:

- [ ] Introduces 1-2 concepts maximum
- [ ] Starting state matches previous chapter's end state
- [ ] Instruction document includes all required sections
- [ ] Code examples are complete and runnable
- [ ] Test examples cover unit, Storybook, and E2E
- [ ] All code uses TypeScript with proper types
- [ ] All components include accessibility attributes
- [ ] All code uses Tailwind CSS for styling
- [ ] All routes use App Router patterns
- [ ] All commands use pnpm
- [ ] Starting state runs without errors
- [ ] Completed state passes all tests
- [ ] Instructions are concise and practical

