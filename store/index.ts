import { create } from 'zustand';
import { getTodosGroupedByColumns } from '@/lib/get-todos-grouped-by-columns';

interface BoardState {
  board: Board;
  getBoard: () => void;
}

export const useBoardStore = create<BoardState>(
  (set) => (
    {
      board: {
        columns: new Map<TypedColumn, Column>()
      },
      getBoard: async () => {
        console.log('inside getBoard') ;

        const board = await getTodosGroupedByColumns();
        
        console.log('Results Loaded', board);

        set({
          board
        })
      }
    }
  )
)