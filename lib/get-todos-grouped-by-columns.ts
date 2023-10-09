import { databases } from "@/appwrite"
import { columnTypes } from "@/components/literals";
import { getsortedColumns } from "@/helpers/sort-columns-by-typed-id";

export const getTodosGroupedByColumns = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  const todos = data.documents;
  const columns = todos.reduce((accumulator, todo) => {
    if(!accumulator.get(todo.status)) {
      accumulator.set(todo.status, {
        id: todo.status,
        todos: []
      })
    }

    accumulator.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.stringify(todo.image) })
    });

    return accumulator; 
  }, new Map<TypedColumn, Column>);

  columnTypes.map((columnType): void => 
    {
      if(!columns.get(columnType)) {
        columns.set(columnType, {
          id: columnType,
          todos: []
        })
      }
    }
  );

  const sortedColumns = getsortedColumns(columns)

  const board: Board = {
    columns: sortedColumns
  };

  return board;
}