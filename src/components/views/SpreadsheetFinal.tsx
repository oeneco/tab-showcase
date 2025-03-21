"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Initial data structure based on the content
const initialData = [
  ["Cursor", "Make the thing you want to make, faster", "", "", ""],
  ["for noobs", "", "", "", ""],
  ["", "", "", "", ""],
  [
    "01",
    "Type Your Idea, See It in Action",
    "Write a quick description of your vision and watch Cursor transform it into a functional demo in moments. No need to wrestle with coding syntax or complex frameworks—our AI handles the heavy lifting so you can focus on creativity and results.",
    "",
    "",
  ],
  [
    "02",
    "Refine Your Project with an AI Engineer",
    "Need to tweak layouts, add features, or optimize performance? Cursor's AI works alongside you like a seasoned developer, helping refine your software every step of the way. Iterate and improve easily, one prompt at a time.",
    "",
    "",
  ],
  [
    "03",
    "Move Fast Without Compromising Quality",
    "When you can build so quickly, you're free to explore new ideas for the fun of it. Test out different approaches, pivot on a whim, and keep every project polished. The speed and quality let you push creative boundaries without ever feeling stuck.",
    "",
    "",
  ],
  [
    "04",
    "Scale to Pro Anytime",
    "Cursor isn't just for quick demos—it's engineered for serious growth. When you're ready to level up, dive deeper into advanced features, robust integrations, and pro-level tools. In no time, you'll have a professional-grade product built on a strong foundation.",
    "",
    "",
  ],
  ["Download for MacOS", "", "", "", ""],
];

// Column widths
const initialColumnWidths = [80, 200, 400, 120, 120];

// Column headers
const columnHeaders = ["", "A", "B", "C", "D", "E"];

// Row special styles
const rowStyles = {
  0: "bg-blue-50 font-bold", // Header row
  1: "bg-blue-50 italic", // Subtitle row
  7: "bg-blue-50", // CTA row
};

// Cell formatting
const initialCellFormats = Array(initialData.length)
  .fill(0)
  .map(() =>
    Array(initialData[0].length).fill({
      bold: false,
      italic: false,
      underline: false,
      align: "left",
      color: "",
      background: "",
    })
  );

// Set some initial formatting
initialCellFormats[0][0] = { ...initialCellFormats[0][0], bold: true };
initialCellFormats[3][0] = { ...initialCellFormats[3][0], bold: true };
initialCellFormats[4][0] = { ...initialCellFormats[4][0], bold: true };
initialCellFormats[5][0] = { ...initialCellFormats[5][0], bold: true };
initialCellFormats[6][0] = { ...initialCellFormats[6][0], bold: true };
initialCellFormats[3][1] = { ...initialCellFormats[3][1], bold: true };
initialCellFormats[4][1] = { ...initialCellFormats[4][1], bold: true };
initialCellFormats[5][1] = { ...initialCellFormats[5][1], bold: true };
initialCellFormats[6][1] = { ...initialCellFormats[6][1], bold: true };
initialCellFormats[7][0] = {
  ...initialCellFormats[7][0],
  bold: true,
  background: "#3b82f6",
  color: "white",
};

