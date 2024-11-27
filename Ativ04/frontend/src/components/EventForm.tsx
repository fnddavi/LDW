import React, { useState, FormEvent } from 'react';
import { Event } from '../types/Event';
import { addEvent, updateEvent } from '../services/eventService';

interface EventFormProps {
    event?: Event;
    onSave: (event: Event) => void;
    onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onCancel }) => {
    const [title, setTitle] = useState(event?.title || '');
    const [description, setDescription] = useState(event?.description || '');
    const [date, setDate] = useState(event?.date || '');
    const [location, setLocation] = useState(event?.location || '');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const eventData: Omit<Event, 'id'> = {
            title,
            description,
            date,
            location
        };

        if (event) {
            // Atualizar evento existente
            const updatedEvent = updateEvent({ ...event, ...eventData });
            onSave(updatedEvent);
        } else {
            // Adicionar novo evento
            const newEvent = addEvent(eventData);
            onSave(newEvent);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Título</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Data</label>
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Local</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="flex justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {event ? 'Atualizar Evento' : 'Criar Evento'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default EventForm;