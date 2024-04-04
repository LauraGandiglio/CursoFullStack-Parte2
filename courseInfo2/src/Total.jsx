const Total = (props) => {
  const exercisesNum = props.parts.map((e) => e.exercises);
  const total = exercisesNum.reduce((total, num) => total + num, 0);

  return (
    <p>
      <b>
        Number of exercises {""}
        {total}
      </b>
    </p>
  );
};

export default Total;
