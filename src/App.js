import React from "react";
import './App.css';

// 펑션 컴포넌트가 되는 조건
// 반드시 React Element를 리턴할 것
// 첫 글자가 대문자


const players = [
  {name: 'LDK', score: 30, id : 1},
  {name: 'HONG', score: 40, id : 2},
  {name: 'KIM', score: 50, id : 3},
  {name: 'PARK', score: 60, id : 4},
];

function HeaderF () {

  // react는 가독성을 위해 웬만하면 () 사용할 것
  return (
    <header className="header">
      <h1 className="h1">ScoreBoard</h1>
      <span className="stats">Players : 4</span>
    </header>
  );
}

let Header0 = (props) => {
  console.log(props);
  // 한문장이면 중괄호 리턴문 다 생략 가능
  return (
    <header className="header">
      <h1 className="h1">{props.title}</h1>
      <span className="stats">Players : {props.players}</span>
    </header>
  );
}

//객체 해체 할당 + (배열 해체 할당도 같이 공부하기)
let Header = ({title, players}) => {
  // 한문장이면 중괄호 리턴문 다 생략 가능
  return (
    <header className="header">
      <h1 className="h1">{title}</h1>
      <span className="stats">Players : {players}</span>
    </header>
  );
}

let Counter0 = ({score}) => {
  return (
    <div className="counter">
      <button className="counter-action decrement"> - </button>
      <span className="counter-score">{score}</span>
      <button className="counter-action increment"> + </button>
    </div>
  );

}

// Counter가 상태 값을 가지기 위해 class component로 바꾼다
// React.Component를 상속받아야 하고
// react Element 함수를 return 해야한다
class Counter1 extends React.Component{
  //부모가 가지고 있는 render 함수를 overiding
  render(){
    return (
      <div className="counter">
        <button className="counter-action decrement"> - </button>
        <span className="counter-score">{this.score}</span>
        <button className="counter-action increment"> + </button>
      </div>
    );
  }
}

// local state를 갖는 component로 바꾼다
class Counter extends React.Component{
  //1. 초기버전
  //생성자 this.score

  //2.진화
  // class 바로 밑에 선언하는 변수 = 멤버 변수
  state = {
    score :10
  }

  handleScore2(){
    console.log(this); // this를 바인딩해야하는 이유
    // click하면 undefined 나옴
    // handleScore는 1급 객체기 때문에 독립해서 따로 존재할 수 있음 -> 독립된 공간에서 this를 찾으니까
    // js는 single 쓰레드고 비동기로 que에 들어가는데 이미 실행할 준비가 돼있고 click했을 때 this는 부모이므로 부모 없어서 undefined

    // 따라서 자기 자신이 this라는 걸 바인딩해줘야함 onClick={this.handleScore.bind(this)}
    // this.state.score += 1;
  }

  //binding 안 해도 되는 방법
  handleScore1 = () => {
    // console.log(e.target);
    // this.state.score += 1; // 모델값은 바뀌지만 UI에 렌더링 안 됨
    this.setState({
      score : this.state.score + 1
    })
    console.log(this.state.score); // 비동기이기 때문에 score 값은 보장되지 않음 | que에 들어가서 비동기로 진행됨
    //onClick={this.handleScore}
  }

  handleScore = (delta, e) => {
    console.log(this);
    // this.state.score += 1; // 모델값은 바뀌지만 UI에 렌더링 안 됨
    this.setState(prevState => {
      return {
        score : prevState.score +delta
      }
    })
    // this.setState(prevState => ({
    //   score : prevState.socre + 1 // function의 {}인지 json의 {}인지 모르니까 꼭 () 감싸줘야함
    // }));

    console.log(this.state.score); // 비동기이기 때문에 score 값은 보장되지 않음 | que에 들어가서 비동기로 진행됨
    //onClick={this.handleScore}
  }


