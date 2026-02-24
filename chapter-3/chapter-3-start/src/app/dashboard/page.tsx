import { Card } from '@/components/Card';

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Statistics">
          <p>Users: 1,200</p>
          <p>Revenue: $45,000</p>
        </Card>
        <Card title="Recent Activity">
          <ul>
            <li>User A joined.</li>
            <li>User B purchased item X.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}