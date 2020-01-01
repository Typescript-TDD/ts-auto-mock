const axios = require('axios');

function performanceRepository(url, secret) {
    return {
        async get() {
            return axios.get(url + "/latest", {
                headers: {
                    "secret-key": secret || ""
                }
            })
        },
        async update(results, currentBranch, currentCommit) {
            return this.get().then((response) => {
                let tests = response.data['performance-tests'];
                const now = new Date().toISOString();

                if (!tests) {
                    tests = {};
                }

                if (tests[currentBranch]) {
                    if (tests[currentBranch][currentCommit]) {
                        tests[currentBranch][currentCommit][now] = results;
                    } else {
                        tests[currentBranch][currentCommit] = {
                            [now]: results
                        }
                    }
                } else {
                    tests[currentBranch] = {
                        [currentCommit]: {
                            [now]: results
                        }
                    }
                }

                response.data = {
                    "performance-tests": tests
                };

                axios.put(url, response.data, {
                    headers: {
                        "secret-key": secret || ""
                    }
                });
            });
        }
    }
}

module.exports = performanceRepository;
