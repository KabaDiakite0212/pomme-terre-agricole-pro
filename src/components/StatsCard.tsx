
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  trend: string;
  color: string;
}

const StatsCard = ({ title, value, description, trend, color }: StatsCardProps) => {
  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
            <p className="text-xs text-green-600 mt-2 font-medium">{trend}</p>
          </div>
          <div className={cn("w-1 h-16 rounded-full ml-4", color)}></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
