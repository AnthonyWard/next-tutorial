# Step 6: Creating API Routes

In this step, we will create a simple backend API within our Next.js application using **Route Handlers**. This allows us to serve data to our components without needing an external backend.

## 1. Create the API Endpoint
We will create an API that returns a list of "users".

Create the file `src/app/api/users/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export interface User {
  id: number;
  name: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: 'Alice Johnson', role: 'Admin' },
  { id: 2, name: 'Bob Smith', role: 'User' },
  { id: 3, name: 'Charlie Brown', role: 'User' },
];

export async function GET() {
  // Simulate a delay to demonstrate loading states later
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return NextResponse.json(users);
}
```

## 2. Verify the API
Run the development server:
```bash
pnpm dev
```

Visit `http://localhost:3000/api/users` in your browser. You should see the JSON array of users.
