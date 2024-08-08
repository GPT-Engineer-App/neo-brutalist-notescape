import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from 'lucide-react'

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const addNote = () => {
    if (title.trim() !== '' && content.trim() !== '') {
      setNotes([...notes, { id: Date.now(), title, content }]);
      setTitle('');
      setContent('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-yellow-200 p-8">
      <h1 className="text-6xl font-bold mb-8 text-black">NEO BRUTALIST NOTES</h1>
      
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
        <Button onClick={addNote} className="bg-black text-white text-xl hover:bg-gray-800">
          ADD NOTE
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            <Button
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-2"
            >
              <X size={24} />
            </Button>
            <h2 className="text-2xl font-bold mb-2">{note.title}</h2>
            <p className="text-xl">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
