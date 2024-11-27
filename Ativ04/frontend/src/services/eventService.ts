import { Event } from "../types/Event";

const LOCAL_STORAGE_KEY = "events";

export const getEvents = (): Event[] => {
  const events = localStorage.getItem(LOCAL_STORAGE_KEY);
  return events ? JSON.parse(events) : [];
};

export const addEvent = (event: Omit<Event, "id">): Event => {
  const events = getEvents();
  const newEvent = { ...event, id: Date.now().toString() };
  const updatedEvents = [...events, newEvent];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEvents));
  return newEvent;
};

export const updateEvent = (updatedEvent: Event): Event => {
  const events = getEvents();
  const index = events.findIndex((e) => e.id === updatedEvent.id);

  if (index !== -1) {
    events[index] = updatedEvent;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
    return updatedEvent;
  }

  throw new Error("Evento não encontrado");
};

export const deleteEvent = (eventId: string): void => {
  const events = getEvents();
  const filteredEvents = events.filter((e) => e.id !== eventId);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredEvents));
};

