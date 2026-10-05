import { useState } from 'react';
import { Copy } from 'lucide-react';
import { DSA_SOURCEBOOK, notebookHandoffPrompt, notebookReminders } from './notebookCompanion';
import './notebook-companion.css';

export function DsaNotebookCompanion({ sectionNumber }: { sectionNumber?: number }) {
  const [notice, setNotice] = useState('');
  const reminders = notebookReminders.filter(reminder => sectionNumber !== undefined && reminder.sections.includes(sectionNumber));
  async function copyPrompt() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(notebookHandoffPrompt);
      setNotice('Handoff prompt copied. Paste it into your NotebookLM chat; nothing was sent automatically.');
    } catch {
      setNotice('Copy was unavailable. Select the prompt below and copy it manually.');
    }
  }
  return <details className="dsa-notebook-companion" data-tour="dsa-notebook-companion">
    <summary>NotebookLM companion - keep one tracker</summary>
    <p>Use NotebookLM and the sourcebook for daily coaching. Keep CareerHQ as the existing checkpoint and evidence tracker: no second 90-day checklist, new badges or automatic progress changes.</p>
    <ol>
      <li>Follow one study task in NotebookLM; its day number or R0 label is context, not another CareerHQ checkpoint.</li>
      <li>After working, put a short handoff in your existing evidence note. Record practice without advancing unless the current checkpoint's criteria are genuinely met.</li>
      <li>Use existing Recall practice for closed-source attempts. Reading, listening and historical completion are not new proof of retained skill.</li>
    </ol>
    <p>The sourcebook's coaching labels and seven-day retention standard are not synced app statuses. CareerHQ's existing recall rules and saved records remain unchanged.</p>
    <details className="dsa-notebook-handoff">
      <summary>A short handoff prompt for NotebookLM</summary>
      <p>No extra form to maintain: ask for this summary, then paste the actual result into the existing evidence description.</p>
      <textarea readOnly rows={7} aria-label="NotebookLM session handoff prompt" value={notebookHandoffPrompt} />
      <button type="button" className="button secondary" onClick={() => void copyPrompt()}><Copy size={15} />Copy handoff prompt</button>
      {notice && <p role="status">{notice}</p>}
    </details>
    {reminders.length > 0 && <section className="dsa-notebook-reminders" aria-label="Sourcebook correctness reminders">
      <h3>Useful reminders for this topic</h3>
      {reminders.map(reminder => <div key={reminder.id}>
        <h4>{reminder.title}</h4><p>{reminder.text}</p><small>Sourcebook pp.{reminder.pages}</small>
      </div>)}
    </section>}
    <p className="dsa-notebook-source">Reference: {DSA_SOURCEBOOK}, A3/A6/D1/D7 (pp.7, 10, 47, 63).
      {' '}Only reusable guidance is shown here; the PDF, personal note history and learner baseline are not published or imported.</p>
  </details>;
}
