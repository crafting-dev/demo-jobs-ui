import Application from "./Application";
import Employer from "./Employer";

type Posting = {
  id: number;
  title?: string | undefined;
  status?: string | undefined;
  description?: string | undefined;
  createdAt: string | number;
  hours?: number | undefined;
  tags?: string | undefined;
  employer?: Employer | undefined;
  applications?: Application[] | undefined;
};

export default Posting;
