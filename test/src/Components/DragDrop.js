import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ITEM_TYPE = "ITEM";

// Draggable Item Component
const DraggableItem = ({ item, index, moveItem }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        padding: "10px",
        margin: "5px 0",
        backgroundColor: "lightblue",
        cursor: "grab",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {item.text}
    </div>
  );
};

// Drag & Drop List Component
const DragDropList = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
    { id: 4, text: "Item 4" },
  ]);

  // Function to move items
  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: "20px", width: "300px", border: "1px solid gray" }}>
        <h3>Drag & Drop List</h3>
        {items.map((item, index) => (
          <DraggableItem key={item.id} item={item} index={index} moveItem={moveItem} />
        ))}
      </div>
    </DndProvider>
  );
};

export default DragDropList;
