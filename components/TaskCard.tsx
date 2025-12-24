
interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "Pending" | "Completed";
  createdAt?: string;
}

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onToggle?: (taskId: string) => void;
}

export const TaskCard = ({ task, onEdit, onDelete, onToggle }: TaskCardProps) => {
  const isPending = task.status === "Pending";

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all group">
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle?.(task._id)}
          className="mt-0.5 flex-shrink-0"
        >
          {isPending ? (
            <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/40 hover:border-muted-foreground transition-colors" />
          ) : (
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-foreground text-base mb-1 ${
              !isPending ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`text-sm mb-2 line-clamp-1 ${
                isPending ? "text-muted-foreground" : "text-muted-foreground/70"
              }`}
            >
              {task.description}
            </p>
          )}
          {task.createdAt && (
            <div className="flex items-center gap-1.5 text-muted-foreground/70 text-xs">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                {new Date(task.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
                {new Date(task.createdAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit?.(task)}
            className="p-2 hover:bg-secondary rounded-md transition-colors"
            aria-label="Edit task"
          >
            <svg
              className="w-4 h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete?.(task._id)}
            className="p-2 hover:bg-destructive/10 rounded-md transition-colors"
            aria-label="Delete task"
          >
            <svg
              className="w-4 h-4 text-muted-foreground hover:text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};