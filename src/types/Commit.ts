type Commit = {
  sha: string;
  message: string;
  author: {
    name: string;
  };
  date: string;
  url: string;
};

export default Commit;