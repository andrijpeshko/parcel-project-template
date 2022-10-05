import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
const inputEmailRef = document.querySelector("input[name='email']");
const messageRef = document.querySelector("textarea[name='message']");
const LOCALSTORAGE_KEY = 'feedback-from-state';
const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
const storageData = load(LOCALSTORAGE_KEY);
if (storageData) {
  inputEmailRef.value = storageData.email;
  messageRef.value = storageData.message;
}
formRef.addEventListener('input', throttle(onInputHandler, 500));
function onInputHandler() {
  const objectToSave = {
    email: inputEmailRef.value,
    message: messageRef.value,
  };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
}
formRef.addEventListener('submit', onSubmit);
function onSubmit(e) {
  e.preventDefault();
  console.log({
    email: inputEmailRef.value,
    message: messageRef.value,
  });
  formRef.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
