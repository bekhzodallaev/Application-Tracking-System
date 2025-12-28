
import { Application } from "./Column";

interface ApplicationCardProps {
    data:Application
}

export default function ApplicationCard({data}:ApplicationCardProps) {
  
    const { title, company, date } = data;
  return (
    <div className="border rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition">
      <h4 className="font-semibold text-sm">{title}</h4>
      <p className="text-xs text-gray-500">{company}</p>
      <p className="text-xs text-gray-400 mt-1">Applied on {date}</p>
    </div>
  );
}
