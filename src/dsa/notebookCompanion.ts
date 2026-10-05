export const DSA_SOURCEBOOK = 'Operation_Pattern_Forge_90_Day_DSA_Sourcebook.pdf';

export const notebookHandoffPrompt = `Summarize only the work I actually submitted in this study session as a short note for CareerHQ:
Problem / sourcebook section:
Attempt: guided or independent, with the highest hint used (distinguish C# syntax help from algorithm help):
Evidence: explanation, code run and cases actually shown; say when a result is unverified:
One mistake -> repair:
One next action or recall to revisit:
Do not invent success, update my website, or turn day numbers into completed checkpoints.`;

export const notebookReminders = [
  {
    id: 'majority',
    sections: [5, 42],
    title: 'Most frequent is not necessarily a majority',
    text: 'A strict majority must exceed half the input. In [1,1,2,3], no value does. Boyer-Moore produces a candidate, not its actual frequency; verify it when existence is not guaranteed.',
    pages: '11, 25-26',
  },
  {
    id: 'value-search',
    sections: [5, 42],
    title: 'Count, then check the counts',
    text: 'Dictionary.ContainsValue scans values linearly. Repeating it is not a faster unique-frequency test; build the frequency map, then use a HashSet of counts.',
    pages: '11, 23',
  },
  {
    id: 'signed-window',
    sections: [8, 10, 34],
    title: 'A discarded start may become useful again',
    text: 'The usual shrinking sum window needs a suitable monotonic input contract. With [2,-1] and limit 1, discarding 2 loses the valid length-2 interval. A shortest-at-least deque is not a template for longest-at-most with arbitrary signs.',
    pages: '11-12, 29, 31',
  },
  {
    id: 'prefix-state',
    sections: [11],
    title: 'The requested output decides the prefix state',
    text: 'Count exact-sum intervals with frequencies of earlier prefixes; find the longest with the earliest index. Include the empty prefix, and query before inserting the current prefix so a zero target does not count an empty interval.',
    pages: '29-31',
  },
  {
    id: 'island-contract',
    sections: [22, 23],
    title: 'Island count and island area are different outputs',
    text: 'Count components once per new traversal; count area once per reached cell and take the maximum. DFS and BFS can both find components. Declare adjacency and input mutation, and mark discovered cells before adding duplicate work.',
    pages: '12, 36-38',
  },
];