  //부모가 가지고 있는 render 함수를 overiding
  render(){
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={(e) => this.handleScore(-1, e)}> - </button>
        <span className="counter-score">{this.state.score}</span>
        <button className="counter-action increment" onClick={(e) => this.handleScore(1, e)}> + </button>
      </div>
    );
  }
  // native click 이벤트를 매핑해서 동일하게 작동하도록 제공 => onClick{함수를 선언} | react는 명령형이 아니라 선언형이다
  // event 객체를 넘겨준당
}



let Player = (props) => {
  return (
    //onClick
    //대문자, react가 JS의 기본함수를 재해석해서 제공
    //event 오른쪽은 반드시 함수 선언문이 와야함, 실행시키면 안 됨
    //id 넘겨주기 위해서 함수로 한번 감싸서 선언문 형식으로 만듦
    //근데 이러면 this가 달라지므로 유의할 것

    //root Element는 반드시 하나만
    <div className="player">
      <span className="player-name">
        <button className="remove-player" onClick={() => props.removePlayer(props.id)}>x</button>
      </span>
      <span className="player-name">{props.name}</span>
      <Counter score = {props.score}></Counter>
    </div>
  );
}

let App0 = (props) => {
  // props를 Json으로 만들어서 Header에게 넘겨줌
  // 숫자는 {}로 감쌀 것

  // 자식 입장에서 어떤 key:value가 오는지 모르므로 typescript를 이용해서 제어
  return (
    <div className="scoreboard">
      <Header title="Scoreboard" players={4}></Header>

      {
        //이 안에서는 js 가능
        props.initialPlayers.map(player  => {
          return <Player name = {player.name} score = {player.score} id = {player.id}></Player>
        })
        //얘는 JSX로 js 리턴 -> Evaluate 하면 똑같다
      }

    </div>
  );
}


// 삭제하기 위해선 state를 가져야하고 그러려면 class component가 돼야한다
// App이 가지고 있는 정보(state.players)를 자식이 수정할 수 없다 = Readonly
// 따라서 부모에게 요청한다

// 1. 부모가 콜백 펑션을 만든다
// 2. 콜백 펑션을 자식에게 내려보낸다
// 3. 자식에서는 props로 받은 콜백 펑션을 실행한다
class App extends React.Component{
  // class Component가 되기 위한 두가지 조건
  // 1. extends 할 것
  // 2. rend함수를 가지고 react Element를 return할 것 = 부모가 가진 것 오버라이딩

  state = {
    players : [
      {name: 'LDK', score: 30, id : 1},
      {name: 'HONG', score: 40, id : 2},
      {name: 'KIM', score: 50, id : 3},
      {name: 'PARK', score: 60, id : 4},
    ]
  }

  //이렇게 함수로 만들면 this를 인식할 수 없음
  // handleRemovePlayer(){
  //
  // }

  //변수로 만들어서 함수를 할당하면 this는 arrowfunction을 뜻하므로
  // 1. 부모의 콜백 펑션을 만든다

  //1.상태 변경하는 방법은 setState밖에 없어
  //2.비동기니까 callback을 이용해야돼
  // callback function은 이전 상태가 첫번째 param으로 들어옴(react library가 그렇게 제공)
  handleRemovePlayer = (id) => {
    console.log('handleRemovePlayer : ', id);
    this.setState((prevState) => {
      //predicate해서 true인 것들만 새로운 배열로 return
      const players = prevState.players.filter((player) => player.id !== id);
      return {players : players}; // return되는 key만 merge 된다
    })

  }


  render() {
    return (
      <div className="scoreboard">
        <Header title="Scoreboard" players={4}></Header>

        {
          //반드시 this 써줘야 멤버변수 사용할 수 있음
          this.state.players.map(player  => {
            return <Player name = {player.name} score = {player.score} id = {player.id} removePlayer={this.handleRemovePlayer}></Player>
            // 2.자식에게 함수를 넘겨준다
          })
        }
      </div>
    )
  }
}


export default App;
