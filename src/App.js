import { useEffect, useState } from "react";
import API_KEY from "./API";

function App() {
  // 5글자인 영단어 모음 state
  const [fiveLetterWords, setFiveLetterWords] = useState([]);
  // 랜덤하게 뽑은 정답 영단어
  const [randomWord, setRandomWord] = useState("");

  // Words API에서 5글자인 영단어 가져오기
  const getData = async () => {
    const url =
      "https://wordsapiv1.p.rapidapi.com/words/?letters=5&limit=10669";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const TrueData = JSON.parse(result).results.data.slice(
        200,
        JSON.parse(result).results.data.length
      );
      setFiveLetterWords(TrueData || []);
    } catch (error) {
      console.error(error);
    }
  };

  // getData() 호출
  useEffect(() => {
    getData();
  }, []);

  // 랜덤하게 정답 단어 하나 뽑기
  useEffect(() => {
    if (fiveLetterWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
      setRandomWord(fiveLetterWords[randomIndex]);
    }
  }, [fiveLetterWords]);

  return <div className="App">{randomWord}</div>;
}

export default App;
