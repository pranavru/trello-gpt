export const baseLink = 'https://links.papareact.com/'
export const trelloPrimaryColor = '#0055D1';

export const columnTypes: TypedColumn[] = ['todo', 'inprogress', 'done'];

export const idToColumnText: {
  [key in TypedColumn]: string
} = {
  'todo': 'To Do',
  'inprogress': 'In Progress',
  'done': 'Done'
};
