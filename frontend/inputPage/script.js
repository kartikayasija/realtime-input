import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const url = "http://localhost:3000";
const socket = io(url);

const inputs = document.querySelectorAll('.input input[type="text"]');
const checklist = document.querySelectorAll('.input input[type="checkbox"]');

const checks = [];

inputs.forEach((input) => {
  input.addEventListener("input", handleInput);
});
checklist.forEach((check,idx)=>{
  check.addEventListener('input',function handleCheck(e){
    if(e.target.checked){
      checks.push(e.target.name);
      inputs[idx].checked=true;
    } else{
      const index = checks.indexOf(e.target.name);
      index>-1? checks.splice(index,1):null;
      inputs[idx].checked=false;
    }
    socket.emit('check',checks)
  })
})



function handleInput(e) {
  console.log(`${e.target.name}: ${e.target.value}`);
  const details = {
    name: e.target.name,
    value: e.target.value,
  };
  if(e.target.checked) 
  socket.emit("msg", details);
}