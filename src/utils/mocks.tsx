import {SEMESTER_QUERY} from "../graphql/queries/getAllSemester";

export const semesterMocks = [{
    request:{
        query:SEMESTER_QUERY,
        variables:{
            year:"First Year"
        },
    },
    result:{
        data:{
            getAllSemester:[
                {
                    _id:"13dgt3nb",
                    year:"First Year",
                    semester:"1.1",
                    path:"/dashboard/firstyear"
                },
                {
                    _id:"13dgt3ne",
                    year:"First Year",
                    semester:"1.2",
                    path:"/dashboard/firstyear"
                }
            ]
        }
    }
}]
