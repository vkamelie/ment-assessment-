import React, { Component } from "react";
import "./Dash.css";

import { connect } from "react-redux";
import {
  requestTasks,
  removeTask,
  addTask,
  taskDone,
  updateTask
} from "../redux/Reducer";

class Dash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      title: "",
      newTitle: "",
      editTitle: false
    };
  }

  componentDidMount = () => {
    this.props.requestTasks();
  };

  handleSubmit = () => {
    const { title, description } = this.state;

    console.log(title, description, "ADD_TASK");
    this.props.addTask(title, description);
    this.setState({
      title: "",
      description: ""
    });
    this.props.requestTasks();
  };

  completedTask = id => {
    this.props.taskDone(id);
  };

  addTitle = v => {
    this.setState({ title: v });
  };

  addTask = v => {
    this.setState({ description: v });
  };

  deleteTask = id => {
    this.props.removeTask(id);
    this.props.requestTasks();
  };

  update = id => {
    if (this.state.editTitle === false) {
      this.setState({ editTitle: true });
      console.log(this.props.tasks.title);
    } else {
      this.props.updateTask(id);
    }
  };

  render() {
    const { title, description } = this.state;
    let styles = {
      margin: "auto",
      fontSize: "16px"
    };

    const isEnabled = title.length > 0;
    console.log(this.state.title, this.state.description, "jazz hands");

    console.log(this.props.tasks, "ALL THAT JAZZZZZ");

    let taskList = this.props.tasks.map(task => {
      console.log(task.description, "helllow");
      console.log(this.props.taskDone, " NO JAZZ");
      return (
        <div key={task.id} style={styles} className="tasks">
          {this.state.editTitle ? (
            <div>
              <input
                onChange={e => {
                  this.setState({ newTitle: e.target.value });
                }}
              />
            </div>
          ) : (
            <h2>{task.title}</h2>
          )}

          <p>{task.description}</p>
          <button
            onClick={() => {
              this.deleteTask(task.id);
            }}
          >
            Delete
          </button>
          <button onClick={() => this.update(task.id)}>
            {this.editTitle === true ? "save" : "edit"}
          </button>
        </div>
      );
    });

    return (
      <div>
        <input
          value={title}
          onChange={e => {
            this.setState({ title: e.target.value });
          }}
          placeholder="title"
        />
        <input
          value={description}
          onChange={e => {
            this.setState({ description: e.target.value });
          }}
          placeholder="description"
        />
        <button
          disabled={!isEnabled}
          type="submit"
          onClick={() => this.handleSubmit(title, description)}
        >
          Add Task
        </button>
        {taskList}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

const mapDispatchToProps = {
  requestTasks,
  removeTask,
  addTask,
  taskDone,
  updateTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dash);
