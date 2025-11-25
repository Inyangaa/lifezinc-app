import { useState, useEffect } from 'react';
import { ISSUE_SOLUTIONS, IssueKey, IssueSolution } from '../data/issueSolutions';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  selectedIssue: IssueKey | null;
}

export function IssueSolutionsPanelInline({ selectedIssue }: Props) {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [justSavedId, setJustSavedId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadSavedTools();
    }
  }, [user]);

  const loadSavedTools = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('saved_tools')
        .select('issue_key, solution_index')
        .eq('user_id', user.id);

      if (error) throw error;

      if (data) {
        const ids = data.map(item => `${item.issue_key}-${item.solution_index}`);
        setSavedIds(ids);
      }
    } catch (error) {
      console.error('Error loading saved tools:', error);
    }
  };

  const handleSave = async (solution: IssueSolution, idx: number) => {
    if (!user || !selectedIssue) return;

    const id = `${selectedIssue}-${idx}`;

    if (savedIds.includes(id)) return;

    try {
      const { error } = await supabase
        .from('saved_tools')
        .insert({
          user_id: user.id,
          issue_key: selectedIssue,
          solution_index: idx,
          solution_title: solution.title,
          solution_type: solution.type,
        });

      if (error) throw error;

      setSavedIds((prev) => [...prev, id]);
      setJustSavedId(id);

      setTimeout(() => setJustSavedId((current) => (current === id ? null : current)), 2000);
    } catch (error) {
      console.error('Error saving tool:', error);
    }
  };

  if (!selectedIssue) {
    return (
      <div className="mt-3 rounded-2xl border bg-white/60 p-4 text-sm text-gray-500">
        Tap an emotion or issue above and LifeZinc will show practical tools and supports here.
      </div>
    );
  }

  const issue = ISSUE_SOLUTIONS.find((i) => i.key === selectedIssue);
  if (!issue) return null;

  return (
    <section className="mt-3 rounded-2xl border bg-white/80 p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl">{issue.emoji}</span>
        <h2 className="text-base font-semibold text-gray-900">{issue.label}</h2>
      </div>
      <p className="mt-1 text-xs text-gray-500">{issue.intro}</p>

      <div className="mt-3 space-y-3">
        {issue.solutions.map((solution, idx) => {
          const id = `${issue.key}-${idx}`;
          const isSaved = savedIds.includes(id);

          return (
            <div
              key={id}
              className="rounded-xl bg-gray-50 px-3 py-2.5 text-sm"
            >
              <p className="text-[10px] uppercase tracking-wide text-gray-400">
                {renderTypeLabel(solution.type)}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-gray-800">
                {solution.title}
              </p>
              <p className="mt-0.5 text-xs text-gray-600">
                {solution.description}
              </p>

              {solution.linkUrl && solution.linkLabel && (
                <a
                  href={solution.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-xs font-medium text-blue-600 underline underline-offset-2"
                >
                  {solution.linkLabel}
                </a>
              )}

              {user && (
                <div className="mt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleSave(solution, idx)}
                    className={`text-[11px] font-medium ${
                      isSaved
                        ? "text-green-700"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {isSaved ? "✓ Saved to your tools" : "Save this tool"}
                  </button>

                  {justSavedId === id && (
                    <span className="text-[10px] text-green-600">
                      Added to your saved tools
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function renderTypeLabel(type: string): string {
  switch (type) {
    case "immediate_action":
      return "Right now";
    case "emotional_tool":
      return "Emotional tool";
    case "practical_step":
      return "Practical step";
    case "external_resource":
      return "External resource";
    default:
      return "Support";
  }
}
