"use client";

import React, { useState, useEffect, useRef } from "react";
import { Fira_Code } from "next/font/google";

// Configure Fira Code for terminal font
const firaCode = Fira_Code({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

// Cursor content data
const content = {
  title: "Cursor",
  subtitle: "Make the thing you want to make, faster",
  tagline: "for noobs",
  sections: [
    {
      step: "01",
      title: "Type Your Idea, See It in Action",
      description:
        "Write a quick description of your vision and watch Cursor transform it into a functional demo in moments. No need to wrestle with coding syntax or complex frameworks—our AI handles the heavy lifting so you can focus on creativity and results.",
    },
    {
      step: "02",
      title: "Refine Your Project with an AI Engineer",
      description:
        "Need to tweak layouts, add features, or optimize performance? Cursor's AI works alongside you like a seasoned developer, helping refine your software every step of the way. Iterate and improve easily, one prompt at a time.",
    },
    {
      step: "03",
      title: "Move Fast Without Compromising Quality",
      description:
        "When you can build so quickly, you're free to explore new ideas for the fun of it. Test out different approaches, pivot on a whim, and keep every project polished. The speed and quality let you push creative boundaries without ever feeling stuck.",
    },
    {
      step: "04",
      title: "Scale to Pro Anytime",
      description:
        "Cursor isn't just for quick demos—it's engineered for serious growth. When you're ready to level up, dive deeper into advanced features, robust integrations, and pro-level tools. In no time, you'll have a professional-grade product built on a strong foundation.",
    },
  ],
  cta: "Download for MacOS",
};

// File system types
type FileContent = string;
type DirectoryContent = FileContent | { [key: string]: DirectoryContent };
type FileSystem = { [key: string]: { [key: string]: DirectoryContent } };

// File system simulation
const fileSystem: Record<string, any> = {
  "~": {
    "README.md": `# ${content.title}\n\n${content.subtitle}\n\n_${content.tagline}_`,
    "about.txt":
      "Cursor is an AI-first code editor that helps you build software faster.",
    features: {
      "01_idea_to_action.md": `# ${content.sections[0].title}\n\n${content.sections[0].description}`,
      "02_ai_engineer.md": `# ${content.sections[1].title}\n\n${content.sections[1].description}`,
      "03_quality.md": `# ${content.sections[2].title}\n\n${content.sections[2].description}`,
      "04_scale.md": `# ${content.sections[3].title}\n\n${content.sections[3].description}`,
    },
    download: {
      "macos.sh": `#!/bin/bash\necho "Downloading Cursor for MacOS..."\necho "${content.cta}"\n# This would be the actual download script`,
      "linux.sh":
        '#!/bin/bash\necho "Downloading Cursor for Linux..."\n# This would be the actual download script',
      "windows.bat":
        '@echo off\necho "Downloading Cursor for Windows..."\nREM This would be the actual download script',
    },
  },
};

// Terminal command types
interface Command {
  command: string;
  output: React.ReactNode;
}

// Terminal prompt component
const Prompt = ({
  currentDir,
  typingCommand = false,
}: {
  currentDir: string;
  typingCommand?: boolean;
}) => (
  <div className={`${typingCommand ? "animate-pulse" : ""}`}>
    <span className="text-blue-400">user@cursor</span>:
    <span className="text-green-400">{currentDir}</span>$&nbsp;
  </div>
);

// Help text for commands
const helpText = `
Available commands:
  ls, dir     - List directory contents
  cd <dir>    - Change directory
  cat <file>  - View file contents
  clear       - Clear the terminal
  pwd         - Print working directory
  help        - Show this help message
  download    - Download Cursor
  exit        - Exit the terminal (or type ESC)
`;

export default function TerminalFinal() {
  // State
  const [commands, setCommands] = useState<Command[]>([
    {
      command: "",
      output: (
        <div className="text-green-500">
          Welcome to Cursor Terminal v1.0.0
          <br />
          Type 'help' to see available commands
        </div>
      ),
    },
  ]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [currentDir, setCurrentDir] = useState("~");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom effect
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  // Focus input on mount and click
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Get the current directory object
  const getCurrentDir = (): any => {
    const pathParts = currentDir.split("/").filter((p) => p && p !== "~");
    let curr = fileSystem["~"];

    for (const part of pathParts) {
      if (curr[part]) {
        curr = curr[part];
      } else {
        return null;
      }
    }

    return curr;
  };

  // Get file content
  const getFile = (path: string): any => {
    // Handle absolute paths
    if (path.startsWith("~") || path.startsWith("/")) {
      const cleanPath = path.replace(/^~\/|^\//, "");
      const parts = cleanPath.split("/").filter(Boolean);

      let curr = fileSystem["~"];
      for (const part of parts) {
        if (curr[part]) {
          curr = curr[part];
        } else {
          return null;
        }
      }
      return curr;
    }

    // Handle relative paths
    const dir = getCurrentDir();
    if (!dir) return null;

    if (dir[path]) {
      return dir[path];
    }

    // Handle relative paths with subdirectories
    const parts = path.split("/").filter(Boolean);
    let curr = dir;

    for (const part of parts) {
      if (curr[part]) {
        curr = curr[part];
      } else {
        return null;
      }
    }

    return curr;
  };

  // Execute a command
  const executeCommand = (cmd: string) => {
    // Add new command to history
    if (cmd.trim()) {
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
    }

    // Parse command
    const parts = cmd.trim().split(" ");
    const command = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    // Execute based on command
    let output: React.ReactNode;

    switch (command) {
      case "ls":
      case "dir":
        const dir = getCurrentDir();
        if (dir) {
          const files = Object.keys(dir);
          output = (
            <div className="text-gray-300 ml-4">
              {files.map((file, i) => (
                <span
                  key={i}
                  className={`mr-4 ${
                    typeof dir[file] === "object" ? "text-blue-400" : ""
                  }`}
                >
                  {file}
                </span>
              ))}
            </div>
          );
        } else {
          output = <div className="text-red-500">Directory not found</div>;
        }
        break;

      case "cd":
        if (!args[0]) {
          setCurrentDir("~");
          output = null;
          break;
        }

        if (args[0] === "..") {
          // Go up one directory
          const pathParts = currentDir.split("/").filter(Boolean);
          if (pathParts.length > 0 && pathParts[0] !== "~") {
            pathParts.pop();
            setCurrentDir("~/" + pathParts.join("/"));
          } else {
            setCurrentDir("~");
          }
          output = null;
          break;
        }

        const targetDir = args[0];
        const currDir = getCurrentDir();

        // Handle absolute paths
        if (targetDir.startsWith("~") || targetDir.startsWith("/")) {
          const cleanPath = targetDir.replace(/^~\/|^\//, "");
          const parts = cleanPath.split("/").filter(Boolean);

          let curr = fileSystem["~"];
          let valid = true;

          for (const part of parts) {
            if (curr[part] && typeof curr[part] === "object") {
              curr = curr[part];
            } else {
              valid = false;
              break;
            }
          }

          if (valid) {
            setCurrentDir(
              targetDir.startsWith("~") ? targetDir : "~/" + cleanPath
            );
            output = null;
          } else {
            output = (
              <div className="text-red-500">
                Directory not found: {targetDir}
              </div>
            );
          }
          break;
        }

        // Handle relative paths
        if (
          currDir &&
          currDir[targetDir] &&
          typeof currDir[targetDir] === "object"
        ) {
          setCurrentDir(
            currentDir === "~" ? `~/${targetDir}` : `${currentDir}/${targetDir}`
          );
          output = null;
        } else {
          output = (
            <div className="text-red-500">Directory not found: {targetDir}</div>
          );
        }
        break;

      case "cat":
        if (!args[0]) {
          output = (
            <div className="text-red-500">Usage: cat &lt;filename&gt;</div>
          );
          break;
        }

        const file = getFile(args[0]);

        if (file && typeof file === "string") {
          // Detect if it's markdown
          if (args[0].endsWith(".md")) {
            const mdContent = file.split("\n");
            output = (
              <div className="text-gray-300 ml-4 bg-gray-800 p-2 rounded">
                {mdContent.map((line, i) => {
                  if (line.startsWith("# ")) {
                    return (
                      <p key={i} className="text-xl font-bold">
                        {line.substring(2)}
                      </p>
                    );
                  } else if (line.startsWith("## ")) {
                    return (
                      <p key={i} className="text-lg font-bold">
                        {line.substring(3)}
                      </p>
                    );
                  } else if (line.startsWith("_") && line.endsWith("_")) {
                    return (
                      <p key={i} className="text-sm italic">
                        {line.substring(1, line.length - 1)}
                      </p>
                    );
                  } else if (line === "") {
                    return <br key={i} />;
                  } else {
                    return <p key={i}>{line}</p>;
                  }
                })}
              </div>
            );
          } else {
            output = (
              <div className="text-gray-300 ml-4 whitespace-pre-wrap">
                {file}
              </div>
            );
          }
        } else {
          output = (
            <div className="text-red-500">File not found: {args[0]}</div>
          );
        }
        break;

      case "clear":
        setCommands([]);
        output = null;
        break;

      case "pwd":
        output = <div className="text-gray-300 ml-4">{currentDir}</div>;
        break;

      case "help":
        output = (
          <div className="text-gray-300 ml-4 whitespace-pre-wrap">
            {helpText}
          </div>
        );
        break;

      case "download":
        output = (
          <div className="ml-4">
            <p className="text-green-500 mb-2">
              Initiating download for Cursor...
            </p>
            <div className="relative w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-green-500 animate-[progress_3s_ease-in-out_forwards]"></div>
            </div>
            <p className="text-green-500 mt-2">{content.cta}</p>
            <p className="text-gray-400 text-sm">
              Visit{" "}
              <a
                className="text-blue-400 hover:underline"
                href="https://www.cursor.com/downloads"
                target="_blank"
                rel="noopener noreferrer"
              >
                cursor.com/downloads
              </a>{" "}
              to complete installation
            </p>
          </div>
        );
        break;

      case "exit":
        output = (
          <div className="text-gray-300">Goodbye! Press ESC to exit.</div>
        );
        break;

      case "":
        output = null;
        break;

      default:
        output = (
          <div className="text-red-500">Command not found: {command}</div>
        );
    }

    if (output !== null) {
      setCommands([...commands, { command: cmd, output }]);
    } else {
      setCommands([...commands, { command: cmd, output: <></> }]);
    }

    setCurrentCommand("");
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCommand(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(currentCommand);
  };

  // Handle key navigation through command history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentCommand(
          commandHistory[commandHistory.length - 1 - newIndex] || ""
        );
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(
          commandHistory[commandHistory.length - 1 - newIndex] || ""
        );
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion - just complete commands, not arguments
      const currDir = getCurrentDir();
      const cmdPart = currentCommand.split(" ")[0];

      // Command completion
      if (currentCommand.indexOf(" ") === -1) {
        const commands = [
          "ls",
          "dir",
          "cd",
          "cat",
          "clear",
          "pwd",
          "help",
          "download",
          "exit",
        ];
        const matches = commands.filter((cmd) => cmd.startsWith(cmdPart));

        if (matches.length === 1) {
          setCurrentCommand(matches[0] + " ");
        }
      }
      // Path completion
      else if (currDir) {
        const parts = currentCommand.split(" ");
        const lastPart = parts[parts.length - 1];

        const files = Object.keys(currDir);
        const matches = files.filter((file) => file.startsWith(lastPart));

        if (matches.length === 1) {
          parts[parts.length - 1] = matches[0];
          setCurrentCommand(
            parts.join(" ") +
              (typeof currDir[matches[0]] === "object" ? "/" : " ")
          );
        }
      }
    }
  };

  // Typing animation effect
  useEffect(() => {
    let typingTimer: NodeJS.Timeout;

    if (isTyping) {
      typingTimer = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    }

    return () => {
      if (typingTimer) clearTimeout(typingTimer);
    };
  }, [isTyping]);

  // Handle clicking on the terminal to focus input
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={`h-screen w-full bg-gray-100 flex flex-col justify-center items-center p-4 ${firaCode.className}`}
    >
      <style jsx global>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>

      <div className="w-full max-w-4xl bg-gray-900 border border-gray-700 rounded-md shadow-lg overflow-hidden">
        {/* Terminal Window Title Bar */}
        <div className="flex items-center h-8 bg-gray-800 px-4">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <div className="flex-1 flex justify-center">
            <span className="text-gray-400 text-xs">
              cursor-terminal — -zsh
            </span>
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="h-[500px] p-4 overflow-auto"
          onClick={handleTerminalClick}
        >
          {/* Command History */}
          {commands.map((cmd, i) => (
            <div key={i} className="mb-2">
              {/* Only show prompt for non-empty commands or the first command */}
              {(cmd.command !== "" || i === 0) && (
                <div className="flex">
                  <Prompt currentDir={currentDir} />
                  <div className="text-white">{cmd.command}</div>
                </div>
              )}
              {cmd.output}
            </div>
          ))}

          {/* Current Command Input */}
          <div className="flex items-center">
            <Prompt currentDir={currentDir} typingCommand={isTyping} />
            <form onSubmit={handleSubmit} className="flex-1 flex">
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="bg-transparent text-white outline-none flex-1 w-full"
                autoComplete="off"
                spellCheck="false"
              />
              <div
                className={`w-2 h-5 bg-white animate-[blink_1s_infinite]`}
              ></div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-700">
        <p className="font-medium">Interactive Terminal</p>
        <p className="mt-1 text-sm text-gray-500">
          Try commands: ls, cd features, cat README.md, help
        </p>
      </div>
    </div>
  );
}
