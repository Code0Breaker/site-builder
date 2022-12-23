import { useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";

const board = {
    columns: [
      {
        id: 1,
        title: "Planned",
        cards: [
          {
            id: 1,
            title: "Card title 1",
            description: "Card content"
          },
          {
            id: 2,
            title: "Card title 2",
            description: "Card content"
          },
          {
            id: 3,
            title: "Card title 3",
            description: "Card content"
          }
        ]
      },
      {
        id: 2,
        title: "In Progress",
        cards: [
          {
            id: 9,
            title: "Card title 9",
            description: "Card content"
          }
        ]
      },
      {
        id: 3,
        title: "Completed",
        cards: [
          {
            id: 10,
            title: "Card title 10",
            description: "Card content"
          },
          {
            id: 11,
            title: "Card title 11",
            description: "Card content"
          }
        ]
      },
    ]
  };

  function Taskboard() {
    const [controlledBoard, setBoard] = useState(board);
    function handleCardMove(_card:any, source:any, destination:any) {
      const updatedBoard = moveCard(controlledBoard, source, destination);
      setBoard(updatedBoard);
    }
  
    return (
      <Board onCardDragEnd={handleCardMove} disableColumnDrag>
        {controlledBoard}
      </Board>
    );
  }

 

  export default Taskboard