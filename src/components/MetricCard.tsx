import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "critical" | "warning" | "success";
}

export const MetricCard = ({ title, value, icon: Icon, trend, variant = "default" }: MetricCardProps) => {
  const variantClasses = {
    default: "gradient-primary",
    critical: "gradient-critical",
    warning: "gradient-warning",
    success: "gradient-success",
  };

  return (
    <Card className="overflow-hidden shadow-custom-md hover:shadow-custom-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
            <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
            {trend && (
              <p className="text-xs text-muted-foreground">{trend}</p>
            )}
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${variantClasses[variant]}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
