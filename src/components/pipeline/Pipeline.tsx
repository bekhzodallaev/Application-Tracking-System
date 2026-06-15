import { getSession } from "@/lib/auth/session";
import { getUserJobApplications, getUsersCollection } from "@/lib/db/server";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import Column, { Application } from "./Column";

export default async function Pipeline() {
  const session = await getSession();
  if (!session?.userId) redirect("/auth/signin");

  const users = await getUsersCollection();
  const user = await users.findOne(
    { _id: new ObjectId(session.userId) },
    { projection: { name: 1, email: 1 } },
  );
  if (!user) redirect("/auth/signin");

  // fetch user's job applications from DB
  const jobApplications = await getUserJobApplications(session.userId);

  // map to Application type
  const applications: Application[] = jobApplications.map((app) => ({
    id: app._id.toString(),
    title: app.position || "",
    company: app.company || null,
    date: app.date ? new Date(app.date).toISOString() : "",
    status: app.status as Application["status"],
    confidence: app.confidence,
  }));

  // group by status for columns
  const pipelineData = applications.reduce(
    (acc, app) => {
      const status = app.status || "unknown";
      if (!acc[status]) acc[status] = [];
      acc[status].push(app);
      return acc;
    },
    {} as Record<Application["status"], Application[]>,
  );

  return (
    <div className="overflow-auto p-2 h-[400px]">
      <div className="flex gap-6 min-w-max">
        <Column title="Applied" items={pipelineData.applied || []} />
        <Column title="Interview" items={pipelineData.interview || []} />
        <Column title="Offer" items={pipelineData.offer || []} />
        <Column title="Rejected" items={pipelineData.rejected || []} />
        <Column title="Withdrawn" items={pipelineData.withdrawn || []} />
        <Column title="Unknown" items={pipelineData.unknown || []} />
      </div>
    </div>
  );
}
