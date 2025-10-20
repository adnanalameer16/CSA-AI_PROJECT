import { Navigation } from "@/components/Navigation";
import { FilterBar } from "@/components/FilterBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Package, Heart, Home, Truck, MapPin } from "lucide-react";

const resources = [
  {
    id: "1",
    name: "Medical Supplies",
    icon: Heart,
    total: 850,
    allocated: 720,
    available: 130,
    locations: ["Kottayam Medical College", "Ernakulam GH", "Kozhikode Medical College"],
    status: "warning" as const,
  },
  {
    id: "2",
    name: "Food & Water Packets",
    icon: Package,
    total: 15000,
    allocated: 9500,
    available: 5500,
    locations: ["Thiruvananthapuram Hub", "Thrissur Center", "Kannur Distribution"],
    status: "available" as const,
  },
  {
    id: "3",
    name: "Relief Camp Beds",
    icon: Home,
    total: 3200,
    allocated: 2150,
    available: 1050,
    locations: ["Schools & Community Halls", "Temples & Churches", "Government Buildings"],
    status: "available" as const,
  },
  {
    id: "4",
    name: "Rescue Boats",
    icon: Truck,
    total: 180,
    allocated: 165,
    available: 15,
    locations: ["Alappuzha Base", "Ernakulam NDRF", "Kottayam Fire Station"],
    status: "critical" as const,
  },
  {
    id: "5",
    name: "Emergency Vehicles",
    icon: Truck,
    total: 95,
    allocated: 78,
    available: 17,
    locations: ["State Headquarters", "District Collectorates", "Police Stations"],
    status: "warning" as const,
  },
  {
    id: "6",
    name: "Communication Equipment",
    icon: Package,
    total: 450,
    allocated: 380,
    available: 70,
    locations: ["Control Rooms", "Field Units", "Relief Camps"],
    status: "available" as const,
  },
];

const statusConfig = {
  critical: { variant: "destructive" as const, label: "Critical" },
  warning: { variant: "default" as const, label: "Low Stock" },
  available: { variant: "secondary" as const, label: "Available" },
};

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Resource Management</h1>
          <p className="text-muted-foreground">Track and allocate disaster response resources across Kerala</p>
        </div>

        <div className="mb-6">
          <FilterBar />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {resources.map((resource) => {
            const Icon = resource.icon;
            const percentage = (resource.allocated / resource.total) * 100;
            const config = statusConfig[resource.status];

            return (
              <Card key={resource.id} className="shadow-custom-md hover:shadow-custom-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{resource.name}</CardTitle>
                        <Badge variant={config.variant} className="mt-1">
                          {config.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Allocation Status</span>
                        <span className="font-medium">{percentage.toFixed(0)}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total</p>
                        <p className="text-2xl font-bold text-foreground">{resource.total}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Allocated</p>
                        <p className="text-2xl font-bold text-foreground">{resource.allocated}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Available</p>
                        <p className="text-2xl font-bold text-success">{resource.available}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground mb-1">Locations</p>
                          <div className="flex flex-wrap gap-1">
                            {resource.locations.map((location) => (
                              <Badge key={location} variant="outline" className="text-xs">
                                {location}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Resources;
