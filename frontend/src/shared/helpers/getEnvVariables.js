export const getEnvVariables = () => {
  //import.meta.env;
  return {
    VITE_API_KEY_BACKEND: import.meta.env.VITE_API_KEY_BACKEND,
    VITE_API_KEY_AUTH: import.meta.env.VITE_API_KEY_AUTH,
    VITE_API_KEY_LEAD: import.meta.env.VITE_API_KEY_LEAD,
    VITE_API_KEY_BACKEND: import.meta.env.VITE_API_KEY_BACKEND,
    //...import.meta.env
  };
};
