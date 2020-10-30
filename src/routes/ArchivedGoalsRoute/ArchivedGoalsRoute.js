import React from 'react';
import './ArchivedGoalsRoute.css';
import GoalContext from '../../contexts/GoalContext';

export default class ArchivedGoals extends React.Component {

  static contextType = GoalContext;

  render(){
    const archivedGoals = this.context.goals.filter(goal => goal.archive)
    return(
      <div>
        <section className="goals-list-section">
        <ul className="goals-list">
        {archivedGoals.map(goal => (
          <li className="goals-list-options" key={goal.id}>
            <div>{goal.title}</div>
            <div>{goal.description}</div>
            <div>Points: {goal.points}</div>
            <div>Date completed: {goal.end_date}</div>
          </li>
        ))}
        </ul> 
        </section>
      </div>
    )
  }
}
























