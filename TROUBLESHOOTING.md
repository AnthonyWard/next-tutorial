# Troubleshooting Guide

This guide provides solutions to common issues you might encounter while working through the Next.js Event Registration Tutorial.

## Table of Contents

- [Setup Issues](#setup-issues)
- [Development Server Issues](#development-server-issues)
- [Component Issues](#component-issues)
- [Testing Issues](#testing-issues)
- [Form and Validation Issues](#form-and-validation-issues)
- [State Management Issues](#state-management-issues)
- [Build and Deployment Issues](#build-and-deployment-issues)
- [TypeScript Issues](#typescript-issues)

---

## Setup Issues

### Issue: pnpm command not found

**Symptoms:**
```bash
bash: pnpm: command not found
```

**Solution:**
Install pnpm globally:
```bash
npm install -g pnpm
```

Or use npm/npx as an alternative:
```bash
npx pnpm install
```

---

### Issue: Node version incompatibility

**Symptoms:**
```
Error: The engine "node" is incompatible with this module
```

**Solution:**
1. Check your Node.js version:
```bash
node --version
```

2. Ensure you have Node.js 18+ installed
3. Update Node.js if needed: https://nodejs.org/

---

### Issue: Port already in use

**Symptoms:**
```
Error: Port 3000 is already in use
```

**Solution:**
1. Kill the process using port 3000:
```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:3000 | xargs kill -9
```

2. Or use a different port:
```bash
pnpm dev -- -p 3001
```

---

## Development Server Issues

### Issue: Changes not reflecting in browser

**Symptoms:**
- Code changes don't appear after saving
- Browser shows old version of the app

**Solution:**
1. Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear Next.js cache:
```bash
rm -rf .next
pnpm dev
```
3. Check if Fast Refresh is working (should see "compiled successfully" in terminal)

---

### Issue: Module not found errors

**Symptoms:**
```
Module not found: Can't resolve '@/components/...'
```

**Solution:**
1. Verify the file exists at the specified path
2. Check your `tsconfig.json` path aliases:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
3. Restart the development server
4. Reinstall dependencies:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## Component Issues

### Issue: Component not rendering

**Symptoms:**
- Component appears blank
- No errors in console

**Solution:**
1. Check if component is exported correctly:
```typescript
// Correct
export function MyComponent() { ... }
// or
export default function MyComponent() { ... }
```

2. Verify import statement matches export:
```typescript
// For named export
import { MyComponent } from './MyComponent';
// For default export
import MyComponent from './MyComponent';
```

3. Check for missing return statement:
```typescript
// Wrong
function MyComponent() {
  <div>Content</div>
}

// Correct
function MyComponent() {
  return <div>Content</div>;
}
```

---

### Issue: Tailwind CSS classes not working

**Symptoms:**
- Styles not applied
- Classes appear in HTML but no styling

**Solution:**
1. Verify `tailwind.config.ts` includes your files:
```typescript
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // ...
}
```

2. Check `globals.css` includes Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Restart development server after config changes

4. Verify class names are correct (no typos)

---

### Issue: TypeScript errors in component props

**Symptoms:**
```
Type '{ ... }' is not assignable to type 'IntrinsicAttributes & Props'
```

**Solution:**
1. Verify prop interface matches usage:
```typescript
interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

// Usage must match
<Input value={text} onChange={setText} />
```

2. Check for missing required props
3. Ensure prop types are correct (string vs number, etc.)

---

## Testing Issues

### Issue: Vitest tests failing to run

**Symptoms:**
```
Error: Cannot find module '@testing-library/react'
```

**Solution:**
1. Install testing dependencies:
```bash
pnpm add -D @testing-library/react @testing-library/jest-dom vitest
```

2. Verify `vitest.config.ts` is configured correctly
3. Check `vitest.setup.ts` imports testing library

---

### Issue: Storybook not starting

**Symptoms:**
```
Error: Cannot find module '@storybook/...'
```

**Solution:**
1. Reinstall Storybook dependencies:
```bash
pnpm add -D @storybook/react @storybook/nextjs
```

2. Verify `.storybook/main.ts` configuration
3. Clear Storybook cache:
```bash
rm -rf node_modules/.cache/storybook
pnpm storybook
```

---

### Issue: Playwright tests failing

**Symptoms:**
```
Error: browserType.launch: Executable doesn't exist
```

**Solution:**
1. Install Playwright browsers:
```bash
pnpm exec playwright install
```

2. For specific browser:
```bash
pnpm exec playwright install chromium
```

---

### Issue: Tests pass locally but fail in CI

**Symptoms:**
- Tests work on your machine
- CI/CD pipeline shows failures

**Solution:**
1. Ensure consistent Node.js version in CI
2. Install all dependencies in CI:
```bash
pnpm install --frozen-lockfile
```
3. Install Playwright browsers in CI
4. Check for timing issues (add waits in E2E tests)
5. Verify environment variables are set in CI

---

## Form and Validation Issues

### Issue: Form validation not triggering

**Symptoms:**
- Error messages don't appear
- Form submits with invalid data

**Solution:**
1. Verify validation function is called:
```typescript
const handleSubmit = () => {
  const result = validateForm(formData, validationSchema);
  if (!result.isValid) {
    setErrors(result.errors);
    return;
  }
  // Submit form
};
```

2. Check validation rules are defined correctly
3. Ensure error state is being set and passed to components

---

### Issue: Input onChange not working

**Symptoms:**
- Can't type in input fields
- Input value doesn't update

**Solution:**
1. Verify controlled component pattern:
```typescript
// Wrong - missing onChange
<Input value={text} />

// Correct
<Input value={text} onChange={setText} />
```

2. Check onChange handler updates state:
```typescript
const [text, setText] = useState('');
<Input value={text} onChange={(value) => setText(value)} />
```

---

### Issue: Form state not persisting across steps

**Symptoms:**
- Data lost when navigating between steps
- Form resets unexpectedly

**Solution:**
1. Verify FormContext is wrapping the form:
```typescript
<FormProvider>
  <RegistrationForm />
</FormProvider>
```

2. Check localStorage is saving data:
```typescript
useEffect(() => {
  localStorage.setItem('form-state', JSON.stringify(formData));
}, [formData]);
```

3. Verify data is loaded on mount:
```typescript
useEffect(() => {
  const saved = localStorage.getItem('form-state');
  if (saved) {
    setFormData(JSON.parse(saved));
  }
}, []);
```

---

## State Management Issues

### Issue: Context value is undefined

**Symptoms:**
```
TypeError: Cannot read property '...' of undefined
```

**Solution:**
1. Ensure component is inside Context Provider:
```typescript
// Wrong
<MyComponent />
<FormProvider>...</FormProvider>

// Correct
<FormProvider>
  <MyComponent />
</FormProvider>
```

2. Check context is created correctly:
```typescript
const FormContext = createContext<FormContextValue | null>(null);
```

3. Add error handling in custom hook:
```typescript
export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
}
```

---

### Issue: State updates not reflecting

**Symptoms:**
- State changes but UI doesn't update
- Old values displayed

**Solution:**
1. Ensure you're not mutating state directly:
```typescript
// Wrong
formData.name = 'John';
setFormData(formData);

// Correct
setFormData({ ...formData, name: 'John' });
```

2. Check for stale closures in useEffect:
```typescript
// Add dependencies
useEffect(() => {
  // Use formData
}, [formData]); // Don't forget dependencies
```

---

### Issue: localStorage quota exceeded

**Symptoms:**
```
QuotaExceededError: Failed to execute 'setItem' on 'Storage'
```

**Solution:**
1. Clear old data before saving:
```typescript
try {
  localStorage.setItem('form-state', JSON.stringify(formData));
} catch (error) {
  if (error.name === 'QuotaExceededError') {
    // Clear old data
    localStorage.clear();
    // Try again
    localStorage.setItem('form-state', JSON.stringify(formData));
  }
}
```

2. Reduce data size (don't store unnecessary fields)
3. Use compression for large data

---

## Build and Deployment Issues

### Issue: Build fails with type errors

**Symptoms:**
```
Type error: Property '...' does not exist on type '...'
```

**Solution:**
1. Run type check locally:
```bash
pnpm tsc --noEmit
```

2. Fix all TypeScript errors before building
3. Ensure all dependencies have type definitions
4. Check `tsconfig.json` is configured correctly

---

### Issue: Build succeeds but app crashes in production

**Symptoms:**
- Development works fine
- Production build crashes or shows errors

**Solution:**
1. Test production build locally:
```bash
pnpm build
pnpm start
```

2. Check for environment-specific code:
```typescript
// Use environment variables correctly
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
```

3. Verify all environment variables are set in production
4. Check browser console for errors

---

### Issue: Static export fails

**Symptoms:**
```
Error: Page "/register" is missing "generateStaticParams()"
```

**Solution:**
1. For dynamic routes, add `generateStaticParams`:
```typescript
export async function generateStaticParams() {
  return []; // Return array of params
}
```

2. Or use dynamic rendering:
```typescript
export const dynamic = 'force-dynamic';
```

---

## TypeScript Issues

### Issue: Type inference not working

**Symptoms:**
- TypeScript shows `any` type
- No autocomplete for props

**Solution:**
1. Add explicit type annotations:
```typescript
// Add return type
function MyComponent(): JSX.Element {
  return <div>Content</div>;
}

// Add prop types
interface Props {
  name: string;
}
function MyComponent({ name }: Props) {
  return <div>{name}</div>;
}
```

2. Restart TypeScript server in VS Code:
   - Cmd/Ctrl + Shift + P
   - "TypeScript: Restart TS Server"

---

### Issue: Module has no exported member

**Symptoms:**
```
Module '"..."' has no exported member '...'
```

**Solution:**
1. Check the export exists in the module
2. Verify import path is correct
3. Check for typos in import name
4. Ensure module is installed:
```bash
pnpm add <module-name>
```

---

### Issue: Cannot find module or its type declarations

**Symptoms:**
```
Cannot find module '@/...' or its corresponding type declarations
```

**Solution:**
1. Check `tsconfig.json` paths configuration
2. Verify file exists at the path
3. Add type declarations if needed:
```typescript
// types/custom.d.ts
declare module '@/lib/custom' {
  export function myFunction(): void;
}
```

4. Restart TypeScript server

---

## General Tips

### Debugging Strategies

1. **Use console.log strategically:**
```typescript
console.log('Form data:', formData);
console.log('Validation result:', validationResult);
```

2. **Use React DevTools:**
   - Install React DevTools browser extension
   - Inspect component props and state
   - Track component re-renders

3. **Use browser DevTools:**
   - Check Network tab for API calls
   - Check Console for errors
   - Use breakpoints in Sources tab

4. **Check the completed chapter code:**
   - Compare your code with the completed chapter folder
   - Look for differences in implementation

5. **Start fresh if needed:**
   - Copy the chapter-X-start folder
   - Follow instructions step by step
   - Compare with your previous attempt

### Getting Help

If you're still stuck after trying these solutions:

1. **Review the chapter instruction document** - Ensure you followed all steps
2. **Check the completed code** - Compare with the chapter-X folder
3. **Verify prerequisites** - Ensure previous chapters are complete
4. **Search for error messages** - Google the exact error message
5. **Check Next.js documentation** - https://nextjs.org/docs
6. **Check React documentation** - https://react.dev/

### Prevention Tips

1. **Follow chapters in sequence** - Don't skip ahead
2. **Run tests frequently** - Catch issues early
3. **Commit working code** - Use git to save progress
4. **Read error messages carefully** - They often contain the solution
5. **Keep dependencies updated** - But test after updating

---

## Common Error Messages Reference

| Error Message | Likely Cause | Quick Fix |
|--------------|--------------|-----------|
| `Module not found` | Missing import or wrong path | Check file path and imports |
| `Cannot read property of undefined` | Accessing undefined value | Add null checks or optional chaining |
| `Type 'X' is not assignable to type 'Y'` | Type mismatch | Fix type definitions |
| `Hydration failed` | Server/client mismatch | Ensure consistent rendering |
| `Maximum update depth exceeded` | Infinite re-render loop | Check useEffect dependencies |
| `Objects are not valid as React child` | Rendering object instead of string | Convert to string or extract property |
| `Each child should have unique key` | Missing key prop in list | Add unique key to list items |

---

## Still Having Issues?

If you've tried everything and still can't resolve the issue:

1. Create a minimal reproduction of the problem
2. Document the exact steps to reproduce
3. Note your environment (OS, Node version, pnpm version)
4. Check if the issue exists in the chapter-X-start folder
5. Review the COMPLETION-CHECKLIST.md to ensure you haven't missed any steps

Remember: Most issues are caused by typos, missing imports, or skipped steps. Take your time and review carefully! 🔍
