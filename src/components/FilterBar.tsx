import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterBarProps {
  onZoneChange?: (zone: string) => void;
  onTypeChange?: (type: string) => void;
  onPeriodChange?: (period: string) => void;
}

export const FilterBar = ({ onZoneChange, onTypeChange, onPeriodChange }: FilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg shadow-custom-md">
      <Select onValueChange={onZoneChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="All Zones" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all">All Districts</SelectItem>
          <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
          <SelectItem value="ernakulam">Ernakulam</SelectItem>
          <SelectItem value="kozhikode">Kozhikode</SelectItem>
          <SelectItem value="wayanad">Wayanad</SelectItem>
          <SelectItem value="idukki">Idukki</SelectItem>
          <SelectItem value="alappuzha">Alappuzha</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onTypeChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="medical">Medical</SelectItem>
          <SelectItem value="food">Food & Water</SelectItem>
          <SelectItem value="shelter">Shelter</SelectItem>
          <SelectItem value="transport">Transport</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onPeriodChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Last 24 Hours" />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="24h">Last 24 Hours</SelectItem>
          <SelectItem value="7d">Last 7 Days</SelectItem>
          <SelectItem value="30d">Last 30 Days</SelectItem>
          <SelectItem value="all">All Time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
