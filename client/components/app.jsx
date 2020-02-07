import React from 'react';
import Header from './Header';
import GradeTable from './GradeTable';
import GradeForm from './GradeForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      currentId: null,
      indexOfCurrentId: null
    };
    this.postToSGT = this.postToSGT.bind(this);
    this.deleteFromSGT = this.deleteFromSGT.bind(this);
    this.populateForm = this.populateForm.bind(this);
  }

  componentDidMount() {
    fetch('/api/grades/')
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ grades: data });
      })
      .catch(err => {
        console.error('There was an error: ', err);
      });
  }

  calculateAverage() {
    if (this.state.grades.length !== 0) {
      const grades = this.state.grades;
      let total = 0;
      for (let i = 0; i < grades.length; i++) {
        total += grades[i].grade;
      }
      return Math.ceil((total / grades.length));
    }
    return 0;
  }

  postToSGT(newStudent) {
    const config = {
      method: 'POST',
      body: JSON.stringify(newStudent),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch('/api/grades', config)
      .then(data => {
        return data.json();
      })
      .then(data => {
        const currentData = [...this.state.grades];
        currentData.push(data);
        this.setState({ grades: currentData });

      })
      .catch(err => {
        console.error(err);
      });

  }

  deleteFromSGT(id) {
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(`/api/grades/${id}`, config)
      .then(data => {
        return data.json();
      })
      .then(data => {
        const currentData = [...this.state.grades];
        const idCheck = index => index.gradeId === id;
        const idToDelete = currentData.findIndex(idCheck);
        if (idToDelete !== -1) {
          currentData.splice(idToDelete, 1);
          this.setState({ grades: currentData });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  populateForm(id) {
    this.setState({ currentId: id });
    const currentData = [...this.state.grades];
    const idCheck = index => index.gradeId === id;
    const idToUpdate = currentData.findIndex(idCheck);
    if (idToUpdate !== -1) {
      this.setState({ indexOfCurrentId: idToUpdate });
    }

  }

  render() {
    return (
      <React.Fragment>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-12'>
              <Header average={this.calculateAverage()}/>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-9'>
              <GradeTable grades={this.state.grades} deleteMethod={this.deleteFromSGT} populateForm={this.populateForm}/>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-3'>
              <GradeForm onSubmit={this.postToSGT} selectedGrade={this.state.grades[this.state.indexOfCurrentId]}/>
            </div>

          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
