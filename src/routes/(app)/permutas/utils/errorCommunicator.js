const errorMappings = [
  { original_error: 'name violates exclusivity constraint', parsed_error: "This name is already in use. Please choose another name." },
];

const errorCommunicator = (errorStr) => {
  const mappedError = errorMappings?.find(i => errorStr?.includes(i.original_error))?.parsed_error;
  return mappedError || "An unknown error occurred. Please contact support.";
};

export default errorCommunicator;
