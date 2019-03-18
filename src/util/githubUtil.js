const octokit = require('@octokit/rest')();

const REPOS_PAGE_SIZE = 50;

octokit.authenticate({
    type: 'basic',
    username: 'conductor-eng-candidate',
    password: "Don't rate limit me, bro!"
});

/**
 * Fetches public repos belonging to the specified github org. Fetches fifty repos per page.
 *
 * @param {string} orgName
 * @param {number} page
 * @returns {Promise<repo[]>} a promise which resolves with an array of up to fifty repos belonging to the org
 */
function fetchRepos(orgName, page = 1) {
    return octokit.repos.listForOrg({
        org: orgName,
        type: 'public',
        per_page: REPOS_PAGE_SIZE,
        page: page
    }).then(data => {
        //console.log('**** fetchRepos: ' + JSON.stringify(data.data[0]));
        return data.data.map(repo => {
            return {
                name: repo.name,
                issues: repo.open_issues_count,
                watchers: repo.watchers_count,
                stars: repo.stargazers_count
            }
        });
    })
}

/**
 * @param {string} orgName
 * @returns {Promise<number>} a promise which resolves with the number of public repos owned by an org
 */
function getRepoCount(orgName) {
    return octokit.orgs.get({
        org: orgName
    }).then(org => {
        console.log('**** org: ' + org);
        console.log('**** org.data.public_repos: ' + org.data.public_repos);
        return org.data.public_repos;
    })
}

export { fetchRepos, getRepoCount, REPOS_PAGE_SIZE };