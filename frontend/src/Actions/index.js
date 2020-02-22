export const studentData = (type,data) =>{
    if(data !== undefined){
        console.log('lala',type,data)
        return {
            type: type,
            payload: data
        }
    }else{
        console.log('err in Actions, getting projects detail',data)
    }
}
