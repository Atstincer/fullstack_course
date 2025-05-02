const Header = ({course}) => {
    return(
      <h1>{course.name}</h1>
    )
  }
  
  const Part = ({part}) => {
    //console.log(props)
    return(
      <p>
          {part.name} {part.exercises}
      </p>
    )
  }
  
  const Content = ({course}) => {
    return(
      <div>
          {course.parts.map(part => <Part key={part.id} part={part}/>)}
      </div>
    )
  }
  
  const Total = ({course}) => {
    const total = course.parts.reduce((acum,part)=>acum + part.exercises,0)
    return(
      <h4>
          total of {total} exercises
      </h4>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
  }

  export default Course