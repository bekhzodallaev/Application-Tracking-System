import Column from "./Column";

const pipelineData = {
  applied: [
    { title: "Product Designer", company: "Innovate Inc", date: "Oct 26"},
    { title: "Software Engineer", company: "Tech Solutions LLC", date: "Oct 24"},
        { title: "UX Researcher", company: "Data Insights", date: "Oct 20" },
        { title: "UX Researcher", company: "Data Insights", date: "Oct 20"},
    { title: "UX Researcher", company: "Data Insights", date: "Oct 20" },
    { title: "UX Researcher", company: "Data Insights", date: "Oct 20" },
    { title: "UX Researcher", company: "Data Insights", date: "Oct 20"},
    { title: "UX Researcher", company: "Data Insights", date: "Oct 20"},

  ],
  screening: [
    { title: "Frontend Developer", company: "Creative Web Agency", date: "Oct 21"},
  ],
  hr: [
    { title: "Data Analyst", company: "QuantumLeap", date: "Oct 20"},
  ],
  technical: [],
  offer: [
    { title: "Project Manager", company: "NextGen Corp", date: "Oct 15"},
  ],
  rejected: [
    { title: "Marketing Specialist", company: "Connectivity", date: "Oct 18"},
  ],
};

export default function Pipeline() {
  return (
    <div  className=" overflow-auto p-2 h-[400px]">
      <div className="flex gap-6 min-w-max">
        <Column title="Applied" items={pipelineData.applied} />
        <Column title="Screening" items={pipelineData.screening} />
        <Column title="HR Interview" items={pipelineData.hr} />
        <Column title="Technical" items={pipelineData.technical} />
        <Column title="Offer" items={pipelineData.offer} />
        <Column title="Rejected" items={pipelineData.rejected} />
      </div>
    </div>
  );
}
