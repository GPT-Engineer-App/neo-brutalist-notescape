import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from 'lucide-react'

const noteColors = [
  'bg-pink-300',
  'bg-purple-300',
  'bg-blue-300',
  'bg-green-300',
  'bg-yellow-300',
  'bg-orange-300',
];

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const addNote = () => {
    if (title.trim() !== '' && content.trim() !== '') {
      const colorIndex = notes.length % noteColors.length;
      setNotes([...notes, { id: Date.now(), title, content, color: noteColors[colorIndex] }]);
      setTitle('');
      setContent('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 p-8">
      <h1 className="text-6xl font-bold mb-8 text-white text-shadow-lg">NEO BRUTALIST NOTES</h1>
      
      <div className="mb-8 bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <Input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 border-2 border-black text-xl"
        />
        <Textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4 border-2 border-black text-xl"
          rows={4}
        />
        <Button onClick={addNote} className="bg-black text-white text-xl hover:bg-gray-800 transition-colors">
          ADD NOTE
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className={`${note.color} p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative transition-transform hover:scale-105`}>
            <Button
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-2 transition-colors"
            >
              <X size={24} />
            </Button>
            <h2 className="text-2xl font-bold mb-2 text-black">{note.title}</h2>
            <p className="text-xl text-black">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
