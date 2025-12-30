export interface IEvent {
  /** Optional string id available on Mongoose documents */
  id?: string;
  /** MongoDB ObjectId string; present on server responses */
  _id?: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  organizer: string;
  tags: string[];
  capacity: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  __v?: number;
}
