import { TaskForm } from "@/components/forms/taskForm";
import { TasksList } from "@/components/tasks/tasksList";

export default function Home() {
  return (
    <div>
      <h1>To Do App</h1>

      <TaskForm />
      <TasksList />
    </div>
  );
}
