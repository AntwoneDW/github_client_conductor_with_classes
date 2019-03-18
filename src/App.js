import React, {Component} from 'react';
import { fetchRepos, getRepoCount, REPOS_PAGE_SIZE } from "./util/githubUtil.js"
import DataViewer from "./DataViewer"

class App extends Component {

    /*
    Org Name
    Min Star
    Max Stars
    Max Issues
     */

    constructor(props) {
        super(props);
        this.state = {value: '', data: [] };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log('target: ' + event.target );
        console.log('name: ' + event.target.name);
        let fetchPromise = null;
        if(event.target.name === 'org_name'){
            fetchPromise = fetchRepos(event.target.value );
        }
        if(event.target.name === 'min_star'){
            fetchPromise = fetchRepos(event.target.value );
        }
        if(event.target.name === 'max_star'){
            fetchPromise = fetchRepos(event.target.value );
        }
        if(event.target.name === 'max_issues'){
            fetchPromise = fetchRepos(event.target.value );
        }
        if(fetchPromise !== null)
        {
            fetchPromise.then(
                daReturn => {
                    console.log("****> Promise Just Came Back");
                    console.log("****> daReturn: " + daReturn.length);
                    this.setState( {value: '', data: daReturn } );
                }
            );
        }
        console.log('value: ' + event.target.value);
        // this.setState({value: event.target.value});
    }

    componentDidMount() {
        const org = '';
        const page = 1;
        const getRepoCountNum = getRepoCount(org);
        //console.log('****> REPOS_PAGE_SIZE: ' + REPOS_PAGE_SIZE);
        //console.log('****> getRepoCountNum: ' + getRepoCountNum);
       fetchRepos(org, page).then(
           daReturn => {
               console.log("****> Promise Just Came Back");
               console.log("****> daReturn: " + daReturn.length);
               this.setState( {value: '', data: daReturn } );
           }
       );
        //this.setState( {...this.state, data: fetchRepo } );
        //console.log('****> fetchRepo: ' + fetchRepo);
        //console.log('****> this.state.data: ' + this.state.data);
    }

    render() {
        console.log("----REDRAWING-----");
        const jsonString = this.state.data ? JSON.stringify(this.state.data) : "No Data";
        return (
            <div className="App">
                <form>
                    <label>
                        Org Name:
                        <input type="text" name="org_name" onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        Min Star:
                        <input type="text" name="min_star" />
                    </label>
                    <br/>
                    <label>
                        Max Stars:
                        <input type="text" name="max_star" />
                    </label>
                    <br/>
                    <label>
                        Max Issues:
                        <input type="text" name="max_issues" />
                    </label>
                </form>
                <DataViewer name={'ANTWONE_WALTERS'}/>
                {jsonString}
            </div>
        );
    }
}

export default App;
