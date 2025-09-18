const getBudget = (people) => {
    return people.reduce((totalBudget, person) => {
        return totalBudget + person.budget;
    }, 0);
};

export default getBudget;
