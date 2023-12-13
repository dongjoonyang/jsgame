let opponentEle = document.querySelector('#opponentEle'); // 상대 선수의 4자리 숫자(임시)

const numbers = [];
let baseBall = [];

// 상대편 숫자 
for(let i = 1; i < 9 ; i++){
  numbers.push(i);
}

// 첫 base number 적립 4자리 숫자
for(let n = 0; n <= 3; n++){
  let index = Math.floor(Math.random() * numbers.length); 
  baseBall.push(numbers[index]); 
  numbers.splice(index, 1); 
}

opponentEle.innerHTML = numbers;

// 사용자가 입력하면 비교해서 홈런 , 스트라이크, 볼 답 전달
// 10번 실패시 실패 전달
const inputVal = document.querySelector('#inputVal');
const formData = document.querySelector('#formData');
const logVal = document.querySelector('#log');

let count = 0;

// 숫자 3개를 입력한다.
formData.onsubmit = function(e) {
  e.preventDefault();
  const userValue = inputVal.value;
  if(!isNaN(userValue)){
    const userArr = [...userValue];
    const userNumbers = userArr.map(Number);

    let s = 0; //strike
    let b = 0; //ball
    let o = 0; //out

    const set = new Set(userNumbers);
    if(!((userArr).length !== set.size) && !userNumbers.includes(0) && userNumbers.length === 4){

      for(let i = 0; i < userNumbers.length; i++){
        for(let j = 0; j < userNumbers.length; j++){
          if(numbers[i] === userNumbers[j] && i === j){
            // strike
            s += 1;
            console.log(`strike :${s}, ball : ${b}, out : ${o}`);
          }else if(numbers[i] === userNumbers[j] && i !== j){
            // ball
            b += 1;
            console.log(`strike :${s}, ball : ${b}, out : ${o}`);
          }else{
            // out
            let outNumber = 0;
            o += 1;
            switch (o) {
              case 13:
                outNumber = '1';
                break;
              case 14:
                outNumber = '2';
                break;
              case 15:
                outNumber = '3';
                break;
              case 16:
                outNumber = '4';
                break;
              default:
                break;
            }
            console.log(`strike :${s}, ball : ${b}, out : ${outNumber}`);
          }
        }
      }

      // 로그에 입력한 값 추가
      logVal.innerHTML += `${userNumbers.join('')}<br>`;

      if(s === 4){
        alert("홈런입니다.");
        count = 0;
      }else{
        count++;
      }
    }else{ // 숫자가 다르면 중복된게 있다는 것
      alert('중복된 숫자 또는 0이 포함되면 안되며, 4자리 숫자 이상으로 입력해주세요');
    }
  }else{
    alert('숫자만 입력해주세요');
  }

  if(count === 10){
    alert('시도 횟수 10번 초과 실패');
    count = 0;
  }

  inputVal.value = '';
  inputVal.focus();

}