import React, { useState, useRef, useEffect } from "react";

export default function MaximizedView({ navigateTo }) {
  const [currentDir, setCurrentDir] = useState('~');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Anjali\'s Terminal Playground' },
    { type: 'output', text: '' },
    { type: 'output', text: 'This playground (PG) is a sandbox built for running mini demos,' },
    { type: 'output', text: 'viewing snippets, and exploring my favorite coding experiments.' },
    { type: 'output', text: 'Think of it like a dev terminal that evolves as I learn new tools.' },
    { type: 'output', text: '' },
    { type: 'command', text: 'ls ~/projects' },
    { type: 'output', text: 'genai-hackathon/    nuvou-app/    animal-gallery/    lovejoy-lab-site/' },
    { type: 'output', text: '' },
    { type: 'command', text: 'echo "Stay curious, keep building"' },
    { type: 'output', text: 'Stay curious, keep building' },
    { type: 'output', text: '' },
    { type: 'output', text: 'Type "help" for available commands' },
    { type: 'output', text: '' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const fileSystem = {
    '~': ['projects', 'documents', 'about.txt'],
    '~/projects': ['genai-hackathon', 'nuvou-app', 'animal-gallery', 'lovejoy-lab-site'],
    '~/documents': ['resume.pdf', 'notes.txt'],
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    
    // Add command to history
    const newHistory = [...history, { type: 'command', text: cmd }];
    
    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    if (command === 'help') {
      setHistory([...newHistory,
        { type: 'output', text: 'Available commands:' },
        { type: 'output', text: '  ls [path]    - List directory contents' },
        { type: 'output', text: '  cd <dir>     - Change directory (use .. to go up)' },
        { type: 'output', text: '  pwd          - Print working directory' },
        { type: 'output', text: '  cat <file>   - Display file contents' },
        { type: 'output', text: '  echo <text>  - Echo text to terminal' },
        { type: 'output', text: '  clear        - Clear terminal' },
        { type: 'output', text: '  projects     - Quick link to projects' },
        { type: 'output', text: '  home         - Return to portfolio home' },
        { type: 'output', text: '' },
      ]);
    } else if (command === 'pwd') {
      setHistory([...newHistory,
        { type: 'output', text: currentDir },
        { type: 'output', text: '' },
      ]);
    } else if (command === 'ls') {
      const path = parts[1] || currentDir;
      const targetPath = path.startsWith('~/') ? path : path === '~' ? '~' : `${currentDir}/${path}`.replace('//', '/');
      const contents = fileSystem[targetPath];
      
      if (contents) {
        setHistory([...newHistory,
          { type: 'output', text: contents.map(item => 
            fileSystem[`${targetPath}/${item}`] ? item + '/' : item
          ).join('    ') },
          { type: 'output', text: '' },
        ]);
      } else {
        setHistory([...newHistory,
          { type: 'error', text: `ls: cannot access '${path}': No such directory` },
          { type: 'output', text: '' },
        ]);
      }
    } else if (command === 'cd') {
      const target = parts[1];
      
      if (!target || target === '~') {
        setCurrentDir('~');
        setHistory([...newHistory, { type: 'output', text: '' }]);
      } else if (target === '..') {
        const newDir = currentDir.split('/').slice(0, -1).join('/') || '~';
        setCurrentDir(newDir);
        setHistory([...newHistory, { type: 'output', text: '' }]);
      } else {
        const newPath = target.startsWith('~/') ? target : `${currentDir}/${target}`.replace('//', '/');
        
        if (fileSystem[newPath]) {
          setCurrentDir(newPath);
          setHistory([...newHistory, { type: 'output', text: '' }]);
        } else {
          setHistory([...newHistory,
            { type: 'error', text: `cd: ${target}: No such directory` },
            { type: 'output', text: '' },
          ]);
        }
      }
    } else if (command === 'cat') {
      const filename = parts[1];
      if (filename === 'about.txt') {
        setHistory([...newHistory,
          { type: 'output', text: 'Hi! I\'m Anjali Patidar.' },
          { type: 'output', text: 'Developer, creator, and lifelong learner.' },
          { type: 'output', text: '' },
        ]);
      } else if (filename === 'notes.txt') {
        setHistory([...newHistory,
          { type: 'output', text: 'TODO: Build more cool stuff' },
          { type: 'output', text: 'TODO: Learn new technologies' },
          { type: 'output', text: '' },
        ]);
      } else {
        setHistory([...newHistory,
          { type: 'error', text: `cat: ${filename}: No such file` },
          { type: 'output', text: '' },
        ]);
      }
    } else if (command === 'echo') {
      const message = trimmed.substring(5).replace(/^["']|["']$/g, '');
      setHistory([...newHistory,
        { type: 'output', text: message },
        { type: 'output', text: '' },
      ]);
    } else if (command === 'projects') {
      setHistory([...newHistory,
        { type: 'output', text: 'genai-hackathon/' },
        { type: 'output', text: 'nuvou-app/' },
        { type: 'output', text: 'animal-gallery/' },
        { type: 'output', text: 'lovejoy-lab-site/' },
        { type: 'output', text: '' },
      ]);
    } else if (command === 'home') {
      navigateTo('home');
    } else if (command === 'clear') {
      setHistory([]);
    } else {
      setHistory([...newHistory,
        { type: 'error', text: `Command not found: ${command}` },
        { type: 'output', text: 'Type "help" for available commands' },
        { type: 'output', text: '' },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      <div className="flex-1 flex flex-col bg-neutral-950 text-emerald-400 font-mono text-sm">
        
        <div className="flex justify-between items-center px-4 py-2 border-b border-neutral-800 bg-neutral-900">
          <p className="text-neutral-400 text-xs">anjali@portfolio: {currentDir}</p>
          <button 
            onClick={() => navigateTo("home")} 
            className="text-neutral-500 hover:text-neutral-300 text-xs px-2 py-1"
          >
            ✕ Exit
          </button>
        </div>

        <div 
          ref={terminalRef}
          className="flex-1 overflow-y-auto px-6 py-6 cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className="leading-relaxed">
              {line.type === 'command' ? (
                <div className="text-emerald-400">
                  <span className="text-emerald-500">$</span> {line.text}
                </div>
              ) : line.type === 'error' ? (
                <div className="text-red-400">{line.text}</div>
              ) : (
                <div className="text-neutral-300">{line.text}</div>
              )}
            </div>
          ))}
          
          <div className="flex items-center text-emerald-400 mt-1">
            <span className="text-emerald-500">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 ml-2 bg-transparent outline-none text-emerald-400"
              autoFocus
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}