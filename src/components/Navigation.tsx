import { Link, useLocation } from "react-router-dom";
import { Bell, LayoutDashboard, AlertTriangle, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const location = useLocation();
  const activeAlerts = 7; // This would come from your data source

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-custom-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
            <AlertTriangle className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">DisasterOps</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              className="flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/alerts">
            <Button
              variant={isActive("/alerts") ? "default" : "ghost"}
              className="flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4" />
              Alerts
            </Button>
          </Link>
          <Link to="/resources">
            <Button
              variant={isActive("/resources") ? "default" : "ghost"}
              className="flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              Resources
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {activeAlerts > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                {activeAlerts}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-around border-t py-2 px-4">
        <Link to="/">
          <Button
            variant={isActive("/") ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="text-xs">Dashboard</span>
          </Button>
        </Link>
        <Link to="/alerts">
          <Button
            variant={isActive("/alerts") ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs">Alerts</span>
          </Button>
        </Link>
        <Link to="/resources">
          <Button
            variant={isActive("/resources") ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2"
          >
            <Package className="h-4 w-4" />
            <span className="text-xs">Resources</span>
          </Button>
        </Link>
      </nav>
    </header>
  );
};
