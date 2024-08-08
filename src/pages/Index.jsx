import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { useItems, useAddItem, useDeleteItem } from '../integrations/supabase';

const noteColors = [
  'bg-pink-300',
  'bg-purple-300',
  'bg-blue-300',
  'bg-green-300',
  'bg-yellow-300',
  'bg-orange-300',
];

const Index = () => {
  const { toast } = useToast();
  const { data: notes, isLoading, isError } = useItems();
  const addItemMutation = useAddItem();
  const deleteItemMutation = useDeleteItem();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: "Failed to load notes. Please try again.",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  const addNote = async () => {
    if (title.trim() !== '' && content.trim() !== '') {
      try {
        await addItemMutation.mutateAsync({ name: title, content });
        setTitle('');
        setContent('');
        toast({
          title: "Success",
          description: "Note added successfully!",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add note. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteItemMutation.mutateAsync(id);
      toast({
        title: "Success",
        description: "Note deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive",
      });
    }
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
      
      {isLoading ? (
        <div className="text-center text-2xl font-bold text-white">Loading notes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes && notes.map((note, index) => (
            <div key={note.id} className={`${noteColors[index % noteColors.length]} p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative transition-transform hover:scale-105`}>
              <Button
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-2 transition-colors"
              >
                <X size={24} />
              </Button>
              <h2 className="text-2xl font-bold mb-2 text-black">{note.name}</h2>
              <p className="text-xl text-black">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
