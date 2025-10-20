import { Navigation } from "@/components/Navigation";
import { AlertCard } from "@/components/AlertCard";
import { FilterBar } from "@/components/FilterBar";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";

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
    title: "Dam Water Release - Idukki",
    description: "Water level critical at Idukki Dam. Controlled release planned. Downstream areas on alert.",
    severity: "critical" as const,
    timestamp: "30 minutes ago",
    location: "Idukki District",
  },
  {
    id: "4",
    title: "Medical Supply Request - Idukki",
    description: "Relief camps requesting additional medical supplies and emergency medicines.",
    severity: "warning" as const,
    timestamp: "1 hour ago",
    location: "Idukki District",
  },
  {
    id: "5",
    title: "Road Closure - Ghat Section",
    description: "NH 766 Wayanad Ghat section closed due to landslide. Traffic diverted via alternative routes.",
    severity: "warning" as const,
    timestamp: "2 hours ago",
    location: "Wayanad District",
  },
  {
    id: "6",
    title: "Relief Camp Opened - Ernakulam",
    description: "New relief camp established at Government Higher Secondary School, Aluva.",
    severity: "info" as const,
    timestamp: "3 hours ago",
    location: "Ernakulam District",
  },
  {
    id: "7",
    title: "Fishermen Warning - Coastal Areas",
    description: "High tide warning. Fishing activities suspended along Thiruvananthapuram and Kollam coasts.",
    severity: "warning" as const,
    timestamp: "4 hours ago",
    location: "Coastal Districts",
  },
  {
    id: "8",
    title: "Power Restoration Update",
    description: "Power supply restored in 12 panchayats of Thrissur district.",
    severity: "info" as const,
    timestamp: "5 hours ago",
    location: "Thrissur District",
  },
];

const alertStats = [
  { label: "Critical", count: 5, icon: AlertTriangle, color: "text-critical" },
  { label: "Warning", count: 4, icon: AlertCircle, color: "text-warning" },
  { label: "Info", count: 3, icon: Info, color: "text-info" },
  { label: "Resolved", count: 15, icon: CheckCircle, color: "text-success" },
];

const Alerts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Alert Management</h1>
          <p className="text-muted-foreground">Monitor and manage all active alerts across Kerala districts</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {alertStats.map((stat) => (
            <Card key={stat.label} className="shadow-custom-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.count}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-6">
          <FilterBar />
        </div>

        <div className="grid gap-4">
          {mockAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Alerts;
