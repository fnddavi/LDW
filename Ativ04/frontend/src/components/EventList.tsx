import React, { useState, useEffect } from 'react';
import { Event } from '../types/Event';
import { getEvents, deleteEvent } from '../services/eventService';
import EventForm from './EventForm';

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setEvents(getEvents());
    }, []);

    const handleAddEvent = (newEvent: Event) => {
        setEvents([...events, newEvent]);
        setIsEditing(false);
    };

    const handleUpdateEvent = (updatedEvent: Event) => {
        const updatedEvents = events.map(e =>
            e.id === updatedEvent.id ? updatedEvent : e
        );
        setEvents(updatedEvents);
        setIsEditing(false);
        setSelectedEvent(undefined);
    };

    const handleDeleteEvent = (eventId: string) => {
        deleteEvent(eventId);
        setEvents(events.filter(e => e.id !== eventId));
    };

    const handleEditEvent = (event: Event) => {
        setSelectedEvent(event);
        setIsEditing(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short'
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gerenciamento de Eventos</h1>

            {!isEditing && (
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
                >
                    Adicionar Novo Evento
                </button>
            )}

            {isEditing && (
                <EventForm
                    event={selectedEvent}
                    onSave={selectedEvent ? handleUpdateEvent : handleAddEvent}
                    onCancel={() => {
                        setIsEditing(false);
                        setSelectedEvent(undefined);
                    }}
                />
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                    <div
                        key={event.id}
                        className="bg-white p-4 rounded shadow-md"
                    >
                        <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                        <p className="text-gray-600 mb-2">{event.description}</p>
                        <p className="text-sm"><strong>Data:</strong> {formatDate(event.date)}</p>
                        <p className="text-sm"><strong>Local:</strong> {event.location}</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => handleEditEvent(event)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteEvent(event.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;