import React, {Component} from 'react';
import * from "./util/githubUtil.js"

class App extends Component {

    /*
    Org Name
    Min Star
    Max Stars
    Max Issues
     */

    constructor(props) {
        super(props);
        this.state = {value: '', data: { data: [] } };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log('target: ' + event.target );
        console.log('name: ' + event.target.name);
        if(event.target.name === 'org_name'){
            this.fetchRepos(event.target.value );
        }
        if(event.target.name === 'min_star'){
            this.fetchRepos(event.target.value );
        }
        if(event.target.name === 'max_star'){
            this.fetchRepos(event.target.value );
        }
        if(event.target.name === 'max_issues'){
            this.fetchRepos(event.target.value );
        }
        console.log('value: ' + event.target.value);
        // this.setState({value: event.target.value});
    }

    componentDidMount() {
        octokit.authenticate({
            type: 'basic',
            username: 'conductor-eng-candidate',
            password: "Don't rate limit me, bro!"
        });

        const org = 'facebook';
        const page = 1;
        const getRepoCountNum = this.getRepoCount(org);
        console.log('**** getRepoCountNum: ' + getRepoCountNum);
        const fetchRepo = this.fetchRepos(org, page);
        console.log('**** fetchRepo: ' + fetchRepo);
    }

    render() {
        let list = "";
        if(this.state.data)
        {
            this.state.data.data.map( dataObj =>
                (JSON.stringify(dataObj)) )
        }
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
                <ul>
                </ul>
                {
                    if(this.state.data)
                {
                    this.state.data.data.map( dataObj =>
                    (JSON.stringify(dataObj)) )

                })

                }
            </div>
        );
    }
}

export default App;
