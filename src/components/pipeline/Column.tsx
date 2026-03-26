import ApplicationCard from "./ApplicationCard";


export interface Application {
   id: string;
  title: string;
  logo?:string,
  company: string | null;
  date: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn' | 'unknown';
  confidence?: number;
}

interface ColumnTypes {
    title: string,
    items:Application[]
}
export default function Column({ title, items }:ColumnTypes) {
  return (
    <div className="min-w-[220px]">
      <h3 className="sticky top-0 z-10 bg-white text-xs font-semibold mb-2 uppercase tracking-wide text-gray-500 ">
        {title} <span className="text-gray-400">({items.length})</span>
      </h3>

      <div className="flex flex-col gap-4">
        {items.length === 0 && (
          <div className="text-gray-400 text-sm italic">No applications</div>
        )}

        {items.map((item, index) => (
          <ApplicationCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
}
