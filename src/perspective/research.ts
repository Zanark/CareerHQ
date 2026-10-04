interface Reminder {
  id: string;
  title: string;
  message: string;
  action: string;
  source: {
    authors: string;
    year: number;
    title: string;
    kind: string;
    url: `https://${string}`;
    finding: string;
    limit: string;
  };
}

export const reminders: readonly Reminder[] = [
  {
    id: 'return',
    title: 'A missed day need not mean starting over.',
    message: 'In one everyday-habit study, missing a single opportunity did not materially disrupt habit formation. A slip does not have to become a decision to abandon the attempt.',
    action: 'Choose the next workable opportunity to return. Keep what you have already done; do not turn one missed day into a punishment backlog.',
    source: {
      authors: 'Lally, van Jaarsveld, Potts & Wardle',
      year: 2010,
      title: 'How are habits formed: Modelling habit formation in the real world',
      kind: 'Real-world longitudinal study',
      url: 'https://doi.org/10.1002/ejsp.674',
      finding: '96 volunteers chose an eating, drinking, or activity behavior to repeat in the same context for 12 weeks; 82 provided sufficient data for analysis. A single missed opportunity did not materially affect the modeled habit-formation process.',
      limit: 'This was a small, self-report study of simple daily behaviors, not a randomized test of missed days. It does not show that long interruptions have no effect, or that your habits must form in 21 or 66 days.',
    },
  },
  {
    id: 'plan',
    title: 'Make the next move specific.',
    message: 'A specific "when this happens, I will do that" plan can help turn intention into action. You can plan a useful next move without solving the whole problem first.',
    action: 'Finish this sentence: "After ___, I will ___." Pick a recognizable cue and a feasible action, such as opening one checkpoint and writing down the first question to answer.',
    source: {
      authors: 'Gollwitzer & Sheeran',
      year: 2006,
      title: 'Implementation Intentions and Goal Achievement: A Meta-analysis of Effects and Processes',
      kind: 'Meta-analysis / research-volume chapter',
      url: 'https://doi.org/10.1016/S0065-2601(06)38002-1',
      finding: 'Across 94 independent tests, implementation intentions linking a situation to a response improved goal attainment on average.',
      limit: 'The studies covered different tasks and populations. A useful cue and an appropriate action still matter. Planning does not remove practical barriers or guarantee that a particular plan will work.',
    },
  },
  {
    id: 'learn',
    title: 'Change the method, not just the effort.',
    message: 'Testing what you remember and revisiting material later are well-supported ways to learn. More rereading is not your only option when something will not stick.',
    action: 'Try answering one question without your notes, then check your answer. Revisit it in a later session instead of treating one difficult attempt as a final assessment.',
    source: {
      authors: 'Dunlosky, Rawson, Marsh, Nathan & Willingham',
      year: 2013,
      title: "Improving Students' Learning With Effective Learning Techniques: Promising Directions From Cognitive and Educational Psychology",
      kind: 'Research review of 10 learning techniques',
      url: 'https://doi.org/10.1177/1529100612453266',
      finding: 'The review assessed evidence across learning conditions, learners, materials, and tasks. Practice testing and distributed practice received high-utility assessments; rereading received a low-utility assessment.',
      limit: 'This concerns learning and retention, not every career skill or life challenge. Rereading can still help in some situations. Feeling confused or exhausted is not, by itself, evidence that learning is happening.',
    },
  },
  {
    id: 'record',
    title: 'Keep evidence of what you actually did.',
    message: 'Monitoring progress helped people move toward their goals, on average. Keep a concrete result, even when the day did not feel like a success.',
    action: 'Write what you tried, one result, and what still needs work. A practice note does not have to claim that a checkpoint is complete.',
    source: {
      authors: 'Harkin and colleagues',
      year: 2016,
      title: 'Does monitoring goal progress promote goal attainment? A meta-analysis of the experimental evidence',
      kind: 'Meta-analysis of randomized experiments',
      url: 'https://doi.org/10.1037/bul0000025',
      finding: '138 studies involving 19,951 participants compared progress-monitoring interventions with control conditions. Monitoring improved goal attainment on average; effects were larger in studies where progress was physically recorded.',
      limit: 'The interventions varied and did not test CareerHQ. Logging alone does not guarantee improvement or broader life outcomes. You do not need to publish your personal records.',
    },
  },
];
