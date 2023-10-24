import { create } from 'zustand';
import { getTodosGroupedByColumns } from '@/lib/get-todos-grouped-by-columns';
import { databases } from '@/appwrite';

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoard: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: Column['id']) => void;
  searchString: string;
  setSearchString: (value: string) => void;
}

export const useBoardStore = create<BoardState>(
  (set) => (
    {
      board: {
        columns: new Map<TypedColumn, Column>()
      },
      getBoard: async () => set({ board: await getTodosGroupedByColumns() }),
      setBoard: (board) => set({ board }),
      updateTodoInDB: async (todo, columnId) => {
        await databases.updateDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID!,
          process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!, 
          todo.$id, 
          {
            title: todo.title,
            status: columnId
          }
        )
      },
      searchString: '',
      setSearchString: (value) => set({ searchString: value })
    }
  )
)