import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';

class GetGitRepo extends React.Component {
    constructor(){
      super();
      this.state = {
        userName: '',
        repoArray: [],
        errorData: '',
        flag: true
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.disableButton = this.disableButton.bind(this);
    }

    handleClick(){
      let username = this.state.userName; 
      const url = 'https://api.github.com/users/'+username+'/repos';
      axios
        .get(url)
        .then((data)=> {
          this.setState({
            repoArray: data.data,
            errorData:''
          })
        })
      .catch((err)=> {
         this.setState({
            errorData: err,
            repoArray:''
        })
      })
    }

    disableButton(){
        if(this.state.userName.length > 0){
            this.setState({
                flag: false
            })
        }else{
            this.setState({
                flag: true
            })
        }
    }

    handleChange(event){
      this.setState({
        userName : event.target.value
      })
    }

    render(){
        let responseData = " ";
        if(this.state.repoArray.length > 0){
            let temp = this.state.repoArray;
            responseData = temp.map((repo) => {
                return <li key={repo.id}>{repo.name}</li>
            })
        }else if((this.state.repoArray.length == 0) && (this.state.errorData == '')){
            responseData = <li>You have 0 repo</li>
        } else if(this.state.errorData){
            responseData = <li>user not foundd</li>
        } 
      return(
        <div>
            <h1>Get Git Repo</h1>
            <input type="text" value={this.state.userName} onChange={this.handleChange} onKeyUp={this.disableButton}/>
            <button disabled={this.state.flag} onClick={this.handleClick}>click me</button>
            {responseData}
        </div>
      )
    }
  }

render(<GetGitRepo />, document.getElementById('root'));
