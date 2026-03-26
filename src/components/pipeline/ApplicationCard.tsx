
import { Application } from "./Column";

interface ApplicationCardProps {
    data:Application
}

export default function ApplicationCard({data}:ApplicationCardProps) {
  
    const { title, company, date } = data;
  return (
    <div className="rounded-xl p-3 bg-white transition shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] transform hover:scale-110  duration-300">
      <h4 className="font-semibold text-sm">{title}</h4>
      <p className="text-xs text-gray-500">{company}</p>
      <p className="text-xs text-gray-400 mt-1">Applied on {date}</p>
    </div>
  );
}
