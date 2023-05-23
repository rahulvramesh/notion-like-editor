import React, { useState } from "react";
import "./styles.css";
import Block from "./block";
import Action from "./action";

const App = () => {
  const CMD_KEY = "/";
  const MENU_WIDTH = 10;
  const MENU_HEIGHT = 20;

  const blocks = {
    blocks: [
      {
        html: "<b>Hello <i>World</i></b>",
        uuid: 1
      },
      {
        html: "<b>Hello <i>World 2 !!!</i></b>",
        uuid: 2
      }
    ]
  };

  const [html, setHtml] = useState({
    blocks: [
      {
        html: "<b>Hello <i>World</i></b>",
        uuid: 1
      },
      {
        html: "<b>Hello <i>World 2 !!!</i></b>",
        uuid: 2
      }
    ]
  });
  const [x, setX] = useState(30);
  const [y, setY] = useState(30);
  const [showPop, setShowPop] = useState(false);

  const handleChange = (value, uuid) => {
    const tempState = html;

    console.log(tempState);

    const updatedData = updateBlockHtml(tempState.blocks, uuid, value);
    setHtml({
      blocks: updatedData
    });

    //setHtml(evt.target.value);
  };

  // Caret
  const getCaretCoordinates = (fromStart = true) => {
    let x, y;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection();
      console.log("Selection", selection);
      if (selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(fromStart ? true : false);
        const rect = range.getClientRects()[0];
        if (rect) {
          x = rect.left;
          y = rect.top;
        }
      }
    }
    return { x, y };
  };

  const addBlock = () => {
    const tempState = html;

    tempState.blocks.push({
      html: "<b>Hello <i>World</i></b>",
      uuid: html.blocks.length
    });

    //const updatedData = updateBlockHtml(tempState.blocks, uuid, value);
    setHtml(tempState);
  };

  const handleKeyDown = (e) => {
    setShowPop(false);

    // Enter -> New Block

    if (e.key === CMD_KEY) {
      console.log("Actions Triggered!!!");

      // Get Caret Position
      console.log(getCaretCoordinates());
      const { x, y } = getCaretCoordinates();

      console.log("Width", x - MENU_WIDTH / 2);
      console.log("Height", y - MENU_HEIGHT - 10);

      setX(x - MENU_WIDTH / 2);
      setY(y + 20);

      setShowPop(true);
    } else if (e.key === "Enter") {
      addBlock();
    }
  };

  function updateBlockHtml(blocks, uuid, newHtml) {
    const updatedBlocks = blocks.map((block) => {
      if (block.uuid === uuid) {
        return { ...block, html: newHtml };
      }
      return block;
    });

    return updatedBlocks;
  }

  return (
    <>
      {html.blocks.map((b) => {
        return (
          <Block
            key={b.uuid}
            html={b.html}
            handleChange={(e) => handleChange(e.target.value, b.uuid)}
            handleKeyDown={(e) => handleKeyDown(e)}
          />
        );
      })}

      {showPop && <Action top={y} left={x} />}
    </>
  );
};

export default App;