export default function SpreadsheetFinal() {
  // State
  const [data, setData] = useState(initialData);
  const [cellFormats, setCellFormats] = useState(initialCellFormats);
  const [activeCell, setActiveCell] = useState<[number, number] | null>(null);
  const [editValue, setEditValue] = useState("");
  const [columnWidths, setColumnWidths] = useState(initialColumnWidths);
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formatOptions, setFormatOptions] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Start cell edit
  const startEditing = (row: number, col: number) => {
    setActiveCell([row, col]);
    setEditValue(data[row][col]);
    setIsEditing(true);

    // Update format options based on current cell format
    if (row < cellFormats.length && col < cellFormats[0].length) {
      setFormatOptions({
        bold: cellFormats[row][col].bold,
        italic: cellFormats[row][col].italic,
        underline: cellFormats[row][col].underline,
      });
    }

    // Focus the input after rendering
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  // Complete cell edit
  const finishEditing = () => {
    if (activeCell) {
      const [row, col] = activeCell;
      const newData = [...data];
      newData[row][col] = editValue;
      setData(newData);
    }
    setIsEditing(false);
    setActiveCell(null);
  };

  // Handle key presses
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      finishEditing();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setActiveCell(null);
    } else if (e.key === "Tab") {
      e.preventDefault();
      finishEditing();
      // Move to next cell
      if (activeCell) {
        const [row, col] = activeCell;
        if (col < data[0].length - 1) {
          startEditing(row, col + 1);
        } else if (row < data.length - 1) {
          startEditing(row + 1, 0);
        }
      }
    }
  };

  // Handle column resize
  const startResize = (index: number) => {
    setIsDragging(index);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging !== null && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;

      // Calculate distance from previous column start
      let prevColsWidth = 40; // Width of row headers
      for (let i = 0; i < isDragging; i++) {
        prevColsWidth += columnWidths[i];
      }

      const newWidth = Math.max(60, x - prevColsWidth);
      const newColumnWidths = [...columnWidths];
      newColumnWidths[isDragging] = newWidth;
      setColumnWidths(newColumnWidths);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  // Set up event listeners for column resizing
  useEffect(() => {
    if (isDragging !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Toggle format for active cell
  const toggleFormat = (format: "bold" | "italic" | "underline") => {
    if (activeCell) {
      const [row, col] = activeCell;
      const newFormats = [...cellFormats];
      newFormats[row][col] = {
        ...newFormats[row][col],
        [format]: !newFormats[row][col][format],
      };
      setCellFormats(newFormats);
      setFormatOptions((prev) => ({
        ...prev,
        [format]: !prev[format],
      }));
    }
  };

  // Render cell with formatting
  const renderCell = (content: string, row: number, col: number) => {
    const format = cellFormats[row][col];
    let className = "truncate";
    let style: React.CSSProperties = {};

    if (format.bold) className += " font-bold";
    if (format.italic) className += " italic";
    if (format.underline) className += " underline";
    if (format.align) style.textAlign = format.align;
    if (format.color) style.color = format.color;
    if (format.background) style.backgroundColor = format.background;

    // Special styling for CTA button
    if (row === 7 && col === 0) {
      return (
        <a
          href="https://www.cursor.com/downloads"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            {content}
          </button>
        </a>
      );
    }

    return (
      <div className={className} style={style}>
        {content}
      </div>
    );
  };

  return (
    <div className="h-screen w-full bg-[#F9F9F9] flex flex-col justify-center items-center p-4">
      <div
        ref={containerRef}
        className="w-full max-w-5xl bg-white rounded-md shadow-lg overflow-auto"
      >
        {/* Toolbar */}
        <div className="sticky top-0 flex items-center h-10 bg-gray-100 border-b border-gray-200 px-2 z-10">
          <button
            className={`w-8 h-8 flex items-center justify-center text-gray-700 rounded mr-1 ${
              formatOptions.bold ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
            onClick={() => toggleFormat("bold")}
          >
            <span className="font-bold">B</span>
          </button>
          <button
            className={`w-8 h-8 flex items-center justify-center text-gray-700 rounded mr-1 ${
              formatOptions.italic ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
            onClick={() => toggleFormat("italic")}
          >
            <span className="italic">I</span>
          </button>
          <button
            className={`w-8 h-8 flex items-center justify-center text-gray-700 rounded mr-1 ${
              formatOptions.underline ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
            onClick={() => toggleFormat("underline")}
          >
            <span className="underline">U</span>
          </button>
          <div className="h-6 border-r border-gray-300 mx-2"></div>
          <select className="h-8 bg-white border border-gray-300 rounded px-2 text-sm">
            <option>Arial</option>
            <option>Verdana</option>
            <option>Times New Roman</option>
          </select>
        </div>

        {/* Column Headers */}
        <div className="sticky top-10 flex border-b border-gray-200 bg-gray-100 z-10">
          {/* Row Headers Column */}
          <div className="sticky left-0 bg-gray-100 w-10 h-8 border-r border-gray-200 flex items-center justify-center z-20"></div>

          {/* Column Headers */}
          {columnHeaders.slice(1).map((header, i) => (
            <div
              key={i}
              className="relative h-8 border-r border-gray-200 flex items-center justify-center"
              style={{ width: `${columnWidths[i]}px` }}
            >
              <span className="text-xs font-semibold text-gray-600">
                {header}
              </span>

              {/* Column Resize Handle */}
              <div
                className="absolute right-0 top-0 bottom-0 w-1 bg-transparent hover:bg-blue-400 cursor-col-resize"
                onMouseDown={(e) => {
                  e.preventDefault();
                  startResize(i);
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Spreadsheet Rows */}
        <div>
          {data.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex border-b border-gray-200 ${
                rowStyles[rowIndex as keyof typeof rowStyles] || ""
              }`}
            >
              {/* Row Header */}
              <div className="sticky left-0 bg-gray-50 w-10 min-h-[40px] border-r border-gray-200 flex items-center justify-center z-10">
                <span className="text-xs font-semibold text-gray-600">
                  {rowIndex + 1}
                </span>
              </div>

              {/* Row Cells */}
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`min-h-[40px] border-r border-gray-200 flex items-center p-2 
                    ${
                      activeCell &&
                      activeCell[0] === rowIndex &&
                      activeCell[1] === colIndex
                        ? "bg-blue-50 outline outline-2 outline-blue-500 z-20"
                        : ""
                    }`}
                  style={{ width: `${columnWidths[colIndex]}px` }}
                  onClick={() => startEditing(rowIndex, colIndex)}
                >
                  {activeCell &&
                  activeCell[0] === rowIndex &&
                  activeCell[1] === colIndex &&
                  isEditing ? (
                    <input
                      ref={inputRef}
                      type="text"
                      className="w-full h-full outline-none bg-transparent"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={finishEditing}
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    renderCell(cell, rowIndex, colIndex)
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-gray-700">
        <p className="font-medium">Functional Spreadsheet</p>
        <p className="mt-1 text-sm text-gray-500">
          Click cells to edit, use formatting controls, and resize columns
        </p>
      </div>
    </div>
  );
}
