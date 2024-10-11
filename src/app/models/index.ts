export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  events: Event[];
}

export interface Event {
  id: string;
  name: string;
  date: Date;
  gifts: Gift[];
  userId: string;
  uniqueCode: string;
}

export interface Gift {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
}

export interface Guest {
  id: string;
  name: string;
  eventId: string;
  selectedGifts: Gift[];
}
