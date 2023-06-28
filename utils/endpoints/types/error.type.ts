export type ErrorMessage = {
  detail: [
    {
      loc: [string, number];
      msg: string;
      type: string;
    }
  ];
};
