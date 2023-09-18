function App() {

  let questionCounter = 0;
  let answerCounter = 0;
  let isQuestion = false;
  
  let questionsName = [];
  let answerSum = [];
  let answersName = [];
  let checbkoxes = [];

  function addAnswer() {
    const questionForm = document.getElementById(`questionForm${questionCounter}`);

    const checkbox = document.createElement("input");
    checkbox.id = `checkbox${questionCounter}${answerCounter}`;
    checkbox.type = "checkbox";

    const answer = document.createElement("input");
    answer.id = `answer${questionCounter}${answerCounter}`;
    answer.type = "text";

    questionForm.appendChild(document.createElement("br"));
    questionForm.appendChild(checkbox);
    questionForm.appendChild(answer);
  } 

  function saveQuestion() {
    const questionName = document.getElementById(`questionName${questionCounter}`).value;
    if(questionName === "") {
      window.alert("Введите ваш вопрос!");
      return;
    }
    questionsName.push(questionName);

    for(let i = 0; i < answerCounter; i++) {
      const answer = document.getElementById(`answer${questionCounter}${answerCounter}`).value;
      if(answer === "") {
        window.alert("Заполните все поля ответов!");
        return;
      }
      answersName.push(answer);

      const checkbox = document.getElementById(`checkbox${questionCounter}${answerCounter}`).checked;
      console.log(checkbox);
      checbkoxes.push(checkbox);
    }
    answerSum.push(answerCounter);
    answerCounter = 0;
    document.getElementById(`questionForm${questionCounter}`).remove();
    isQuestion = false;
  }

  async function addQuestion() {
    if(!isQuestion) {

      questionCounter++;

      const questionForm = document.createElement("div");
      questionForm.id = `questionForm${questionCounter}`;

      const label = document.createElement("label");
      label.textContent = `Вопрос ${questionCounter}: `;

      const questionName = document.createElement("input");
      questionName.id = `questionName${questionCounter}`;
      questionName.type = "text";
      
      const addAnswerB = document.createElement("input");
      addAnswerB.type = "button";
      addAnswerB.value = "Добавить ответ";
      addAnswerB.onclick = function() {
        addAnswer();
      };

      answerCounter++;
      const answer1 = document.createElement("input");
      answer1.id = `answer${questionCounter}${answerCounter}`;
      answer1.type = "text";
      const checkbox1 = document.createElement("input");
      checkbox1.type = "checkbox";
      checkbox1.id = `checkbox${questionCounter}${answerCounter}`;
      answerCounter++;
      const answer2 = document.createElement("input");
      answer2.id = `answer${questionCounter}${answerCounter}`;
      answer2.type = "text";
      const checkbox2 = document.createElement("input");
      checkbox2.type = "checkbox";
      checkbox2.id = `checkbox${questionCounter}${answerCounter}`;

      const saveQuestionB = document.createElement("input");
      saveQuestionB.type = "button";
      saveQuestionB.value = "Сохранить вопрос";
      saveQuestionB.onclick = function() {
        saveQuestion();
      };

      questionForm.appendChild(document.createElement("br"));
      questionForm.appendChild(label);
      questionForm.appendChild(questionName);
      questionForm.appendChild(saveQuestionB);
      questionForm.appendChild(document.createElement("br"));
      questionForm.appendChild(document.createElement("br"));
      questionForm.appendChild(addAnswerB);
      questionForm.appendChild(document.createElement("br"));
      questionForm.appendChild(document.createElement("br"));
      questionForm.appendChild(checkbox1);
      questionForm.appendChild(answer1);
      questionForm.appendChild(document.createElement("br"));
      questionForm.appendChild(checkbox2);
      questionForm.appendChild(answer2);
      document.getElementById("main").appendChild(questionForm);
      isQuestion = true;
    }
  }

  async function saveTest() {
    const testName = document.getElementById("testName").value;
    if(testName === "") {
      window.alert("Введите название теста!");
      return;
    }

    let body = {
      "name": testName
    };
    body = JSON.stringify(body);

    const test = await fetch("http://localhost:8080/test", {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: body
    });
    console.log(test);
    const testData = await test.json();
    const test_id = testData.id;

    for(let i = 0; i < questionCounter; i++) {
      const questionName = questionsName[i];
      if(questionName === "") {
        window.alert("Введите ваш вопрос!");
        return;
      }

      let body = {
        "zagolovok": questionName,
        "test_id": test_id
      };
      body = JSON.stringify(body);

      const question = await fetch("http://localhost:8080/vopros", {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: body
      });
      const questionData = await question.json();
      const vopros_id = questionData.id;

      for(let j = 0; j < answerSum[i]; j++) {
        const answerName = answersName[j];
        if(answerName === "") {
          window.alert("Заполните все поля ответов!");
          return;
        }
        const checkbox = checbkoxes[j];
        
        let body = {
          "opisanie": answerName,
          "isTrue": checkbox,
          "vopros_id": vopros_id
        };
        body = JSON.stringify(body);

        await fetch("http://localhost:8080/otvet", {
          method: 'POST',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body: body
        });
      }
    }
    window.location.reload();
  }

  return (
    <div id = "main">
      <h2>Создать тест</h2>
      <label>Нaзвание: </label>
      <input id = "testName" type = "text" required/>
      <input id = "addTest" type = "button" value = "Сохранить тест" onClick = {saveTest}/>
      <br /><br />
      <input id = "addQuestion" type = "button" value = "Добавить вопрос" onClick = {addQuestion}/>
    </div>
  );
}

export default App;
