let opponentEle = document.querySelector('#opponentEle'); // 상대 선수의 4자리 숫자를 보여줄 임시 엘레먼트

const numbers = []; // 1~9 까지 기본 숫자 담을 배열 변수
let opponentBaseBallNum = []; // 상대 선수의 실제 4자리 숫자를 담을 배열 변수

// 1~9 까지 배열에 담는 반복문
for(let i = 1; i <= 9 ; i++){
  numbers.push(i);
}

// 상대 선수 실제 4자리 담는 반복문
for(let n = 0; n <= 3; n++){
  let index = Math.floor(Math.random() * numbers.length); 
  opponentBaseBallNum.push(numbers[index]); // 실제 4자리 숫자 적용
  numbers.splice(index, 1); 
}

opponentEle.innerHTML = opponentBaseBallNum; // 상대편 4자리 숫자 확인

// DOM 엘레먼트
const inputVal = document.querySelector('#inputVal'); // 유저 입력창
const formData = document.querySelector('#formData'); // 데이터 전달
const logVal = document.querySelector('#log'); // 상태창

let count = 0; // 횟수 제한 카운터 (10번)

formData.onsubmit = function(e) {
  e.preventDefault();
  const userValue = inputVal.value; // 유저 입력값

  if(!isNaN(userValue)){ // 유저 입력값이 숫자인 경우에만 통과
    const userArr = [...userValue]; // 숫자 string 배열로 변환
    const userNumbers = userArr.map(Number); // 배열 string 숫자로 변경

    let strike = 0; //strike 변수 카운터
    let ball = 0; // ball 변수 카운터
    let out = 0; // out 변수 카운터

    const set = new Set(userNumbers); // 공통 숫자 체크
    if(!((userArr).length !== set.size) && !userNumbers.includes(0) && userNumbers.length === 4){

      for(let i = 0; i < userNumbers.length; i++){
        for(let j = 0; j < userNumbers.length; j++){
          if(opponentBaseBallNum[i] === userNumbers[j] && i === j){
            // strike
            strike += 1;
            console.log(`strike :${strike}, ball : ${ball}, out : ${out}`);
          }else if(opponentBaseBallNum[i] === userNumbers[j] && i !== j){
            // ball
            ball += 1;
            console.log(`strike :${strike}, ball : ${ball}, out : ${out}`);
          }else{
            // out
            let outNumber = 0;
            out += 1;
            switch (out) {
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
            console.log(`strike :${strike}, ball : ${ball}, out : ${outNumber}`);
          }
        }
      }

      // 로그에 입력한 값 추가
      logVal.innerHTML += `${userNumbers.join('')}<br>`;

      if(strike === 4){
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