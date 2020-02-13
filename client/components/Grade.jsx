import React from 'react';

class Grade extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.platform}</td>
        <td>{this.props.price}</td>
        <td>
          <button type='button' className='btn btn-primary btn-sm' onClick={() => this.props.populateForm(this.props.gameId)}><i className='fas fa-edit' /></button> <button type='button' className='btn btn-danger btn-sm'
            onClick={() => this.props.onDelete(this.props.gameId)}>
          X</button>
        </td>
      </tr>
    );
  }
}

export default Grade;
