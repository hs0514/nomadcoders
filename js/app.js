// 랜덤 배경 이미지
const images = ["bg1.png", "bg2.png", "bg3.png"];
const mainTag = document.querySelector("main");

function changeBg(){
  const chosenImage = images[Math.floor(Math.random() * images.length)];
  document.body.style.backgroundImage = `url(img/${chosenImage})`
}

changeBg(); 

// 로그인
const localUserName = localStorage.getItem("userName");
const userName = document.getElementsByName("userName")[0];
const loginForm = document.querySelector(".loginForm");
const main = document.querySelector("main");
const welcome = document.getElementById("welcome")

function setLogin() {
  loginForm.classList.add("hidden")
  main.classList.remove("hidden");
  if (localUserName === null) {
    welcome.innerHTML = `Welcome ${userName.value} &#127881;`;
  } else {
    welcome.innerHTML = `Welcome ${localUserName} &#127881;`;
  }
}

function login(event) {
  event.preventDefault();
  if(userName.value === "") {
    alert("Please enter a name!");
  } else {
    localStorage.setItem("userName", userName.value);
    setLogin();
  }
}

if(localUserName === null || localUserName === "") {
  main.classList.add("hidden");
  loginForm.classList.remove("hidden");
  loginForm.addEventListener("submit", login);
} else {
  setLogin();
}

// 실시간 시계
function liveTime() {
  const clock = document.getElementById("clock");
  const getDate = new Date();
  const year = getDate.getFullYear();
  const month = String(getDate.getMonth() + 1).padStart(2, "0"); // 0부터 시작함으로 +1
  const day = String(getDate.getDate()).padStart(2, "0");
  const hour = String(getDate.getHours()).padStart(2, "0");
  const minute = String(getDate.getMinutes()).padStart(2, "0");
  const second = String(getDate.getSeconds()).padStart(2, "0");
  clock.innerText = `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

liveTime();
setInterval(liveTime, 1000);

// 날씨와 위치
const API_KEY = "ef49f3a0cb5d6da943b1a13c05a57878";

// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
function onGeoSucess(position) {
  const lat = position.coords.latitude; // 위도
  const lon = position.coords.longitude; // 경도
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  fetch(url).then(response => response.json()).then(data => {
    const weatherContainer = document.getElementById("weather");
    const name = data.name;
    const weather = data.weather[0].main;
    const temp = data.main.temp;
    weatherContainer.innerText = `${name}, ${weather}, ${temp}℃`;
  });
}

function onGenError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoSucess, onGenError);

// 투두리스트
const todoListText = document.getElementsByName("todoListText")[0];
let todoListArr = [];
function addList(event) { // 투두리스트 추가
  event.preventDefault();
  if(todoListText.value === "") {
    alert("Please enter list!");
  } else {
    const pushObj = {
      text: todoListText.value,
      id : Date.now()
    }
    todoListArr.push(pushObj);
    localStorage.setItem("todoList", JSON.stringify(todoListArr));
    setList(pushObj);
    todoListText.value = "" // 인풋 초기화
  }
}

function removeList(event) { // 투두리스트 삭제
  const todoListLi = event.target.parentElement;
  todoListLi.remove();
  todoListArr = todoListArr.filter((list) => list.id !== parseInt(list.id));
  localStorage.setItem("todoList", JSON.stringify(todoListArr));
}

const todoListUl = document.getElementById("todoList");
function setList(list) { // 투두리스트 화면에 그림
  const todoListLi = document.createElement("li");
  todoListLi.id = list.id
  const todoListSpan = document.createElement("span");
  todoListSpan.innerText = list.text;
  const delBtn = document.createElement("button");
  delBtn.className = "delListBtn";
  delBtn.innerText = '×';
  delBtn.addEventListener("click", removeList); // 리스트 삭제 이벤트 추가
  todoListLi.append(todoListSpan);
  todoListLi.append(delBtn);
  todoListUl.append(todoListLi);
}

const localTodoList = localStorage.getItem("todoList");
if(localTodoList !== null || localTodoList !== "") { // 로컬스토리지 확인 후 화면에 그림
  const parseTodoList = JSON.parse(localStorage.getItem("todoList"));
  todoListArr = parseTodoList;
  parseTodoList.forEach(setList);
}

const addForm = document.getElementById("addList");
addForm.addEventListener("submit", addList);

 







