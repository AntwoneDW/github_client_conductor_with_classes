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
        this.state = { data: [], min_stars: 0, max_stars: 20000, max_issues:20000 };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log('target: ' + event.target );
        console.log('name: ' + event.target.name);
        const name = event.target.name;
        const value = event.target.value;
        let fetchPromise = null;
        if(name === 'org_name'){
            fetchPromise = fetchRepos(value);
        }
        let newState = null;
        if(name === 'min_star'){
            newState = {...this.state, min_stars: value};
        }
        if(name === 'max_star'){
            newState = {...this.state, max_stars: value};
        }
        if(name === 'max_issues'){
            newState = {...this.state, max_issues: value};
        }
        if(newState)
        {
            this.setState(newState)
        }
        if(fetchPromise !== null)
        {
            fetchPromise.then(
                daReturn => {
                    console.log("****> Promise Just Came Back");
                    console.log("****> daReturn: " + daReturn.length);
                    this.setState( { data: daReturn } );
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
        /// {"name":"cn.github.io","issues":9,"watchers":57,"stars":57},
        const filteredData = this.state.data.filter( dataObj => {
            let filterOut = true;
            if(this.state.min_stars > 0)
            {
                if(dataObj.stars < this.state.min_stars)
                {
                    console.log(`Filtering out b/c min_stars ${this.state.min_stars} < stars ${dataObj.stars}`);
                    filterOut = false;
                }
            }
            if(this.state.max_stars)
            {
                if(dataObj.stars > this.state.max_stars)
                {
                    console.log(`Filtering out b/c max_stars ${this.state.max_stars} > stars ${dataObj.stars}`);
                    filterOut = false;
                }
            }
            if(this.state.max_issues)
            {
                if(dataObj.issues > this.state.max_issues)
                {
                    console.log(`Filtering out b/c max_stars ${this.state.max_issues} > stars ${dataObj.stars}`);
                    filterOut = false;
                }
            }
            return filterOut;
        })
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
                        <input type="text" name="min_star" onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        Max Stars:
                        <input type="text" name="max_star"  onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Max Issues:
                        <input type="text" name="max_issues"  onChange={this.handleChange}/>
                    </label>
                </form>
                Result Size: {filteredData.length}
                {
                    filteredData.map( dataObj =>
                    <div>
                        <DataViewer name={dataObj.name}/>
                        {JSON.stringify(dataObj)}
                    </div> )
                }
                <hr/>
                {jsonString}
            </div>
        );
    }
}

export default App;
