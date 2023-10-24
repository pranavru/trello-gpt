'use client'

import React, { useEffect } from 'react'
import { useBoardStore } from '@/store';
import { DropResult, DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Column } from './column';

export const BoardComponent = () => {
  const [
    board, 
    getBoard, 
    setBoard, 
    updateTodoInDB
  ] = useBoardStore((state) => [state.board, state.getBoard, state.setBoard, state.updateTodoInDB]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const getColumnId = (location: string) => Array.from(board.columns)[Number(location)];
  const getColumn = (column: [TypedColumn, Column]): Column => ({
    id: column[0],
    todos: column[1].todos
  });
  const handleColumnChange = (result: DropResult) => {
    const { destination, source } = result;

    const entries = Array.from(board.columns.entries());

    const [removed] = entries.splice(source.index, 1);

    entries.splice(destination!.index, 0, removed);

    setBoard({
      ...board,
      columns: new Map(entries)
    })
  };

  const handleOnDragEnd = (result: DropResult) => { 
    const { destination, source, type } = result;

    if(!destination) {
      return;
    }

    type === 'column' && handleColumnChange(result);
    
    const startColumn: Column = getColumn(getColumnId(source.droppableId));
    const destinationColumn: Column = getColumn(getColumnId(destination.droppableId));
    
    const isDraggedToSameLocation = [
      !startColumn && !destinationColumn, 
      source.index === destination.index && startColumn === destinationColumn
    ].some((condition) => condition);

    if(isDraggedToSameLocation) {
      return;
    }

    const adaptedTodos = startColumn.todos;
    const [todoMoved] = adaptedTodos.splice(source.index, 1);
    
    if(startColumn.id === destinationColumn.id) {
      adaptedTodos.splice(destination.index, 1, todoMoved);
      const newColumn: Column = {
        id: startColumn.id,
        todos: adaptedTodos
      };

      const newColumns = new Map(board.columns);
      newColumns.set(startColumn.id, newColumn);

      setBoard({ ...board, columns: newColumns });
    } else {
      const finishedTodos = Array.from(destinationColumn.todos);
      finishedTodos.splice(destination.index, 0, todoMoved);

      const newColumn: Column = {
        id: startColumn.id,
        todos: adaptedTodos
      };

      const newColumns = new Map(board.columns);
      newColumns.set(startColumn.id, newColumn);
      newColumns.set(destinationColumn.id, {
        id: destinationColumn.id,
        todos: finishedTodos
      });

      updateTodoInDB(todoMoved, destinationColumn.id)

      setBoard({ ...board, columns: newColumns });
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='board' direction='horizontal' type='column'>
        {(provided) => {
          return (
            <div 
              className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
              ref={provided.innerRef}
              {...provided.droppableProps} 
            >
              {
                Array.from(board.columns.entries())
                  .map(([id, column], index) => {
                    return (
                      <Column
                        key={id}
                        id={id}
                        todos={column.todos}
                        index={index}
                      />
                    )
                 })
              }
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  )
}
