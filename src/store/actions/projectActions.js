export const createProject = (project) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("projects")
      .add({
        ...project,
        authorFirstName: "Neil",
        authorLastName: "Dahiya",
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_PROJECT", project });
      })
      .catch((error) => dispatch({ type: "CREATE_PROJECT_ERROR", error }));
  };
};
