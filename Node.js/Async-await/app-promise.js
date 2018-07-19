const users = [{
    id: 1,
    name: 'Daniel',
    schoolId: 101
},
{
    id: 2,
    name: 'George',
    schoolId: 99
},{
    id: 3,
    name: 'Stacy',
    schoolId: 99
}];
const grades = [{
    id: 1,
    schoolId: 101,
    grade:100
},
{
    id: 2,
    schoolId: 99,
    grade:89
},
{
    id: 3,
    schoolId: 103,
    grade:79
}];

const getUser = id => {
    return new Promise((resolve,reject)=>{
        const user = users.find((user) => user.id === id);
        if( user ) {
            resolve(user);
        } else {
            reject('Unable to find user id of ', id)
        }
    })
}

const getGrades = (schoolId) => {
    return new Promise((resolve,reject)=>{
        resolve(grades.filter((grade)=>grade.schoolId === schoolId));
    });
}
const getStatus = (userId) => {
    let user;
    return getUser(userId).then(tempUser =>{
        user = tempUser;
        return getGrades(user.schoolId);
    }).then(grades => {
        let average = 0;
        if( grades.length > 0) {
            average = grades.map(grade => grade.grade).reduce((a,b)=> a + b) / grades.length;
        }
        return `${user.name} has a ${average}% in the class.`
    })
}
//async await

const getStatusAlt = async (userId) => {
   const user = await getUser(userId);
   const grades = await getGrades(user.schoolId);
   let average = 0;
        if( grades.length > 0) { 
            average = grades.map(grade => grade.grade).reduce((a,b)=> a + b) / grades.length;
        }
        return `${user.name} has a ${average}% in the class.`;
}
getStatusAlt(3).then(name => {
    console.log(name);
}).catch(e =>{
    console.log(e);
})


// getUser(2).then((user)=>{
//     console.log(user);
// }).catch((e)=>{
//     console.log(e);
// })