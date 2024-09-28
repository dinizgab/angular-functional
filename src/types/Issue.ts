import IssueLabel from "./IssueLabel";

type Issue = {
  id: number;
  title: string;
  body: string;
  state: string;
  number: number;
  labels: IssueLabel[];
  user: {
    login: string;
  };
  created_at: string;
  url: string;
  comments: number;
};

export default Issue;
