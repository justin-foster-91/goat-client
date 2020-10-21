import React, { useState, useContext, useEffect } from 'react';
import GoalContext from '../../contexts/GoalContext';
import Accordion from '../../components/Accordion/accordion';
import GoalService from '../../services/goalsAPIservice';

const DashboardRoute = (props) => {

  // const goals = useContext(GoalContext);
  // console.log("DashboardRoute -> goals", goals.value)
  const [error, setError] = useState('');
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    GoalService.getGoal()
    .then(goals => {
      console.log(goals);
      setGoals(goals);
    })
    .catch(setError);
  },[setGoals])

  const handleClickCreate = () => {
    const {history} = props;
    history.push(`/create-goal`)
  };

  const handleRewardList = () => {
    const {history} = props;
    history.push(`/rewards-list`)
  };

  const onClick = ((id, complete) => {
    goals.modifyGoal({id, complete: !complete})
    .then(() => setError(''))
    .catch(res => setError(res));
  });

  console.log('Dashboard goals: ', goals);
  return (
    <div>
      <h2>
        My Goals
      </h2>
      {error && <p>{error}</p>}
      <Accordion goals={goals} onClick={onClick}/>
      <button onClick={() => handleClickCreate()}>Create New Goal</button>
      <button onClick={() => handleRewardList()}>View Rewards</button>
    </div>
  );
  
}

export default DashboardRoute;
