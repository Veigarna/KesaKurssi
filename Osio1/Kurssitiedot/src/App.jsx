const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content part={course.parts[0].name} ex={course.parts[0].exercises} />
      <Content part={course.parts[1].name} ex={course.parts[1].exercises} />
      <Content part={course.parts[2].name} ex={course.parts[2].exercises} />
      <Total
        e1={course.parts[0].exercises}
        e2={course.parts[1].exercises}
        e3={course.parts[2].exercises}
      />
    </div>
  );
};

const Header = (props) => {
  console.log("Header load");
  return (
    <>
      <h1> {props.courseName} </h1>
    </>
  );
};

const Content = (props) => {
  console.log("Content load");
  return (
    <>
      <p>
        {props.part} {props.ex}
      </p>
    </>
  );
};

const Total = (props) => {
  console.log("Total load");
  return (
    <>
      <p>Number of exercises {props.e1 + props.e2 + props.e3} </p>
    </>
  );
};

export default App;
