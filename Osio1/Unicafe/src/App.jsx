import { useState } from "react";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  const [positive, setPositive] = useState(0);

  const goodClick = () => {
    console.log("good clicked");
    const updateGood = good + 1;
    setGood(updateGood);
    console.log("good", updateGood);

    //total
    const updateTotal = total + 1;
    setTotal(updateTotal);
    console.log("total", updateTotal);

    //Average
    console.log("Averagen input good", updateGood, bad, updateTotal);
    Average(updateGood, bad, updateTotal);

    //Percent
    GoodPercent(updateGood, updateTotal);
  };
  const neutralClick = () => {
    console.log("neutral clicked");
    const updateneutral = neutral + 1;
    setNeutral(updateneutral);
    console.log("neutral", updateneutral);

    //total
    const updateTotal = total + 1;
    setTotal(updateTotal);
    console.log("total", updateTotal);

    //Average
    console.log("Averagen input Neutral", good, bad, updateTotal);
    Average(good, bad, updateTotal);

    //Percent
    GoodPercent(good, updateTotal);
  };
  const badClick = () => {
    console.log("bad clicked");
    const updatebad = bad + 1;
    setBad(updatebad);
    console.log("bad", updatebad);

    //total
    const updateTotal = total + 1;
    setTotal(updateTotal);
    console.log("total", updateTotal);

    //Average
    console.log("Averagen input Bad", good, updatebad, updateTotal);
    Average(good, updatebad, updateTotal);

    //Percent
    GoodPercent(good, updateTotal);
  };

  const Average = (inputGood, inputBad, inputTotal) => {
    const updateGood = inputGood;
    const updateBad = inputBad;
    const sum = updateGood - updateBad;

    console.log("Averagen input", updateGood, updateBad, sum);

    const updateTotal = inputTotal;
    const average = sum / updateTotal;
    setAvg(average);
  };

  const GoodPercent = (inputGood, inputTotal) => {
    console.log("Prosentti input", inputGood, inputTotal);
    const goodPercent = (inputGood / inputTotal) * 100;
    setPositive(goodPercent);
  };

  return (
    <div>
      <Display />
      <Button text="good" clickHandler={goodClick} />
      <Button text="Neutral" clickHandler={neutralClick} />
      <Button text="Bad" clickHandler={badClick} />
      <Statistic
        goodCount={good}
        neutralCount={neutral}
        badCount={bad}
        totalCount={total}
        average={avg}
        positive={positive}
      />
    </div>
  );
};

const Display = () => {
  return (
    <>
      <h1>Give feedback</h1>
    </>
  );
};

const Statistic = (props) => {
  return (
    <>
      <h1>Statistic</h1>
      <StatisticLine header="Good" text={props.goodCount} />

      <StatisticLine header="Neutral" text={props.neutralCount} />

      <StatisticLine header="Bad" text={props.badCount} />

      <StatisticLine header="Total" text={props.totalCount} />

      <StatisticLine header="Average" text={props.average} />

      <StatisticLine header="Positive" text={props.positive} />
    </>
  );
};

const Button = (props) => {
  return <button onClick={props.clickHandler}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <p>
      {props.header} = {props.text}
    </p>
  );
};

export default App;
