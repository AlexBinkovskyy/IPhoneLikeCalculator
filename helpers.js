export const checkIsButton = (event) => {
  if (
    !event.target.classList.contains("btn") ||
    event.target.classList.contains("buttons")
  )
    return true;
};

export const checkOnlyDigits = (event, digit, actions) => {};
