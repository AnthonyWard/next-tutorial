# Step 7: Data Fetching Components

Now that we have an API, let's create a Client Component that fetches and displays this data. We will use Client-Side fetching here to demonstrate loading states and network mocking in later steps.

## 1. Create the UserList Component
Create `src/components/UserList.tsx`. This component will fetch data from our API.

```typescript
'use client';

import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  role: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/users')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error loading users');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-2 bg-gray-50 rounded">
            <span className="font-medium">{user.name}</span>
            <span className="text-gray-500 text-sm ml-2">({user.role})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 2. Use the Component
Update `src/app/page.tsx` to include the `UserList`.

```typescript
import UserList from '@/components/UserList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserList />
    </main>
  );
}
```

## 3. Verify
Run the app and observe the "Loading users..." state briefly before the list appears.
