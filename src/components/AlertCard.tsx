import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
  timestamp: string;
  location: string;
}

interface AlertCardProps {
  alert: Alert;
}

const severityConfig = {
  critical: {
    icon: AlertTriangle,
    class: "gradient-critical",
    badgeVariant: "destructive" as const,
    label: "Critical",
  },
  warning: {
    icon: AlertCircle,
    class: "gradient-warning",
    badgeVariant: "default" as const,
    label: "Warning",
  },
  info: {
    icon: Info,
    class: "bg-info",
    badgeVariant: "secondary" as const,
    label: "Info",
  },
};

export const AlertCard = ({ alert }: AlertCardProps) => {
  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <Card className="shadow-custom-md hover:shadow-custom-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${config.class} flex-shrink-0`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-foreground text-lg">{alert.title}</h3>
              <Badge variant={config.badgeVariant} className="flex-shrink-0">
                {config.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{alert.location}</span>
              <span>•</span>
              <span>{alert.timestamp}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
