type Posting = {
  id: number;
  title?: string;
  status?: string;
  description?: string;
  createdAt?: string;
  hours?: number;
  tags?: string;
  employer?: {
    id: number;
    name: string;
    location: string;
  };
};

export default Posting;
