const StudentDataReducer = (state=[], action) => {
    switch (action.type){
        case 'GET_STUDENT_DATA':
            var list = state.slice()
            list.push(action.payload)
            return action.payload

        default:
            return state;
    }
}
export default StudentDataReducer;
