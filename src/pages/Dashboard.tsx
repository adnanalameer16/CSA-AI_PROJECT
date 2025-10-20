import { Navigation } from "@/components/Navigation";
import { MetricCard } from "@/components/MetricCard";
import { AlertCard } from "@/components/AlertCard";
import { FilterBar } from "@/components/FilterBar";
import { MapPin, Package, Users, AlertTriangle } from "lucide-react";

const mockAlerts = [
  {
    id: "1",
    title: "Heavy Monsoon Flooding - Alappuzha",
    description: "Severe flooding in Kuttanad region. Water level rising in backwaters. Immediate evacuation advised for low-lying areas.",
    severity: "critical" as const,
    timestamp: "5 minutes ago",
    location: "Alappuzha District",
  },
  {
    id: "2",
    title: "Landslide Warning - Wayanad Hills",
    description: "Red alert issued for hill regions. Heavy rainfall causing soil instability in Meppadi and Vythiri areas.",
    severity: "critical" as const,
    timestamp: "15 minutes ago",
    location: "Wayanad District",
  },
  {
    id: "3",
    title: "Medical Supply Request - Idukki",
    description: "Relief camps in Idukki requesting additional medical supplies and emergency medicines.",
    severity: "warning" as const,
    timestamp: "1 hour ago",
    location: "Idukki District",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Disaster Management Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring and resource allocation across Kerala</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricCard
            title="Affected Districts"
            value="8"
            icon={MapPin}
            trend="Monsoon season active"
            variant="critical"
          />
          <MetricCard
            title="Active Alerts"
            value="12"
            icon={AlertTriangle}
            trend="5 flood warnings"
            variant="warning"
          />
          <MetricCard
            title="Relief Camps Active"
            value="47"
            icon={Package}
            trend="3,200+ people sheltered"
            variant="success"
          />
          <MetricCard
            title="Personnel Deployed"
            value="284"
            icon={Users}
            trend="NDRF & Fire Force teams"
            variant="default"
          />
        </div>

        <div className="mb-6">
          <FilterBar />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Recent Alerts</h2>
            <a href="/alerts" className="text-sm text-accent hover:underline">
              View all alerts →
            </a>
          </div>
          <div className="grid gap-4">
            {mockAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
