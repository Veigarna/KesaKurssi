const Allcourses = (props) => {
  console.log("List load");

  return (
    <>
      {props.courses.map((course) => (
        <li key={course.id}>
          <Course course={course} />
        </li>
      ))}
    </>
  );
};

const Course = (props) => {
  const source = props.course;

  //testi
  const result = source.parts.map((part) => part.id);
  console.log("test ", result);

  console.log("Course load");
  return (
    <div>
      <Header courseName={source.name} />
      <Content parts={source.parts} />
      <Total parts={source.parts} />
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
      <ul>
        {props.parts.map((part) => (
          <Part part={part} key={part.id} />
        ))}
      </ul>
    </>
  );
};

const Part = (props) => {
  console.log("Part load");
  return (
    <>
      <li key={props.part.id}>
        {props.part.name} {props.part.exercises}
      </li>
    </>
  );
};

const Total = (props) => {
  console.log("Total load");
  const input = props.parts;

  input.forEach((part) => {
    console.log(part.exercises);
  });

  const map = input.map((part) => part);

  let sum = 0;
  map.forEach((part) => {
    sum += part.exercises;
  });

  return (
    <>
      <p>Number of exercises {sum} </p>
    </>
  );
};

export default Allcourses;
