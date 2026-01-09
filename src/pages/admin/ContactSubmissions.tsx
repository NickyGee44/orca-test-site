import { useState, useEffect } from "react";
import { getContactSubmissions, updateSubmissionStatus, deleteSubmission } from "../../services/contactService";
import type { ContactSubmission } from "../../types/content";

export function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<"all" | "new" | "read" | "responded">("all");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setIsLoading(true);
    try {
      const allSubmissions = await getContactSubmissions();
      setSubmissions(allSubmissions);
    } catch (error) {
      console.error("Error loading submissions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: ContactSubmission["status"]) => {
    const result = await updateSubmissionStatus(id, status);
    if (result.success) {
      await loadSubmissions();
      if (selectedSubmission?.id === id) {
        const updated = await getContactSubmissions();
        const found = updated.find(s => s.id === id);
        if (found) setSelectedSubmission(found);
      }
    }
  };

  const handleSaveNotes = async (id: string) => {
    const result = await updateSubmissionStatus(id, selectedSubmission?.status || "read", notes);
    if (result.success) {
      await loadSubmissions();
      const updated = await getContactSubmissions();
      const found = updated.find(s => s.id === id);
      if (found) setSelectedSubmission(found);
      setNotes("");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    const result = await deleteSubmission(id);
    if (result.success) {
      await loadSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    if (filter === "all") return true;
    return submission.status === filter;
  });

  const getStatusColor = (status: ContactSubmission["status"]) => {
    switch (status) {
      case "new":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      case "read":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "responded":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "archived":
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  return (
    <div className="flex gap-6">
      {/* Submissions List */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-50">Contact Submissions</h1>
            <p className="mt-2 text-sm text-slate-400">Manage contact form submissions</p>
          </div>
          <div className="text-sm text-slate-400">
            Total: {submissions.length} | New: {submissions.filter(s => s.status === "new").length}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">Filter:</span>
          {(["all", "new", "read", "responded"] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                filter === filterOption
                  ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                  : "border-slate-700 bg-slate-900/40 text-slate-300 hover:border-slate-500"
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        {/* Submissions */}
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-slate-300">Loading submissions...</div>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-8 text-center shadow-orca-depth-2">
            <p className="text-slate-400">No submissions found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                onClick={() => {
                  setSelectedSubmission(submission);
                  setNotes(submission.notes || "");
                }}
                className={`glass-panel rounded-panel border p-4 shadow-orca-depth-2 cursor-pointer transition ${
                  selectedSubmission?.id === submission.id
                    ? "border-cyan-400/50 bg-cyan-400/10"
                    : "border-slate-800/70 bg-orca-panel/80 hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-50">{submission.name}</h3>
                      <span className={`rounded-full border px-2 py-0.5 text-xs ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{submission.company}</p>
                    <p className="mt-1 text-sm text-slate-500">{submission.email}</p>
                    <p className="mt-2 text-sm text-slate-300 line-clamp-2">{submission.message}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submission Detail */}
      {selectedSubmission && (
        <div className="w-96 space-y-4">
          <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-50">Submission Details</h2>
              <button
                onClick={() => {
                  setSelectedSubmission(null);
                  setNotes("");
                }}
                className="text-slate-400 hover:text-slate-50"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-400">Name</label>
                <p className="text-sm text-slate-50">{selectedSubmission.name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400">Company</label>
                <p className="text-sm text-slate-50">{selectedSubmission.company}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400">Email</label>
                <p className="text-sm text-slate-50">{selectedSubmission.email}</p>
              </div>
              {selectedSubmission.phone && (
                <div>
                  <label className="text-xs font-medium text-slate-400">Phone</label>
                  <p className="text-sm text-slate-50">{selectedSubmission.phone}</p>
                </div>
              )}
              {selectedSubmission.role && (
                <div>
                  <label className="text-xs font-medium text-slate-400">Role</label>
                  <p className="text-sm text-slate-50">{selectedSubmission.role}</p>
                </div>
              )}
              <div>
                <label className="text-xs font-medium text-slate-400">Message</label>
                <p className="mt-1 text-sm text-slate-300 whitespace-pre-wrap">{selectedSubmission.message}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400">Submitted</label>
                <p className="text-sm text-slate-50">
                  {new Date(selectedSubmission.submittedAt).toLocaleString()}
                </p>
              </div>

              {/* Status Actions */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400">Status</label>
                <div className="flex flex-wrap gap-2">
                  {(["new", "read", "responded", "archived"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedSubmission.id, status)}
                      className={`rounded-md border px-3 py-1 text-xs transition ${
                        selectedSubmission.status === status
                          ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                          : "border-slate-700 bg-slate-900/40 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  rows={4}
                  placeholder="Add notes about this submission..."
                />
                <button
                  onClick={() => handleSaveNotes(selectedSubmission.id)}
                  className="mt-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300 hover:bg-cyan-400/20"
                >
                  Save Notes
                </button>
              </div>

              {/* Delete */}
              <button
                onClick={() => handleDelete(selectedSubmission.id)}
                className="w-full rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300 hover:bg-red-500/20"
              >
                Delete Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
