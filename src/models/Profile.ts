import Application from "./Application";
import Posting from "./Posting";

type Profile = {
  id: number;
  name: string;
  email: string;
  location?: string;
  hourlyRate?: number;
  tags?: string;
  avatar?: string;
  type?: string;
  postings?: Posting[] | undefined;
  applications?: Application[] | undefined;
};

export default Profile;
