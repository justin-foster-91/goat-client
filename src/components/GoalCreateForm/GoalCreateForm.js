import React, {Component} from 'react';
import GoalContext from '../../contexts/GoalContext';
import {Label, Input, Button} from '../Utils/Utils';
import './GoalCreateForm.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default class GoalCreateForm extends Component {
  static defaultProps = {
    onGoalCreateSuccess: () => {}
  }

  constructor(props) {
    super(props);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.state = {
      date: tomorrow,
    }
  }

  componentWillUnmount() {
    this.context.clearError();
  }

  onChange = date => this.setState({ date });

  static contextType = GoalContext;

  handleSubmitGoal = ev => {
    // Submit the goal. Set up once goal api service is ready.
    ev.preventDefault();
    const {goal_title, goal_desc, goal_points} = ev.target;
    this.context.addGoal({
      title: goal_title.value,
      description: goal_desc.value,
      points: goal_points.value,
      end_date: this.state.date,
      archive: false,
    })
      .then(() => {
        this.props.onGoalCreateSuccess();
      })
      .catch(this.context.setError);
  }

  render() {
    const {error} = this.context;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      <>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <form
          className='GoalCreateForm'
          onSubmit={this.handleSubmitGoal}
        >
          <div className='form-row'>
            <Label htmlFor='goal-title-input'>
              Goal:
            </Label><br/>
            <Input
              id='goal-title-input'
              name='goal_title'
              required
            />
          </div>
          <div className='form-row'>
            <Label htmlFor='goal-desc-input'>
              Description:
            </Label><br/>
            <Input
              id='goal-desc-input'
              name='goal_desc'
              required
            />
          </div>
          <div className='form-row'>
            <Label htmlFor='goal-points-input'>
              Points:
            </Label><br/>
            <Input
              id='goal-points-input'
              name='goal_points'
              required
            />
          </div>
          <div >
            <Label htmlFor='goal-end-date-input'>
              End Date:
            </Label> 
            <div className='endDateCalendar'>
              <Calendar
                onChange={this.onChange}
                value={this.state.date}
                minDate={tomorrow}
                required
              />
            </div>
          </div>
          <footer>
            <Button type='submit' className='submit'>
              Create Goal
            </Button>
          </footer>
        </form>
      </>
    )
  }
}