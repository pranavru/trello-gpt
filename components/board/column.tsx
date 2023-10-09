import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { idToColumnText } from '../literals';

type ColumnProps = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
}

export const Column = ({
  id, 
  todos, 
  index
}: ColumnProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div 
          {...provided.dragHandleProps} 
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Droppable 
            droppableId={index.toString()} 
            type='card'
          >
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`pb-2 p-2 rounded-2xl shadow-sm 
                  ${snapshot.isDraggingOver ? 'bg-green-200': 'bg-white/50'}
                `}
              >
                <h2 className='flex justify-between font-bold text-xl p-2'>
                  {idToColumnText[id]}
                  <span className='text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal'>
                    {todos.length}
                  </span>
                </h2>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}
