export const assertNever = (arg: never): never => {
  throw new Error(
    `Unhandle discriminated union member: ${JSON.stringify(arg)}`
  );
};
